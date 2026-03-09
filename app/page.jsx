"use client"
import { useEffect, useState } from "react"

// ─── shared styles (defined outside component to avoid re-creation) ────────────

const linkStyle = {
    color: "#0F0F0F",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    padding: "0.25rem 0",
}

const cartStyle = {
    background: "#3D6A51",
    color: "#F6F0E4",
    padding: "0.6rem 1.4rem",
    textDecoration: "none",
    fontSize: "0.85rem",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    borderRadius: "6px",
    display: "inline-block",
}

const overlayLink = {
    color: "#0F0F0F",
    textDecoration: "none",
    fontSize: "1.4rem",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    padding: "0.4rem 0.75rem",
}

// hamburger bars
const barBase = {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
    background: "#0F0F0F",
    transition: "transform 0.25s, opacity 0.25s",
}
const barTop    = { ...barBase, top: 0 }
const barMid    = { ...barBase, top: "50%", transform: "translateY(-50%)" }
const barBot    = { ...barBase, bottom: 0 }
const barTopAct = { ...barTop, transform: "translateY(8px) rotate(45deg)" }
const barMidAct = { ...barMid, opacity: 0 }
const barBotAct = { ...barBot, transform: "translateY(-8px) rotate(-45deg)" }

// ─── component ─────────────────────────────────────────────────────────────────

export default function Home() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 900)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : ""
    }, [menuOpen])

    return (
        <div>
            <style>{`
                .nav-link { transition: color 0.2s ease; }
                .nav-link:hover { color: #3D6A51 !important; }
                .overlay-link { transition: color 0.2s ease; }
                .overlay-link:hover { color: #3D6A51 !important; }
            `}</style>
            {/* Header */}
            <header style={{
                backgroundColor: "#F6F0E4",
                borderBottom: "2px solid #0F0F0F",
                position: "sticky",
                top: 0,
                zIndex: 1000,
                width: "100%",
                boxSizing: "border-box",
            }}>
                <nav style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    maxWidth: "1400px",
                    margin: "0 auto",
                    padding: "0 1.5rem",
                    height: "72px",
                    boxSizing: "border-box",
                }}>
                    {/* Logo */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
                        <div style={{ position: "relative", width: "46px", height: "46px", flexShrink: 0 }}>
                            <div style={{
                                position: "absolute",
                                inset: 0,
                                background: "#3D6A51",
                                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                            }} />
                            <div style={{
                                position: "absolute",
                                top: "50%", left: "50%",
                                transform: "translate(-50%, -50%)",
                                fontSize: "1.3rem", fontWeight: 900, color: "#F6F0E4", zIndex: 1,
                            }}>W</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <h1 style={{
                                fontSize: "1.5rem", fontWeight: 900, letterSpacing: "0.12em",
                                textTransform: "uppercase", color: "#0F0F0F", margin: 0,
                                lineHeight: 1,
                            }}>WOMBOO</h1>
                            <span style={{ fontSize: "0.6rem", letterSpacing: "0.26em", color: "#3D6A51", fontWeight: 600, marginTop: "4px" }}>STREETWEAR</span>
                        </div>
                    </div>

                    {/* Desktop links */}
                    {!isMobile && (
                        <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}>
                            <li><a href="#" style={linkStyle} className="nav-link">Shop</a></li>
                            <li><a href="#" style={linkStyle} className="nav-link">New Drops</a></li>
                            <li><a href="#" style={linkStyle} className="nav-link">Collections</a></li>
                            <li><a href="#" style={linkStyle} className="nav-link">About</a></li>
                            <li><a href="#" style={cartStyle}>Cart</a></li>
                        </ul>
                    )}

                    {/* Mobile hamburger */}
                    {isMobile && (
                        <button
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            onClick={() => setMenuOpen(v => !v)}
                            style={{ background: "transparent", border: "none", cursor: "pointer", padding: "0.5rem", display: "flex", alignItems: "center" }}
                        >
                            <div style={{ width: 26, height: 18, position: "relative" }}>
                                <span style={menuOpen ? barTopAct : barTop} />
                                <span style={menuOpen ? barMidAct : barMid} />
                                <span style={menuOpen ? barBotAct : barBot} />
                            </div>
                        </button>
                    )}
                </nav>
            </header>

            {/* Mobile menu overlay */}
            {isMobile && menuOpen && (
                <div style={{
                    position: "fixed", inset: 0, background: "#F6F0E4", zIndex: 2000,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.75rem",
                }}>
                    {/* close X in top-right */}
                    <button onClick={() => setMenuOpen(false)} aria-label="Close menu" style={{
                        position: "absolute", top: "1.5rem", right: "1.5rem",
                        background: "transparent", border: "none", color: "#0F0F0F", fontSize: "1.75rem", cursor: "pointer", lineHeight: 1,
                    }}>✕</button>
                    <a href="#" style={overlayLink} className="overlay-link" onClick={() => setMenuOpen(false)}>Shop</a>
                    <a href="#" style={overlayLink} className="overlay-link" onClick={() => setMenuOpen(false)}>New Drops</a>
                    <a href="#" style={overlayLink} className="overlay-link" onClick={() => setMenuOpen(false)}>Collections</a>
                    <a href="#" style={overlayLink} className="overlay-link" onClick={() => setMenuOpen(false)}>About</a>
                    <a href="#" style={{ ...overlayLink, ...cartStyle, fontSize: "1rem", padding: "0.9rem 2.25rem", marginTop: "0.5rem" }} onClick={() => setMenuOpen(false)}>Cart</a>
                </div>
            )}

        </div>
    )
}