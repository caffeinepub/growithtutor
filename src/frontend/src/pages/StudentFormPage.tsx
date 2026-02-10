import { usePageMeta } from '../hooks/usePageMeta';
import StudentEnquiryForm from '../components/forms/StudentEnquiryForm';

export default function StudentFormPage() {
  usePageMeta({
    title: 'Student Enquiry Form',
    description: 'Register for personalized tutoring services. Select your subjects, class, board, and preferred learning mode.',
  });

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Student Enquiry Form</h1>
          <p className="text-lg text-muted-foreground">
            Fill out the form below and we'll connect you with the perfect tutor for your needs.
          </p>
        </div>
        <StudentEnquiryForm />
      </div>
    </div>
  );
}
