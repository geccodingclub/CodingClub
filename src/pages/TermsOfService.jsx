import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen px-4 font-mono text-sm max-w-4xl mx-auto text-white/80">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-heading font-extrabold text-white mb-8 tracking-tight">Terms of Service</h1>
        
        <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">1. Acceptance of Terms</h2>
          <p className="leading-relaxed mb-4">
            By accessing and using the CORTEX web application and platform, you agree to be bound by these Terms of Service. 
            If you do not agree with any part of these terms, you must not use our platform or services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">2. Description of Service</h2>
          <p className="leading-relaxed mb-4">
            CORTEX is a student developer community at GEC Bhojpur. The platform provides members with access to notices, 
            events registration, resources, coding leaderboards, and an internal directory. We reserve the right to 
            modify, suspend, or discontinue any aspect of our service at any time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">3. User Accounts</h2>
          <p className="leading-relaxed mb-4">
            To use certain features, you must register for an account using your Google account or a traditional email and password.
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>You are responsible for safeguarding your account credentials.</li>
            <li>You must provide accurate, current, and complete information, particularly regarding your student details (roll number, department, year).</li>
            <li>Any unauthorized use of your account should be reported immediately.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">4. Code of Conduct</h2>
          <p className="leading-relaxed mb-4">
            Users must behave professionally and respectfully within the platform. Any of the following behaviors may result in immediate suspension or termination of your account:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>Submitting false information regarding your academic records or identity.</li>
            <li>Attempting to hack, disrupt, or exploit the platform or its users.</li>
            <li>Posting or sharing abusive, discriminatory, or inappropriate content on community boards or profiles.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">5. Intellectual Property</h2>
          <p className="leading-relaxed mb-4">
            All the original content on this platform, including designs, text, graphics, and logos, is the property of CORTEX and may not be used, distributed, reproduced, or copied without prior permission. User-generated content remains the property of the user, however, you grant CORTEX a license to use and display it publicly on the platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">6. Limitation of Liability</h2>
          <p className="leading-relaxed mb-4">
            CORTEX makes no guarantees regarding the continuous availability or reliability of the platform. We shall not be held liable for any damages, academic losses, data loss, or other indirect damages arising from the use of the platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">7. Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions or concerns about these Terms of Service, please contact us at: <a href="mailto:geccodingclub@gmail.com" className="text-primary hover:text-white transition-colors">geccodingclub@gmail.com</a>
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default TermsOfService;
