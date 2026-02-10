import { usePageMeta } from '../hooks/usePageMeta';
import TeacherEnquiryForm from '../components/forms/TeacherEnquiryForm';

export default function TeacherFormPage() {
  usePageMeta({
    title: 'Teacher Registration Form',
    description: 'Join our team of expert tutors. Share your experience, subjects, and teaching preferences.',
  });

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Teacher Registration Form</h1>
          <p className="text-lg text-muted-foreground">
            Join our team of experienced educators and help students achieve their academic goals.
          </p>
        </div>
        <TeacherEnquiryForm />
      </div>
    </div>
  );
}
