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

const baseURL =
  process.env.NODE_ENV === "production" ? `${process.env.SITE_URL}` : "";

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
  maxWidth: "600px",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
};

const box = {
  padding: "0 48px",
};

const greeting = {
  fontFamily: "'Inter', sans-serif",
  color: "#0f172a",
  fontSize: "24px",
  fontWeight: "600",
  textAlign: "center" as const,
  margin: "30px 0 16px",
  letterSpacing: "-0.4px",
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

const buttonSection = {
  backgroundColor: "#f8fafc",
  padding: "24px",
  borderRadius: "8px",
  margin: "32px 0",
  textAlign: "center" as const,
  border: "1px solid #f1f5f9",
};

const buttonStyle = {
  background:
    "linear-gradient(to right, rgba(238, 54, 54, 1), rgba(238, 54, 54, 0.9), rgba(238, 54, 54, 0.8))",
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

const signature = {
  backgroundColor: "#f8fafc",
  padding: "24px",
  borderRadius: "8px",
  margin: "32px 0",
  border: "1px solid #f1f5f9",
};

const founderTitle = {
  color: "#94a3b8",
  fontSize: "14px",
  textAlign: "center" as const,
  fontFamily: "'Inter', sans-serif",
  margin: "8px 0 0 0",
  fontWeight: "500",
};

const footer = {
  color: "#94a3b8",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  margin: "8px 0",
  fontFamily: "'Inter', sans-serif",
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
