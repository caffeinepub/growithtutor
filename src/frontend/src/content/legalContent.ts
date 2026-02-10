import { SITE_NAME } from '../config/siteConfig';

export const legalContent = {
  title: 'Terms & Conditions',
  lastUpdated: 'February 9, 2026',
  sections: [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing and using ${SITE_NAME}'s services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.`,
    },
    {
      title: '2. Services Provided',
      content: `${SITE_NAME} provides educational tutoring services both online and offline. We connect students with qualified tutors for various subjects and classes. The specific terms of each tutoring arrangement will be communicated separately.`,
    },
    {
      title: '3. Registration and Enrollment',
      content: 'To use our services, you may be required to provide accurate and complete information about yourself and/or your child. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.',
    },
    {
      title: '4. Payment Terms',
      content: 'Payment terms, including fees, payment schedules, and refund policies, will be communicated to you before enrollment. All fees must be paid as per the agreed schedule. Late payments may result in suspension of services.',
    },
    {
      title: '5. Cancellation and Rescheduling',
      content: 'Classes can be rescheduled with advance notice as per our rescheduling policy. Cancellations must be made within the specified timeframe to be eligible for refunds or credits. Please contact us for specific cancellation terms.',
    },
    {
      title: '6. Code of Conduct',
      content: 'All students and tutors are expected to maintain professional and respectful behavior during sessions. Any form of harassment, discrimination, or inappropriate conduct will not be tolerated and may result in immediate termination of services.',
    },
    {
      title: '7. Intellectual Property',
      content: 'All study materials, content, and resources provided by our tutors remain the intellectual property of the respective creators. These materials are for personal educational use only and may not be reproduced or distributed without permission.',
    },
    {
      title: '8. Privacy and Data Protection',
      content: 'We are committed to protecting your privacy. Personal information collected during registration and service delivery will be used solely for providing tutoring services and will not be shared with third parties without your consent, except as required by law.',
    },
    {
      title: '9. Limitation of Liability',
      content: `${SITE_NAME} strives to provide quality educational services but cannot guarantee specific academic outcomes. We are not liable for any indirect, incidental, or consequential damages arising from the use of our services.`,
    },
    {
      title: '10. Modifications to Terms',
      content: 'We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting on our website. Continued use of our services after changes constitutes acceptance of the modified terms.',
    },
    {
      title: '11. Contact Information',
      content: 'For questions about these terms and conditions or our services, please contact us through the contact information provided on our website.',
    },
  ],
};

// Backward compatibility export
export const termsAndConditions = legalContent;
