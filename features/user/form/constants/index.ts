import {
  FileText,
  Users,
  MapPin,
  Briefcase,
  GraduationCap,
  CreditCard,
  Plane,
  Shield,
} from "lucide-react";

// Form navigation items based on FormType enum
export const FORM_NAV = [
  {
    title: "Applicant Info",
    url: "/app/form/applicant-info",
    icon: FileText,
    description: "Personal details and basic information",
  },
  {
    title: "Ex-Spouse Info",
    url: "/app/form/ex-spouse-info",
    icon: Users,
    description: "Former spouse information if applicable",
  },
  {
    title: "Family Members",
    url: "/app/form/family-members-info",
    icon: Users,
    description: "Information about family members",
  },
  {
    title: "Relatives Abroad",
    url: "/app/form/relatives-abroad-info",
    icon: MapPin,
    description: "Relatives living in other countries",
  },
  {
    title: "Work & Business",
    url: "/app/form/work-and-business-info",
    icon: Briefcase,
    description: "Employment and business information",
  },
  {
    title: "Education",
    url: "/app/form/education-info",
    icon: GraduationCap,
    description: "Educational background and qualifications",
  },
  {
    title: "Visa & Permits",
    url: "/app/form/visa-and-permits-info",
    icon: CreditCard,
    description: "Previous visas and permits history",
  },
  {
    title: "Travel History",
    url: "/app/form/previous-travel-info",
    icon: Plane,
    description: "Previous travel to other countries",
  },
  {
    title: "Security Questions",
    url: "/app/form/security-and-statutory-questions",
    icon: Shield,
    description: "Security and statutory questions",
  },
];
