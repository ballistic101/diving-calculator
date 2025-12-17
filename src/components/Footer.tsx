import './Footer.css';

function Footer() {
    const year = new Date().getFullYear();
    return (
        <div className="footer">
            <span>Copyright &copy; {year} Prairie Dog Consulting LLC</span>
        </div>
    );
}

export default Footer;