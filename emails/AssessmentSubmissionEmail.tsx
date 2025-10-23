import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";
import { EmailLogo } from "./components/EmailLogo";
import { UsEb1aEmailTemplate } from "./templates/UsEb1aEmailTemplate";
import {
  AssessmentType,
  AssessmentData,
  UsEb1aData,
} from "./types/assessmentTypes";
import {
  main,
  container,
  box,
  header,
  hr,
  paragraph,
  cautionText,
  footer,
  anchor,
} from "./styles/emailStyles";

interface AssessmentSubmissionEmailProps {
  assessmentType: AssessmentType;
  formData: AssessmentData;
}

const baseURL =
  process.env.NODE_ENV === "production" ? `${process.env.SITE_URL}` : "";

// Helper function to get assessment title
const getAssessmentTitle = (type: AssessmentType): string => {
  switch (type) {
    case AssessmentType.USEB1A:
      return "EB-1A Questionnaire";
    case AssessmentType.EB2NIW:
      return "EB-2 NIW Questionnaire";
    case AssessmentType.UK_GLOBAL_TALENT:
      return "UK Global Talent Questionnaire";
    default:
      return "Assessment Questionnaire";
  }
};

// Helper function to get preview text
const getPreviewText = (
  type: AssessmentType,
  formData: AssessmentData
): string => {
  const name = `${formData.firstName || ""} ${formData.lastName || ""}`.trim();
  const assessmentTitle = getAssessmentTitle(type);
  return `New ${assessmentTitle} Submission${name ? ` from ${name}` : ""}`;
};

export default function AssessmentSubmissionEmail({
  assessmentType,
  formData,
}: AssessmentSubmissionEmailProps) {
  // Render appropriate template based on assessment type
  const renderTemplate = () => {
    switch (assessmentType) {
      case AssessmentType.USEB1A:
        return <UsEb1aEmailTemplate {...(formData as UsEb1aData)} />;

      case AssessmentType.EB2NIW:
        // TODO: Create Eb2NiwEmailTemplate
        return (
          <Section>
            <Text style={paragraph}>EB-2 NIW template coming soon...</Text>
          </Section>
        );

      case AssessmentType.UK_GLOBAL_TALENT:
        // TODO: Create UkGlobalTalentEmailTemplate
        return (
          <Section>
            <Text style={paragraph}>
              UK Global Talent template coming soon...
            </Text>
          </Section>
        );

      default:
        return (
          <Section>
            <Text style={paragraph}>
              Unknown assessment type. Please contact support.
            </Text>
          </Section>
        );
    }
  };

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
      <Preview>{getPreviewText(assessmentType, formData)}</Preview>
      <Body style={main}>
        <Container style={container} className="container">
          <Section style={box} className="content">
            <EmailLogo />

            <Text style={header} className="header">
              {getAssessmentTitle(assessmentType)} Submission
            </Text>

            <Hr style={hr} />

            <Text style={paragraph}>
              A new {getAssessmentTitle(assessmentType)} has been submitted.
              Below are the details:
            </Text>

            {/* Render appropriate template */}
            {renderTemplate()}

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
              {formData.email} to schedule a consultation if their profile is
              viable.
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

// Default props for email preview
AssessmentSubmissionEmail.PreviewProps = {
  assessmentType: AssessmentType.USEB1A,
  formData: {
    firstName: "Christopher",
    lastName: "Okafor",
    email: "chrisoxygen1234@gmail.com",
    phone: "+2347034670696",
    linkedinProfile: "https://www.linkedin.com/in/joy-ndukwe/",
    immigrationStatus: "Currently on H-1B visa",
    ventureFunding: "No",
    ventureFunding_explanation: "",
    exclusiveAssociations: "No",
    exclusiveAssociations_explanation: "",
    startupAffiliation: "No",
    startupAffiliation_explanation: "",
    patents: "No",
    patents_explanation: "",
    awards: "Yes",
    awards_explanation: "Received Best Innovation Award 2024",
    judgingExperience: "Yes",
    judgingExperience_explanation: "I need a lot of money",
    reviewerExperience: "No",
    reviewerExperience_explanation: "",
    mediaCoverage: "No",
    mediaCoverage_explanation: "",
    scholarlyArticles: "No",
    scholarlyArticles_explanation: "",
    criticalEmployment: "No",
    criticalEmployment_explanation: "",
    highCompensation: "No",
    highCompensation_explanation: "",
    professionalAchievements: "No",
    professionalAchievements_explanation: "",
  } as UsEb1aData,
} as AssessmentSubmissionEmailProps;
