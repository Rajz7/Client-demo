import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mobile-responsive Navbar component
const Navbar = ({ bgColor }) => {
  const [isMobileNavbar, setIsMobileNavbar] = useState(false);

  useEffect(() => {
    const checkMobileNavbar = () => {
      setIsMobileNavbar(window.innerWidth <= 768);
    };
    
    checkMobileNavbar();
    window.addEventListener('resize', checkMobileNavbar);
    
    return () => window.removeEventListener('resize', checkMobileNavbar);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: isMobileNavbar ? "56px" : "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobileNavbar ? "0 12px" : "0 24px",
        backgroundColor: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(220,220,220,0.7)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        zIndex: 9999,
        transition: "background 0.6s, box-shadow 0.5s",
      }}
    >
      <div
        style={{
          fontSize: isMobileNavbar ? "1.2rem" : "1.6rem",
          fontWeight: "700",
          color: "#e60023",
          whiteSpace: "nowrap",
          letterSpacing: "-0.02em",
        }}
      >
        Nusaiba's Store
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobileNavbar ? "8px" : "24px",
          flexWrap: "nowrap",
        }}
      >
        <a href="#about" style={{ 
          textDecoration: "none", 
          color: "#333",
          fontSize: isMobileNavbar ? "0.85rem" : "1rem",
          fontWeight: "600",
        }}>
          About
        </a>
        <a href="#login" style={{ 
          textDecoration: "none", 
          color: "#333",
          fontSize: isMobileNavbar ? "0.85rem" : "1rem",
          fontWeight: "600",
        }}>
          Login
        </a>
        <button
          style={{
            backgroundColor: "#e60023",
            color: "#fff",
            padding: isMobileNavbar ? "8px 12px" : "12px 20px",
            borderRadius: "24px",
            fontSize: isMobileNavbar ? "0.85rem" : "1rem",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 8px rgba(230,0,35,0.2)",
            transition: "all 0.2s ease",
            minHeight: isMobileNavbar ? "32px" : "auto",
          }}
          onMouseEnter={(e) => {
            if (!isMobileNavbar) {
              e.target.style.backgroundColor = "#ad081b";
              e.target.style.transform = "translateY(-1px)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobileNavbar) {
              e.target.style.backgroundColor = "#e60023";
              e.target.style.transform = "translateY(0)";
            }
          }}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default function Home() {
  const words = ["piece of art", "crocheted things", "Notion templates"];
  const backgrounds = ["#fce4ec", "#e8f5e9", "#e3f2fd"];
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [fullpageLoaded, setFullpageLoaded] = useState(false);
  const fullpageRef = useRef(null);
  const fpInstanceRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load fullpage.js CSS and JS
  useEffect(() => {
    if (isMobile) return;

    const loadFullpage = () => {
      // Load CSS
      if (!document.querySelector('link[href*="fullpage"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/4.0.20/fullpage.min.css';
        document.head.appendChild(link);
      }

      // Load JS
      if (!window.fullpage) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/4.0.20/fullpage.min.js';
        script.onload = () => {
          setFullpageLoaded(true);
        };
        script.onerror = () => {
          console.error('Failed to load fullpage.js');
          setFullpageLoaded(false);
        };
        document.head.appendChild(script);
      } else {
        setFullpageLoaded(true);
      }
    };

    loadFullpage();
  }, [isMobile]);

  // Initialize fullpage.js
  useEffect(() => {
    if (isMobile || !fullpageLoaded || !window.fullpage) return;

    let mounted = true;

    const initFullpage = () => {
      if (fullpageRef.current && !fpInstanceRef.current && mounted) {
        try {
          fpInstanceRef.current = new window.fullpage(fullpageRef.current, {
            autoScrolling: true,
            scrollHorizontally: true,
            navigation: true,
            navigationPosition: "right",
            scrollingSpeed: 700,
            easing: 'easeInOutCubic',
            easingcss3: 'ease',
            animateAnchor: false,
            recordHistory: false,
            keyboardScrolling: true,
            touchSensitivity: 15,
          });
          console.log('Fullpage.js initialized successfully');
        } catch (error) {
          console.error("Error initializing fullpage:", error);
        }
      }
    };

    const timer = setTimeout(initFullpage, 500);

    return () => {
      mounted = false;
      clearTimeout(timer);
      
      if (fpInstanceRef.current) {
        try {
          if (typeof fpInstanceRef.current.destroy === 'function') {
            fpInstanceRef.current.destroy('all');
          }
        } catch (error) {
          console.error("Error destroying fullpage:", error);
        } finally {
          fpInstanceRef.current = null;
        }
      }
    };
  }, [isMobile, fullpageLoaded]);

  // Word cycling effect
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);

    return () => clearInterval(wordInterval);
  }, []);

  const sectionStyle = {
    minHeight: isMobile ? 'auto' : '100vh',
    padding: isMobile ? '80px 20px 40px 20px' : '80px 60px 40px 60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif",
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '1200px',
    gap: isMobile ? '40px' : '80px',
  };

  const imageGridStyle = {
    flex: 1,
    position: 'relative',
    width: isMobile ? '100%' : '480px',
    height: isMobile ? '200px' : '280px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textSectionStyle = {
    flex: 1,
    textAlign: isMobile ? 'center' : 'left',
    maxWidth: isMobile ? '100%' : '500px',
  };

  const headingStyle = {
    fontSize: isMobile ? '2.5rem' : '3.5rem',
    fontWeight: '600',
    color: '#111111',
    marginBottom: '16px',
    letterSpacing: '-0.04em',
    lineHeight: '1.1',
  };

  const paragraphStyle = {
    fontSize: isMobile ? '1rem' : '1.125rem',
    color: '#767676',
    lineHeight: '1.5',
    fontWeight: '400',
    margin: '0 0 32px 0',
  };

  const buttonStyle = {
    backgroundColor: '#e60023',
    color: 'white',
    border: 'none',
    borderRadius: '24px',
    padding: isMobile ? '16px 32px' : '12px 24px',
    fontSize: isMobile ? '1.125rem' : '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif",
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(230, 0, 35, 0.2)',
    minHeight: '48px',
  };

  return (
    <>
      <Navbar bgColor={backgrounds[index]} />

      {/* Background animation only for hero section on desktop */}
      {!isMobile && (
        <AnimatePresence mode="wait">
          <motion.div
            key={backgrounds[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: -1,
              background: backgrounds[index],
              pointerEvents: "none",
            }}
          />
        </AnimatePresence>
      )}

      <div 
        id="fullpage" 
        ref={fullpageRef} 
        style={{ 
          overflowX: 'hidden',
          ...(isMobile && { overflow: 'visible' })
        }}
      >
        {/* Slide 1: Hero */}
        <div className="section" style={{ 
          position: "relative",
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '20px' : '60px',
          backgroundColor: isMobile ? backgrounds[0] : 'transparent',
        }}>
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#111111",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif",
              textAlign: 'center',
            }}
          >
            <span style={{
              fontSize: isMobile ? "2.5rem" : "3.75rem",
              marginBottom: "8px",
              fontWeight: "600",
              letterSpacing: "-0.04em",
              textAlign: "center",
            }}>
              Get your next
            </span>
            <div
              style={{
                height: isMobile ? "60px" : "90px",
                width: isMobile ? "300px" : "500px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={`word-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    color: "#e60023",
                    whiteSpace: "nowrap",
                    fontSize: isMobile ? "2.5rem" : "3.75rem",
                    fontWeight: "600",
                    textAlign: "center",
                    letterSpacing: "-0.04em",
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif",
                  }}
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </div>
            <p style={{
              fontSize: isMobile ? "1rem" : "1.125rem",
              color: "#767676",
              marginTop: "16px",
              textAlign: "center",
              fontWeight: "400",
              maxWidth: isMobile ? "300px" : "500px",
              lineHeight: "1.5",
            }}>
              Discover art for you
            </p>
          </div>
        </div>

        {/* Slide 2: Art */}
        <div className="section" style={{
          ...sectionStyle,
          backgroundColor: "#fff9e6",
        }}>
          <div style={containerStyle}>
            <div style={{
              ...imageGridStyle,
              order: isMobile ? 1 : 1,
            }}>
              {isMobile ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                  width: '100%',
                  maxWidth: '280px',
                }}>
                  <img
                    src="/art-images/1.jpg"
                    alt="Art piece 1"
                    style={{
                      width: '130px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  />
                  <img
                    src="/art-images/2.jpg"
                    alt="Art piece 2"
                    style={{
                      width: '130px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  />
                  <img
                    src="/art-images/3.jpg"
                    alt="Art piece 3"
                    style={{
                      width: '130px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  />
                  <img
                    src="/art-images/4.jpg"
                    alt="Art piece 4"
                    style={{
                      width: '130px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  />
                </div>
              ) : (
                <>
                  <img
                    src="/art-images/1.jpg"
                    alt="Art piece 1"
                    style={{
                      position: "absolute",
                      top: "30px",
                      left: "40px",
                      width: "100px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      zIndex: 2,
                    }}
                  />
                  
                  <img
                    src="/art-images/2.jpg"
                    alt="Art piece 2"
                    style={{
                      position: "absolute",
                      top: "20px",
                      left: "120px",
                      width: "100px",
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      zIndex: 4,
                    }}
                  />
                  
                  <img
                    src="/art-images/3.jpg"
                    alt="Art piece 3"
                    style={{
                      position: "absolute",
                      top: "40px",
                      left: "200px",
                      width: "100px",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      zIndex: 3,
                    }}
                  />
                  
                  <img
                    src="/art-images/4.jpg"
                    alt="Art piece 4"
                    style={{
                      position: "absolute",
                      top: "50px",
                      left: "280px",
                      width: "100px",
                      height: "160px",
                      objectFit: "cover",
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      zIndex: 1,
                    }}
                  />
                </>
              )}
            </div>

            <div style={{
              ...textSectionStyle,
              textAlign: isMobile ? 'center' : 'right',
              order: isMobile ? 2 : 2,
            }}>
              <h1 style={headingStyle}>Art</h1>
              <p style={paragraphStyle}>
                Discover unique and inspiring pieces from talented artists
              </p>
              <button 
                style={buttonStyle}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.target.style.backgroundColor = "#ad081b";
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow = "0 4px 12px rgba(230, 0, 35, 0.3)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.target.style.backgroundColor = "#e60023";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 2px 8px rgba(230, 0, 35, 0.2)";
                  }
                }}
              >
                Explore Art
              </button>
            </div>
          </div>
        </div>

        {/* Slide 3: Crocheting Inspiration */}
        <div className="section" style={{
          ...sectionStyle,
          backgroundColor: "#fff8f0",
        }}>
          <div style={containerStyle}>
            <div style={{
              ...textSectionStyle,
              order: isMobile ? 1 : 1,
            }}>
              <h1 style={headingStyle}>Crocheting Inspiration</h1>
              <p style={paragraphStyle}>
                Handmade designs, cozy patterns, and endless creativity
              </p>
              <button 
                style={buttonStyle}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.target.style.backgroundColor = "#ad081b";
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow = "0 4px 12px rgba(230, 0, 35, 0.3)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.target.style.backgroundColor = "#e60023";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 2px 8px rgba(230, 0, 35, 0.2)";
                  }
                }}
              >
                Get Patterns
              </button>
            </div>

            <div style={{
              ...imageGridStyle,
              order: isMobile ? 2 : 2,
            }}>
              {isMobile ? (
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  width: '100%',
                  maxWidth: '280px',
                  justifyContent: 'center',
                }}>
                  <img
                    src="/crocheting-images/1.jpg"
                    alt="Crochet pattern 1"
                    style={{
                      width: '80px',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  />
                  <img
                    src="/crocheting-images/2.jpg"
                    alt="Crochet pattern 2"
                    style={{
                      width: '80px',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  />
                  <img
                    src="/crocheting-images/3.jpg"
                    alt="Crochet pattern 3"
                    style={{
                      width: '80px',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  />
                </div>
              ) : (
                <>
                  <img
                    src="/crocheting-images/1.jpg"
                    alt="Crochet pattern 1"
                    style={{
                      position: "absolute",
                      top: "30px",
                      left: "80px",
                      width: "120px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      zIndex: 3,
                    }}
                  />
                  
                  <img
                    src="/crocheting-images/2.jpg"
                    alt="Crochet pattern 2"
                    style={{
                      position: "absolute",
                      top: "40px",
                      left: "180px",
                      width: "120px",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      zIndex: 2,
                    }}
                  />
                  
                  <img
                    src="/crocheting-images/3.jpg"
                    alt="Crochet pattern 3"
                    style={{
                      position: "absolute",
                      top: "20px",
                      left: "280px",
                      width: "120px",
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      zIndex: 4,
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Slide 4: Notion Template Designs */}
        <div className="section" style={{
          ...sectionStyle,
          backgroundColor: "#e3f2fd",
        }}>
          <div style={containerStyle}>
            <div style={{
              ...textSectionStyle,
              order: isMobile ? 1 : 1,
            }}>
              <h1 style={headingStyle}>Notion Template Designs</h1>
              <p style={paragraphStyle}>
                Beautiful, functional templates for productivity and organization
              </p>
              <button 
                style={buttonStyle}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.target.style.backgroundColor = "#ad081b";
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow = "0 4px 12px rgba(230, 0, 35, 0.3)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.target.style.backgroundColor = "#e60023";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 2px 8px rgba(230, 0, 35, 0.2)";
                  }
                }}
              >
                Get Templates
              </button>
            </div>

            <div style={{
              ...imageGridStyle,
              order: isMobile ? 2 : 2,
            }}>
              {isMobile ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  maxWidth: '200px',
                }}>
                  <img
                    src="/notion-images/hero-pc.png"
                    alt="Notion Desktop"
                    style={{
                      width: '180px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  />
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                  }}>
                    <img
                      src="/notion-images/phone1.jpg"
                      alt="Phone 1"
                      style={{
                        width: '60px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    />
                    <img
                      src="/notion-images/phone-2.jpg"
                      alt="Phone 2"
                      style={{
                        width: '60px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src="/notion-images/hero-pc.png"
                    alt="Notion Desktop"
                    style={{
                      position: "absolute",
                      top: "60px",
                      left: "120px",
                      width: "240px",
                      height: "144px",
                      objectFit: "cover",
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      zIndex: 3,
                    }}
                  />
                  
                  <img
                    src="/notion-images/phone1.jpg"
                    alt="Phone 1"
                    style={{
                      position: "absolute",
                      top: "40px",
                      left: "40px",
                      width: "90px",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      zIndex: 2,
                    }}
                  />
                  
                  <img
                    src="/notion-images/phone-2.jpg"
                    alt="Phone 2"
                    style={{
                      position: "absolute",
                      top: "40px",
                      left: "350px",
                      width: "90px",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      zIndex: 4,
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}