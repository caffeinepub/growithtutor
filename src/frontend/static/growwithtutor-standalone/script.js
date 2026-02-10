// Editable Content Object
const CONTENT = {
  hero: {
    headline: "Transform Your Learning Journey with Expert Tutors",
    subheadline: "Personalized one-on-one tutoring for students from Class 1 to 12. Excel in every subject with Growithtutor.",
    ctaPrimary: "Get Started",
    ctaSecondary: "Join as Teacher"
  },
  valueProposition: {
    title: "Why Choose Growithtutor?",
    subtitle: "We provide comprehensive tutoring solutions tailored to your needs",
    values: [
      {
        title: "Expert Tutors",
        description: "Learn from qualified and experienced educators"
      },
      {
        title: "Personalized Learning",
        description: "Customized teaching methods for every student"
      },
      {
        title: "Flexible Scheduling",
        description: "Choose times that work best for you"
      },
      {
        title: "Proven Results",
        description: "Track record of academic excellence"
      }
    ]
  },
  services: {
    title: "Our Tutoring Services",
    subtitle: "Comprehensive support across all subjects",
    services: [
      {
        icon: "📐",
        title: "Mathematics",
        description: "From basic arithmetic to advanced calculus"
      },
      {
        icon: "🔬",
        title: "Science",
        description: "Physics, Chemistry, and Biology"
      },
      {
        icon: "📚",
        title: "Languages",
        description: "English, Hindi, and regional languages"
      },
      {
        icon: "🌍",
        title: "Social Studies",
        description: "History, Geography, and Civics"
      },
      {
        icon: "💻",
        title: "Computer Science",
        description: "Programming and digital literacy"
      },
      {
        icon: "📝",
        title: "Exam Preparation",
        description: "Board exams and competitive tests"
      }
    ]
  },
  howItWorks: {
    title: "How It Works",
    subtitle: "Get started in four simple steps",
    steps: [
      {
        number: "1",
        title: "Fill the Form",
        description: "Share your requirements and preferences"
      },
      {
        number: "2",
        title: "Get Matched",
        description: "We find the perfect tutor for you"
      },
      {
        number: "3",
        title: "Schedule Classes",
        description: "Choose convenient time slots"
      },
      {
        number: "4",
        title: "Start Learning",
        description: "Begin your journey to success"
      }
    ]
  },
  testimonials: {
    title: "What Our Students Say",
    subtitle: "Real experiences from our learning community",
    testimonials: [
      {
        rating: 5,
        content: "The personalized attention helped my daughter improve her math grades significantly!",
        author: "Priya Sharma",
        role: "Parent of Class 10 Student"
      },
      {
        rating: 5,
        content: "Excellent tutors who make learning fun and engaging. Highly recommended!",
        author: "Rahul Verma",
        role: "Class 12 Student"
      },
      {
        rating: 5,
        content: "Flexible scheduling and quality teaching. My son loves his science tutor!",
        author: "Anjali Patel",
        role: "Parent of Class 8 Student"
      },
      {
        rating: 5,
        content: "Thanks to Growithtutor, I scored 95% in my board exams!",
        author: "Sneha Reddy",
        role: "Class 10 Graduate"
      }
    ]
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Find answers to common questions",
    faqs: [
      {
        question: "What classes do you provide tutoring for?",
        answer: "We provide tutoring for students from Class 1 to Class 12 across all major boards including CBSE, ICSE, and State boards."
      },
      {
        question: "Are the tutors qualified?",
        answer: "Yes, all our tutors are qualified professionals with relevant teaching experience and subject expertise."
      },
      {
        question: "Do you offer online and offline classes?",
        answer: "Yes, we offer both online and offline tutoring options based on your preference and location."
      },
      {
        question: "How are the tutors matched with students?",
        answer: "We carefully match tutors based on the student's requirements, learning style, and the tutor's expertise."
      },
      {
        question: "What subjects do you cover?",
        answer: "We cover all major subjects including Mathematics, Science, Languages, Social Studies, and Computer Science."
      },
      {
        question: "Can I change my tutor if needed?",
        answer: "Yes, if you're not satisfied with your current tutor, we can arrange for a replacement."
      },
      {
        question: "What are your fees?",
        answer: "Our fees vary based on class, subject, and tutoring mode. Please contact us for detailed pricing."
      },
      {
        question: "Do you provide study materials?",
        answer: "Yes, our tutors provide relevant study materials and practice exercises as part of the tutoring program."
      }
    ]
  },
  contact: {
    title: "Get in Touch",
    subtitle: "Ready to start your learning journey? Contact us today!",
    whatsapp: "7011090796",
    phone: "9212374300"
  },
  footer: {
    about: "Growithtutor is dedicated to providing quality education through personalized tutoring services.",
    quickLinks: [
      { text: "Home", href: "#hero" },
      { text: "Services", href: "#services" },
      { text: "How It Works", href: "#how-it-works" },
      { text: "Contact", href: "#contact" }
    ],
    copyright: "© 2026 Growithtutor. All rights reserved."
  }
};

