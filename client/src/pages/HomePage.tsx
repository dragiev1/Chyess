import "../css/HomePage.css";
import type { GameRequest } from "../types/user";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessKnight } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../components/NavBar";
import parallaxBg from "../assets/parallax-background.jpg";
import ContentCard from "../components/FeatureSection/ContentCard";

const HomePage = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  const [mode, SetMode] = useState('');
  const [timeControl, SetTimeControl] = useState('');
  const [playerColor, SetPlayerColor] = useState('');

  const handleGameRequest = (e: ChangeEvent<HTMLFormElement>) => {
    const gameRequest: GameRequest = {
      requestedId: Date.now(),
      mode: 'multiplayer',
      timeControl: 'classical',
      playerColor: "white",
      createdAt: new Date().toISOString(),
    };

    console.log(gameRequest);
    return;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.pageYOffset;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="homepage">
      <NavBar />

      {/* Parallax Hero Section */}
      <div className="parallax-container">
        <div
          ref={parallaxRef}
          className="parallax-background"
          style={{
            backgroundImage: `url(${parallaxBg})`,
          }}
        />

        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-ch">Ch</span>
            <span className="hero-yes fancy-italic">yes</span>
            <span className="hero-s">s</span>
          </h1>
          <p className="hero-subtitle">Where Strategy Meets Elegance</p>
          <form onSubmit={handleGameRequest} className="hero-form">
            <button
              type="submit"
              className="btn-primary hero-btn"
              value={mode}
              data-mode="multiplayer"
            >
              <FontAwesomeIcon className="btn-icon" icon={faChessKnight} />
              <span className="btn-text">PLAY!</span>
            </button>
          </form>
        </div>
      </div>

      <ContentCard />
    </div>
  );
};

export default HomePage;
