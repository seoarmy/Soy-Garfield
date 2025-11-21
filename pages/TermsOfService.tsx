import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Terms of Service</h1>
          <p className="text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-garfield-600 prose-a:no-underline hover:prose-a:underline">
          <p className="lead">
            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the SoyGarfield website (the "Service") operated by SoyGarfield ("us", "we", or "our").
          </p>
          <p>
            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>

          <h2>1. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of SoyGarfield and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
          </p>

          <h2>2. Links To Other Web Sites</h2>
          <p>
            Our Service may contain links to third-party web sites or services that are not owned or controlled by SoyGarfield.
          </p>
          <p>
            SoyGarfield has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that SoyGarfield shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
          </p>

          <h2>3. User Conduct</h2>
          <p>
            You agree not to use the website for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the website in any way that could damage the website, the services, or the general business of SoyGarfield.
          </p>
          <ul>
            <li>You must not harass, abuse, or threaten others or otherwise violate any person's legal rights.</li>
            <li>You must not violate any intellectual property rights of the website or any third party.</li>
            <li>You must not upload or otherwise disseminate any computer viruses or other software that may damage the property of another.</li>
          </ul>

          <h2>4. Disclaimer</h2>
          <p>
            Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            In no event shall SoyGarfield, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>

          <h2>6. Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at <a href="mailto:hello@soygarfield.com">hello@soygarfield.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;