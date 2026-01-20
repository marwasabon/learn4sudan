import React, { useState } from "react";

export default function QuotesCarousel({ title, items }) {
  const [index, setIndex] = useState(0);
  const total = items.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);
  const active = items[index];

  return (
    <div role="region" aria-label="Quotes carousel" className="quotes-carousel">
      <h2 className="quotes-title">
        {title.split(" ").map((word, i) => (
          <span key={i} className="quotes-title-word">
            {word}
            {i === 1 ? <span aria-hidden="true" className="quotes-underline" /> : null}
          </span>
        ))}
      </h2>

      <blockquote className="quotes-text">“{active.text}”</blockquote>
      <div className="quotes-author">{active.author}</div>

      <button type="button" aria-label="Previous quote" onClick={prev} className="quotes-nav prev">‹</button>
      <button type="button" aria-label="Next quote" onClick={next} className="quotes-nav next">›</button>

      <div role="tablist" aria-label="Quote navigation" className="quotes-dots">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to quote ${i + 1}`}
            aria-selected={index === i}
            onClick={() => setIndex(i)}
            className={`quotes-dot ${index === i ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
