import { useState, useEffect, useRef } from "react";
import type { Route } from "./+types/home";
import "../app.css";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "💝 Will You Be My Valentine? 💝" },
    { name: "description", content: "A special Valentine's Day proposal" },
  ];
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
      default: return "Okay fine...";
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

          {/* Fun Celebration GIFs */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            margin: '1.5rem 0 2rem 0',
            flexWrap: 'wrap'
          }}>
            <img
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWp5dDRta3ZzYmN6eWk2YTI3dGVlZGc3ZXY3azJwOGVtZXp6OGt6OCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mlvseq9yvZhba/giphy.gif"
              alt="Celebration cat"
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                objectFit: 'cover'
              }}
            />
            <img
              src="https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif"
              alt="Mind blown"
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                objectFit: 'cover'
              }}
            />
          </div>

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

          {/* Images at bottom - compact 4 column layout */}
          <div className="image-gallery celebration-gallery" style={{
            marginTop: '0',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem'
          }}>
            <img src="/images/roses.png" alt="Beautiful roses" className="gallery-image" style={{ height: '180px' }} />
            <img src="/images/hearts.png" alt="Floating hearts" className="gallery-image" style={{ height: '180px' }} />
            <img src="/images/couple.png" alt="Romantic couple" className="gallery-image" style={{ height: '180px' }} />
            <img src="/images/letter.png" alt="Love letter" className="gallery-image" style={{ height: '180px' }} />
          </div>
        </div>
      </div>
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
          Would You Be My Valentine?
        </h1>
        <p className="proposal-subtitle">
          This Valentine's Day, and every day after...
        </p>

        <div className="image-gallery">
          <img src="/images/roses.png" alt="Beautiful roses" className="gallery-image" />
          <img src="/images/hearts.png" alt="Floating hearts" className="gallery-image" />
          <img src="/images/couple.png" alt="Romantic couple" className="gallery-image" />
          <img src="/images/letter.png" alt="Love letter" className="gallery-image" />
        </div>

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
