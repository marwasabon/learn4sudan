import React from "react";

export default function AboutSection() {
  return (
    <section id="about" className="about">
      <h2>About Us</h2>
      <p>
        Learn 4 Sudan is a non-profit organization dedicated to creating
        educational opportunities for Sudanese youth. Our mission is to make
        quality learning accessible to everyone, regardless of background or
        location.
      </p>
      <div className="about-grid">
        <div className="card">
          <h3>Our Mission</h3>
          <svg
            className="card-illustration"
            width="84"
            height="84"
            viewBox="0 0 381.818 381.818"
            aria-labelledby="about-mission-title"
            role="img"
          >
            <title id="about-mission-title">Mission: flag on summit</title>
            <g>
              <rect
                x="175.909"
                y="25.909"
                width="30"
                height="140"
                fill="#0052B4"
              />
              <polygon
                points="280.909,85.909 175.909,85.909 175.909,25.909 280.909,25.909 260.909,55.909"
                fill="#FF9811"
              />
              <polygon
                points="280.909,85.909 175.909,85.909 280.909,25.909 260.909,55.909"
                fill="#FF5023"
              />
              <g>
                <polygon
                  points="50.909,355.909 330.909,355.909 190.909,135.909"
                  fill="#0052B4"
                />
                <polygon
                  points="190.909,355.909 330.909,355.909 190.909,135.909"
                  fill="#006DF0"
                />
                <polygon
                  points="241.818,215.909 190.909,135.909 140,215.909"
                  fill="#78B9EB"
                />
                <polygon
                  points="241.818,215.909 190.909,135.909 190.909,215.909"
                  fill="#AED5F3"
                />
              </g>
              <g>
                <polygon
                  points="190.909,355.909 381.818,355.909 286.363,205.909"
                  fill="#0052B4"
                />
                <polygon
                  points="286.363,355.909 381.818,355.909 286.363,205.909"
                  fill="#006DF0"
                />
                <polygon
                  points="321.074,260.455 286.363,205.909 251.653,260.455"
                  fill="#78B9EB"
                />
                <polygon
                  points="321.074,260.455 286.363,205.909 286.363,260.455"
                  fill="#AED5F3"
                />
              </g>
              <g>
                <polygon
                  points="0,355.909 190.909,355.909 95.454,205.909"
                  fill="#0052B4"
                />
                <polygon
                  points="95.454,355.909 190.909,355.909 95.454,205.909"
                  fill="#006DF0"
                />
                <polygon
                  points="130.165,260.455 95.454,205.909 60.744,260.455"
                  fill="#78B9EB"
                />
                <polygon
                  points="130.165,260.455 95.454,205.909 95.454,260.455"
                  fill="#AED5F3"
                />
              </g>
            </g>
          </svg>
          <p>
            Empower youth through free access to online learning, scholarships,
            and global mentorship.
          </p>
        </div>
        <div className="card">
          <h3>Our Community</h3>
          <svg
            className="card-illustration"
            width="64"
            height="64"
            viewBox="0 0 64 64"
            aria-labelledby="about-community-title"
            role="img"
          >
            <title id="about-community-title">Community: people together</title>
            {/* Heads */}
            <circle cx="32" cy="18" r="6" fill="#FFDA44" />
            <circle cx="18" cy="22" r="5" fill="#006DF0" />
            <circle cx="46" cy="22" r="5" fill="#0052B4" />
            {/* Shoulders / bodies */}
            <path
              d="M22 38c6-8 14-8 20 0"
              fill="#80cbc4"
              stroke="#004d40"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M8 40c4-6 12-6 16 0"
              fill="none"
              stroke="#004d40"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M40 40c4-6 12-6 16 0"
              fill="none"
              stroke="#004d40"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p>
            We partner with volunteers and educational institutions to build a
            sustainable learning ecosystem.
          </p>
        </div>
        <div className="card">
          <h3> Our Vision</h3>
          <svg
            className="card-illustration"
            width="84"
            height="84"
            viewBox="0 0 330 330"
            aria-labelledby="about-vision-title"
            role="img"
          >
            <title id="about-vision-title">Vision: target with arrow</title>
            <g>
              <circle cx="160" cy="170" r="160" fill="#0052B4" />
              <path
                d="M160,10c88.365,0,160,71.634,160,160s-71.635,160-160,160"
                fill="#006DF0"
              />
              <circle cx="160" cy="170" r="120" fill="#FFDA44" />
              <circle cx="160" cy="170" r="80" fill="#0052B4" />
              <path
                d="M160,90c44.183,0,80,35.817,80,80s-35.817,80-80,80"
                fill="#006DF0"
              />
              <circle cx="160" cy="170" r="40" fill="#FFDA44" />
              <g>
                <path
                  d="M241.611,67.175l-8.031,8.031l-28.62,28.62l-29.34,29.34l-22.397,22.398 c-5.857,5.857-5.857,15.355,0,21.213c5.857,5.858,15.355,5.858,21.214,0l22.398-22.397l29.34-29.339l28.619-28.62l8.032-8.031 L241.611,67.175z"
                  fill="#FFFFFF"
                />
                <polygon
                  points="241.611,67.175 238.076,91.924 280.502,49.497 287.574,0 249.924,37.649 245.146,42.427"
                  fill="#FF5023"
                />
                <polygon
                  points="238.076,91.924 262.825,88.389 287.573,84.853 292.351,80.075 330,42.427 280.502,49.497"
                  fill="#FF9811"
                />
              </g>
            </g>
          </svg>
          <p>
            A future where every Sudanese student can learn, grow, and lead in
            the digital era.
          </p>
        </div>
      </div>
    </section>
  );
}
