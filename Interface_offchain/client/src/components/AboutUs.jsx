import React from "react";
import image from "../images/aboutimg.jpg";

const AboutUs = () => {
  return (
    <>
      <section className="container">
        <h2 className="page-heading about-heading">About Us</h2>
        <div className="about">
          <div className="hero-img">
            <img src={image} alt="hero" />
          </div>
          <div className="hero-content">
            <p>
              Welcome to Medblock, a decentralized platform for storing and
              managing your health records. We provide a secure and transparent
              way to store your health records.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
