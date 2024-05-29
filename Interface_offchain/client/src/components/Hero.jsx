import React from "react";
import image from "../images/heroimg.jpg";
import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Your Health, Your Record<br />
          Our Responsibility
        </h1>
        <p>
          Welcome to MedBlock (HMS), where seamless communication between
          patients and hospital is our top priority. With our user friendly
          interface, you can easily book appointments, view your medical
          history, and much more. experience the convience of modern healthcare 
          management with us.
        </p>
      </div>
      <div className="hero-img">
        <img
          src={image}
          alt="hero"
        />
      </div>
    </section>
  );
};

export default Hero;
