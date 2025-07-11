import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LandingLogo.png";
import Hero_image from "../assets/hero.png";
import nin_icon from "../assets/ninVer.png";
import bvn_Icon from "../assets/bvnVer.png";
import facialIcon from "../assets/facialRecognition.png";
import howIt from "../assets/hwt.png";
import howItmobile from "../assets/mobileHwt.png";
import perfectdesktop from "../assets/perfectdesktop.png";
import perfectMobile from "../assets/perfectMobile.png";
import "../landing.css";
const LandingPage = () => {
  const [menuBarOpen, setmenuBarOpen] = useState(false);
  const navigate = useNavigate();
  const togglemenuBar = () => {
    setmenuBarOpen(!menuBarOpen);
  };

  return (
    <div className="landing-page">
      {/* Overlay */}
      <div
        className={`overlay ${menuBarOpen ? "active" : ""}`}
        onClick={togglemenuBar}
      ></div>

      {/* menuBar */}
      <div className={`menuBar ${menuBarOpen ? "open" : ""}`}>
        <button className="menuBar-close" onClick={togglemenuBar}>
          ×
        </button>
        <nav className="menuBar-nav">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#how-it-works">How it works</a>
          <a href="#contact">Contact</a>
          <button
            onClick={() =>
              (window.location.href = "mailto:info@megasprintlimited.com.ng")
            }
            className="contact-btn"
            style={{ marginTop: "1rem" }}
          >
            Contact us
          </button>
        </nav>
      </div>

      {/* Header */}
      <header className="header">
        <div className="logos">
          <img src={logo} alt="logo" />
        </div>
        <nav className="nav-desktop">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#how-it-works">How it works</a>
          <a href="#contact">Contact</a>
          <button className="contact-btn">Contact us</button>
        </nav>
        <button className="hamburger" onClick={togglemenuBar}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="clip">Secure Identity</h1>
          <h1 className="dark">
            <span>Verification SDKs</span>
          </h1>
          <p>
            Fast and reliable BVN & NIN verification with facial recognition
            technology for your applications.
          </p>
          <button onClick={() => navigate("/signup")} className="cta-button">
            <span className="inner-content">
              Get Started Today <span>→</span>
            </span>
          </button>
        </div>
        <div className="hero-image">
          <img className="globe" src={Hero_image} alt="hero-image" />
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="features">
        <h2>Services we offer</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <img src={bvn_Icon} alt="bvn" />
              <img src={bvn_Icon} alt="bvn" />
            </div>
            <h3>BVN Verification</h3>
            <p>
              Quickly verify Bank Verification Numbers (BVN) with our
              easy-to-integrate SDK, helping customers are who they claim to be.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <img src={nin_icon} alt="nin" />
            </div>
            <h3>NIN Verification</h3>
            <p>
              Validate National Identification Numbers (NIN) in real-time,
              providing secure identity confirmation for your users.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <img src={facialIcon} alt="facial" />
            </div>
            <h3>Facial Recognition</h3>
            <p>
              Advanced facial recognition technology that matches users' faces
              with their registered identity for additional security.
            </p>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="plans" id="pricing">
        <div className="plans-header">
          <h2>
            The Right Plan for{" "}
            <span style={{ color: "rgba(38, 78, 202, 1)", display: "block" }}>
              Your Business
            </span>
          </h2>
          <p>
            We have several powerful plans to showcase your business and get
            discovered as a creative entrepreneur
          </p>
        </div>
        <div className="plans-grid">
          <div className="plan-card">
            <h3>BVN Verification</h3>

            <ul className="plan-features">
              <li>Real-time verification</li>
              <li>Detailed BVN data</li>
              <li>Facial matching available</li>
              <li>API documentation</li>
              <li>Technical support</li>
            </ul>

            <div className="plan-price">
              ₦60<span>/per verification</span>
            </div>

            <button onClick={() => navigate("/signup")} className="plan-button">
              Get Started
            </button>
          </div>
          <div className="plan-card">
            <h3>NIN Verification</h3>

            <ul className="plan-features">
              <li>Instant NIN validation</li>
              <li>Complete identity details</li>
              <li>Facial matching available</li>
              <li>API documentation</li>
              <li>Technical support</li>
            </ul>

            <div className="plan-price">
              ₦65<span>/per verification</span>
            </div>
            <button onClick={() => navigate("/signup")} className="plan-button">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works" id="how-it-works">
        <img className="hwtDesktop" src={howIt} alt="bg" />
        <img className="hwtMobile" src={howItmobile} alt="bg" />
      </section>

      {/* Perfect For Section */}
      <section className="perfect-for">
        <img className="pDesktop" src={perfectdesktop} alt="bg" />
        <img className="pMobile" src={perfectMobile} alt="bg" />
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <p>© 2025 SpiritCheck. All rights reserved.</p>
        <p>Email: info@megasprintlimited.com.ng</p>
      </footer>
    </div>
  );
};

export default LandingPage;
