import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessKnight } from "@fortawesome/free-solid-svg-icons";
import "/src/css/NavBar.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
          <div className="nav-left">
            <Link to="/" className="nav-link icon nav-text">
              <FontAwesomeIcon icon={faChessKnight} />
            </Link>

            <Link to="Chyess/play" className="nav-links nav-text">
              PLAY
            </Link>
          </div>
          <div className="nav-right">
            <Link to="Chyess/login" className="nav-links nav-text">
              LOGIN
            </Link>
          </div>
        </div>
    </nav>
  );
};

export default NavBar;
