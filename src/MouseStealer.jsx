import React, { useState, useEffect, useRef } from "react";
import "./MouseStealer.css";

const CONSTANTS = {
  assetPath: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/184729",
};

const ASSETS = {
  head: `${CONSTANTS.assetPath}/head.svg`,
  waiting: `${CONSTANTS.assetPath}/hand.svg`,
  grabbing: `${CONSTANTS.assetPath}/hand.svg`,
  grabbed: `${CONSTANTS.assetPath}/hand-with-cursor.svg`,
};

Object.values(ASSETS).forEach((src) => {
  const img = new Image();
  img.src = src;
});

const GrabZone = ({ cursorGrabbed, onCursorGrabbed }) => {
  const [nearZone, setNearZone] = useState(false);
  const [inZone, setInZone] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const isNear =
        e.clientX > window.innerWidth * 0.6 &&
        e.clientX < window.innerWidth * 0.7 &&
        e.clientY > window.innerHeight - 400;
      const isIn = e.clientX >= window.innerWidth * 0.7 && e.clientY > window.innerHeight - 400;
      setNearZone(isNear);
      setInZone(isIn);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={`grab-zone ${
        inZone ? "grab-zone--active" : nearZone ? "grab-zone--peek" : ""
      }`}
    >
      <Grabber
        cursorGrabbed={cursorGrabbed}
        onCursorGrabbed={onCursorGrabbed}
        active={inZone}
        near={nearZone}
      />
    </div>
  );
};

const Grabber = ({ cursorGrabbed, onCursorGrabbed, active, near }) => {
  const ref = useRef(null);
  const [stealing, setStealing] = useState(false);

  const handleMouseEnter = () => {
    if (!cursorGrabbed && active) {
      onCursorGrabbed();
      setStealing(true);
    }
  };

  useEffect(() => {
    if (stealing) {
      const timer = setTimeout(() => setStealing(false), 8000); // Reset after 8 seconds
      return () => clearTimeout(timer);
    }
  }, [stealing]);

  return (
    <div
      className={`grabber ${
        stealing
          ? "grabber--stealing"
          : cursorGrabbed
          ? "grabber--grabbed"
          : near
          ? "grabber--near"
          : "grabber--waiting"
      }`}
      ref={ref}
      onMouseEnter={handleMouseEnter}
    >
      <div className="grabber__eyes">
        <div className="grabber__eye grabber__eye--left" />
        <div className="grabber__eye grabber__eye--right" />
      </div>
      <img className="grabber__face" src={ASSETS.head} alt="head" />
      <img
        className="grabber__hand"
        src={ASSETS[cursorGrabbed ? "grabbed" : "waiting"]}
        alt="hand"
      />
    </div>
  );
};

const App = () => {
  const [cursorGrabbed, setCursorGrabbed] = useState(false);

  const handleCursorGrabbed = () => {
    setCursorGrabbed(true);
    document.body.style.cursor = "none"; // Hide cursor globally
    const grabberElement = document.querySelector(".grabber");
    if (grabberElement) {
      grabberElement.style.cursor = "none"; // Hide cursor on grabber
    }

    setTimeout(() => {
      setCursorGrabbed(false);
      document.body.style.cursor = "";
      if (grabberElement) {
        grabberElement.style.cursor = "";
      }
    }, 8000); // Release the grab after 8 seconds
  };

  return (
    <div>
      <GrabZone cursorGrabbed={cursorGrabbed} onCursorGrabbed={handleCursorGrabbed} />
    </div>
  );
};

export default App;
