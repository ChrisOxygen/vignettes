import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Row,
  Link,
} from "@react-email/components";

interface UsEb1aEmailProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  linkedinProfile?: string;
  immigrationStatus?: string;
  ventureFunding?: string;
  ventureFunding_explanation?: string;
  exclusiveAssociations?: string;
  exclusiveAssociations_explanation?: string;
  startupAffiliation?: string;
  startupAffiliation_explanation?: string;
  patents?: string;
  patents_explanation?: string;
  awards?: string;
  awards_explanation?: string;
  judgingExperience?: string;
  judgingExperience_explanation?: string;
  reviewerExperience?: string;
  reviewerExperience_explanation?: string;
  mediaCoverage?: string;
  mediaCoverage_explanation?: string;
  scholarlyArticles?: string;
  scholarlyArticles_explanation?: string;
  criticalEmployment?: string;
  criticalEmployment_explanation?: string;
  highCompensation?: string;
  highCompensation_explanation?: string;
  professionalAchievements?: string;
  professionalAchievements_explanation?: string;
}

const baseURL =
  process.env.NODE_ENV === "production" ? `${process.env.SITE_URL}` : "";

// Email Logo Component
const EmailLogo = () => {
  return (
    <div style={{ textAlign: "center", margin: "0 auto 20px" }}>
      <Link href={baseURL} style={linkStyle}>
        <Row>
          <Img
            src={`${baseURL}/static/I&V-no-bg.png`}
            alt="Insights and Vignettes Logo"
            width={160}
          />
        </Row>
      </Link>
    </div>
  );
};

// Field Display Component
const FieldDisplay = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;
  return (
    <div style={fieldContainer}>
      <Text style={fieldLabel}>{label}</Text>
      <Text style={fieldValue}>{value}</Text>
    </div>
  );
};

