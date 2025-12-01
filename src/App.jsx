import React, { useState, useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import Swal from "sweetalert2";
import { BsVolumeUpFill, BsVolumeMuteFill } from "react-icons/bs";

import MouseStealing from './MouseStealer.jsx';
import lovesvg from "./assets/All You Need Is Love SVG Cut File.svg";
import Lovegif from "./assets/GifData/main_temp.gif";
import heartGif from "./assets/GifData/happy.gif";
import sadGif from "./assets/GifData/sad.gif";
import WordMareque from './MarqueeProposal.jsx';
import purposerose from './assets/GifData/RoseCute.gif';
import swalbg from './assets/Lovingbg2_main.jpg';
import loveu from './assets/GifData/cutieSwal4.gif';

//! yes - Gifs Importing
import yesgif0 from "./assets/GifData/Yes/lovecutie0.gif";
import yesgif1 from "./assets/GifData/Yes/love2.gif";
import yesgif2 from "./assets/GifData/Yes/love3.gif";
import yesgif3 from "./assets/GifData/Yes/love1.gif";
import yesgif9 from "./assets/GifData/Yes/lovecutie9.gif";
import yesgif10 from "./assets/GifData/Yes/lovecutie6.gif";
import yesgif11 from "./assets/GifData/Yes/lovecutie4.gif";
import yesgif12 from "./assets/GifData/cutieSwal2.gif";
import yesgif13 from "./assets/GifData/cutieSwal4.gif";
import yesgif14 from "./assets/GifData/happy.gif";
import yesgif15 from "./assets/GifData/heart.gif";
//! no - Gifs Importing
import nogif0 from "./assets/GifData/No/breakRej0.gif";
import nogif0_1 from "./assets/GifData/No/breakRej0_1.gif";
import nogif1 from "./assets/GifData/No/breakRej1.gif";
import nogif2 from "./assets/GifData/No/breakRej2.gif";
import nogif3 from "./assets/GifData/No/breakRej3.gif";
import nogif4 from "./assets/GifData/No/breakRej4.gif";
import nogif5 from "./assets/GifData/No/breakRej5.gif";
import nogif6 from "./assets/GifData/No/breakRej6.gif";
import nogif7 from "./assets/GifData/No/RejectNo.gif";
import nogif8 from "./assets/GifData/No/breakRej7.gif";

//! yes - Music Importing
import yesmusic1 from "./assets/AudioTracks/Love_LoveMeLikeYouDo.mp3";
import yesmusic2 from "./assets/AudioTracks/Love_EDPerfect.mp3";
import yesmusic3 from "./assets/AudioTracks/Love_Nadaaniyan.mp3";
import yesmusic4 from "./assets/AudioTracks/Love_JoTumMereHo.mp3";
//! no - Music Importing
import nomusic1 from "./assets/AudioTracks/Rejection_WeDontTalkAnyMore.mp3";
import nomusic2 from "./assets/AudioTracks/Rejection_LoseYouToLoveMe.mp3";
import nomusic3 from "./assets/AudioTracks/Reject_withoutMe.mp3";
import nomusic4 from "./assets/AudioTracks/Neutral_Base_IHateU.mp3";
import nomusic5 from "./assets/AudioTracks/Reject1_TooGood.mp3";

const YesGifs = [yesgif0, yesgif1, yesgif2, yesgif3, yesgif9, yesgif10, yesgif11, yesgif12, yesgif13, yesgif14, yesgif15];
const NoGifs = [nogif0, nogif0_1, nogif1, nogif2, nogif3, nogif4, nogif5, nogif6, nogif7, nogif8];
const YesMusic = [yesmusic1, yesmusic3, yesmusic4, yesmusic2];
const NoMusic = [nomusic1, nomusic2, nomusic3, nomusic4, nomusic5];

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [finalizedYes, setFinalizedYes] = useState(false); // new: after overlay close show final view
  const [currentAudio, setCurrentAudio] = useState(null); // Tracks the currently playing song
  const [currentGifIndex, setCurrentGifIndex] = useState(0); // Track the current gif index
  const [isMuted, setIsMuted] = useState(false);
  const [popupShown, setPopupShown] = useState(false);

  // NEW: show local thank-you overlay
  const [showThanksOverlay, setShowThanksOverlay] = useState(false);

  const gifRef = useRef(null); // Ref to ensure gif plays infinitely
  const yesButtonSize = Math.min(noCount * 14 + 16, 36); // limit max font size so it doesn't overflow

  const [floatingGifs, setFloatingGifs] = useState([]); // Array to store active floating GIFs
  const generateRandomPositionWithSpacing = (existingPositions) => {
    let position;
    let tooClose;
    const minDistance = 12; // Minimum distance in 'vw' or 'vh'

    do {
      position = {
        top: `${Math.random() * 80}vh`, // Keep within 80% of viewport height
        left: `${Math.random() * 85}vw`, // Keep within 85% of viewport width
      };

      tooClose = existingPositions.some((p) => {
        const dx = Math.abs(parseFloat(p.left) - parseFloat(position.left));
        const dy = Math.abs(parseFloat(p.top) - parseFloat(position.top));
        return Math.sqrt(dx * dx + dy * dy) < minDistance;
      });
    } while (tooClose);

    return position;
  };

  const handleMouseEnterYes = () => {
    const gifs = [];
    const positions = [];

    for (let i = 0; i < 8; i++) {
      const newPosition = generateRandomPositionWithSpacing(positions);
      positions.push(newPosition);

      gifs.push({
        id: `heart-${i}`,
        src: heartGif,
        style: {
          ...newPosition,
          animationDuration: `${Math.random() * 2 + 1}s`,
        },
      });
    }

    setFloatingGifs(gifs);
  };

  const handleMouseEnterNo = () => {
    const gifs = [];
    const positions = [];

    for (let i = 0; i < 8; i++) {
      const newPosition = generateRandomPositionWithSpacing(positions);
      positions.push(newPosition);

      gifs.push({
        id: `sad-${i}`,
        src: sadGif,
        style: {
          ...newPosition,
          animationDuration: `${Math.random() * 2 + 1}s`,
        },
      });
    }

    setFloatingGifs(gifs);
  };

  const handleMouseLeave = () => {
    setFloatingGifs([]); // floating GIFs on mouse leave
  };

  // This ensures the "Yes" gif keeps restarting and playing infinitely
  useEffect(() => {
    if (gifRef.current && (yesPressed || finalizedYes) && noCount > 3) {
      gifRef.current.src = YesGifs[currentGifIndex];
    }
  }, [yesPressed, finalizedYes, currentGifIndex]);

  // Use effect to change the Yes gif every 5 seconds
  useEffect(() => {
    if ((yesPressed || finalizedYes) && noCount > 3) {
      const intervalId = setInterval(() => {
        setCurrentGifIndex((prevIndex) => (prevIndex + 1) % YesGifs.length);
      }, 5000); // Change gif every 5 seconds

      // Clear the interval
      return () => clearInterval(intervalId);
    }
  }, [yesPressed, finalizedYes]);

  useEffect(() => {
    if (gifRef.current) {
      gifRef.current.src = gifRef.current.src; // Reset gif to ensure it loops infinitely
    }
  }, [noCount]);

  const handleNoClick = () => {
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    if (nextCount >= 4) {
      const nextGifIndex = (nextCount - 4) % NoGifs.length; // Start cycling through NoGifs
      if (gifRef.current) {
        gifRef.current.src = NoGifs[nextGifIndex];
      }
    }

    // Play song on first press or every 7th press after
    if (nextCount === 1 || (nextCount - 1) % 7 === 0) {
      const nextSongIndex = Math.floor(nextCount / 7) % NoMusic.length;
      playMusic(NoMusic[nextSongIndex], NoMusic);
    }
  };

  const handleYesClick = () => {
    // if yes clicked after teasing enough, show local overlay (single popup)
    if (noCount > 3) {
      playMusic(YesMusic[0], YesMusic);
      setShowThanksOverlay(true);
      setFloatingGifs([]); // tidy UI
    } else {
      // earlier playful behaviour for early Yes
      if (!popupShown) {
        setYesPressed(true);
      }
    }
  };

  const playMusic = (url, musicArray) => {
    if (currentAudio) {
      currentAudio.pause(); // Stop the currently playing song
      currentAudio.currentTime = 0; // Reset to the start
    }
    const audio = new Audio(url);
    audio.muted = isMuted;
    setCurrentAudio(audio); // Set the new audio as the current one
    audio.addEventListener('ended', () => {
      const currentIndex = musicArray.indexOf(url);
      const nextIndex = (currentIndex + 1) % musicArray.length;
      playMusic(musicArray[nextIndex], musicArray); // Play the next song in the correct array
    });
    audio.play();
  };

  const toggleMute = () => {
    if (currentAudio) {
      currentAudio.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const getNoButtonText = () => {
    // concise set of phrases (12 items)
    const phrases = [
      "Nahi? 😟",
      "Ek baar phir soch lo…",
      "Sach me itni jaldi mana kar dogi?",
      "Main wait kar sakta hoon… ek baar aur socho ❤️",
      "Please… bas ek chhota sa chance?",
      "Mujhe lagta hai tum haan kehogi…",
      "Dil kah raha hai tum yes bolne wali ho… 💕",
      "Aapko bura na lage isliye hi main darr gaya tha…",
      "Ek haan se mera poora din ban jayega 😌",
      "Tumhari smile yaad aa rahi hai… phir se socho?",
      "Main sach me tumhari feelings ki respect karta hoon ❤️",
      "Ek baar softly soch lo, please 😊"
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  // playful Swal for early yes (keeps original respectful tone)
  useEffect(() => {
    if (yesPressed && noCount < 4 && !popupShown) {
      Swal.fire({
        title: "Meri khushi ka thoda jhatka! 🥰",
        html: `<div style="text-align:left;">
                <p>Main bahut khush hu ki tumne socha. Bas thoda sa nakhre karke mujhe aur tarpa do — mujhe tumhara pyar chahiye, par tum thoda aur tease karo 😄</p>
                <p style="margin-top:8px;font-weight:600;">(Main tumhari izzat karta hu — agar comfortable nahi ho to bata dena.)</p>
               </div>`,
        width: 700,
        padding: "1.5em",
        color: "#333",
        background: `#fff url(${swalbg})`,
        backdrop: `
          rgba(0,0,0,0.25)
          url(${loveu})
          right
          no-repeat
        `,
      });
      setPopupShown(true);
      setYesPressed(false);
    }
  }, [yesPressed, noCount, popupShown]);

  useEffect(() => {
    if (noCount === 12) {
      Swal.fire({
        title: "Real love always finds a way… ❤️",
        html: `<div style="text-align:left;">
                <p>Chahe tum jitni baar ‘No’ kaho… mera pyaar utna hi strong hota ja raha hai.</p>
                <p>Main kabhi force nahi karunga… bas itna chahta hu ki tum ek baar dil se socho.</p>
                <p style="margin-top:10px;font-weight:600;">‘Real love always loves you, even when you push it away.’</p>
               </div>`,
        width: 850,
        padding: "2em",
        color: "#333",
        background: `#fff url(${swalbg})`,
        backdrop: `
          rgba(0, 0, 0, 0.6)
          url(${nogif1})
          right
          no-repeat
        `,
      });
    }
    console.log(noCount);

  }, [noCount]);

  /* ========== lightweight confetti for local overlay ========== */
  const [confettiParticles, setConfettiParticles] = useState([]);
  const confettiRef = useRef({ raf: null });

  const spawnConfetti = (x, y, count = 40) => {
    setConfettiParticles((prev) => [
      ...prev,
      ...Array.from({ length: count }).map(() => ({
        id: Math.random().toString(36).slice(2),
        x: x + (Math.random() - 0.5) * 80,
        y: y + (Math.random() - 0.5) * 80,
        vx: (Math.random() - 0.5) * 6,
        vy: - (Math.random() * 6 + 2),
        r: Math.random() * 6 + 4,
        color: ["#ff6b6b", "#ffb6b6", "#ffd7d7", "#ff8a80", "#b22f2f"][Math.floor(Math.random() * 5)],
        life: 0,
        ttl: 120 + Math.random() * 60,
      })),
    ]);
  };

  useEffect(() => {
    const loop = () => {
      setConfettiParticles((prev) => prev
        .map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy + 0.3, vy: p.vy + 0.3, life: p.life + 1 }))
        .filter(p => p.life < p.ttl)
      );
      confettiRef.current.raf = requestAnimationFrame(loop);
    };
    confettiRef.current.raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(confettiRef.current.raf);
  }, []);

  // When overlay opens, spawn a few bursts
  useEffect(() => {
    if (showThanksOverlay) {
      spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 120);
      const iv = setInterval(() => spawnConfetti(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 40), 300);
      setTimeout(() => clearInterval(iv), 2200);
    }
  }, [showThanksOverlay]);

  return (
    <>
      {/* Spline background */}
      <div className="fixed top-0 left-0 w-screen h-screen -z-10">
        <Spline scene="https://prod.spline.design/oSxVDduGPlsuUIvT/scene.splinecode" />
      </div>

      {/* MouseStealing removed so No button can be clicked always */}
      {/* {noCount > 16 && noCount < 25 && yesPressed == false && <MouseStealing />} */}

      <div className="overflow-hidden flex flex-col items-center justify-center pt-4 h-screen -mt-16 selection:bg-rose-600 selection:text-white text-zinc-900">
        {finalizedYes || (yesPressed && noCount > 3) ? (
          <>
            {/* Final celebration view (shows after overlay closed or if yesPressed state active) */}
            <img
              ref={gifRef}
              className="h-[230px] rounded-lg"
              src={YesGifs[currentGifIndex]}
              alt="Yes Response"
            />
            <div className="text-4xl md:text-6xl font-bold my-2" style={{ fontFamily: "Charm, serif", fontWeight: "700", fontStyle: "normal" }}>I Love You !!!</div>
            <div className="text-3xl md:text-4xl font-semibold my-1 text-center" style={{ fontFamily: "Beau Rivage, serif", fontWeight: "500", fontStyle: "normal" }}>
              You’re the love of my life.
            </div>

            <div className="mt-6 w-full flex justify-center">
              <WordMareque />
            </div>


      <div className="block mb-5 w-full">
        <div
          style={{
            marginTop: 16,
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Read Letter button: styled, accessible and mobile-friendly */}
          <a
            href="/letter.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
            style={{
              background: "linear-gradient(90deg,#22c55e,#16a34a)",
              color: "#fff",
              fontWeight: 700,
              padding: "12px 18px",
              borderRadius: 12,
              boxShadow: "0 10px 30px rgba(34,197,94,0.18)",
              border: "2px solid rgba(255,255,255,0.08)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              minWidth: 160,
              textAlign: "center",
            }}
          >
            Read Letter (PDF)
          </a>
        </div>
      </div>
          </>
        ) : (
          <>
            {/* Initial / teasing state */}
            <img
              src={lovesvg}
              className="fixed animate-pulse top-10 md:left-15 left-6 md:w-40 w-28"
              alt="Love SVG"
            />
            <img
              ref={gifRef}
              className="h-[230px] rounded-lg"
              src={Lovegif}
              alt="Love Animation"
            />

            {/* changed main heading text */}
            <h1 className="text-4xl md:text-6xl my-4 text-center">
              Kya tum meri zindagi banogi?
            </h1>

            <div className="flex flex-wrap justify-center gap-2 items-center">
              <button
                onMouseEnter={handleMouseEnterYes}
                onMouseLeave={handleMouseLeave}
                className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mr-4`}
                style={{ fontSize: yesButtonSize }}
                onClick={handleYesClick}
              >
                Yes
              </button>
              <button
                onMouseEnter={handleMouseEnterNo}
                onMouseLeave={handleMouseLeave}
                onClick={handleNoClick}
                className="bg-rose-500 hover:bg-rose-600 rounded-lg text-white font-bold py-2 px-4"
              >
                {noCount === 0 ? "No" : getNoButtonText()}
              </button>
            </div>

            {/* floating gifs (hearts / sad) */}
            {floatingGifs.map((gif) => (
              <img
                key={gif.id}
                src={gif.src}
                alt="Floating Animation"
                className="absolute w-12 h-12 animate-bounce"
                style={gif.style}
              />
            ))}
          </>
        )}

        {/* mute toggle */}
        <button
          className="fixed bottom-10 right-10 bg-gray-200 p-1 mb-2 rounded-full hover:bg-gray-300"
          onClick={() => {
            if (currentAudio) currentAudio.muted = !isMuted;
            setIsMuted(!isMuted);
          }}
        >
          {isMuted ? <BsVolumeMuteFill size={26} /> : <BsVolumeUpFill size={26} />}
        </button>

        <Footer />
      </div>

      {/* local thank-you overlay (single popup) */}
      {showThanksOverlay && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(10,10,10,0.45)" }}
        >
          <div style={{
            width: "min(92%,720px)",
            borderRadius: 18,
            padding: 20,
            textAlign: "center",
            background: "linear-gradient(180deg,#fff9f8,#fff2f2)",
            boxShadow: "0 40px 100px rgba(178,47,47,0.12)",
            border: "1px solid rgba(178,47,47,0.08)"
          }}>
            <div style={{ fontSize: 72 }}>💖</div>
            <h2 style={{ fontFamily: "Merriweather, serif", color: "#b22f2f", fontSize: 28, margin: "6px 0" }}>Thank you ❤️</h2>
            <p style={{ color: "#6b6b6b", fontSize: 16, margin: "8px 0" }}>Tumne 'Haan' bola — mera dil bhar aaya.</p>
            <div style={{ fontFamily: "Dancing Script, cursive", fontSize: 22, color: "#b22f2f", marginTop: 8 }}>
              I love you so much
            </div>

            <div style={{ marginTop: 16, display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => {
                  // close overlay and show final celebration content (marquee + gifs)
                  setShowThanksOverlay(false);
                  setFinalizedYes(true);
                  setYesPressed(true);
                  // stop audio when closing? keep if you prefer playing
                }}
                className="bg-rose-500 text-white font-bold py-2 px-6 rounded-lg"
              >
                Close ✨
              </button>
            </div>
          </div>

          {/* confetti particles */}
          <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 49 }}>
            {confettiParticles.map(p => (
              <div key={p.id} style={{
                position: "absolute",
                left: p.x,
                top: p.y,
                width: p.r * 2,
                height: p.r * 1.2,
                borderRadius: p.r,
                background: p.color,
                transform: `rotate(${p.life * 12}deg)`,
                opacity: Math.max(0, 1 - p.life / p.ttl)
              }} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

const Footer = () => {
  return (
    <a
      className="fixed bottom-2 right-2 backdrop-blur-md opacity-80 hover:opacity-95 border p-1 rounded border-rose-300 pointer-events-none"
      href="javascript:void(0)"
      rel="noopener noreferrer"
    >
      Made with{" "}
      <span role="img" aria-label="heart">
        ❤️
      </span>
      {" "}by Anand, Only for You
    </a>
  );
};
