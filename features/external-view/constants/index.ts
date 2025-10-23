// Pages Array
export const PAGES = [
  "Home",
  "About Us",
  "Services",
  "Partner Institution",
  "Enquiry Form",
  "Contact Us",
];

// Services Array
export const SERVICES = [
  "Business Visa",
  "Student Visa",
  "Work visa",
  "Tourist visa",
  "Canada Visa",
  "UK Visa",
  "Germany Visa",
  "Scotland Visa",
  "Japan Visa",
];

// Services Snippets for Homepage
export const SERVICES_SNIPPET = [
  {
    link: "/services/student-visa",
    title: "Student Visa",
    description:
      "Expert guidance for international students pursuing academic dreams worldwide.",
  },
  {
    link: "/services/work-visa",
    title: "Work Visa",
    description:
      "Professional support for securing employment visas and work permits globally.",
  },
  {
    link: "/services/business-visa",
    title: "Business Visa",
    description:
      "Streamlined business visa applications for entrepreneurs and corporate travelers.",
  },
  {
    link: "/services/tourist-visa",
    title: "Tourist Visa",
    description:
      "Hassle-free tourist visa services for your perfect vacation abroad.",
  },
];

// Testimonials Array
export const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    position: "International Student, UK",
    testimonialText:
      "Vignettes made my student visa process seamless. Got my UK visa approved in three weeks!",
  },
  {
    name: "Michael Okonkwo",
    position: "Software Engineer, Canada",
    testimonialText:
      "Professional and efficient service. They guided me through every step of my work permit application.",
  },
  {
    name: "Amara Ibrahim",
    position: "Business Owner, Germany",
    testimonialText:
      "Excellent support for my business visa. Their expertise saved me time and unnecessary stress.",
  },
  {
    name: "David Thompson",
    position: "Graduate Student, USA",
    testimonialText:
      "The digital form system was incredibly easy to use. Highly recommend for student visa applications.",
  },
  {
    name: "Chioma Eze",
    position: "Medical Professional, Australia",
    testimonialText:
      "Outstanding service! They handled all my documents perfectly and kept me updated throughout the process.",
  },
  {
    name: "James Rodriguez",
    position: "Tourist Traveler",
    testimonialText:
      "Quick and hassle-free tourist visa approval. Made my European vacation planning so much easier!",
  },
  {
    name: "Fatima Al-Mansour",
    position: "Research Scholar, Scotland",
    testimonialText:
      "Their expert guidance was invaluable. Got my research visa approved without any complications whatsoever.",
  },
  {
    name: "Benjamin Adeyemi",
    position: "Entrepreneur, Japan",
    testimonialText:
      "Vignettes simplified the complex visa process. Professional team with exceptional attention to detail throughout.",
  },
];

export const VISA_TYPES = [
  {
    country: "United States",
    visaTypes:
      "Tourist visa, Work visa, Student visa, Business visa, Transit visa",
  },
  {
    country: "Canada",
    visaTypes:
      "Work visa, Student visa, Visitor visa, Family visa, Business visa",
  },
  {
    country: "Scotland",
    visaTypes:
      "Student visa, Tourist visa, Family visa, Work visa, Transit visa",
  },
  {
    country: "France",
    visaTypes:
      "Business visa, Tourist visa, Investment visa, Student visa, Work visa",
  },
  {
    country: "Turkey",
    visaTypes:
      "Tourist visa, Business visa, Work visa, Transit visa, Student visa",
  },
  {
    country: "Australia",
    visaTypes:
      "Work visa, Tourist visa, Student visa, Business visa, Investor visa",
  },
];

const navigation = {
  menuItems: [
    {
      text: "Home",
      href: "/home",
      link: "/home",
    },
    {
      text: "About Us",
      href: "/about-us",
      link: "/about-us",
    },
    {
      text: "Partner Institution",
      href: "/partner-institution",
      link: "/partner-institution",
    },
    {
      text: "Enquiry Form",
      href: "/enquiry-form",
      link: "/enquiry-form",
    },
    {
      text: "Contact Us",
      href: "/contact-us",
      link: "/contact-us",
    },
    {
      text: "Services",
      href: "/services",
      link: "/services",
      hasDropdown: true,
      children: [
        {
          text: "Canada Visa",
          href: "/services",
          link: "/services",
        },
        {
          text: "UK Visa",
          href: "/services",
          link: "/services",
        },
        {
          text: "Germany Visa",
          href: "/services",
          link: "/services",
        },
        {
          text: "Scotland Visa",
          href: "/services",
          link: "/services",
        },
        {
          text: "Japan Visa",
          href: "/services",
          link: "/services",
        },
      ],
    },
    {
      text: "Assessments",
      href: "/assessments",
      link: "/assessments",
      hasDropdown: true,
      children: [
        {
          text: "UK Global Talent Visa",
          href: "/assessments/uk-global-talent",
          link: "/assessments/uk-global-talent",
        },
        {
          text: "EB-2 NIW",
          href: "/assessments/eb2-niw",
          link: "/assessments/eb2-niw",
        },
        {
          text: "EB-1A",
          href: "/assessments/eb1a",
          link: "/assessments/eb1a",
        },
      ],
    },
  ],

  // Footer navigation sections
};
