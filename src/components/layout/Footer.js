import { Link } from "react-router-dom";
import { X, LinkedIn, Whatsapp, FaceBook, Email, Phone } from "../svgs";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="contact">
                <Link to={"/contact"} className="link">Contact Us</Link>
                <div className="social">
                    <Link>
                        <LinkedIn />
                    </Link>
                    <Link>
                        <X />
                    </Link>
                    <Link>
                        <Whatsapp />
                    </Link>
                    <Link>
                        <FaceBook />
                    </Link>
                    
                </div>
                <p className="copy-right">GTF. All Rights Reserved ©2024</p>
            </div>
            <div className="contact-other">
                <div>
                    <Email />
                    <div>
                        <p>EMAIL</p>
                        <p>nwezechimaobi033@gmail.com</p>
                    </div>
                </div>
                <div>
                    <Phone />
                    <div>
                        <p>TELEPHONE</p>
                        <p>+234 810 792 8033</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
