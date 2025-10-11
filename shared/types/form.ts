// Form field input types
export type FieldInputType =
  | "text" // Regular text input
  | "email" // Email input with validation
  | "tel" // Phone number input
  | "number" // Number input
  | "date" // Date picker
  | "textarea" // Multi-line text area
  | "select" // Dropdown select
  | "radio" // Radio button group
  | "checkbox" // Checkbox
  | "file" // File upload (images, documents)
  | "password" // Password input
  | "url" // URL input
  | "search"; // Search input

// Individual form field configuration
export interface FormField {
  title: string;
  description: string;
  isRequired: boolean;
  conditionalFields: boolean;
  explanation: string;
  fieldInputType: FieldInputType;
  options?: string[]; // For select, radio, checkbox options
  accept?: string; // For file inputs (e.g., "image/*", ".pdf,.doc")
  placeholder?: string; // Input placeholder text
  maxLength?: number; // Maximum character length
  minLength?: number; // Minimum character length
}

// Basic form configuration interface
export interface FormConfig {
  formTitle?: string;
  instructions?: string;
  fields?: Record<string, FormField>;
}

// Complete form configuration interface (all properties required)
export interface CompleteFormConfig {
  formTitle: string;
  instructions: string;
  fields: Record<string, FormField>;
}
