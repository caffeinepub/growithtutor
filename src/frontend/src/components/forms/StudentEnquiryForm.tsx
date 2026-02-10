import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { subjects, classes, boards, languages, modes, contactNumbers, optionalContactInfo } from '../../content/siteContent';
import { generateStudentWhatsAppMessage, generateStudentEmailContent, getWhatsAppLink, getPhoneLink, getSMSLink, openEmailCompose } from '../../lib/whatsapp';
import { MessageCircle, Phone, CheckCircle, MessageSquare, Mail } from 'lucide-react';

export default function StudentEnquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subjects: [] as string[],
    class: '',
    board: '',
    language: '',
    mode: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubjectToggle = (subject: string) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim() || formData.subjects.length === 0 || !formData.class || !formData.board || !formData.language || !formData.mode) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    const whatsappMessage = generateStudentWhatsAppMessage(formData);
    const whatsappLink = getWhatsAppLink(whatsappMessage);
    const smsMessage = generateStudentWhatsAppMessage(formData);
    const smsLink = getSMSLink(smsMessage, contactNumbers.phone1);
    const emailContent = generateStudentEmailContent(formData);

    const handleEmailClick = () => {
      openEmailCompose(optionalContactInfo.email, emailContent.subject, emailContent.body);
    };

    return (
      <Card className="border-primary">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Thank You!</CardTitle>
          <CardDescription>
            Your enquiry has been received. Please contact us via WhatsApp, SMS, email, or phone to complete your registration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Your Details:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li><strong>Name:</strong> {formData.name}</li>
              <li><strong>Phone:</strong> {formData.phone}</li>
              <li><strong>Class:</strong> {formData.class}</li>
              <li><strong>Board:</strong> {formData.board}</li>
              <li><strong>Subjects:</strong> {formData.subjects.join(', ')}</li>
              <li><strong>Language:</strong> {formData.language}</li>
              <li><strong>Mode:</strong> {formData.mode}</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full"
              size="lg"
              onClick={() => window.open(whatsappLink, '_blank')}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Continue on WhatsApp
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => window.open(smsLink, '_self')}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Send SMS
              </Button>
              {optionalContactInfo.email && (
                <Button
                  variant="outline"
                  onClick={handleEmailClick}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              )}
            </div>

            <div className="text-center text-sm text-muted-foreground">or call us directly</div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => window.open(getPhoneLink(contactNumbers.phone1), '_self')}
              >
                <Phone className="h-4 w-4 mr-2" />
                {contactNumbers.phone1}
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(getPhoneLink(contactNumbers.phone2), '_self')}
              >
                <Phone className="h-4 w-4 mr-2" />
                {contactNumbers.phone2}
              </Button>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                phone: '',
                subjects: [],
                class: '',
                board: '',
                language: '',
                mode: '',
                message: '',
              });
            }}
          >
            Submit Another Enquiry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Information</CardTitle>
        <CardDescription>
          Please provide your details and we'll match you with the perfect tutor.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="class">Class *</Label>
              <Select value={formData.class} onValueChange={(value) => setFormData({ ...formData, class: value })}>
                <SelectTrigger id="class">
                  <SelectValue placeholder="Select your class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="board">Board *</Label>
              <Select value={formData.board} onValueChange={(value) => setFormData({ ...formData, board: value })}>
                <SelectTrigger id="board">
                  <SelectValue placeholder="Select your board" />
                </SelectTrigger>
                <SelectContent>
                  {boards.map((board) => (
                    <SelectItem key={board} value={board}>
                      {board}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Subjects * (Select one or more)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border rounded-lg">
              {subjects.map((subject) => (
                <div key={subject} className="flex items-center space-x-2">
                  <Checkbox
                    id={`subject-${subject}`}
                    checked={formData.subjects.includes(subject)}
                    onCheckedChange={() => handleSubjectToggle(subject)}
                  />
                  <Label
                    htmlFor={`subject-${subject}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {subject}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Preferred Language *</Label>
              <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mode">Preferred Mode *</Label>
              <Select value={formData.mode} onValueChange={(value) => setFormData({ ...formData, mode: value })}>
                <SelectTrigger id="mode">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  {modes.map((mode) => (
                    <SelectItem key={mode} value={mode}>
                      {mode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Message (Optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Any specific requirements or questions?"
              rows={4}
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            Submit Enquiry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
