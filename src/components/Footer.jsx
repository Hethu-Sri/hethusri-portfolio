import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div>
        <span className="footer-content">© {new Date().getFullYear()} Hethu Sri</span>
        {/* <span className="footer-separator">·</span> */}
        {/* <span className="footer-content1">Built with React</span> */}
      </div>
    </footer>
  );
};

export default Footer;
