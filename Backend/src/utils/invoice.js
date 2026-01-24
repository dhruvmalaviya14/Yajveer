// utils/invoice.js
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import puppeteer from "puppeteer";           // keep if you already depend on puppeteer
// If you prefer the lighter package, change to:  import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

import handlebars from "handlebars";
handlebars.registerHelper("multiply", (a, b) => a * b);
const { compile } = handlebars;

/* ---------------------------------------------------------------------- */
/*  Path helpers                                                          */
/* ---------------------------------------------------------------------- */

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const templatePath = path.resolve(
  __dirname,
  "..", "..",
  "templates",
  "invoice.hbs",
);



/* ---------------------------------------------------------------------- */
/*  Memoised template compile                                             */
/* ---------------------------------------------------------------------- */

let cachedTemplate;
async function getTemplate() {
  if (cachedTemplate) return cachedTemplate;
  const src = await fs.readFile(templatePath, "utf8");
  cachedTemplate = compile(src);
  return cachedTemplate;
}

/* ---------------------------------------------------------------------- */
/*  Build invoice PDF                                                     */
/* ---------------------------------------------------------------------- */

export async function buildInvoicePdf(order) {
  /* ----- 1. Render HTML with Handlebars -------------------------------- */
  const template = await getTemplate();
  const html = template({
    ...order,
    date: new Date().toLocaleDateString("en-IN"),
  });

  /* ----- 2. Launch Chromium supplied by @sparticuz/chromium ------------ */
  const browser = await puppeteer.launch({
    args: chromium.args,                    // includes --no-sandbox etc.
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(), // falls back to system Chrome locally
    headless: chromium.headless,            // 'new' on modern builds
  });

  /* ----- 3. Create PDF -------------------------------------------------- */
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: { top: "5mm", bottom: "5mm" },
    printBackground: true,
  });

  await browser.close();
  return pdfBuffer;                         // <Buffer …>
}
