// Pages Array
export const PAGES = [
  "About Us",
  "Services",
  "Partner Institutions",
  "Assessments",
  "Contact",
];

// Services Array
export const SERVICES = [
  "Business Plans and Travels",
  "Study Abroad",
  "Global Talent Mobility",
  "Tourism",
];

// Services Snippets for Homepage
export const SERVICES_SNIPPET = [
  {
    link: "/services/student-visa",
    title: "Study Abroad",
    description:
      "Expert guidance for international students pursuing academic dreams worldwide.",
  },
  {
    link: "/services/work-visa",
    title: "Global Talent Mobility",
    description:
      "Professional support for securing employment visas and work permits globally.",
  },
  {
    link: "/services/business-visa",
    title: "Business Plans and Travels",
    description:
      "Streamlined business visa applications for entrepreneurs and corporate travelers.",
  },
  {
    link: "/services/tourist-visa",
    title: "Tourism",
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

const NAVIGATION = {
  menuItems: [
    {
      text: "Home",
      href: "/",
      link: "/",
    },
    {
      text: "About Us",
      href: "/about-us",
      link: "/about-us",
    },
    {
      text: "Services",
      href: "/services",
      link: "/services",
      hasDropdown: true,
      children: [
        {
          text: "Global Talent Mobility",
          href: "/services",
          link: "/services",
        },
        {
          text: "Business Plans and Travels",
          href: "/services",
          link: "/services",
        },
        {
          text: "Tourism",
          href: "/services",
          link: "/services",
        },
        {
          text: "Study Abroad",
          href: "/services",
          link: "/services",
        },
      ],
    },
    {
      text: "Partner Institutions",
      href: "/partner-institutions",
      link: "/partner-institutions",
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
    {
      text: "Contact Us",
      href: "/contact",
      link: "/contact",
    },
  ],

  // Footer navigation sections
};

export const PARTNER_INSTITUTIONS = {
  "United Kingdom": [
    "Buckinghamshire New University (BUCKS)",
    "British Study Centres University Pathways",
    "Brunel University London",
    "Cardiff Metropolitan University",
    "Coventry University",
    "Cranfield University",
    "David Game College, London UK",
    "De Montfort University",
    "Glasgow Caledonian University",
    "Kingston University London",
    "Leeds Beckett University",
    "London South Bank University",
    "Loughborough University",
    "Middlesex University, London",
    "Nottingham Trent University",
    "Oxford Brookes University",
    "Ravensbourne University",
    "Regent College London",
    "Royal Holloway, University of London",
    "Swansea University",
    "Teesside University",
    "University of Bradford",
    "University of Bedfordshire",
    "University of Essex",
    "University of Greenwich",
    "University of Hertfordshire",
    "University of Kent",
    "University of Liverpool",
    "University of Portsmouth",
    "University of Reading",
    "University of South Wales",
    "University of Strathclyde",
    "University of Surrey",
    "University of Sussex",
    "University of the West of England",
    "University of Wolverhampton",
  ],
  "United States of America": [
    "Adelphi University",
    "Alma College",
    "Arizona State University",
    "Arkansas State University",
    "Auburn University",
    "Audacia Novatio Business College",
    "Bay Atlantic University",
    "Bishop's University",
    "California State University, Channel Islands",
    "California State University, Chico",
    "California State University, Dominguez Hills",
    "California State University, East Bay",
    "California State University, Long Beach",
    "California State University, Monterey Bay",
    "California State University, Northridge",
    "California State University, San Bernardino",
    "Calvin University",
    "Central Michigan University",
    "Clarkson University",
    "Cleveland State University",
    "College of San Mateo",
    "College of the Canyons",
    "Colorado State University – Pueblo",
    "Concordia University Chicago",
    "ECPI University",
    "Edmonds College",
    "Elgin Community College",
    "Elizabethtown College",
    "Embry Riddle Aeronautical University",
    "Embry-Riddle Aeronautical University",
    "Felician University",
    "Fordham University, Gabelli School of Business",
    "Full Sail University",
    "Gannon University",
    "Grand Valley State University",
    "High Point University",
    "Hope College",
    "Humboldt State University",
    "Indiana University – Purdue University Indianapolis",
    "Iowa State University",
    "Lake Tahoe Community College",
    "Lewis-Clark State College",
    "Lincoln University",
    "Long Island University",
    "Madison College",
    "Northeastern Illinois University",
    "Northeastern University",
    "Notre Dame High School",
    "Ohio Wesleyan University",
    "Olympic College",
    "Pacific Lutheran University",
    "Rice University",
    "Roger Williams University",
    "Sacred Heart University-USA",
    "San Francisco State University",
    "Santa Monica College",
    "Santa Rosa Junior College",
    "SCAD",
    "Schiller International University",
    "Shoreline Community College",
    "Southeast Missouri State University",
    "SUNY Oswego",
    "Tennessee Technological University",
    "The American University of Barbados School of Medicine",
    "The Chicago School of Professional Psychology",
    "The University of Alabama",
    "The University of Arizona",
    "The University of New Mexico",
    "The University of Southern Mississippi",
    "Tiffin University",
    "Touro College Graduate School of Technology",
    "Trine University",
    "University of Arizona",
    "University of California, Riverside",
    "University of Central Missouri",
    "University of Colorado – Denver",
    "University of Colorado Denver",
    "University of Delaware",
    "University of Findlay",
    "University of Idaho",
    "University of Illinois at Chicago",
    "University of New Haven",
    "University of Notre Damec",
    "University of Texas at Tyler",
    "University of Wisconsin – Stout",
    "University of Wyoming",
    "Valencia College",
    "Wayne State University",
    "Webster University",
    "Westcliff University",
    "Western Michigan University",
    "Whitworth University",
    "Wilkes University",
  ],
  Canada: [
    "Alexander College",
    "Algoma University",
    "Bishop's University",
    "Bow Valley College",
    "British Columbia Institute of Technology",
    "Brock University",
    "Brock University Faculty of Education",
    "Canadian College of Technology and Business",
    "Canadore College",
    "Centennial College",
    "Conestoga College",
    "Douglas College",
    "Fanshawe College",
    "Fleming College",
    "Focus College, Abbotsford",
    "George Brown College",
    "Georgian College",
    "Great Lakes College of Toronto",
    "Herzing College",
    "Humber College Institute of Technology",
    "Insignia College",
    "International Business University",
    "Justice Institute of British Columbia",
    "King's University College at Western University",
    "Kwantlen Polytechnic University",
    "Lakehead University",
    "Langara College",
    "Languages Across Borders",
    "London International Academy, Canada",
    "Loyalist College of Applied Arts and Technology",
    "Manitoba Institute of Trades and Technology",
    "Mohawk College",
    "Niagara College Canada",
    "Red Deer Polytechnic at Sterling College",
    "Red River College Polytechnic",
    "Royal Roads University",
    "Saskatchewan Polytechnic",
    "Seneca College",
    "Sheridan College",
    "Southern Alberta Institute of Technology",
    "St. Clair College",
    "The University of Winnipeg Collegiate",
    "Thompson Rivers University",
    "Toronto Metropolitan University (TMU)",
    "Toronto School of Management",
    "Trebas Institute",
    "University Canada West",
    "University of Guelph",
    "University of Lethbridge",
    "University of Manitoba",
    "University of Regina",
    "University of Saskatchewan",
    "University of the Fraser Valley",
    "University of Windsor",
    "Western University",
    "York University",
    "Yorkville University",
  ],
  "The Republic of Ireland": [
    "Dublin Business School",
    "Dublin City University – Glasnevin",
    "IBAT College - Dublin",
    "Maynooth University",
    "Technological University of the Shannon: Midlands Midwest (TUS)",
    "Trinity College Dublin",
    "UniHaven College",
    "University College Cork",
    "University College Dublin",
    "University of Limerick",
  ],
};

export { NAVIGATION };
