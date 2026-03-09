function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3>MiniMart</h3>
          <p>Your one-stop shop for quality gadgets.</p>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@minimart.com</p>
          <p>Phone: +91 86107 79485</p>
        </div>

        <div className="footer-section">
          <button
            className="back-to-top"
            onClick={scrollToTop}
            type="button"
            aria-label="Scroll back to top"
          >
            Back to Top
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        Copyright {new Date().getFullYear()} MiniMart. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
