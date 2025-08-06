export default function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        backgroundColor: "rgba(255,255,255,0.7)",  // Back to semi-transparent
        backdropFilter: "blur(8px)",               // Glassmorphism effect
        borderBottom: "1px solid rgba(220,220,220,0.7)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        zIndex: 9999,
        transition: "background 0.6s, box-shadow 0.5s",
      }}
    >
      <div
        style={{
          fontSize: "1.6rem",
          fontWeight: "700",
          color: "#e60023",
          whiteSpace: "nowrap",
          letterSpacing: "-0.02em",
        }}
      >
        Nusaiba&apos;s Store
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          flexWrap: "nowrap",
        }}
      >
        <a href="#about" style={{ 
          textDecoration: "none", 
          color: "#333",
          fontSize: "1rem",
          fontWeight: "600",
        }}>
          About
        </a>
        <a href="#login" style={{ 
          textDecoration: "none", 
          color: "#333",
          fontSize: "1rem",
          fontWeight: "600",
        }}>
          Login
        </a>
        <button
          style={{
            backgroundColor: "#e60023",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "24px",
            fontSize: "1rem",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 8px rgba(230,0,35,0.2)",
            transition: "all 0.2s ease",
          }}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}
