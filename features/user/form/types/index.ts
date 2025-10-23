// Field Types
export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "select"
  | "textarea"
  | "date"
  | "radio";

export interface ConditionalRequirement {
  dependsOn: string; // field name that this field depends on
  values: string[]; // values that make this field required
}

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
  conditionallyRequired?: ConditionalRequirement;
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
    maxLength?: number;
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
