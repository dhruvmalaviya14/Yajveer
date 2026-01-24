import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import MainNav from "./mainnav";
import Footer from "./Footer/Footer";
import Sidebar from "./Home/sidebar";
import Sidebar1 from "./Home/sidebar1";
import "../CSS/PrivacyPolicy.css";

const PrivacyPolicy = () => {
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
      <div className="privacy-policy-container">
        <h1 className="privacy-title">Privacy Policy for Yajveer Ayurvedic</h1>
        <p className="effective-date">Effective Date: May 24, 2025</p>

        <p className="privacy-paragraph">
          Welcome to <strong>Yajveer Ayurvedic</strong>. We deeply value your trust and
          are unwavering in our commitment to protecting your privacy. This Privacy Policy
          (the "Policy") is designed to inform you about how we collect, use, disclose,
          and safeguard your information when you visit and interact with our website,{" "}
          <a href="http://localhost:5173/" target="_blank" rel="noopener noreferrer">
            https://yajveerayurvedic.com
          </a>{" "}
          (the “Site”), and use any of our services, products, or engage with us online.
          Please read this Privacy Policy carefully. If you do not agree with the terms
          of this Privacy Policy, please do not access the Site.
        </p>

        <h2 className="privacy-subtitle">1. Information We Collect</h2>
        <p className="privacy-paragraph">
          We collect various types of information from and about you depending on how you
          interact with our Site and services.
        </p>
        <ul className="privacy-list">
          <li>
            <strong>Personal Information (Directly Provided by You):</strong> This refers
            to information that can be used to identify you personally. We collect this
            information when you voluntarily provide it to us through various interactions,
            such as:
            <ul>
              <li>
                <strong>Account Registration:</strong> When you create an account, we may
                collect your name, email address, phone number, and password.
              </li>
              <li>
                <strong>Placing Orders:</strong> When you make a purchase, we collect your
                billing address, shipping address, payment information (e.g., credit card
                details or other payment method information), phone number, and email address.
              </li>
              <li>
                <strong>Contact Forms/Inquiries:</strong> If you submit a contact form,
                send us an email, or call us, we collect your name, email address, phone
                number, and the content of your message.
              </li>
              <li>
                <strong>Newsletters/Marketing Subscriptions:</strong> If you subscribe
                to our newsletter or marketing communications, we collect your email
                address and preferences.
              </li>
              <li>
                <strong>Reviews and Testimonials:</strong> If you submit a product review
                or testimonial, we may collect your name and the content of your review.
              </li>
              <li>
                <strong>Surveys and Promotions:</strong> If you participate in surveys
                or promotional offers, we may collect information you provide as part of
                your participation.
              </li>
            </ul>
          </li>
          <li>
            <strong>Non-Personal Information (Automatically Collected):</strong> This is
            information that does not directly identify you, but helps us understand
            how users interact with our Site. This information is collected automatically
            as you navigate through the Site:
            <ul>
              <li>
                <strong>Usage Data:</strong> This includes information about how you
                access and use the Site, such as your browser type and version, operating
                system, referring URLs, pages viewed, the time spent on those pages,
                the dates and times of your visits, and other diagnostic data.
              </li>
              <li>
                <strong>Device Data:</strong> We may collect information about the device
                you use to access our Site, including device type, unique device identifiers,
                mobile network information, and screen resolution.
              </li>
              <li>
                <strong>IP Address:</strong> Your Internet Protocol (IP) address is a
                numerical label assigned to your device by your Internet Service Provider.
                We use IP addresses to analyze trends, administer the Site, track user
                movement, and gather broad demographic information.
              </li>
              <li>
                <strong>Location Data:</strong> While generally not precise, your IP address
                may give us a general indication of your geographical location.
              </li>
            </ul>
          </li>
        </ul>

        <h2 className="privacy-subtitle">2. How We Use Your Information</h2>
        <p className="privacy-paragraph">
          We use the information we collect for various purposes, primarily to provide,
          maintain, and improve our services, and to communicate with you.
        </p>
        <ul className="privacy-list">
          <li>
            <strong>To Provide and Manage Services:</strong>
            <ul>
              <li>To process and fulfill your orders, including payment processing
                  and shipping.</li>
              <li>To manage your account and provide customer support.</li>
              <li>To send you transactional emails, such as order confirmations,
                  shipping updates, and password reset instructions.</li>
              <li>To personalize your experience on the Site by presenting products
                  and offers tailored to your interests.</li>
            </ul>
          </li>
          <li>
            <strong>To Improve Our Website and User Experience:</strong>
            <ul>
              <li>To analyze usage trends and diagnose technical problems.</li>
              <li>To understand how our users interact with the Site so we can
                  optimize its design, content, and functionality.</li>
              <li>To develop new features and services based on user feedback and behavior.</li>
            </ul>
          </li>
          <li>
            <strong>For Marketing and Communications:</strong>
            <ul>
              <li>To send you promotional materials, newsletters, and special offers
                  about our products and services, but ONLY if you have explicitly
                  opted-in to receive such communications. You can opt-out at any time.</li>
              <li>To inform you about important updates, changes to our services, or
                  policy changes.</li>
            </ul>
          </li>
          <li>
            <strong>For Security and Fraud Prevention:</strong>
            <ul>
              <li>To detect, prevent, and address technical issues, fraud, or other
                  illegal activities.</li>
              <li>To protect the security and integrity of our Site and our users.</li>
            </ul>
          </li>
          <li>
            <strong>To Comply with Legal Obligations:</strong>
            <ul>
              <li>To comply with applicable laws, regulations, legal processes, or
                  governmental requests.</li>
            </ul>
          </li>
        </ul>

        <h2 className="privacy-subtitle">3. Sharing Your Information</h2>
        <p className="privacy-paragraph">
          We are committed to maintaining your trust, and we do not sell, rent, or
          trade your personal information to third parties for their marketing purposes.
          We may share your information only in the following limited circumstances:
        </p>
        <ul className="privacy-list">
          <li>
            <strong>With Service Providers:</strong> We may share your information with
            trusted third-party service providers who perform functions on our behalf
            to operate our business. These include:
            <ul>
              <li>Payment processors (e.g., for secure transaction handling).</li>
              <li>Shipping and logistics companies (e.g., to deliver your orders).</li>
              <li>Website hosting and maintenance providers.</li>
              <li>Customer support and communication platforms.</li>
              <li>Marketing and analytics service providers.</li>
            </ul>
            These service providers are only granted access to the personal information
            they need to perform their specific functions and are obligated to maintain
            the confidentiality and security of your information.
          </li>
          <li>
            <strong>For Business Transfers:</strong> In the event of a merger, acquisition,
            reorganization, sale of assets, or bankruptcy, your personal information may
            be transferred as part of the transaction. We will notify you via email and/or a
            prominent notice on our Site of any such change in ownership or control of your
            personal information.
          </li>
          <li>
            <strong>For Legal Reasons:</strong> We may disclose your information if
            required to do so by law or in the good faith belief that such action is
            necessary to:
            <ul>
              <li>Comply with a legal obligation or valid court order.</li>
              <li>Protect and defend the rights or property of Yajveer Ayurvedic.</li>
              <li>Prevent or investigate possible wrongdoing in connection with the Service.</li>
              <li>Protect the personal safety of users of the Site or the public.</li>
              <li>Protect against legal liability.</li>
            </ul>
          </li>
          <li>
            <strong>With Your Consent:</strong> We may share your information with third
            parties when we have your explicit consent to do so.
          </li>
        </ul>

        <h2 className="privacy-subtitle">4. Cookies and Tracking Technologies</h2>
        <p className="privacy-paragraph">
          We use cookies and similar tracking technologies (like web beacons and pixels)
          to track activity on our Site and hold certain information.
        </p>
        <ul className="privacy-list">
          <li>
            <strong>What are Cookies?</strong> Cookies are small data files placed on your
            device (computer, tablet, or mobile phone) when you visit a website. They are
            widely used to make websites work more efficiently, as well as to provide
            reporting information and assist with personalization.
          </li>
          <li>
            <strong>How We Use Cookies:</strong> We use cookies for various purposes:
            <ul>
              <li>
                <strong>Strictly Necessary Cookies:</strong> Essential for the operation of
                our Site, enabling core functionalities like secure login, shopping cart,
                and payment processing.
              </li>
              <li>
                <strong>Performance and Functionality Cookies:</strong> Used to enhance
                the performance and functionality of our Site but are non-essential to its use.
                However, without these, certain functionality (like remembering your preferences)
                may become unavailable.
              </li>
              <li>
                <strong>Analytics and Customization Cookies:</strong> Collect information
                that is used either in aggregate form to help us understand how our Site is being
                used or how effective our marketing campaigns are, or to help us customize
                our Site for you.
              </li>
              <li>
                <strong>Advertising Cookies:</strong> Used to make advertising messages more
                relevant to you and your interests. They perform functions like preventing the
                same ad from continuously reappearing, ensuring that ads are properly displayed
                for advertisers, and in some cases, selecting advertisements that are based
                on your interests.
              </li>
            </ul>
          </li>
          <li>
            <strong>Your Choices Regarding Cookies:</strong> You have the option to accept
            or refuse cookies. Most web browsers automatically accept cookies, but you can
            usually modify your browser setting to decline cookies if you prefer. Please
            be aware that if you choose to disable cookies, some features of the Site may
            not function properly or may be less convenient for you.
          </li>
        </ul>

        <h2 className="privacy-subtitle">5. Data Security</h2>
        <p className="privacy-paragraph">
          We are committed to protecting the security of your personal information. We
          implement a variety of reasonable technical, administrative, and physical
          security measures designed to protect your information from unauthorized access,
          alteration, disclosure, or destruction. These measures include:
        </p>
        <ul className="privacy-list">
          <li>
            <strong>Encryption:</strong> We use Secure Socket Layer (SSL) technology
            to encrypt data transmission when you submit personal information through
            our forms.
          </li>
          <li>
            <strong>Access Controls:</strong> Access to your personal information is
            restricted to authorized employees and service providers who need the
            information to perform their job functions.
          </li>
          <li>
            <strong>Regular Audits:</strong> We regularly review our security practices
            and update them as necessary to stay current with evolving threats and
            best practices.
          </li>
          <li>
            <strong>Data Minimization:</strong> We only collect personal information
            that is relevant and necessary for the purposes for which it is processed.
          </li>
        </ul>
        <p className="privacy-paragraph">
          While we strive to use commercially acceptable means to protect your Personal
          Information, please remember that no method of transmission over the Internet
          or method of electronic storage is 100% secure. Therefore, we cannot guarantee
          its absolute security.
        </p>

        <h2 className="privacy-subtitle">6. Your Data Protection Rights</h2>
        <p className="privacy-paragraph">
          Depending on your location and applicable data protection laws, you may have
          certain rights regarding your personal information. These rights may include:
        </p>
        <ul className="privacy-list">
          <li>
            <strong>The Right to Access:</strong> You have the right to request copies
            of your personal data that we hold.
          </li>
          <li>
            <strong>The Right to Rectification:</strong> You have the right to request
            that we correct any information you believe is inaccurate or complete
            information you believe is incomplete.
          </li>
          <li>
            <strong>The Right to Erasure (Right to be Forgotten):</strong> You have the
            right to request that we erase your personal data, under certain conditions.
          </li>
          <li>
            <strong>The Right to Restrict Processing:</strong> You have the right to
            request that we restrict the processing of your personal data, under
            certain conditions.
          </li>
          <li>
            <strong>The Right to Object to Processing:</strong> You have the right to
            object to our processing of your personal data, under certain conditions.
          </li>
          <li>
            <strong>The Right to Data Portability:</strong> You have the right to request
            that we transfer the data that we have collected to another organization, or
            directly to you, under certain conditions.
          </li>
          <li>
            <strong>The Right to Withdraw Consent:</strong> If we are relying on your
            consent to process your personal information, you have the right to withdraw
            that consent at any time. This will not affect the lawfulness of any processing
            carried out before you withdraw your consent.
          </li>
        </ul>
        <p className="privacy-paragraph">
          To exercise any of these rights, or if you have any questions about your data
          rights, please contact us at:{" "}
          <a href="mailto:yajveerayurved@gmail.com">
            yajveerayurved@gmail.com
          </a>. We will respond to your request within a reasonable timeframe as required
          by applicable law.
        </p>

        <h2 className="privacy-subtitle">7. Third-Party Links</h2>
        <p className="privacy-paragraph">
          Our website may contain links to third-party websites, applications, or services
          that are not owned or controlled by Yajveer Ayurvedic. These links are provided
          for your convenience and information. We have no control over, and assume no
          responsibility for, the content, privacy policies, or practices of any third-party
          sites or services. We strongly advise you to review the Privacy Policy of every
          site you visit. The inclusion of any link does not imply endorsement by Yajveer
          Ayurvedic of the site or any association with its operators.
        </p>

        <h2 className="privacy-subtitle">8. Children’s Privacy</h2>
        <p className="privacy-paragraph">
          Our services are not intended for and do not address anyone under the age of 13
          (referred to as "Children"). We do not knowingly collect personally identifiable
          information from Children. If you are a parent or guardian and you are aware that
          your Child has provided us with Personal Information, please contact us immediately.
          If we become aware that we have collected Personal Information from a Child without
          verification of parental consent, we will take steps to remove that information
          from our servers.
        </p>

        <h2 className="privacy-subtitle">9. Changes to This Privacy Policy</h2>
        <p className="privacy-paragraph">
          We may update our Privacy Policy from time to time to reflect changes in our
          practices, legal requirements, or new technologies. We will notify you of any
          changes by posting the new Privacy Policy on this page and updating the "Effective Date"
          at the top of this Policy. We may also notify you via email and/or a prominent
          notice on our Site prior to the change becoming effective, especially for
          significant changes. You are advised to review this Privacy Policy periodically
          for any changes. Continued use of the Site or our services after the effective
          date of any revised Privacy Policy means you accept and agree to the terms of
          the updated Privacy Policy.
        </p>

        <h2 className="privacy-subtitle">10. Contact Us</h2>
        <p className="privacy-paragraph">
          If you have any questions or concerns about this Privacy Policy, our data practices,
          or wish to exercise your data protection rights, please do not hesitate to contact us:
        </p>
        <ul className="privacy-list">
          <li>
            <strong>By Email:</strong>{" "}
            <a href="mailto:yajveerayurved@gmail.com">
              yajveerayurved@gmail.com
            </a>
          </li>
          <li>
            <strong>By Visiting this page on our website:</strong>{" "}
            <a href="https://yajveer-cqp2.vercel.app/">
              https://yajveer-cqp2.vercel.app/
            </a>
          </li>
          <li>
            <strong>By Mail:</strong> 146 , M.G Dreams Near Bapasitaram chok , Kamrej , 394185
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
