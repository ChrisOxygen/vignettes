import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
} from "@react-email/components";

interface WelcomeEmailProps {
  name?: string;
  founderName?: string;
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

export default function WelcomeEmail({
  name = "Chris",
  founderName = "Christopher Oxygen",
}: WelcomeEmailProps) {
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
      <Preview>
        Welcome to Vignettes - Your migration journey starts here!
      </Preview>
      <Body style={main}>
        <Container style={container} className="container">
          <Section style={box} className="content">
            <EmailLogo />

            <Text style={greeting} className="greeting">
              Welcome to Vignettes 🎉
            </Text>

            <Hr style={hr} />

            <Text style={paragraph} className="paragraph">
              Hi {name},
            </Text>

            <Text style={paragraph} className="paragraph">
              I'm {founderName}, founder of Vignettes, and I wanted to
              personally welcome you to our platform! Your email has been
              verified and your account is now active.
            </Text>

            <Text style={paragraph} className="paragraph">
              I created Vignettes because I believe navigating visa applications
              and immigration processes shouldn't be overwhelming. Whether
              you're a student, professional, or family member looking to
              migrate, we're here to simplify your journey every step of the
              way.
            </Text>

            <Text style={paragraph} className="paragraph">
              You now have access to our complete suite of migration tools,
              expert guidance, and secure document management. Ready to get
              started?
            </Text>

            <Section style={buttonSection}>
              <Link href={`${baseURL}/app`} style={buttonStyle}>
                Visit Your Dashboard
              </Link>
            </Section>

            <Text style={paragraph} className="paragraph">
              If you have any questions along the way, don't hesitate to reach
              out. We're here to support you throughout your migration journey.
            </Text>

            <Text style={signature}>
              Best regards,
              <br />
              {founderName}
              <br />
              <span style={founderTitle}>Founder, Vignettes</span>
            </Text>

            <Hr style={hr} />

            <Text style={footer}>© 2025 Vignettes. All rights reserved.</Text>
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

const main = {
  backgroundColor: "#FFF8F4",
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  marginBottom: "64px",
  borderRadius: "12px",
  maxWidth: "600px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
};

const box = {
  padding: "0 32px",
};

const greeting = {
  fontFamily: "'Inter', sans-serif",
  color: "#1F2937",
  fontSize: "28px",
  fontWeight: "700",
  textAlign: "center" as const,
  margin: "32px 0 24px",
  letterSpacing: "-0.025em",
};

const hr = {
  borderColor: "#F3F4F6",
  margin: "32px 0",
  border: "none",
  borderTop: "1px solid #F3F4F6",
};

const paragraph = {
  color: "#4B5563",
  fontSize: "16px",
  lineHeight: "1.6",
  textAlign: "left" as const,
  fontFamily: "'Inter', sans-serif",
  margin: "16px 0",
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "40px 0",
};

const buttonStyle = {
  backgroundColor: "#EE3636",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "16px 32px",
  fontFamily: "'Inter', sans-serif",
  border: "none",
  cursor: "pointer",
};

const signature = {
  backgroundColor: "#FAFAFA",
  padding: "32px",
  borderRadius: "12px",
  margin: "40px 0",
  border: "1px solid #F3F4F6",
};

const founderTitle = {
  color: "#6B7280",
  fontSize: "14px",
  textAlign: "center" as const,
  fontFamily: "'Inter', sans-serif",
  margin: "8px 0 0 0",
  fontWeight: "500",
};

const footer = {
  color: "#9CA3AF",
  fontSize: "14px",
  lineHeight: "1.5",
  textAlign: "center" as const,
  margin: "32px 0 16px 0",
  fontFamily: "'Inter', sans-serif",
};

const anchor = {
  color: "#EE3636",
  textDecoration: "underline",
};

const linkStyle = {
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
};
