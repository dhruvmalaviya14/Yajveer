import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import MainNav from "./mainnav";
import Footer from "./Footer/Footer";
import Sidebar from "./Home/sidebar";
import Sidebar1 from "./Home/sidebar1";
import "../CSS/TermsConditions.css";

const TermsConditions = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  return (
    <>
      {isSidebarOpen && <Sidebar1 onClose={handleCloseSidebar} />}
      <Sidebar onOpenSidebar={handleOpenSidebar} />
      <Navbar />
      <Navbar2 />
      <MainNav />
      <div className="terms-container">
        <h1>Terms and Conditions for Yajveer Ayurvedic</h1>

        <p>
          Welcome to <strong>Yajveer Ayurvedic</strong>. These terms and
          conditions outline the rules and regulations for the use of our
          website, located at <strong><a href="http://localhost:5173/">www.YajveerAyurvedic.com</a></strong>.
          By accessing this website we assume you accept these terms and
          conditions in full. Do not continue to use Yajveer Ayurvedic's
          website if you do not accept all of the terms and conditions stated on
          this page.
        </p>

        <h2>1. Definitions</h2>
        <ul>
          <li>
            "<strong>Website</strong>" refers to yajveerayurvedic.com and all
            its sub-pages.
          </li>
          <li>
            "<strong>We</strong>", "<strong>Us</strong>", "<strong>Our</strong>"
            refers to Yajveer Ayurvedic.
          </li>
          <li>
            "<strong>You</strong>", "<strong>Your</strong>", "
            <strong>User</strong>" refers to the individual accessing or using
            the service.
          </li>
          <li>
            "<strong>Service</strong>" refers to the website, its content, and
            any products or services offered through it.
          </li>
        </ul>

        <h2>2. License</h2>
        <p>
          Unless otherwise stated, Yajveer Ayurvedic and/or its licensors own
          the intellectual property rights for all material on this website. All
          intellectual property rights are reserved. You may view and/or print
          pages from <strong><a href="http://localhost:5173/">www.YajveerAyurvedic.com</a></strong> for your own personal use subject to
          restrictions set in these terms and conditions.
        </p>
        <p>You must not:</p>
        <ul>
          <li>Republish material from this website without explicit permission.</li>
          <li>Sell, rent, or sub-license material from this website.</li>
          <li>Reproduce, duplicate, or copy material from this website for commercial purposes.</li>
          <li>Redistribute content from Yajveer Ayurvedic (unless content is specifically made for redistribution, e.g., newsletter).</li>
        </ul>

        <h2>3. User Comments & Content</h2>
        <p>
          Certain parts of this website offer an opportunity for users to post
          and exchange opinions, information, material, and data ('Comments') in
          areas of the website. Yajveer Ayurvedic does not screen, edit,
          publish, or review Comments prior to their appearance on the website.
          Comments do not reflect the views and opinions of Yajveer Ayurvedic,
          its agents, or affiliates. Comments reflect the view and opinion of
          the person who posts such view or opinion. To the extent permitted by
          applicable laws, Yajveer Ayurvedic shall not be responsible or liable
          for the Comments or for any loss, cost, liability, damages, or
          expenses caused and/or suffered as a result of any use of and/or
          posting of and/or appearance of the Comments on this website.
        </p>
        <p>
          Yajveer Ayurvedic reserves the right to monitor all Comments and to
          remove any Comments which it considers in its absolute discretion to
          be inappropriate, offensive, or otherwise in breach of these Terms
          and Conditions.
        </p>
        <p>You warrant and represent that:</p>
        <ul>
          <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
          <li>The Comments do not infringe any intellectual property right, including without limitation copyright, patent, or trademark, or other proprietary right of any third party;</li>
          <li>The Comments do not contain any defamatory, libelous, offensive, indecent, or otherwise unlawful material or material which is an invasion of privacy;</li>
          <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
        </ul>

        <h2>4. Hyperlinking to our Content</h2>
        <p>
          The following organizations may link to our Website without prior
          written approval:
        </p>
        <ul>
          <li>Government agencies;</li>
          <li>Search engines;</li>
          <li>News organizations;</li>
          <li>Online directory distributors when they list us in the directory may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
          <li>Systemwide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
        </ul>
        <p>
          These organizations may link to our home page, to publications, or to
          other Website information so long as the link: (a) is not in any way
          deceptive; (b) does not falsely imply sponsorship, endorsement, or
          approval of the linking party and its products and/or services; and
          (c) fits within the context of the linking party's site.
        </p>
        <p>
          We may consider and approve in our sole discretion other link
          requests from the following types of organizations:
        </p>
        <ul>
          <li>commonly-known consumer and/or business information sources;</li>
          <li>dot.com community sites;</li>
          <li>associations or other groups representing charities;</li>
          <li>online directory distributors;</li>
          <li>internet portals;</li>
          <li>accounting, law and consulting firms; and</li>
          <li>educational institutions and trade associations.</li>
        </ul>
        <p>
          We will approve link requests from these organizations if we decide
          that: (a) the link would not make us look unfavorably to ourselves or
          to our accredited businesses; (b) the organization does not have an
          unsatisfactory record with us; (c) the benefit to us from the
          visibility associated with the hyperlink outweighs the absence of
          Yajveer Ayurvedic; and (d) the link is in the context of general
          resource information.
        </p>
        <p>
          If you are among the organizations listed in paragraph 4.2 above and
          are interested in linking to our website, you must inform us by
          sending an e-mail to <strong>yajveerayurved@gmail.com</strong>. Please include
          your name, your organization name, contact information as well as the
          URL of your site, a list of any URLs from which you intend to link to
          our Website, and a list of the URL(s) on our site to which you would
          like to link. Allow 2-3 weeks for a response.
        </p>

        <h2>5. iFrames</h2>
        <p>
          Without prior approval and express written permission, you may not
          create frames around our Webpages or use other techniques that alter
          in any way the visual presentation or appearance of our Website.
        </p>

        <h2>6. Content Liability</h2>
        <p>
          We shall not be held responsible for any content that appears on your
          Website. You agree to protect and defend us against all claims that
          are rising on your Website. No link(s) should appear on any Website
          that may be interpreted as libelous, obscene, or criminal, or which
          infringes, otherwise violates, or advocates the infringement or other
          violation of any third-party rights.
        </p>

        <h2>7. Reservation of Rights</h2>
        <p>
          We reserve the right at any time and in its sole discretion to
          request that you remove all links or any particular link to our
          Website. You agree to immediately remove all links to our Website
          upon such request. We also reserve the right to amend these terms and
          conditions and its linking policy at any time. By continuing to link
          to our Website, you agree to be bound to and abide by these linking
          terms and conditions.
        </p>

        <h2>8. Removal of links from our website</h2>
        <p>
          If you find any link on our Website or any linked website
          objectionable for any reason, you may contact us about this. We will
          consider requests to remove links but will have no obligation to do
          so or to respond directly to you.
        </p>
        <p>
          Whilst we endeavor to ensure that the information on this website is
          correct, we do not warrant its completeness or accuracy; nor do we
          commit to ensuring that the website remains available or that the
          material on the website is kept up to date.
        </p>

        <h2>9. Disclaimer</h2>
        <p>
          To the maximum extent permitted by applicable law, we exclude all
          representations, warranties, and conditions relating to our website
          and the use of this website (including, without limitation, any
          warranties implied by law in respect of satisfactory quality, fitness
          for purpose, and/or the use of reasonable care and skill). Nothing in
          this disclaimer will:
        </p>
        <ul>
          <li>
            Limit or exclude our or your liability for death or personal injury;
          </li>
          <li>
            Limit or exclude our or your liability for fraud or fraudulent
            misrepresentation;
          </li>
          <li>
            Limit any of our or your liabilities in any way that is not
            permitted under applicable law; or
          </li>
          <li>
            Exclude any of our or your liabilities that may not be excluded
            under applicable law.
          </li>
        </ul>
        <p>
          The limitations and prohibitions of liability set in this Section and
          elsewhere in this disclaimer: (a) are subject to the preceding
          paragraph; and (b) govern all liabilities arising under the
          disclaimer or in relation to the subject matter of this disclaimer,
          including liabilities arising in contract, in tort, and for breach of
          statutory duty.
        </p>
        <p>
          As long as the website and the information and services on the website
          are provided free of charge, we will not be liable for any loss or
          damage of any nature.
        </p>

        <h2>10. Privacy Policy</h2>
        <p>
          Our Privacy Policy, which also governs your visit to our Website, is
          incorporated into these Terms and Conditions by reference. Please
          review our <strong><a href="http://localhost:5173/privacy">Privacy Policy</a></strong> to
          understand our practices.
        </p>

        <h2>11. Product Information and Orders</h2>
        <ul>
          <li>
            <strong>Product Descriptions:</strong> We strive to be as accurate as
            possible in the descriptions of our products on the Website. However,
            we do not warrant that product descriptions or other content of this
            site is accurate, complete, reliable, current, or error-free.
          </li>
          <li>
            <strong>Pricing:</strong> All prices displayed on the Website are in
            INR and are subject to change without notice.
            Prices do not include applicable taxes or shipping charges, which will
            be added to your total at checkout.
          </li>
          <li>
            <strong>Order Acceptance:</strong> Your receipt of an electronic or
            other form of order confirmation does not signify our acceptance of
            your order, nor does it constitute confirmation of our offer to sell.
            We reserve the right at any time after receipt of your order to accept
            or decline your order for any reason. We may require additional
            verifications or information before accepting any order.
          </li>
          <li>
            <strong>Availability:</strong> All products are subject to
            availability. We reserve the right to limit the quantity of products
            we supply; to discontinue any product at any time; and to refuse any
            order.
          </li>
        </ul>

        <h2>12. Payments</h2>
        <p>
          We accept various payment methods as indicated on our Website. By
          providing us with your payment information, you represent and warrant
          that the information is accurate and that you are authorized to use the
          payment method provided. You agree to pay for all purchases made through
          our Website.
        </p>

        <h2>13. Shipping and Delivery</h2>
        <p>
          Please refer to our <strong><a href="http://localhost:5173/shipping">Shipping Policy </a></strong>
          for details regarding shipping methods, delivery times, and associated
          costs.
        </p>

        <h2>14. Returns and Refunds</h2>
        <p>
          Please refer to our <strong><a href="http://localhost:5173/policies">Return Policy </a></strong>
          for details regarding returns, exchanges, and refunds.
        </p>

        <h2>15. Governing Law & Jurisdiction</h2>
        <p>
          These terms and conditions are governed by and construed in
          accordance with the laws of India and
          you irrevocably submit to the exclusive jurisdiction of the courts
          in Surat, Gujarat.
        </p>

        <h2>16. Severability</h2>
        <p>
          If any provision of these Terms is found to be unenforceable or invalid
          under any applicable law, such unenforceability or invalidity shall not
          render these Terms unenforceable or invalid as a whole, and such
          provisions shall be deleted without affecting the remaining provisions
          herein.
        </p>

        <h2>17. Entire Agreement</h2>
        <p>
          These Terms and Conditions, together with our Privacy Policy, Shipping
          Policy, and Return Policy, constitute the entire agreement between
          Yajveer Ayurvedic and you in relation to your use of this Website, and
          supersede all prior agreements and understandings.
        </p>

        <small>
          For any queries regarding these Terms and Conditions, please contact
          us at yajveerayurved@gmail.com.
        </small>
      </div>
      <Footer />
    </>
  );
};

export default TermsConditions;