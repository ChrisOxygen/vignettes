import { Text } from "@react-email/components";

const fieldContainer = {
  margin: "12px 0",
  padding: "12px",
  backgroundColor: "#f8fafc",
  borderRadius: "6px",
  border: "1px solid #f1f5f9",
};

const fieldLabel = {
  fontFamily: "'Inter', sans-serif",
  color: "#64748b",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  margin: "0 0 4px",
};

const fieldValue = {
  fontFamily: "'Inter', sans-serif",
  color: "#0f172a",
  fontSize: "15px",
  lineHeight: "22px",
  margin: "0",
  wordBreak: "break-word" as const,
};

export const FieldDisplay = ({
  label,
  value,
}: {
  label: string;
  value?: string;
}) => {
  if (!value) return null;
  return (
    <div style={fieldContainer}>
      <Text style={fieldLabel}>{label}</Text>
      <Text style={fieldValue}>{value}</Text>
    </div>
  );
};
