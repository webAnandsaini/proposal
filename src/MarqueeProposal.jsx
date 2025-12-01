import React, { useState, useEffect } from "react";

const MarqueeProposal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sentences = [
    "Tumhari aankhon mein meri duniya bas gayi hai.",
    "Tumhari simple si muskaan — meri sabse badi khushi hai.",
    "Mere din tumse hi shuru aur tumpe hi khatam hote hain.",
    "Tumhare saath har lamha ek naya khazana lagta hai.",
    "Main tumhare bina apna future soch bhi nahi sakta.",
    "Tum mere liye woh roshni ho jo andheron ko hata de.",
    "Bas ek haan chahiye — baaki mein zindagi bhar nibhaunga.",
    "Tumhara saath hi mujhe poora karta hai.",
    "Mere dil ki har dhadkan ab tumhare liye hai.",
    "Kya tum sach mein meri zindagi banogi? ❤️",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, 8000); // change sentence every 9 seconds (match animation)
    return () => clearInterval(interval);
  }, [sentences.length]);

  return (
    <div
      style={{
        borderRadius: "24px",
        overflow: "hidden",
        position: "relative",
        background: "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,250,250,0.7))",
        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
        border: "1px solid rgba(255,255,255,0.22)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px 16px",
        maxWidth: 900,
        margin: "50px auto",
        height: 78,
      }}
      className="w-full md:w-1/2 my-[50px] mx-auto max-md:mx-10"
    >
      {/* key={currentIndex} forces remount so animation restarts cleanly each time */}
      <div
        style={{
          whiteSpace: "nowrap",
          position: "absolute",
          willChange: "transform, opacity",
          animation: `marquee 9s linear 0s 1`,
        }}
        key={currentIndex}
        aria-live="polite"
      >
        <span
          style={{
            fontSize: "1.6rem",
            fontFamily: "Charm, serif",
            fontWeight: 700,
            color: "#121212",
            textShadow: "0 6px 18px rgba(0,0,0,0.18)",
            display: "inline-block",
            padding: "0 20px",
          }}
        >
          {sentences[currentIndex]}
        </span>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          50% {
            transform: translateX(0%);
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            transform: translateX(-100%);
            opacity: 0;
          }
        }

        /* small responsive tweak */
        @media (max-width: 420px) {
          div[style*="animation: marquee"] span {
            font-size: 1.15rem !important;
            padding: 0 12px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MarqueeProposal;
