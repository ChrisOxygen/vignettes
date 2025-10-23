import { Link, Row, Img } from "@react-email/components";

const baseURL =
  process.env.NODE_ENV === "production" ? `${process.env.SITE_URL}` : "";

const linkStyle = {
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
};

export const EmailLogo = () => {
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