// Render Functions
function renderHero() {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;

  heroSection.innerHTML = `
    <div class="container">
      <div class="hero-content">
        <div>
          <h1 class="hero-headline">${CONTENT.hero.headline}</h1>
          <p class="hero-subheadline">${CONTENT.hero.subheadline}</p>
          <div class="hero-ctas">
            <a href="#contact" class="btn btn-primary">${CONTENT.hero.ctaPrimary}</a>
            <a href="#contact" class="btn btn-secondary">${CONTENT.hero.ctaSecondary}</a>
          </div>
        </div>
        <div>
          <img src="../../public/assets/generated/tutoring-hero.dim_1600x900.png" alt="Tutoring" class="hero-img">
        </div>
      </div>
    </div>
  `;
}

function renderValueProposition() {
  const section = document.getElementById('value-proposition');
  if (!section) return;

  const valuesHTML = CONTENT.valueProposition.values.map(value => `
    <div class="value-card">
      <h3>${value.title}</h3>
      <p>${value.description}</p>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="container">
      <h2 class="section-title">${CONTENT.valueProposition.title}</h2>
      <p class="section-subtitle">${CONTENT.valueProposition.subtitle}</p>
      <div class="value-grid">
        ${valuesHTML}
      </div>
      <div class="feature-image-container">
        <img src="../../public/assets/generated/online-learning.dim_1200x800.png" alt="Online Learning" class="feature-img">
      </div>
    </div>
  `;
}

function renderServices() {
  const section = document.getElementById('services');
  if (!section) return;

  const servicesHTML = CONTENT.services.services.map(service => `
    <div class="service-card">
      <span class="service-icon">${service.icon}</span>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="container">
      <h2 class="section-title">${CONTENT.services.title}</h2>
      <p class="section-subtitle">${CONTENT.services.subtitle}</p>
      <div class="services-grid">
        ${servicesHTML}
      </div>
    </div>
  `;
}

function renderHowItWorks() {
  const section = document.getElementById('how-it-works');
  if (!section) return;

  const stepsHTML = CONTENT.howItWorks.steps.map(step => `
    <div class="step-card">
      <div class="step-number">${step.number}</div>
      <h3>${step.title}</h3>
      <p>${step.description}</p>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="container">
      <h2 class="section-title">${CONTENT.howItWorks.title}</h2>
      <p class="section-subtitle">${CONTENT.howItWorks.subtitle}</p>
      <div class="steps-grid">
        ${stepsHTML}
      </div>
    </div>
  `;
}

function renderTestimonials() {
  const section = document.getElementById('testimonials');
  if (!section) return;

  const testimonialsHTML = CONTENT.testimonials.testimonials.map(testimonial => `
    <div class="testimonial-card">
      <div class="testimonial-rating">${'⭐'.repeat(testimonial.rating)}</div>
      <p class="testimonial-content">"${testimonial.content}"</p>
      <div class="testimonial-author">${testimonial.author}</div>
      <div class="testimonial-role">${testimonial.role}</div>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="container">
      <h2 class="section-title">${CONTENT.testimonials.title}</h2>
      <p class="section-subtitle">${CONTENT.testimonials.subtitle}</p>
      <div class="testimonials-grid">
        ${testimonialsHTML}
      </div>
    </div>
  `;
}

function renderFAQ() {
  const section = document.getElementById('faq');
  if (!section) return;

  const faqHTML = CONTENT.faq.faqs.map((faq, index) => `
    <div class="faq-item" data-faq-index="${index}">
      <div class="faq-question">
        <span>${faq.question}</span>
        <span class="faq-toggle">+</span>
      </div>
      <div class="faq-answer">
        <p>${faq.answer}</p>
      </div>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="container">
      <h2 class="section-title">${CONTENT.faq.title}</h2>
      <p class="section-subtitle">${CONTENT.faq.subtitle}</p>
      <div class="faq-list">
        ${faqHTML}
      </div>
    </div>
  `;
}

function renderContact() {
  const section = document.getElementById('contact');
  if (!section) return;

  // Strip non-digit characters for wa.me link
  const whatsappNumber = CONTENT.contact.whatsapp.replace(/\D/g, '');

  section.innerHTML = `
    <div class="container">
      <h2 class="section-title">${CONTENT.contact.title}</h2>
      <p class="section-subtitle">${CONTENT.contact.subtitle}</p>
      <div class="contact-content">
        <div class="contact-info">
          <div class="contact-info-item">
            <span class="contact-info-label">WhatsApp:</span>
            <span class="contact-info-value">${CONTENT.contact.whatsapp}</span>
          </div>
          <div class="contact-info-item">
            <span class="contact-info-label">Phone:</span>
            <span class="contact-info-value">${CONTENT.contact.phone}</span>
          </div>
          <a href="https://wa.me/${whatsappNumber}" class="btn btn-primary" style="margin-top: 1rem;">Contact via WhatsApp</a>
        </div>
        <form class="contact-form" id="contact-form">
          <div class="form-group">
            <label class="form-label" for="name">Name</label>
            <input type="text" id="name" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input type="email" id="email" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="message">Message</label>
            <textarea id="message" class="form-textarea" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-full">Send Message</button>
          <div class="form-success" id="form-success">
            Thank you! We'll get back to you soon.
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderFooter() {
  const footer = document.querySelector('.footer');
  if (!footer) return;

  const linksHTML = CONTENT.footer.quickLinks.map(link => `
    <li><a href="${link.href}">${link.text}</a></li>
  `).join('');

  footer.innerHTML = `
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>About Us</h3>
          <p>${CONTENT.footer.about}</p>
        </div>
        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul class="footer-links">
            ${linksHTML}
          </ul>
        </div>
        <div class="footer-section">
          <h3>Contact</h3>
          <p>WhatsApp: ${CONTENT.contact.whatsapp}</p>
          <p>Phone: ${CONTENT.contact.phone}</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>${CONTENT.footer.copyright}</p>
        <p>Built with ❤️ using <a href="https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}" target="_blank" rel="noopener noreferrer">caffeine.ai</a></p>
      </div>
    </div>
  `;
}

// Interactive Features
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');

  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', () => {
      nav.classList.toggle('mobile-active');
    });
  }
}

function initFAQ() {
  document.addEventListener('click', (e) => {
    const faqQuestion = e.target.closest('.faq-question');
    if (faqQuestion) {
      const faqItem = faqQuestion.closest('.faq-item');
      faqItem.classList.toggle('active');
    }
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success');

  if (form && successMessage) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      successMessage.style.display = 'block';

      setTimeout(() => {
        form.style.display = 'block';
        successMessage.style.display = 'none';
        form.reset();
      }, 3000);
    });
  }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  // Render all sections
  renderHero();
  renderValueProposition();
  renderServices();
  renderHowItWorks();
  renderTestimonials();
  renderFAQ();
  renderContact();
  renderFooter();

  // Initialize interactive features
  initSmoothScroll();
  initMobileMenu();
  initFAQ();
  initContactForm();
});
