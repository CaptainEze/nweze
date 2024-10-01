import { NavLink } from "react-router-dom";
import { MenuCloseIcon, MenuIcon } from "../svgs";
import { useState } from "react";

const Header = () => {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <header id="header">
            <span className="org-id">GTF</span>
            <nav className={`nav desktop ${navOpen ? "on" : "off"}`}>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/contact"}>Contact Us</NavLink>
                <NavLink to={"/about"}>About</NavLink>
                <button
                    className="brdls bgls mobile close"
                    onClick={() => {
                        setNavOpen(false);
                    }}
                >
                    <MenuCloseIcon />
                </button>
            </nav>
            <button
                className="brdls bgls mobile open-menu"
                onClick={() => {
                    setNavOpen(true);
                }}
            >
                <MenuIcon />
            </button>
        </header>
    );
};

export default Header;
