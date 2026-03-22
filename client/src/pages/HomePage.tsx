import { useEffect, useRef } from 'react';
import '../css/HomePage.css';
import ContentCard from '../components/FeatureSection/ContentCard';
import NavBar from '../components/NavBar';
import parallaxBg from '../assets/parallax-background.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKnight } from '@fortawesome/free-solid-svg-icons';


const HomePage = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.pageYOffset;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="homepage">
      <NavBar/>

      {/* Parallax Hero Section */}
      <div className="parallax-container">
        <div 
          ref={parallaxRef}
          className="parallax-background"
          style={{
            backgroundImage: `url(${parallaxBg})`
          }}
        />
        
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-ch">Ch
              
            </span>
            <span className="hero-yes fancy-italic">yes</span>
            <span className="hero-s">s</span>
          </h1>
          <p className="hero-subtitle">
            Where Strategy Meets Elegance
          </p>
          <button className="btn-primary hero-btn">
            <FontAwesomeIcon className='btn-icon' icon={faChessKnight}/>
            <span className="btn-text">PLAY!</span>
          </button>
        </div>
      </div>

      <ContentCard />
    </div>
    
  );
};

export default HomePage;