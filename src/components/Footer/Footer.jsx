import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__name">Developed by &copy; Babitha Vaithianathan</p>
      <p className="footer__year">{new Date().getFullYear()}</p>
    </footer>
  );
}
