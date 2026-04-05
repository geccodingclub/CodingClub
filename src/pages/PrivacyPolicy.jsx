import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen px-4 font-mono text-sm max-w-4xl mx-auto text-white/80">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-heading font-extrabold text-white mb-8 tracking-tight">Privacy Policy</h1>
        
        <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">1. Introduction</h2>
          <p className="leading-relaxed mb-4">
            Welcome to CORTEX, the premier student developer community at GEC Bhojpur. 
            We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data 
            when you visit our website and tell you about your privacy rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">2. Data We Collect</h2>
          <p className="leading-relaxed mb-4">
            When you use our application, including logging in via Google OAuth, we may collect the following information:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>Identity Data:</strong> includes your name, profile picture, and Google ID (if authenticating via Google).</li>
            <li><strong>Contact Data:</strong> includes your email address.</li>
            <li><strong>Profile Data:</strong> includes your roll number, department, year of study, and contact number.</li>
            <li><strong>Technical Data:</strong> includes your internet protocol (IP) address, browser type and version, and other technology on the devices you use to access this website.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">3. How We Use Your Data</h2>
          <p className="leading-relaxed mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul className="list-disc pl-6 space-y-3">
            <li>To register you as a new user and manage your account.</li>
            <li>To communicate with you about community events, notices, and updates.</li>
            <li>To verify your identity within our community (e.g., student verification).</li>
            <li>To display your profile on the community leaderboard or members page.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">4. Google OAuth Integration</h2>
          <p className="leading-relaxed mb-4">
            If you choose to log in using Google OAuth, we will receive your name, email address, and profile picture from Google. 
            We use this information strictly to create your account, identify you on our platform, and pre-fill your profile details. 
            We do not share this data with third parties unless required by law. 
            Our use of information received from Google APIs will adhere to the Google API Services User Data Policy, 
            including the Limited Use requirements.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">5. Data Security</h2>
          <p className="leading-relaxed mb-4">
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorised way, altered, or disclosed.
            We limit access to your personal data to those core team members who have a need to know.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">6. Your Rights</h2>
          <p className="leading-relaxed mb-4">
            You have the right to request access to, correction of, or deletion of your personal data. 
            If you wish to delete your account or any associated data, please contact us using the email below.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">7. Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:geccodingclub@gmail.com" className="text-primary hover:text-white transition-colors">geccodingclub@gmail.com</a>
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
