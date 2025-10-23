import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactEmail = ({
  name,
  email,
  subject,
  message,
}: ContactEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Contact Form Submission from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Contact Form Submission</Heading>

          <Text style={text}>
            You have received a new message from your website contact form.
          </Text>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>From:</Text>
            <Text style={value}>{name}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Email:</Text>
            <Text style={value}>
              <a href={`mailto:${email}`} style={link}>
                {email}
              </a>
            </Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Subject:</Text>
            <Text style={value}>{subject}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>Message:</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            This email was sent from the contact form on
            insights4globaltalents.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

ContactEmail.PreviewProps = {
  name: "John Smith",
  email: "john.smith@example.com",
  subject: "EB-1A Visa Consultation",
  message:
    "I would like to schedule a consultation to discuss my eligibility for an EB-1A visa. I am a researcher in the field of artificial intelligence with several publications and awards.",
} as ContactEmailProps;

export default ContactEmail;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0 40px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  padding: "0 40px",
};

const section = {
  padding: "0 40px",
  marginBottom: "16px",
};

const label = {
  color: "#666",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 4px 0",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
};

const value = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px 0",
};

const messageText = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
  padding: "16px",
  backgroundColor: "#f6f9fc",
  borderRadius: "4px",
};

const link = {
  color: "#007bff",
  textDecoration: "none",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 40px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  padding: "0 40px",
  marginTop: "32px",
};
