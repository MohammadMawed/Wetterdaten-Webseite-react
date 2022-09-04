import React from 'react';
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../img/logo.png";
import "../Styles/main.css";

const NavBar = () => {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    return (
        <header>
            <img src={logo}/>
            <nav ref={navRef}>
                <a href="/#">Home</a>
                <a href="/#">Data</a>
                <a href="/#">About</a>
                <a href="/#">Contact</a>

                <button className="nav-btn nav-close" onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>

            <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    )
}

export default NavBar;