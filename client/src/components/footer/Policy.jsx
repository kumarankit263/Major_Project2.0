import React from "react";

const Policy = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p>
        Your privacy is important to us. This policy explains how we collect, use, and safeguard your information.
      </p>

      <h2 className="text-xl font-semibold mt-4">1. Information We Collect</h2>
      <p>
        We collect the following types of information:
      </p>
      <ul className="list-disc pl-6">
        <li><strong>Personal Information:</strong> Name, email address, contact details, and profile information.</li>
        <li><strong>Usage Data:</strong> Pages visited, time spent on our site, and interactions with our services.</li>
        <li><strong>Cookies & Tracking Data:</strong> We may use cookies and similar tracking technologies to enhance user experience.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">2. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul className="list-disc pl-6">
        <li>Improve our services and user experience.</li>
        <li>Personalize content and recommendations.</li>
        <li>Ensure security and prevent fraudulent activities.</li>
        <li>Send updates, promotional content, and service-related notifications.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">3. Data Security</h2>
      <p>
        We take appropriate security measures to protect your data from unauthorized access, alteration, or disclosure.
      </p>

      <h2 className="text-xl font-semibold mt-4">4. Sharing of Information</h2>
      <p>
        We do not sell or share your personal data with third parties, except in the following cases:
      </p>
      <ul className="list-disc pl-6">
        <li>To comply with legal obligations.</li>
        <li>To enforce our policies or protect our rights.</li>
        <li>With trusted service providers who assist in operating our platform.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">5. Your Rights</h2>
      <p>As a user, you have the following rights:</p>
      <ul className="list-disc pl-6">
        <li>Access and review the personal data we hold about you.</li>
        <li>Request correction or deletion of your information.</li>
        <li>Opt out of marketing communications.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">6. Cookies & Tracking Technologies</h2>
      <p>
        We use cookies to enhance your experience. You can control cookie settings through your browser preferences.
      </p>

      <h2 className="text-xl font-semibold mt-4">7. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
      </p>

      <h2 className="text-xl font-semibold mt-4">8. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please contact us at <strong>support@example.com</strong>.
      </p>
    </div>
  );
};

export default Policy;
