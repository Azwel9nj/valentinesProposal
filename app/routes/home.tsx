import { useState, useEffect, useRef } from "react";
import type { Route } from "./+types/home";
import "../app.css";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "💝 Will You Be My Valentine? 💝" },
    { name: "description", content: "A special Valentine's Day proposal" },
  ];
}

// Image Carousel Component
interface ImageCarouselProps {
  images: string[];
  alts: string[];
  autoPlay?: boolean;
  interval?: number;
}

function ImageCarousel({ images, alts, autoPlay = true, interval = 4000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, images.length, interval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000); // Resume auto-play after 5s
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="carousel-slides"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className="carousel-slide">
              <img src={img} alt={alts[index]} className="carousel-image" />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button className="carousel-arrow carousel-arrow-left" onClick={goToPrevious}>
          ‹
        </button>
        <button className="carousel-arrow carousel-arrow-right" onClick={goToNext}>
          ›
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [noClickCount, setNoClickCount] = useState(0);
  const [showYesMessage, setShowYesMessage] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play Rick Astley when celebration shows
  useEffect(() => {
    if (showYesMessage && audioRef.current) {
      // Start muted (browsers allow this), then unmute
      audioRef.current.muted = true;
      audioRef.current.play().then(() => {
        // Unmute after playing starts
        if (audioRef.current) {
          audioRef.current.muted = false;
          audioRef.current.volume = 0.3; // 30% volume
        }
      }).catch(err => console.log('Audio play failed:', err));
    }
  }, [showYesMessage]);

  const sweetMessages = [
    "Every moment with you feels like a dream come true... 💕",
    "You make my heart skip a beat with every smile... 🌹",
    "Being with you is my favorite place to be... 💖"
  ];

  const handleYesClick = () => {
    setShowYesMessage(true);
  };

  const handleNoClick = () => {
    setNoClickCount(prev => prev + 1);
  };

  const getNoButtonStyle = (): React.CSSProperties => {
    if (noClickCount === 0) return {};

    const scale = Math.max(0.3, 1 - (noClickCount * 0.15));
    const randomX = Math.random() * 100 - 50;
    const randomY = Math.random() * 100 - 50;

    return {
      transform: `translate(${randomX}px, ${randomY}px) scale(${scale})`,
      transition: 'all 0.3s ease'
    };
  };

  const getNoButtonText = () => {
    switch (noClickCount) {
      case 0: return "No";
      case 1: return "Are you sure?";
      case 2: return "Really?";
      case 3: return "Think again...";
      case 4: return "Please? 🥺";
      case 5: return "Ekse you performing";
      case 6: return "I ll buy you sharwama.";
      case 7: return "Saht you can't tounce.";
      case 8: return "Apa its to just say yes.";
      case 9: return "YOU TRIPPING BALLS 🥺";
      case 10: return "YOU TRIPPING BALLS 🥺";
      default: return "SAHHHHT IWE🥺"
    }
  };

  if (showYesMessage) {
    return (
      <div className="proposal-container">
        {/* Rick Roll Audio - Hidden */}
        <audio ref={audioRef} loop>
          <source src="https://ia800503.us.archive.org/29/items/NeverGonnaGiveYouUp/jocofullinterview41.mp3" type="audio/mpeg" />
        </audio>

        {/* Confetti */}
        <div className="confetti-container">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="confetti"></div>
          ))}
        </div>

        {/* Floating Hearts - More of them! */}
        <div className="floating-hearts">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="heart">❤️</div>
          ))}
        </div>

        {/* Floating GIFs */}
        <div className="floating-gifs">
          <img
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHFjajBpMmdybjI3bGdicHc5a2JlMmY3Mmx5c3c1a2gzMmZoOXZ4MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/s27IzBhyGasp6aFO3e/giphy.gif"
            alt="Celebration"
            className="floating-gif floating-gif-1"
          />
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXRqbmdmZndyeXA3aXZxNTF2ZXp1bG01bWxrZDJwMWFjcTJpOTNsZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xEXrQdtLXrAdmyeFA7/giphy.gif"
            alt="Celebration"
            className="floating-gif floating-gif-2"
          />
          <img
            src="https://media.giphy.com/media/g9582DNuQppxC/giphy.gif"
            alt="Love"
            className="floating-gif floating-gif-3"
          />
          <img
            src="https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif"
            alt="Hearts"
            className="floating-gif floating-gif-4"
          />
        </div>

        <div className="proposal-card celebration-card">
          <h1 className="proposal-title celebration-title" style={{ position: 'relative' }}>
            🎉 YES! 🎉
            <span className="sparkle" style={{ top: '10%', left: '20%' }}></span>
            <span className="sparkle" style={{ top: '20%', right: '15%', animationDelay: '0.3s' }}></span>
            <span className="sparkle" style={{ bottom: '10%', left: '30%', animationDelay: '0.6s' }}></span>
            <span className="sparkle" style={{ bottom: '15%', right: '25%', animationDelay: '0.9s' }}></span>
          </h1>
          <p className="proposal-subtitle" style={{ fontSize: '1.8rem', marginTop: '1rem' }}>
            You've made me the happiest person alive EKSE!!!! 💖
          </p>

          {/* Promises Section - Moved UP for visibility */}
          <div className="sweet-messages" style={{
            marginTop: '0',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, rgba(255, 234, 242, 0.8), rgba(162, 155, 254, 0.5))',
            boxShadow: '0 10px 30px rgba(255, 107, 157, 0.3)'
          }}>
            <div className="message" style={{
              fontSize: '2rem',
              marginBottom: '1rem',
              fontFamily: 'Playfair Display, serif',
              color: '#c44569'
            }}>
              ✨ My Promises To You ✨
            </div>
            <div className="message" style={{ fontSize: '1.2rem' }}>
              🌹 Bring you flowers just because
            </div>
            <div className="message" style={{ fontSize: '1.2rem' }}>
              ☕ Make you coffee every morning
            </div>
            <div className="message" style={{ fontSize: '1.2rem' }}>
              💝 Love you more with each passing day
            </div>
            <div className="message" style={{ fontSize: '1.2rem' }}>
              🌙 Hold you under the stars
            </div>
            <div className="message" style={{ fontSize: '1.2rem' }}>
              😘 Kiss you goodnight every evening
            </div>
            <div className="message" style={{ fontSize: '1.2rem' }}>
              🎵 Dance with you in the rain and shiii mwaiche
            </div>
            <div className="message" style={{
              fontSize: '1.8rem',
              marginTop: '1.5rem',
              color: '#c44569',
              fontWeight: '700',
              textShadow: '0 2px 10px rgba(255, 107, 157, 0.3)'
            }}>
              💕 You are my forever and always 💕
            </div>
          </div>

          {/* Celebration Photo Carousel */}
          <ImageCarousel
            images={[
              '/Mamah/celebration1.jpeg',
              '/Mamah/celebration2.jpeg',
              '/Mamah/celebration3.jpeg',
              '/Mamah/celebration4.jpeg',
              '/Mamah/celebration5.jpeg',
              '/Mamah/celebration6.jpeg',
              '/Mamah/celebration7.jpeg'
            ]}
            alts={[
              'Celebration moment 1',
              'Celebration moment 2',
              'Celebration moment 3',
              'Celebration moment 4',
              'Celebration moment 5',
              'Celebration moment 6',
              'Celebration moment 7'
            ]}
            autoPlay={true}
            interval={3000}
          />
        </div>
      </div >
    );
  }

  return (
    <div className="proposal-container">
      <div className="floating-hearts">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="heart">❤️</div>
        ))}
      </div>

      <div className="proposal-card">
        <h1 className="proposal-title">
          Hey Mamahhhh ❤️ Would You Be My Valentine?
        </h1>
        <p className="proposal-subtitle">
          This Valentine's Day, and every day after...
        </p>

        {/* Photo Carousel */}
        <ImageCarousel
          images={[
            '/Mamah/WhatsApp Image 2026-02-02 at 09.42.12.jpeg',
            '/Mamah/WhatsApp Image 2026-02-02 at 09.53.43.jpeg',
            '/Mamah/WhatsApp Image 2026-02-02 at 09.59.58.jpeg',
            '/Mamah/WhatsApp Image 2026-02-02 at 10.01.38.jpeg',
            '/Mamah/WhatsApp Image 2026-02-02 at 10.02.14.jpeg',
            '/Mamah/WhatsApp Image 2026-02-02 at 10.09.03.jpeg',
            '/Mamah/WhatsApp Image 2026-02-02 at 10.10.58.jpeg',
            '/Mamah/WhatsApp Image 2026-02-02 at 10.26.18.jpeg',
            '/Mamah/WhatsApp Image 2026-02-02 at 10.26.18ff.jpeg'
          ]}
          alts={[
            'Beautiful moment',
            'Sweet memory',
            'Precious time',
            'Special moment',
            'Lovely day',
            'Happy times',
            'Cherished moment',
            'Amazing day',
            'Wonderful memory'
          ]}
          autoPlay={true}
          interval={4000}
        />

        <div className="sweet-messages">
          {sweetMessages.map((message, index) => (
            <div key={index} className="message">
              {message}
            </div>
          ))}
        </div>

        <div className="button-container">
          <button
            className="btn btn-yes"
            onClick={handleYesClick}
            style={{
              transform: `scale(${1 + (noClickCount * 0.1)})`,
              transition: 'all 0.3s ease'
            }}
          >
            Yes! 💖
          </button>
          <button
            className="btn btn-no"
            onClick={handleNoClick}
            style={getNoButtonStyle()}
          >
            {getNoButtonText()}
          </button>
        </div>

        {noClickCount > 0 && (
          <p className="message" style={{
            marginTop: '2rem',
            color: '#c44569',
            fontSize: '1rem',
            animation: 'fade-in 0.5s ease-out forwards'
          }}>
            (Hint: The "Yes" button is getting bigger... maybe that's a sign? 💕)
          </p>
        )}
      </div>
    </div>
  );
}
