import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { subjects, classes, boards, languages, modes, contactNumbers } from '../../content/siteContent';
import { generateTeacherWhatsAppMessage, getWhatsAppLink, getPhoneLink } from '../../lib/whatsapp';
import { MessageCircle, Phone, CheckCircle } from 'lucide-react';

export default function TeacherEnquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    experience: '',
    subjects: [] as string[],
    classes: [] as string[],
    boards: [] as string[],
    languages: [] as string[],
    modes: [] as string[],
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleArrayToggle = (field: 'subjects' | 'classes' | 'boards' | 'languages' | 'modes', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.experience.trim() ||
      formData.subjects.length === 0 ||
      formData.classes.length === 0 ||
      formData.boards.length === 0 ||
      formData.languages.length === 0 ||
      formData.modes.length === 0
    ) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    const whatsappMessage = generateTeacherWhatsAppMessage(formData);
    const whatsappLink = getWhatsAppLink(whatsappMessage);

    return (
      <Card className="border-primary">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Thank You!</CardTitle>
          <CardDescription>
            Your application has been received. Please contact us via WhatsApp or phone to discuss opportunities.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Your Details:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li><strong>Name:</strong> {formData.name}</li>
              <li><strong>Phone:</strong> {formData.phone}</li>
              <li><strong>Experience:</strong> {formData.experience}</li>
              <li><strong>Subjects:</strong> {formData.subjects.join(', ')}</li>
              <li><strong>Classes:</strong> {formData.classes.join(', ')}</li>
              <li><strong>Boards:</strong> {formData.boards.join(', ')}</li>
              <li><strong>Languages:</strong> {formData.languages.join(', ')}</li>
              <li><strong>Modes:</strong> {formData.modes.join(', ')}</li>
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
                experience: '',
                subjects: [],
                classes: [],
                boards: [],
                languages: [],
                modes: [],
                message: '',
              });
            }}
          >
            Submit Another Application
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Teacher Information</CardTitle>
        <CardDescription>
          Please provide your details and teaching preferences to join our team.
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

          <div className="space-y-2">
            <Label htmlFor="experience">Teaching Experience *</Label>
            <Input
              id="experience"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              placeholder="e.g., 5 years teaching Mathematics"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Subjects You Can Teach * (Select one or more)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border rounded-lg max-h-60 overflow-y-auto">
              {subjects.map((subject) => (
                <div key={subject} className="flex items-center space-x-2">
                  <Checkbox
                    id={`subject-${subject}`}
                    checked={formData.subjects.includes(subject)}
                    onCheckedChange={() => handleArrayToggle('subjects', subject)}
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

          <div className="space-y-2">
            <Label>Classes/Levels * (Select one or more)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border rounded-lg max-h-60 overflow-y-auto">
              {classes.map((cls) => (
                <div key={cls} className="flex items-center space-x-2">
                  <Checkbox
                    id={`class-${cls}`}
                    checked={formData.classes.includes(cls)}
                    onCheckedChange={() => handleArrayToggle('classes', cls)}
                  />
                  <Label
                    htmlFor={`class-${cls}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {cls}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Boards * (Select one or more)</Label>
            <div className="grid grid-cols-2 gap-3 p-4 border rounded-lg">
              {boards.map((board) => (
                <div key={board} className="flex items-center space-x-2">
                  <Checkbox
                    id={`board-${board}`}
                    checked={formData.boards.includes(board)}
                    onCheckedChange={() => handleArrayToggle('boards', board)}
                  />
                  <Label
                    htmlFor={`board-${board}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {board}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Languages * (Select one or more)</Label>
            <div className="grid grid-cols-2 gap-3 p-4 border rounded-lg">
              {languages.map((lang) => (
                <div key={lang} className="flex items-center space-x-2">
                  <Checkbox
                    id={`lang-${lang}`}
                    checked={formData.languages.includes(lang)}
                    onCheckedChange={() => handleArrayToggle('languages', lang)}
                  />
                  <Label
                    htmlFor={`lang-${lang}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {lang}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Teaching Mode * (Select one or more)</Label>
            <div className="grid grid-cols-2 gap-3 p-4 border rounded-lg">
              {modes.map((mode) => (
                <div key={mode} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mode-${mode}`}
                    checked={formData.modes.includes(mode)}
                    onCheckedChange={() => handleArrayToggle('modes', mode)}
                  />
                  <Label
                    htmlFor={`mode-${mode}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {mode}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Information (Optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us more about your teaching experience and approach..."
              rows={4}
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            Submit Application
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
