// Field Types
export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "select"
  | "textarea"
  | "date"
  | "radio";

export interface BaseFieldConfig {
  name: string;
  label: string;
  description: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  rows?: number;
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: "select";
  options: string[];
}

export interface RadioFieldConfig extends BaseFieldConfig {
  type: "radio";
  options: string[];
  conditionalExplanation?: {
    triggerValue: string;
    placeholder: string;
    errorMessage: string;
  };
}

export type FieldConfig =
  | BaseFieldConfig
  | SelectFieldConfig
  | RadioFieldConfig;

export type YesNoField = {
  value: "Yes" | "No";
  explanation?: string;
};
