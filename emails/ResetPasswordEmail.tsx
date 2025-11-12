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

interface ResetPasswordEmailProps {
  resetToken?: string;
  name?: string;
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

export default function ResetPasswordEmail({
  resetToken = "reset_token_123456789",
  name = "Chris",
}: ResetPasswordEmailProps) {
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
      <Preview>Reset your Insights & Vignettes account password</Preview>
      <Body style={main}>
        <Container style={container} className="container">
          <Section style={box} className="content">
            <EmailLogo />

            <Text style={greeting} className="greeting">
              Hi {name}!
            </Text>
            <Text style={header} className="header">
              Reset Your Password
            </Text>

            <Hr style={hr} />

            <Text style={paragraph} className="paragraph">
              We received a request to reset the password for your Insights &
              Vignettes account. If you made this request, click the button
              below to create a new password:
            </Text>

            <Section style={buttonSection}>
              <Link
                href={`${baseURL}/reset-password/${resetToken}`}
                style={buttonStyle}
              >
                Reset Password
              </Link>
              <Text style={buttonExpiry}>
                ⏱️ This link will expire in 15 minutes
              </Text>
            </Section>

            <Text style={paragraph} className="paragraph">
              For your security, this password reset link is only valid for{" "}
              <strong>15 minutes</strong>. After that, you'll need to request a
              new one.
            </Text>

            <Text style={cautionText}>
              <strong>⚠️ Security Notice:</strong> If you didn't request a
              password reset, please ignore this email or contact our support
              team immediately. Your account remains secure, and no changes have
              been made.
            </Text>

            <Text style={paragraph} className="paragraph">
              This link can only be used once. After you've successfully reset
              your password, this link will no longer be valid.
            </Text>

            <Hr style={hr} />

            <Text style={paragraph} className="paragraph">
              <strong>Need Help?</strong>
            </Text>

            <Text style={paragraph} className="paragraph">
              If you're having trouble with the button above, you can copy and
              paste this link into your browser:
            </Text>

            <Text
              style={{
                ...paragraph,
                color: "#EE3636",
                fontSize: "14px",
                wordBreak: "break-all" as const,
                backgroundColor: "#f8fafc",
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid #f1f5f9",
              }}
            >
              {baseURL}/reset-password/{resetToken}
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              © {new Date().getFullYear()} Insights & Vignettes. All rights
              reserved.
            </Text>
            <Text style={footer}>
              This email was sent to you because a password reset was requested
              for your account.
            </Text>
            <Text style={footer}>
              <Link href={`${baseURL}/contact`} style={anchor}>
                Contact Support
              </Link>{" "}
              |{" "}
              <Link href={`${baseURL}/privacy-policy`} style={anchor}>
                Privacy Policy
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles matching the existing email templates
const main = {
  backgroundColor: "#f8fafc", // muted background
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  padding: "40px 0",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0",
  maxWidth: "600px",
  borderRadius: "8px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
};

const box = {
  padding: "0 48px",
};

const greeting = {
  color: "#0f172a", // foreground color
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "32px",
  textAlign: "left" as const,
  fontFamily: "'Inter', sans-serif",
  margin: "16px 0 8px",
};

const header = {
  color: "#0f172a", // foreground color from homepage
  fontSize: "32px",
  fontWeight: "700",
  lineHeight: "40px",
  textAlign: "left" as const,
  fontFamily: "'Inter', sans-serif",
  margin: "0 0 20px",
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

const buttonExpiry = {
  fontFamily: "'Inter', sans-serif",
  color: "#94a3b8",
  fontSize: "12px",
  margin: "8px 0 0",
};

const cautionText = {
  color: "#64748b",
  fontSize: "14px",
  lineHeight: "20px",
  textAlign: "left" as const,
  fontFamily: "'Inter', sans-serif",
  margin: "16px 0",
  backgroundColor: "#fef3c7",
  padding: "12px 16px",
  borderRadius: "6px",
  borderLeft: "4px solid #EE3636",
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
