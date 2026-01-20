import React from "react";

export default function Hero() {
  return (
    <section
      id="home"
      className="hero"
      role="region"
      aria-label="Homepage hero"
    >
      <div className="hero-content">
        <h1>Empowering Sudanese Youth Through Education</h1>
        <p>
          Learn 4 Sudan connects students with scholarships, online courses, and
          global learning opportunities.
        </p>
        <a href="#programs" className="btn-primary">
          Apply Now
        </a>
      </div>
    </section>
  );
}
