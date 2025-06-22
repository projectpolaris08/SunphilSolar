import React from "react";
import { Helmet } from "react-helmet";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Privacy Policy | Sunphil Solar</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-secondary-600 mb-4">Last Updated: April 27, 2025</p>

        <p className="mb-6">
          This Privacy Policy explains how Sunphil Solar Installation Services
          ("we," "us") collects, uses, and protects your personal information
          when you use our services, including our website
          (https://sunphilsolar.com) and solar installation services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          1. Information We Collect
        </h2>
        <p>We collect:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>Contact details (names, phone numbers, email addresses)</li>
          <li>Device and usage data (IP address, browser type, location)</li>
          <li>Commercial information (transaction history)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          2. How We Use Your Information
        </h2>
        <p>We process your information to:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>Provide and maintain our services</li>
          <li>Communicate with you</li>
          <li>Improve user experience</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          3. Sharing of Information
        </h2>
        <p>We may share your information with:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>Service providers (for business operations)</li>
          <li>Legal authorities (when required by law)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
        <p className="mb-6">
          We implement security measures to protect your data, though no system
          is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights</h2>
        <p>Depending on your location, you may have rights to:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>Access your personal data</li>
          <li>Request correction or deletion</li>
          <li>Opt-out of marketing communications</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          6. Cookies and Tracking
        </h2>
        <p className="mb-6">
          We use cookies for basic site functions. You can manage cookie
          preferences in your browser settings.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Data Retention</h2>
        <p className="mb-6">
          We retain personal information as needed for business purposes or as
          required by law (typically 6 months to 1 year).
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Policy Updates</h2>
        <p className="mb-6">
          We may update this policy periodically. The "Last Updated" date will
          reflect changes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
        <p className="mb-2">For questions or to exercise your rights:</p>
        <p className="mb-1">Email: sunphilsolar@sunphilsolar.com</p>
        <p className="mb-6">
          Address: 28C, North Fairview Phase 8 Subdivision, Quezon City, Metro
          Manila 1121, Philippines
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