// Yes/No Field with Explanation Component
const YesNoField = ({
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

export default function UsEb1aEmail({
  firstName = "Christopher",
  lastName = "Okafor",
  email = "chrisoxygen1234@gmail.com",
  phone = "+2347034670696",
  linkedinProfile = "https://www.linkedin.com/in/joy-ndukwe/",
  immigrationStatus = "Currently on H-1B visa",
  ventureFunding = "No",
  ventureFunding_explanation = "",
  exclusiveAssociations = "No",
  exclusiveAssociations_explanation = "",
  startupAffiliation = "No",
  startupAffiliation_explanation = "",
  patents = "No",
  patents_explanation = "",
  awards = "Yes",
  awards_explanation = "Received Best Innovation Award 2024",
  judgingExperience = "No",
  judgingExperience_explanation = "",
  reviewerExperience = "No",
  reviewerExperience_explanation = "",
  mediaCoverage = "No",
  mediaCoverage_explanation = "",
  scholarlyArticles = "No",
  scholarlyArticles_explanation = "",
  criticalEmployment = "No",
  criticalEmployment_explanation = "",
  highCompensation = "No",
  highCompensation_explanation = "",
  professionalAchievements = "No",
  professionalAchievements_explanation = "",
}: UsEb1aEmailProps) {
  return (
    <Html>
      <Head>
        <style>{`
          @media only screen and (max-width: 600px) {
            .container {
              width: 100% !important;
              margin: 0 auto !important;
            }
            .content {
              padding: 0 16px !important;
            }
            .header {
              font-size: 24px !important;
            }
            .section-title {
              font-size: 18px !important;
            }
          }
        `}</style>
      </Head>
      <Preview>
        New EB-1A Questionnaire Submission from {firstName} {lastName}
      </Preview>
      <Body style={main}>
        <Container style={container} className="container">
          <Section style={box} className="content">
            <EmailLogo />

            <Text style={header} className="header">
              EB-1A Questionnaire Submission
            </Text>

            <Hr style={hr} />

            <Text style={paragraph}>
              A new EB-1A Professional Qualification Questionnaire has been
              submitted. Below are the details:
            </Text>

            {/* Basic Information Section */}
            <Section style={sectionContainer}>
              <Text style={sectionTitle} className="section-title">
                📋 Basic Information
              </Text>
              <FieldDisplay label="First Name" value={firstName} />
              <FieldDisplay label="Last Name" value={lastName} />
              <FieldDisplay label="Email" value={email} />
              <FieldDisplay label="Phone" value={phone} />
              <FieldDisplay label="LinkedIn Profile" value={linkedinProfile} />
              <FieldDisplay
                label="Immigration Status"
                value={immigrationStatus}
              />
            </Section>

            <Hr style={hr} />

            {/* Professional Recognition Section */}
            <Section style={sectionContainer}>
              <Text style={sectionTitle} className="section-title">
                🏆 Professional Recognition
              </Text>
              <YesNoField
                label="Awards or Prizes"
                value={awards}
                explanation={awards_explanation}
              />
              <YesNoField
                label="Exclusive Associations"
                value={exclusiveAssociations}
                explanation={exclusiveAssociations_explanation}
              />
              <YesNoField
                label="Judging Experience"
                value={judgingExperience}
                explanation={judgingExperience_explanation}
              />
            </Section>

            <Hr style={hr} />

            {/* Publications & Media Section */}
            <Section style={sectionContainer}>
              <Text style={sectionTitle} className="section-title">
                📰 Publications & Media
              </Text>
              <YesNoField
                label="Scholarly Articles"
                value={scholarlyArticles}
                explanation={scholarlyArticles_explanation}
              />
              <YesNoField
                label="Media Coverage"
                value={mediaCoverage}
                explanation={mediaCoverage_explanation}
              />
              <YesNoField
                label="Reviewer Experience"
                value={reviewerExperience}
                explanation={reviewerExperience_explanation}
              />
            </Section>

            <Hr style={hr} />

            {/* Business & Funding Section */}
            <Section style={sectionContainer}>
              <Text style={sectionTitle} className="section-title">
                💼 Business & Funding
              </Text>
              <YesNoField
                label="Venture Funding"
                value={ventureFunding}
                explanation={ventureFunding_explanation}
              />
              <YesNoField
                label="Startup Affiliation"
                value={startupAffiliation}
                explanation={startupAffiliation_explanation}
              />
              <YesNoField
                label="High Compensation"
                value={highCompensation}
                explanation={highCompensation_explanation}
              />
              <YesNoField
                label="Critical Employment"
                value={criticalEmployment}
                explanation={criticalEmployment_explanation}
              />
            </Section>

            <Hr style={hr} />

            {/* Innovation & Contributions Section */}
            <Section style={sectionContainer}>
              <Text style={sectionTitle} className="section-title">
                💡 Innovation & Contributions
              </Text>
              <YesNoField
                label="Patents"
                value={patents}
                explanation={patents_explanation}
              />
              <YesNoField
                label="Professional Achievements"
                value={professionalAchievements}
                explanation={professionalAchievements_explanation}
              />
            </Section>

            <Hr style={hr} />

            <Text style={cautionText}>
              This submission was received on{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
              . Please review the application and contact the applicant at{" "}
              {email} to schedule a consultation if their profile is viable.
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              © 2025 Insights & Vignettes. All rights reserved.
            </Text>
            <Text style={footer}>
              <Link href={`${baseURL}/privacy`} style={anchor}>
                Privacy Policy
              </Link>{" "}
              •{" "}
              <Link href={`${baseURL}/terms`} style={anchor}>
                Terms of Service
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Email styling - Using homepage color scheme
const main = {
  backgroundColor: "#fafaf9",
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  borderRadius: "8px",
  maxWidth: "700px",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
};

const box = {
  padding: "0 48px",
};

const header = {
  fontFamily: "'Inter', sans-serif",
  color: "#0f172a",
  fontSize: "28px",
  fontWeight: "700",
  textAlign: "center" as const,
  margin: "0 0 30px",
  letterSpacing: "-0.4px",
  lineHeight: "1.3",
};

const hr = {
  borderColor: "#f1f5f9",
  margin: "20px 0",
};

const paragraph = {
  color: "#64748b",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
  fontFamily: "'Inter', sans-serif",
  margin: "16px 0",
};

const sectionContainer = {
  margin: "24px 0",
};

const sectionTitle = {
  fontFamily: "'Inter', sans-serif",
  color: "#0f172a",
  fontSize: "20px",
  fontWeight: "700",
  margin: "0 0 16px",
  letterSpacing: "-0.2px",
};

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

const cautionText = {
  color: "#64748b",
  fontSize: "14px",
  lineHeight: "20px",
  textAlign: "left" as const,
  fontFamily: "'Inter', sans-serif",
  margin: "16px 0",
  backgroundColor: "#eff6ff",
  padding: "12px 16px",
  borderRadius: "6px",
  borderLeft: "4px solid #3b82f6",
};

const footer = {
  color: "#94a3b8",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  margin: "8px 0",
};

const anchor = {
  color: "#EE3636",
  textDecoration: "none",
};

const linkStyle = {
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
};
