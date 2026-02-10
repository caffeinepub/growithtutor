import { contactNumbers, optionalContactInfo } from '../content/siteContent';

interface StudentFormData {
  name: string;
  phone: string;
  subjects: string[];
  class: string;
  board: string;
  language: string;
  mode: string;
  message?: string;
}

interface TeacherFormData {
  name: string;
  phone: string;
  experience: string;
  subjects: string[];
  classes: string[];
  boards: string[];
  languages: string[];
  modes: string[];
  message?: string;
}

// Generic WhatsApp contact prefill message (used for all generic contact CTAs)
export const GENERIC_WHATSAPP_MESSAGE = 'Hello, I am interested in tuition services. Please share course details, fees, and demo class information.';

export function generateStudentWhatsAppMessage(data: StudentFormData): string {
  const message = `Hello! I'm interested in tutoring services.

*Student Details:*
Name: ${data.name}
Phone: ${data.phone}
Class: ${data.class}
Board: ${data.board}
Subjects: ${data.subjects.join(', ')}
Language: ${data.language}
Mode: ${data.mode}
${data.message ? `\nAdditional Message: ${data.message}` : ''}

Please contact me to discuss further.`;

  return message;
}

export function generateTeacherWhatsAppMessage(data: TeacherFormData): string {
  const message = `Hello! I'm interested in joining as a tutor.

*Tutor Details:*
Name: ${data.name}
Phone: ${data.phone}
Experience: ${data.experience}
Subjects: ${data.subjects.join(', ')}
Classes: ${data.classes.join(', ')}
Boards: ${data.boards.join(', ')}
Languages: ${data.languages.join(', ')}
Modes: ${data.modes.join(', ')}
${data.message ? `\nAdditional Message: ${data.message}` : ''}

Please contact me to discuss opportunities.`;

  return message;
}

export function getWhatsAppLink(message: string, phoneNumber: string = contactNumbers.whatsapp): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
}

export function getGenericWhatsAppLink(phoneNumber: string = contactNumbers.whatsapp): string {
  return getWhatsAppLink(GENERIC_WHATSAPP_MESSAGE, phoneNumber);
}

export function getPhoneLink(phoneNumber: string): string {
  return `tel:${phoneNumber.replace(/\D/g, '')}`;
}

// SMS link helpers
export function getSMSLink(message: string, phoneNumber: string = contactNumbers.phone1): string {
  const encodedMessage = encodeURIComponent(message);
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  return `sms:${cleanNumber}${message ? `?body=${encodedMessage}` : ''}`;
}

export function getGenericSMSLink(phoneNumber: string = contactNumbers.phone1): string {
  return getSMSLink(GENERIC_WHATSAPP_MESSAGE, phoneNumber);
}

// Email link helpers
export function getEmailLink(subject: string, body: string, email: string = optionalContactInfo.email): string {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  return `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
}

export function getGenericEmailLink(email: string = optionalContactInfo.email): string {
  return getEmailLink(
    'Enquiry about Tuition Services',
    GENERIC_WHATSAPP_MESSAGE
  );
}

// Gmail compose link helper
export function getGmailComposeLink(to: string, subject: string = '', body: string = ''): string {
  const params = new URLSearchParams();
  params.append('to', to);
  if (subject) params.append('su', subject);
  if (body) params.append('body', body);
  return `https://mail.google.com/mail/?view=cm&fs=1&${params.toString()}`;
}

// Open Gmail compose with fallback to mailto
export function openEmailCompose(to: string, subject: string = '', body: string = ''): void {
  const gmailLink = getGmailComposeLink(to, subject, body);
  const mailtoLink = getEmailLink(subject, body, to);
  
  // Try to open Gmail compose
  const gmailWindow = window.open(gmailLink, '_blank');
  
  // If popup was blocked or failed, fall back to mailto
  if (!gmailWindow || gmailWindow.closed || typeof gmailWindow.closed === 'undefined') {
    window.location.href = mailtoLink;
  }
}

export function generateStudentEmailContent(data: StudentFormData): { subject: string; body: string } {
  const subject = `Student Enquiry - ${data.name}`;
  const body = `Hello,

I'm interested in tutoring services.

Student Details:
Name: ${data.name}
Phone: ${data.phone}
Class: ${data.class}
Board: ${data.board}
Subjects: ${data.subjects.join(', ')}
Language: ${data.language}
Mode: ${data.mode}
${data.message ? `\nAdditional Message: ${data.message}` : ''}

Please contact me to discuss further.

Best regards,
${data.name}`;

  return { subject, body };
}

export function generateTeacherEmailContent(data: TeacherFormData): { subject: string; body: string } {
  const subject = `Teacher Application - ${data.name}`;
  const body = `Hello,

I'm interested in joining as a tutor.

Tutor Details:
Name: ${data.name}
Phone: ${data.phone}
Experience: ${data.experience}
Subjects: ${data.subjects.join(', ')}
Classes: ${data.classes.join(', ')}
Boards: ${data.boards.join(', ')}
Languages: ${data.languages.join(', ')}
Modes: ${data.modes.join(', ')}
${data.message ? `\nAdditional Message: ${data.message}` : ''}

Please contact me to discuss opportunities.

Best regards,
${data.name}`;

  return { subject, body };
}
