import { Text } from "@react-email/components";

const yesNoContainer = {
  margin: "16px 0",
  padding: "16px",
  backgroundColor: "#ffffff",
  borderRadius: "6px",
  border: "2px solid #f1f5f9",
};

const yesNoHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "8px",
};

const yesNoLabel = {
  fontFamily: "'Inter', sans-serif",
  color: "#0f172a",
  fontSize: "15px",
  fontWeight: "600",
  margin: "0",
  flex: "1",
};

const yesNoAnswerYes = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "14px",
  fontWeight: "600",
  color: "#16a34a",
  backgroundColor: "#dcfce7",
  padding: "4px 12px",
  borderRadius: "4px",
};

const yesNoAnswerNo = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "14px",
  fontWeight: "600",
  color: "#64748b",
  backgroundColor: "#f1f5f9",
  padding: "4px 12px",
  borderRadius: "4px",
};

const explanationText = {
  fontFamily: "'Inter', sans-serif",
  color: "#475569",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "12px 0 0",
  padding: "12px",
  backgroundColor: "#f8fafc",
  borderRadius: "4px",
  borderLeft: "3px solid #EE3636",
};

export const YesNoField = ({
  label,
  value,
  explanation,
}: {
  label: string;
  value?: string;
  explanation?: string;
}) => {
  return (
    <div style={yesNoContainer}>
      <div style={yesNoHeader}>
        <Text style={yesNoLabel}>{label}</Text>
        <span style={value === "Yes" ? yesNoAnswerYes : yesNoAnswerNo}>
          {value || "Not answered"}
        </span>
      </div>
      {value === "Yes" && explanation && (
        <Text style={explanationText}>{explanation}</Text>
      )}
    </div>
  );
};
