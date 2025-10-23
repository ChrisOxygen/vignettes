import { Section, Text, Hr } from "@react-email/components";
import { FieldDisplay } from "../components/FieldDisplay";
import { YesNoField } from "../components/YesNoField";
import { sectionContainer, sectionTitle } from "../styles/emailStyles";

interface Eb2NiwEmailTemplateProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  linkedinProfile?: string;
  immigrationStatus?: string;
  fieldOfExpertise?: string;
  proposedEndeavor?: string;
  advancedDegree?: string;
  advancedDegree_explanation?: string;
  exceptionalAbility?: string;
  exceptionalAbility_explanation?: string;
  substantialMerit?: string;
  substantialMerit_explanation?: string;
  wellPositioned?: string;
  wellPositioned_explanation?: string;
  waiveBeneficial?: string;
  waiveBeneficial_explanation?: string;
  publications?: string;
  publications_explanation?: string;
  citations?: string;
  citations_explanation?: string;
  patents?: string;
  patents_explanation?: string;
  awards?: string;
  awards_explanation?: string;
  professionalMemberships?: string;
  professionalMemberships_explanation?: string;
  reviewerExperience?: string;
  reviewerExperience_explanation?: string;
  mediaAttention?: string;
  mediaAttention_explanation?: string;
  collaborations?: string;
  collaborations_explanation?: string;
  fundingGrants?: string;
  fundingGrants_explanation?: string;
}

const hr = {
  borderColor: "#f1f5f9",
  margin: "20px 0",
};

export const Eb2NiwEmailTemplate = ({
  firstName,
  lastName,
  email,
  phone,
  linkedinProfile,
  immigrationStatus,
  fieldOfExpertise,
  proposedEndeavor,
  advancedDegree,
  advancedDegree_explanation,
  exceptionalAbility,
  exceptionalAbility_explanation,
  substantialMerit,
  substantialMerit_explanation,
  wellPositioned,
  wellPositioned_explanation,
  waiveBeneficial,
  waiveBeneficial_explanation,
  publications,
  publications_explanation,
  citations,
  citations_explanation,
  patents,
  patents_explanation,
  awards,
  awards_explanation,
  professionalMemberships,
  professionalMemberships_explanation,
  reviewerExperience,
  reviewerExperience_explanation,
  mediaAttention,
  mediaAttention_explanation,
  collaborations,
  collaborations_explanation,
  fundingGrants,
  fundingGrants_explanation,
}: Eb2NiwEmailTemplateProps) => {
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
        <FieldDisplay label="Field of Expertise" value={fieldOfExpertise} />
        <FieldDisplay label="Proposed Endeavor" value={proposedEndeavor} />
      </Section>

      <Hr style={hr} />

      {/* Qualifications Section */}
      <Section style={sectionContainer}>
        <Text style={sectionTitle} className="section-title">
          🎓 Advanced Degree & Exceptional Ability
        </Text>
        <YesNoField
          label="Advanced Degree"
          value={advancedDegree}
          explanation={advancedDegree_explanation}
        />
        <YesNoField
          label="Exceptional Ability"
          value={exceptionalAbility}
          explanation={exceptionalAbility_explanation}
        />
      </Section>

      <Hr style={hr} />

      {/* Proposed Endeavor Section */}
      <Section style={sectionContainer}>
        <Text style={sectionTitle} className="section-title">
          🎯 Proposed Endeavor
        </Text>
        <YesNoField
          label="Substantial Merit & National Importance"
          value={substantialMerit}
          explanation={substantialMerit_explanation}
        />
        <YesNoField
          label="Well Positioned to Advance Endeavor"
          value={wellPositioned}
          explanation={wellPositioned_explanation}
        />
      </Section>

      <Hr style={hr} />

      {/* National Interest Waiver Section */}
      <Section style={sectionContainer}>
        <Text style={sectionTitle} className="section-title">
          🇺🇸 National Interest Waiver
        </Text>
        <YesNoField
          label="Beneficial to Waive Labor Certification"
          value={waiveBeneficial}
          explanation={waiveBeneficial_explanation}
        />
      </Section>

      <Hr style={hr} />

      {/* Supporting Evidence Section */}
      <Section style={sectionContainer}>
        <Text style={sectionTitle} className="section-title">
          📚 Supporting Evidence
        </Text>
        <YesNoField
          label="Scholarly Publications"
          value={publications}
          explanation={publications_explanation}
        />
        <YesNoField
          label="Citations"
          value={citations}
          explanation={citations_explanation}
        />
        <YesNoField
          label="Patents"
          value={patents}
          explanation={patents_explanation}
        />
        <YesNoField
          label="Awards & Recognition"
          value={awards}
          explanation={awards_explanation}
        />
        <YesNoField
          label="Professional Memberships"
          value={professionalMemberships}
          explanation={professionalMemberships_explanation}
        />
        <YesNoField
          label="Reviewer Experience"
          value={reviewerExperience}
          explanation={reviewerExperience_explanation}
        />
        <YesNoField
          label="Media Attention"
          value={mediaAttention}
          explanation={mediaAttention_explanation}
        />
        <YesNoField
          label="Collaborations"
          value={collaborations}
          explanation={collaborations_explanation}
        />
        <YesNoField
          label="Research Funding & Grants"
          value={fundingGrants}
          explanation={fundingGrants_explanation}
        />
      </Section>
    </>
  );
};
