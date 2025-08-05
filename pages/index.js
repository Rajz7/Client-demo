import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "fullpage.js/dist/fullpage.css";
import Navbar from "../components/Navbar";

export default function Home() {
  const words = ["piece of art", "crocheted things", "Notion templates"];
  const backgrounds = ["#fce4ec", "#e8f5e9", "#e3f2fd"];
  const [index, setIndex] = useState(0);
  const fullpageRef = useRef(null);
  const fpInstanceRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    let initTimer = null;
    let wordInterval = null;

    const initFullpage = async () => {
      if (!mounted) return;
      
      try {
        const fullpage = (await import("fullpage.js")).default;
        if (fullpageRef.current && !fpInstanceRef.current && mounted) {
          fpInstanceRef.current = new fullpage(fullpageRef.current, {
            autoScrolling: true,
            navigation: true,
            navigationPosition: "right",
            scrollingSpeed: 800,
            animateAnchor: false,
            recordHistory: false,
          });
        }
      } catch (error) {
        console.error("Error initializing fullpage:", error);
      }
    };

    const cleanupFullpage = () => {
      if (fpInstanceRef.current) {
        try {
          if (typeof fpInstanceRef.current.destroy === 'function') {
            fpInstanceRef.current.destroy("all");
          }
        } catch (error) {
          console.error("Error destroying fullpage:", error);
        } finally {
          fpInstanceRef.current = null;
        }
      }
    };

    initTimer = setTimeout(initFullpage, 100);
    wordInterval = setInterval(() => {
      if (mounted) {
        setIndex((prev) => (prev + 1) % words.length);
      }
    }, 3000);

    return () => {
      mounted = false;
      if (initTimer) clearTimeout(initTimer);
      if (wordInterval) clearInterval(wordInterval);
      cleanupFullpage();
    };
  }, []);

  return (
    <>
      <Navbar bgColor={backgrounds[index]} />

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
            zIndex: 0,
            background: backgrounds[index],
            pointerEvents: "none",
          }}
        />
      </AnimatePresence>

      <div id="fullpage" ref={fullpageRef}>
        {/* Slide 1: Hero */}
        <div className="section" style={{ position: "relative" }}>
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
            }}
          >
            <span style={{
              fontSize: "3.75rem",
              marginBottom: "8px",
              fontWeight: "600",
              letterSpacing: "-0.04em",
              textAlign: "center",
            }}>
              Get your next
            </span>
            <div
              style={{
                height: "90px",
                width: "500px",
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
                    fontSize: "3.75rem",
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
              fontSize: "1.125rem",
              color: "#767676",
              marginTop: "16px",
              textAlign: "center",
              fontWeight: "400",
              maxWidth: "500px",
              lineHeight: "1.5",
            }}>
              Discover art for you
            </p>
          </div>
        </div>

        {/* Slide 2: Art */}
        <div className="section" style={{
          backgroundColor: "#fff9e6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 60px 40px 60px",
          minHeight: "100vh",
          maxHeight: "100vh",
          boxSizing: "border-box",
          overflow: "hidden",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "1200px",
              gap: "80px",
            }}
          >
            {/* Left side - Images */}
            <div
              style={{
                flex: 1,
                position: "relative",
                width: "480px",
                height: "280px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
            </div>

            {/* Right side - Text */}
            <div
              style={{
                flex: 1,
                textAlign: "right",
                maxWidth: "500px",
              }}
            >
              <h1 style={{
                fontSize: "3.5rem",
                fontWeight: "600",
                color: "#111111",
                marginBottom: "16px",
                letterSpacing: "-0.04em",
                lineHeight: "1.1",
              }}>
                Art
              </h1>
              <p style={{
                fontSize: "1.125rem",
                color: "#767676",
                lineHeight: "1.5",
                fontWeight: "400",
                margin: "0 0 32px 0",
              }}>
                Discover unique and inspiring pieces from talented artists
              </p>
              <button style={{
                backgroundColor: "#e60023",
                color: "white",
                border: "none",
                borderRadius: "24px",
                padding: "12px 24px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(230, 0, 35, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#ad081b";
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 4px 12px rgba(230, 0, 35, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#e60023";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 2px 8px rgba(230, 0, 35, 0.2)";
              }}>
                Explore Art
              </button>
            </div>
          </div>
        </div>

        {/* Slide 3: Crocheting Inspiration */}
        <div className="section" style={{
          backgroundColor: "#fff8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 60px 40px 60px",
          minHeight: "100vh",
          maxHeight: "100vh",
          boxSizing: "border-box",
          overflow: "hidden",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "1200px",
              gap: "80px",
            }}
          >
            {/* Left side - Text */}
            <div
              style={{
                flex: 1,
                textAlign: "left",
                maxWidth: "500px",
              }}
            >
              <h1 style={{
                fontSize: "3.5rem",
                fontWeight: "600",
                color: "#111111",
                marginBottom: "16px",
                letterSpacing: "-0.04em",
                lineHeight: "1.1",
              }}>
                Crocheting Inspiration
              </h1>
              <p style={{
                fontSize: "1.125rem",
                color: "#767676",
                lineHeight: "1.5",
                fontWeight: "400",
                margin: "0 0 32px 0",
              }}>
                Handmade designs, cozy patterns, and endless creativity
              </p>
              <button style={{
                backgroundColor: "#e60023",
                color: "white",
                border: "none",
                borderRadius: "24px",
                padding: "12px 24px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(230, 0, 35, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#ad081b";
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 4px 12px rgba(230, 0, 35, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#e60023";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 2px 8px rgba(230, 0, 35, 0.2)";
              }}>
                Get Patterns
              </button>
            </div>

            {/* Right side - Images */}
            <div
              style={{
                flex: 1,
                position: "relative",
                width: "480px",
                height: "280px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
            </div>
          </div>
        </div>

        {/* Slide 4: Notion Template Designs */}
        <div
          className="section"
          style={{
            backgroundColor: "#e3f2fd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 60px 40px 60px",
            minHeight: "100vh",
            maxHeight: "100vh",
            boxSizing: "border-box",
            overflow: "hidden",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "1200px",
              gap: "80px",
            }}
          >
            {/* Left side - Text */}
            <div
              style={{
                flex: 1,
                textAlign: "left",
                maxWidth: "500px",
              }}
            >
              <h1 style={{
                fontSize: "3.5rem",
                fontWeight: "600",
                color: "#111111",
                marginBottom: "16px",
                letterSpacing: "-0.04em",
                lineHeight: "1.1",
              }}>
                Notion Template Designs
              </h1>
              <p style={{
                fontSize: "1.125rem",
                color: "#767676",
                lineHeight: "1.5",
                fontWeight: "400",
                margin: "0 0 32px 0",
              }}>
                Beautiful, functional templates for productivity and organization
              </p>
              <button style={{
                backgroundColor: "#e60023",
                color: "white",
                border: "none",
                borderRadius: "24px",
                padding: "12px 24px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(230, 0, 35, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#ad081b";
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 4px 12px rgba(230, 0, 35, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#e60023";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 2px 8px rgba(230, 0, 35, 0.2)";
              }}>
                Get Templates
              </button>
            </div>

            {/* Right side - Images */}
            <div
              style={{
                flex: 1,
                position: "relative",
                width: "480px",
                height: "280px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}