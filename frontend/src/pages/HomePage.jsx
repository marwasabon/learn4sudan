import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import programsApi from "../api/programsApi.js";
import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import ProgramsSection from "../components/home/ProgramsSection";
import QuotesCarousel from "../components/home/QuotesCarousel";
import Footer from "../components/home/Footer";
import "../components/home/home.css";

export default function HomePage() {
  const [programs, setPrograms] = useState([]);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMsg, setNewsletterMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await programsApi.getPrograms();
        setPrograms(Array.isArray(data) ? data : data?.programs || []);
      } catch (_e) {
        // ignore; programs section still shows static content
      }
    };
    load();
  }, []);

  const goApply = (id) => navigate(`/apply/${id}`);

  return (
    <div>
      {/* Hero / Home */}
      <main id="main-content">
        <Hero />
        <AboutSection />
        <ProgramsSection programs={programs} onApply={goApply} />
        <QuotesCarousel
          title="Everyone loves Learn4Sudan "
          items={[
            {
              text: "I love Learn 4 Sudan so much. It makes my life so much easier.",
              author: "Alexandria Patinka, educator",
            },
            {
              text: "The mentorship program helped me structure my learning and stay motivated.",
              author: "Mohamed Idris, student",
            },
            {
              text: "Scholarships gave me access to courses I couldn’t afford before.",
              author: "Sara Osman, learner",
            },
            {
              text: "Community support and workshops helped me land my first internship.",
              author: "Yasir Elhadi, graduate",
            },
          ]}
        />
        <section id="gallery" className="gallery" aria-label="Learner gallery">
          <h2>In Pictures</h2>
          <p className="gallery-subtitle">
            Moments from workshops, study groups, and graduation days.
          </p>
          <div className="gallery-grid">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="gallery-item">
                <img
                  src={`/assets/images/gallery-${n}.jpg`}
                  alt={`Gallery image ${n}`}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      "/assets/images/gallery-placeholder.jpg";
                  }}
                  className="gallery-image"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.04)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            ))}
          </div>
        </section>

        {/* Application form moved to protected Apply page */}

        {/* Contact 
        <section id="contact" className="contact">
          <h2>Contact Us</h2>
          <p>
            Have questions? Reach out to our team — we’d love to hear from you!
          </p>
          <div className="contact-info">
            <p>
              📧 Email:{" "}
              <a href="mailto:contact@learn4sudan.org">
                contact@learn4sudan.org
              </a>
            </p>
            <p>
              🔗 Facebook:{" "}
              <a
                href="https://facebook.com/Learn4Sudan"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn4Sudan
              </a>
            </p>
          </div>
        </section>*/}
      </main>

      <Footer
        newsletterEmail={newsletterEmail}
        onNewsletterEmailChange={setNewsletterEmail}
        newsletterMsg={newsletterMsg}
        onNewsletterSubmit={() => {
          const ok = /.+@.+\..+/.test(newsletterEmail);
          setNewsletterMsg(
            ok ? "Thanks for subscribing!" : "Please enter a valid email."
          );
          if (ok) setNewsletterEmail("");
        }}
      />
    </div>
  );
}
