import { FORM_FIELD_CONFIGS } from "../constants";
import { FormType } from "@prisma/client";
import type { FieldConfig } from "../types";

/**
 * Generate human-readable field label from fieldPath
 *
 * Examples:
 * - "passportNumber" → "Passport Number"
 * - "workHistory.0.companyName" → "Work History → Entry 1 → Company Name"
 * - "familyMembers.biologicalSons.count" → "Family Members → Biological Sons"
 */
export function formatFieldPath(fieldPath: string, formType: FormType): string {
  const parts = fieldPath.split(".");
  const formatted: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    // Handle array indices
    if (/^\d+$/.test(part)) {
      formatted.push(`Entry ${parseInt(part) + 1}`);
      continue;
    }

    // Look up field config for label
    const formConfig = FORM_FIELD_CONFIGS[formType];
    const config = formConfig?.fields?.[part] as FieldConfig | undefined;
    if (config) {
      formatted.push(config.label);
    } else {
      // Fallback: Convert camelCase to Title Case
      formatted.push(
        part
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())
          .trim()
      );
    }
  }

  return formatted.join(" → ");
}

/**
 * Get all available field paths for a form type (for tag selector dropdown)
 * Groups fields by section for better organization
 */
export function getAvailableFieldPaths(formType: FormType): Array<{
  value: string;
  label: string;
}> {
  const formConfig = FORM_FIELD_CONFIGS[formType];
  if (!formConfig || !formConfig.fields) return [];

  const fieldPaths: Array<{ value: string; label: string }> = [];

  Object.entries(formConfig.fields).forEach(([key, config]) => {
    const fieldConfig = config as FieldConfig;

    // Skip internal fields, N/A checkboxes, array containers, etc.
    if (
      key.endsWith("NA") ||
      key.startsWith("_") ||
      key.includes("History") ||
      key.includes("Members") ||
      key.includes("Entries")
    ) {
      return;
    }

    fieldPaths.push({
      value: key,
      label: fieldConfig.label,
    });
  });

  return fieldPaths.sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * Scroll to field in form and highlight it
 */
export function scrollToField(fieldPath: string) {
  // Try multiple ID patterns (forms might use different conventions)
  const possibleIds = [
    fieldPath,
    fieldPath.replace(/\./g, "-"),
    fieldPath.replace(/\./g, "_"),
  ];

  for (const id of possibleIds) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });

      // Add highlight animation
      element.classList.add("field-highlighted");
      setTimeout(() => {
        element.classList.remove("field-highlighted");
      }, 2000);

      // Focus if it's an input
      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement
      ) {
        element.focus();
      }

      return true;
    }
  }

  console.warn(`Field not found: ${fieldPath}`);
  return false;
}

/**
 * Group comments by field path for filtering
 */
export function groupCommentsByField(comments: any[]): Map<string, any[]> {
  const grouped = new Map<string, any[]>();

  comments.forEach((comment) => {
    const key = comment.fieldPath || "__GENERAL__";
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(comment);
  });

  return grouped;
}

/**
 * Get comment count for a specific field
 */
export function getFieldCommentCount(
  comments: any[],
  fieldPath: string
): {
  total: number;
  unresolved: number;
} {
  const fieldComments = comments.filter((c) => c.fieldPath === fieldPath);

  return {
    total: fieldComments.length,
    unresolved: fieldComments.filter((c) => !c.isResolved).length,
  };
}
