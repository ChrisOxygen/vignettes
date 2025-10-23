import { Section, Text, Hr } from "@react-email/components";
import { FieldDisplay } from "../components/FieldDisplay";
import { YesNoField } from "../components/YesNoField";
import { sectionContainer, sectionTitle } from "../styles/emailStyles";

interface UsEb1aEmailTemplateProps {
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

const hr = {
  borderColor: "#f1f5f9",
  margin: "20px 0",
};

export const UsEb1aEmailTemplate = ({
  firstName,
  lastName,
  email,
  phone,
  linkedinProfile,
  immigrationStatus,
  ventureFunding,
  ventureFunding_explanation,
  exclusiveAssociations,
  exclusiveAssociations_explanation,
  startupAffiliation,
  startupAffiliation_explanation,
  patents,
  patents_explanation,
  awards,
  awards_explanation,
  judgingExperience,
  judgingExperience_explanation,
  reviewerExperience,
  reviewerExperience_explanation,
  mediaCoverage,
  mediaCoverage_explanation,
  scholarlyArticles,
  scholarlyArticles_explanation,
  criticalEmployment,
  criticalEmployment_explanation,
  highCompensation,
  highCompensation_explanation,
  professionalAchievements,
  professionalAchievements_explanation,
}: UsEb1aEmailTemplateProps) => {
  return (
    <>
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
        <FieldDisplay label="Immigration Status" value={immigrationStatus} />
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
    </>
  );
};
