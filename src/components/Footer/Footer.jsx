export function Footer({ className = "" }) {
  const footerLinks = [
    { label: "Movies", href: "/movies" },
    { label: "This season", href: "/this-season" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ];

  const footerStyle = {
    backgroundColor: "#000000",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "32px 24px",
    marginTop: "auto",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
  };

  const linksContainerStyle = {
    display: "flex",
    gap: "48px",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  };

  const linkStyle = {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "400",
    transition: "all 0.3s ease",
    cursor: "pointer",
    opacity: "0.8",
    letterSpacing: "0.5px",
  };

  const copyrightStyle = {
    color: "#ffffff",
    fontSize: "14px",
    textAlign: "center",
    lineHeight: "1.6",
    opacity: "0.6",
    fontWeight: "300",
    letterSpacing: "0.5px",
  };

  const handleLinkHover = (e, isHover) => {
    if (isHover) {
      e.target.style.opacity = "1";
      e.target.style.transform = "translateY(-1px)";
    } else {
      e.target.style.opacity = "0.8";
      e.target.style.transform = "translateY(0)";
    }
  };

  return (
    <footer style={footerStyle} className={className}>
      <div style={containerStyle}>
        {/* Navigation Links */}
        <nav style={linksContainerStyle}>
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={linkStyle}
              onMouseEnter={(e) => handleLinkHover(e, true)}
              onMouseLeave={(e) => handleLinkHover(e, false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <div style={copyrightStyle}>
          © 2025 ANIME LIST™ | Made by ANIME LIST Team
        </div>
      </div>
    </footer>
  );
}

export default Footer;
