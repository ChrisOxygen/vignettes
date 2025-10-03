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

interface VerifyEmailProps {
  verificationToken?: string;
  name?: string;
  email?: string;
}

const baseURL = process.env.SITE_URL as string;

// Email Logo Component
const EmailLogo = () => {
  return (
    <div style={{ textAlign: "center", margin: "0 auto 20px" }}>
      <Link href={baseURL} style={linkStyle}>
        <Row>
          <Img
            src={`/static/I&V-no-bg.png`}
            alt="Insights and Vignettes Logo"
            width={160}
          />
        </Row>
      </Link>
    </div>
  );
};

// This section is now redundant as SafeLink is already defined above

export default function VerifyEmail({
  verificationToken = "e_v_token123456789012345",
  name = "Chris",
  email = "user@example.com",
}: VerifyEmailProps) {
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
              font-size: 26px !important;
            }
            .greeting {
              font-size: 20px !important;
            }
            .paragraph {
              font-size: 15px !important;
            }
          }
        `}</style>
      </Head>
      <Preview>Verify your Insights & Vignettes account email address</Preview>
      <Body style={main}>
        <Container style={container} className="container">
          <Section style={box} className="content">
            <EmailLogo />

            <Text style={greeting} className="greeting">
              Welcome {name}!
            </Text>
            <Text style={header} className="header">
              Verify your email address
            </Text>

            <Hr style={hr} />

            <Text style={paragraph} className="paragraph">
              Thank you for joining Insights & Vignettes, your complete visa and
              immigration companion. To complete your registration and start
              your visa journey, please click the button below to verify your
              email address:
            </Text>

            <Section style={buttonSection}>
              <Link
                href={`${baseURL}/api/verify-email/${verificationToken}`}
                style={buttonStyle}
              >
                Verify Email Address
              </Link>
              <Text style={buttonExpiry}>
                (This link is valid for 24 hours)
              </Text>
            </Section>

            <Text style={paragraph} className="paragraph">
              Once verified, you'll have access to:
            </Text>

            <ul style={listStyle}>
              <li style={listItemStyle}>
                Expert visa and immigration insights
              </li>
              <li style={listItemStyle}>Digital form filling and submission</li>
              <li style={listItemStyle}>
                Secure document storage and management
              </li>
              <li style={listItemStyle}>
                Personalized guidance for students and professionals
              </li>
            </ul>

            <Text style={paragraph} className="paragraph">
              If you didn't create an Insights & Vignettes account, you can
              safely ignore this email.
            </Text>

            <Hr style={hr} />

            <Text style={cautionText}>
              Insights & Vignettes will never email you asking for your
              password, personal documents, or sensitive immigration
              information. If you receive such a request, please don't respond
              and contact our support team immediately.
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
  backgroundColor: "#fafaf9", // bg-primary/5 equivalent from homepage
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

const container = {
  backgroundColor: "#ffffff", // background from homepage
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  borderRadius: "8px",
  maxWidth: "600px",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)", // subtle shadow
};

const box = {
  padding: "0 48px",
};

const greeting = {
  fontFamily: "'Inter', sans-serif",
  color: "#0f172a", // foreground color from homepage
  fontSize: "24px",
  fontWeight: "600",
  textAlign: "center" as const,
  margin: "30px 0 16px",
  letterSpacing: "-0.4px",
};

const header = {
  fontFamily: "'Inter', sans-serif",
  color: "#0f172a", // foreground color
  fontSize: "28px",
  fontWeight: "700",
  textAlign: "center" as const,
  margin: "0 0 30px",
  letterSpacing: "-0.4px",
  lineHeight: "1.3",
};

const hr = {
  borderColor: "#f1f5f9", // border color similar to homepage
  margin: "20px 0",
};

const paragraph = {
  color: "#64748b", // text-foreground/80 equivalent from homepage
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
  fontFamily: "'Inter', sans-serif",
  margin: "16px 0",
};

const buttonSection = {
  backgroundColor: "#f8fafc", // muted background from homepage
  padding: "24px",
  borderRadius: "8px",
  margin: "32px 0",
  textAlign: "center" as const,
  border: "1px solid #f1f5f9",
};

const buttonStyle = {
  background:
    "linear-gradient(to right, rgba(238, 54, 54, 1), rgba(238, 54, 54, 0.9), rgba(238, 54, 54, 0.8))", // primary #EE3636 with opacity ranges like homepage
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  fontFamily: "'Inter', sans-serif",
  padding: "14px 28px",
  borderRadius: "6px",
  textDecoration: "none",
  display: "inline-block",
  margin: "0 0 16px",
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  transition: "all 0.2s ease",
};

const buttonExpiry = {
  fontFamily: "'Inter', sans-serif",
  color: "#94a3b8", // muted-foreground from homepage
  fontSize: "12px",
  margin: "8px 0 0",
};

const listStyle = {
  color: "#64748b", // text-foreground/80 from homepage
  fontSize: "16px",
  lineHeight: "24px",
  fontFamily: "'Inter', sans-serif",
  margin: "16px 0",
  paddingLeft: "20px",
};

const listItemStyle = {
  margin: "8px 0",
  color: "#64748b", // consistent with paragraph text
};

const cautionText = {
  color: "#64748b",
  fontSize: "14px",
  lineHeight: "20px",
  textAlign: "left" as const,
  fontFamily: "'Inter', sans-serif",
  margin: "16px 0",
  backgroundColor: "#fef3c7", // warning background
  padding: "12px 16px",
  borderRadius: "6px",
  borderLeft: "4px solid #EE3636", // primary color for accent
};

const footer = {
  color: "#94a3b8", // muted-foreground from homepage
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  margin: "8px 0",
};

const anchor = {
  color: "#EE3636", // primary color from design system
  textDecoration: "none",
};

// Logo component styles
const linkStyle = {
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
};
