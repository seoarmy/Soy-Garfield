import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Privacy Policy</h1>
          <p className="text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-garfield-600 prose-a:no-underline hover:prose-a:underline">
          <p className="lead">
            At SoyGarfield ("we," "us," or "our"), we respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul>
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes email address and telephone number (if provided via forms).</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
            <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul>
            <li>To provide you with the content you have requested (e.g., newsletters).</li>
            <li>To improve our website, products/services, marketing, and customer relationships.</li>
            <li>To comply with a legal or regulatory obligation.</li>
          </ul>

          <h2>3. Cookies and Tracking Technologies</h2>
          <p>
            Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.
          </p>
          <p>
            We may use third-party analytics tools, such as Google Analytics, to help us measure traffic and usage trends. These tools collect information sent by your device or our Service, including the web pages you visit, add-ons, and other information that assists us in improving the Service.
          </p>

          <h2>4. Third-Party Links</h2>
          <p>
            This website may include links to third-party websites, plug-ins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
          </p>

          <h2>5. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at <a href="mailto:hello@soygarfield.com">hello@soygarfield.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;