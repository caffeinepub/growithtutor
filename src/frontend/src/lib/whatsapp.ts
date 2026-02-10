import { contactNumbers } from '../content/siteContent';

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

export function getPhoneLink(phoneNumber: string): string {
  return `tel:${phoneNumber.replace(/\D/g, '')}`;
}
