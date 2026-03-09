"use client"
import { useState, useEffect } from "react"

const STEP_ROTATE_MS = 7000

const LYRICS = [
  "Is this the real life?",
  "Is this just fantasy?",
  "Caught in a landslide,",
  "No escape from reality.",
  "Open your eyes,",
  "Look up to the skies and see.",
]

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#22c55e',
    glow: 'rgba(34,197,94,.15)',
    title: 'Real-time sync',
    desc: 'Lyrics update millisecond-by-millisecond, perfectly in step with your Spotify playback — even during scrubs and skips.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: '#a78bfa',
    glow: 'rgba(167,139,250,.15)',
    title: 'Always on top',
    desc: 'Floats above every window — your game, your browser, your IDE. Never lose the lyric thread, no matter what you\'re doing.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: '#38bdf8',
    glow: 'rgba(56,189,248,.15)',
    title: 'Glass UI design',
    desc: 'A frosted-glass, Dynamic Island-style widget that blends into any desktop. Gorgeous and unobtrusive at the same time.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#fb923c',
    glow: 'rgba(251,146,60,.15)',
    title: 'Fully customizable',
    desc: 'Resize, reposition, or re-skin the widget. Pick accent colors, font sizes, and opacity to match your setup perfectly.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#f472b6',
    glow: 'rgba(244,114,182,.15)',
    title: 'Ultra-lightweight',
    desc: 'Under 12 MB installed, near-zero CPU. Flyrics runs silently in the background all day without draining your battery.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#34d399',
    glow: 'rgba(52,211,153,.15)',
    title: 'Private by design',
    desc: 'Zero data collection. Lyrics are fetched directly from licensed providers — we never see what you\'re listening to.',
  },
]

const STEPS = [
  {
    n: '01',
    color: '#22c55e',
    glow: 'rgba(34,197,94,.2)',
    title: 'Install Flyrics',
    desc: 'Download the lightweight installer for macOS or Windows. One click, no account required — it\'s on your desktop in under 30 seconds.',
    detail: 'Available on macOS 12+ and Windows 10/11. Auto-updates silently in the background.',
  },
  {
    n: '02',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,.2)',
    title: 'Connect your Spotify',
    desc: 'Log in once via the official Spotify OAuth flow. Flyrics never stores your credentials — just a refresh token scoped to playback.',
    detail: 'Uses Spotify\'s official Web API. Permission scope: read currently playing track only.',
  },
  {
    n: '03',
    color: '#38bdf8',
    glow: 'rgba(56,189,248,.2)',
    title: 'Hit play on anything',
    desc: 'Start a song, playlist, or podcast on any Spotify client. Flyrics detects playback instantly and fetches synced lyrics from its database.',
    detail: 'Supports 80M+ tracks. Lyrics are word-level timed for perfect highlight accuracy.',
  },
  {
    n: '04',
    color: '#fb923c',
    glow: 'rgba(251,146,60,.2)',
    title: 'Watch it float',
    desc: 'The glass widget appears over your screen — current line highlighted, neighbors dimmed. Drag it anywhere. Done.',
    detail: 'Hotkey to show/hide, resize drag handle, and one-click accent color picker included.',
  },
]

function FeatureCard({ icon, color, glow, title, desc }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? `rgba(255,255,255,.05)` : 'rgba(255,255,255,.025)',
        border: `1px solid ${hov ? color + '44' : 'rgba(255,255,255,.07)'}`,
        borderRadius: 20, padding: '28px 26px',
        transition: 'all .25s ease',
        boxShadow: hov ? `0 0 32px ${glow}` : 'none',
        cursor: 'default',
      }}
    >
      <div style={{
        width: 46, height: 46, borderRadius: 14, marginBottom: 18,
        background: glow, border: `1px solid ${color}33`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color,
      }}>{icon}</div>
      <div style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-.03em', marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: '.875rem', color: 'rgba(255,255,255,.42)', lineHeight: 1.7, letterSpacing: '-.01em' }}>{desc}</div>
    </div>
  )
}

export default function Home() {
  const [activeLyric, setActiveLyric] = useState(3)
  const [scrolled, setScrolled] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [pauseStepAuto, setPauseStepAuto] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setActiveLyric(i => (i + 1) % LYRICS.length), 2400)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    if (pauseStepAuto) return
    const id = setInterval(() => setActiveStep(i => (i + 1) % STEPS.length), STEP_ROTATE_MS)
    return () => clearInterval(id)
  }, [pauseStepAuto])

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes float      { 0%,100%{transform:translateY(0)}       50%{transform:translateY(-14px)} }
        @keyframes breathe    { 0%,100%{opacity:.45;transform:scale(1)} 50%{opacity:.7;transform:scale(1.07)} }
        @keyframes dot-pulse  { 0%,100%{opacity:1;transform:scale(1)}  50%{opacity:.3;transform:scale(.75)} }
        @keyframes lyric-in   { from{opacity:0;transform:translateY(7px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bar-widen  { 0%{width:22%} 100%{width:36%} }
        @keyframes fade-up    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes line-grow  { from{height:0} to{height:100%} }
        .grad-text {
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .grad-brand { background-image: linear-gradient(90deg,#22c55e 0%,#a78bfa 55%,#38bdf8 100%); }
        .grad-hero { background-image: linear-gradient(120deg,#22c55e 0%,#a78bfa 50%,#38bdf8 100%); }
        .grad-features { background-image: linear-gradient(120deg,#a78bfa,#38bdf8); }
        .grad-steps { background-image: linear-gradient(120deg,#22c55e,#38bdf8); }
        .grad-download { background-image: linear-gradient(120deg,#22c55e,#a78bfa,#38bdf8); }
        .grad-step-number { background-image: linear-gradient(135deg,var(--step-color),transparent); }
        .nav-link:hover  { color:#fff !important; background:rgba(255,255,255,.08) !important; }
        .btn-g:hover     { box-shadow:0 0 44px rgba(34,197,94,.55) !important; transform:translateY(-1px) !important; }
        .btn-o:hover     { background:rgba(255,255,255,.1) !important; border-color:rgba(255,255,255,.22) !important; }
        .step-btn:hover  { border-color:rgba(255,255,255,.2) !important; background:rgba(255,255,255,.05) !important; }
      `}</style>

      <div style={{ background: '#060608', color: '#fff', overflowX: 'hidden' }}>

        {/* ════════════════════════════ HEADER ════════════════════════════════ */}
        <header style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 999 }}>
          <div style={{
            position: 'relative',
            display: 'flex', alignItems: 'center', gap: 4,
            background: scrolled ? 'rgba(6,6,8,.82)' : 'rgba(255,255,255,.05)',
            backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(255,255,255,.11)',
            borderRadius: 50, padding: '8px 8px 8px 18px',
            boxShadow: scrolled
              ? '0 12px 48px rgba(0,0,0,.65),inset 0 1px 0 rgba(255,255,255,.07)'
              : '0 8px 32px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.13)',
            transition: 'all .35s ease',
            whiteSpace: 'nowrap',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 48, right: 48, height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent)', borderRadius: 1, pointerEvents: 'none' }} />

            {/* Logo */}
            <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 9, flexShrink: 0,
                background: 'linear-gradient(135deg,#22c55e 0%,#8b5cf6 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 14px rgba(34,197,94,.4)',
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18V5l12-2v13" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="6" cy="18" r="3" stroke="#fff" strokeWidth="2.2" />
                  <circle cx="18" cy="16" r="3" stroke="#fff" strokeWidth="2.2" />
                </svg>
              </div>
              <span style={{
                fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-.04em',
              }} className="grad-text grad-brand">Flyrics</span>
            </a>

            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,.1)', margin: '0 10px', flexShrink: 0 }} />

            {/* Nav */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {[['Features', '#features'], ['How it works', '#how-it-works']].map(([label, href]) => (
                <a key={label} href={href} className="nav-link" style={{
                  color: 'rgba(255,255,255,.5)', textDecoration: 'none',
                  fontSize: '.875rem', fontWeight: 500, letterSpacing: '-.015em',
                  padding: '6px 13px', borderRadius: 40,
                  transition: 'all .18s ease', background: 'transparent',
                }}>{label}</a>
              ))}
            </nav>

            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,.1)', margin: '0 10px', flexShrink: 0 }} />

            {/* CTA */}
            <a href="#download" className="btn-g" style={{
              background: 'linear-gradient(135deg,#22c55e 0%,#16a34a 100%)',
              color: '#fff', border: 'none', padding: '9px 22px', borderRadius: 40,
              fontSize: '.875rem', fontWeight: 700, letterSpacing: '-.02em',
              cursor: 'pointer', boxShadow: '0 0 24px rgba(34,197,94,.28)',
              transition: 'all .2s ease', textDecoration: 'none', display: 'inline-block',
            }}>⬇ Download</a>
          </div>
        </header>

        {/* ════════════════════════════ HERO ══════════════════════════════════ */}
        <section id="hero" style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '120px 24px 100px', position: 'relative', textAlign: 'center',
        }}>
          {/* Ambient glows */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-18%', right: '-8%', width: 680, height: 680, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,.18) 0%,transparent 65%)', animation: 'breathe 9s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: 780, height: 780, borderRadius: '50%', background: 'radial-gradient(circle,rgba(34,197,94,.13) 0%,transparent 65%)', animation: 'breathe 11s ease-in-out infinite 3s' }} />
            <div style={{ position: 'absolute', top: '45%', left: '38%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle,rgba(56,189,248,.07) 0%,transparent 65%)', animation: 'breathe 7s ease-in-out infinite 1.5s' }} />
          </div>
          {/* Dot grid */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.055) 1px,transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(34,197,94,.08)', border: '1px solid rgba(34,197,94,.22)',
            padding: '6px 16px 6px 12px', borderRadius: 40, marginBottom: 36,
            position: 'relative',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0, animation: 'dot-pulse 1.8s ease-in-out infinite' }} />
            <span style={{ fontSize: '.8rem', color: '#4ade80', fontWeight: 600, letterSpacing: '.02em' }}>Now syncing — real-time lyrics</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(2.8rem,7vw,5.5rem)', fontWeight: 900,
            letterSpacing: '-.05em', lineHeight: 1.04,
            maxWidth: 820, marginBottom: 24, position: 'relative',
          }}>
            Your lyrics,{' '}
            <span className="grad-text grad-hero">floating above</span>
            <br />everything else.
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1rem,2vw,1.2rem)', color: 'rgba(255,255,255,.45)',
            maxWidth: 520, marginBottom: 48, lineHeight: 1.75, letterSpacing: '-.015em',
            position: 'relative',
          }}>
            A transparent, always-on-top widget that follows your Spotify playback
            and shows lyrics in real time. Like a Dynamic Island for your desktop.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 80, position: 'relative' }}>
            <a href="#download" className="btn-g" style={{
              background: 'linear-gradient(135deg,#22c55e,#16a34a)',
              color: '#fff', border: 'none', padding: '15px 36px', borderRadius: 50,
              fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-.025em', cursor: 'pointer',
              boxShadow: '0 0 40px rgba(34,197,94,.3)', transition: 'all .2s ease',
              textDecoration: 'none', display: 'inline-block',
            }}>⬇ Download Free</a>
            <a href="#how-it-works" className="btn-o" style={{
              background: 'rgba(255,255,255,.05)', color: 'rgba(255,255,255,.75)',
              border: '1px solid rgba(255,255,255,.12)', padding: '15px 36px', borderRadius: 50,
              fontSize: '1.05rem', fontWeight: 600, letterSpacing: '-.025em', cursor: 'pointer',
              backdropFilter: 'blur(12px)', transition: 'all .2s ease',
              textDecoration: 'none', display: 'inline-block',
            }}>How it works →</a>
          </div>

          {/* Widget mockup */}
          <div style={{ position: 'relative', animation: 'float 5s ease-in-out infinite' }}>
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
              width: 520, height: 320,
              background: 'radial-gradient(ellipse,rgba(34,197,94,.18) 0%,rgba(139,92,246,.12) 40%,transparent 70%)',
              filter: 'blur(28px)', animation: 'breathe 4s ease-in-out infinite', pointerEvents: 'none',
            }} />
            <div style={{
              position: 'relative',
              background: 'rgba(10,10,14,.72)',
              backdropFilter: 'blur(48px)', WebkitBackdropFilter: 'blur(48px)',
              border: '1px solid rgba(255,255,255,.13)',
              borderRadius: 28, padding: '18px 22px 16px',
              width: 400, maxWidth: 'calc(100vw - 48px)',
              boxShadow: '0 32px 80px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.15),inset 0 0 0 .5px rgba(255,255,255,.05)',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 60, right: 60, height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent)', borderRadius: 1 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                  background: 'linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#4c1d95 100%)',
                  border: '1px solid rgba(255,255,255,.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, boxShadow: '0 4px 14px rgba(0,0,0,.5)',
                }}>♛</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '.9rem', fontWeight: 700, letterSpacing: '-.025em', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Bohemian Rhapsody</div>
                  <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.38)', letterSpacing: '-.01em' }}>Queen · A Night at the Opera</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,.3)', fontSize: 13, padding: 4, lineHeight: 1 }}>⏮</button>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', cursor: 'pointer',
                    background: 'rgba(34,197,94,.15)', border: '1px solid rgba(34,197,94,.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, color: '#22c55e',
                  }}>▶</div>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,.3)', fontSize: 13, padding: 4, lineHeight: 1 }}>⏭</button>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                <span style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.25)', letterSpacing: '.01em', flexShrink: 0 }}>1:23</span>
                <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,.08)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: 'linear-gradient(90deg,#22c55e,#4ade80)', borderRadius: 3, animation: 'bar-widen 18s linear infinite alternate' }} />
                </div>
                <span style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.25)', letterSpacing: '.01em', flexShrink: 0 }}>5:54</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,.03)', borderRadius: 16, padding: '10px 0', border: '1px solid rgba(255,255,255,.06)' }}>
                {LYRICS.map((line, i) => {
                  const d = i - activeLyric
                  if (Math.abs(d) > 2) return null
                  const isActive = d === 0
                  return (
                    <div key={i} style={{
                      padding: '5px 16px',
                      fontSize: isActive ? '1rem' : '.78rem',
                      fontWeight: isActive ? 700 : 400,
                      color: isActive ? '#fff' : `rgba(255,255,255,${Math.max(.1, .35 - Math.abs(d) * .1)})`,
                      textAlign: 'center', letterSpacing: '-.02em', lineHeight: 1.55,
                      background: isActive ? 'rgba(34,197,94,.1)' : 'transparent',
                      borderLeft: isActive ? '2px solid #22c55e' : '2px solid transparent',
                      transition: 'all .35s cubic-bezier(.4,0,.2,1)',
                      animation: isActive ? 'lyric-in .3s ease' : 'none',
                    }}>{line}</div>
                  )
                })}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#1ed760', animation: 'dot-pulse 2s ease-in-out infinite' }} />
                <span style={{ fontSize: '.63rem', color: 'rgba(255,255,255,.2)', letterSpacing: '.07em', textTransform: 'uppercase', fontWeight: 600 }}>Synced via Spotify</span>
              </div>
            </div>
          </div>

          {/* Social proof */}
          <div style={{ marginTop: 56, display: 'flex', alignItems: 'center', gap: 18, color: 'rgba(255,255,255,.25)', fontSize: '.82rem', flexWrap: 'wrap', justifyContent: 'center', position: 'relative' }}>
            <div style={{ display: 'flex', gap: 3 }}>{'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: '#fbbf24' }}>{s}</span>)}</div>
            <span>Trusted by 12,000+ music lovers</span>
            <span style={{ color: 'rgba(255,255,255,.1)' }}>·</span>
            <span>macOS · Windows</span>
          </div>
        </section>

        {/* ════════════════════════════ FEATURES ══════════════════════════════ */}
        <section id="features" style={{ padding: '120px 24px', position: 'relative' }}>
          {/* section glow */}
          <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 900, height: 500, background: 'radial-gradient(ellipse,rgba(139,92,246,.08) 0%,transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
            {/* Section label */}
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(167,139,250,.08)', border: '1px solid rgba(167,139,250,.2)',
                padding: '5px 14px', borderRadius: 40, marginBottom: 20,
              }}>
                <span style={{ fontSize: '.75rem', color: '#a78bfa', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>Features</span>
              </div>
              <h2 style={{
                fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 900,
                letterSpacing: '-.05em', lineHeight: 1.1, marginBottom: 16,
              }}>
                Everything you need,{' '}
                <span className="grad-text grad-features">
                  nothing you don't.
                </span>
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,.38)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7, letterSpacing: '-.01em' }}>
                Designed to stay out of your way while keeping the music experience front and center.
              </p>
            </div>

            {/* Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
              gap: 16,
            }}>
              {FEATURES.map(f => <FeatureCard key={f.title} {...f} />)}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ HOW IT WORKS ══════════════════════════ */}
        <section id="how-it-works" style={{ padding: '120px 24px', position: 'relative' }}>
          {/* section glow */}
          <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', width: 900, height: 600, background: 'radial-gradient(ellipse,rgba(34,197,94,.07) 0%,transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
            {/* Section label */}
            <div style={{ textAlign: 'center', marginBottom: 80 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(34,197,94,.08)', border: '1px solid rgba(34,197,94,.2)',
                padding: '5px 14px', borderRadius: 40, marginBottom: 20,
              }}>
                <span style={{ fontSize: '.75rem', color: '#4ade80', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>How it works</span>
              </div>
              <h2 style={{
                fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 900,
                letterSpacing: '-.05em', lineHeight: 1.1, marginBottom: 16,
              }}>
                Up and running{' '}
                <span className="grad-text grad-steps">
                  in 4 steps.
                </span>
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,.38)', maxWidth: 460, margin: '0 auto', lineHeight: 1.7, letterSpacing: '-.01em' }}>
                No config files. No terminal. Just download, connect, and play.
              </p>
            </div>

            {/* Steps layout — left timeline + right detail panel */}
            <div
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}
              onMouseEnter={() => setPauseStepAuto(true)}
              onMouseLeave={() => setPauseStepAuto(false)}
            >

              {/* Left: step list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {STEPS.map((step, i) => {
                  const isActive = i === activeStep
                  return (
                    <button
                      key={step.n}
                      className="step-btn"
                      onClick={() => setActiveStep(i)}
                      style={{
                        background: isActive ? `rgba(255,255,255,.04)` : 'transparent',
                        border: `1px solid ${isActive ? step.color + '33' : 'transparent'}`,
                        borderRadius: 16, padding: '20px 22px',
                        textAlign: 'left', cursor: 'pointer', color: '#fff',
                        transition: 'all .2s ease',
                        boxShadow: isActive ? `0 0 28px ${step.glow}` : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <span style={{
                          fontSize: '.7rem', fontWeight: 800, letterSpacing: '.08em',
                          color: isActive ? step.color : 'rgba(255,255,255,.2)',
                          fontVariantNumeric: 'tabular-nums', transition: 'color .2s',
                          flexShrink: 0,
                        }}>{step.n}</span>
                        <div>
                          <div style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-.03em', marginBottom: 4, color: isActive ? '#fff' : 'rgba(255,255,255,.45)', transition: 'color .2s' }}>{step.title}</div>
                          <div style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.32)', lineHeight: 1.6, letterSpacing: '-.01em' }}>{step.desc}</div>
                        </div>
                      </div>
                      {isActive && (
                        <div style={{ marginTop: 14, marginLeft: 32, height: 2, background: `linear-gradient(90deg,${step.color},transparent)`, borderRadius: 2, animation: `bar-widen ${STEP_ROTATE_MS}ms linear` }} />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Right: detail glass panel */}
              <div style={{ position: 'sticky', top: 120 }}>
                {(() => {
                  const step = STEPS[activeStep]
                  return (
                    <div style={{
                      background: 'rgba(10,10,14,.7)',
                      backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
                      border: `1px solid ${step.color}22`,
                      borderRadius: 28, padding: '40px 36px',
                      boxShadow: `0 24px 64px rgba(0,0,0,.5), 0 0 0 .5px rgba(255,255,255,.04), inset 0 1px 0 rgba(255,255,255,.1)`,
                      transition: 'border-color .3s ease',
                    }}>
                      {/* Top shine */}
                      <div style={{ position: 'absolute', top: 0, left: 40, right: 40, height: 1, background: `linear-gradient(90deg,transparent,${step.color}55,transparent)`, borderRadius: 1 }} />

                      {/* Step number big */}
                      <div style={{
                        fontSize: '4.5rem', fontWeight: 900, letterSpacing: '-.06em', lineHeight: 1,
                        '--step-color': step.color,
                        textShadow: `0 0 24px ${step.glow}`,
                        marginBottom: 24,
                      }} className="grad-text grad-step-number">{step.n}</div>

                      <h3 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-.04em', marginBottom: 12 }}>{step.title}</h3>
                      <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.5)', lineHeight: 1.75, letterSpacing: '-.01em', marginBottom: 24 }}>{step.desc}</p>

                      <div style={{
                        background: `${step.glow}`,
                        border: `1px solid ${step.color}22`,
                        borderRadius: 12, padding: '14px 18px',
                      }}>
                        <div style={{ fontSize: '.78rem', color: step.color, fontWeight: 600, letterSpacing: '.03em', marginBottom: 4 }}>DETAILS</div>
                        <div style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.45)', lineHeight: 1.65 }}>{step.detail}</div>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ DOWNLOAD CTA ══════════════════════════ */}
        <section id="download" style={{ padding: '120px 24px 140px', position: 'relative', textAlign: 'center' }}>
          {/* glow */}
          <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, background: 'radial-gradient(ellipse,rgba(34,197,94,.12) 0%,rgba(139,92,246,.08) 40%,transparent 70%)', pointerEvents: 'none' }} />
          {/* dot grid */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(34,197,94,.08)', border: '1px solid rgba(34,197,94,.2)',
              padding: '5px 14px', borderRadius: 40, marginBottom: 28,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'dot-pulse 1.8s ease-in-out infinite' }} />
              <span style={{ fontSize: '.75rem', color: '#4ade80', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>Free forever. No ads.</span>
            </div>

            <h2 style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 900, letterSpacing: '-.05em', lineHeight: 1.06, marginBottom: 20 }}>
              Ready to let{' '}
              <span className="grad-text grad-download">
                lyrics float?
              </span>
            </h2>

            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,.38)', marginBottom: 48, lineHeight: 1.75, letterSpacing: '-.015em' }}>
              Under 12 MB. Supports macOS 12+ and Windows 10/11.
              No subscription. Just music.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-g" style={{
                background: 'linear-gradient(135deg,#22c55e,#16a34a)',
                color: '#fff', border: 'none', padding: '17px 44px', borderRadius: 50,
                fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-.025em', cursor: 'pointer',
                boxShadow: '0 0 48px rgba(34,197,94,.35)', transition: 'all .2s ease',
              }}>⬇ Download for macOS</button>
              <button className="btn-o" style={{
                background: 'rgba(255,255,255,.05)', color: 'rgba(255,255,255,.7)',
                border: '1px solid rgba(255,255,255,.12)', padding: '17px 44px', borderRadius: 50,
                fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-.025em', cursor: 'pointer',
                backdropFilter: 'blur(12px)', transition: 'all .2s ease',
              }}>⬇ Download for Windows</button>
            </div>

            <div style={{ marginTop: 32, fontSize: '.8rem', color: 'rgba(255,255,255,.18)', letterSpacing: '.01em' }}>
              v2.4.1 · Released March 2026 · Open source on GitHub
            </div>
          </div>
        </section>

        {/* ════════════════════════════ FOOTER ════════════════════════════════ */}
        <footer style={{
          borderTop: '1px solid rgba(255,255,255,.06)',
          padding: '32px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
          maxWidth: 1100, margin: '0 auto',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 22, height: 22, borderRadius: 7,
              background: 'linear-gradient(135deg,#22c55e 0%,#8b5cf6 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path d="M9 18V5l12-2v13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="6" cy="18" r="3" stroke="#fff" strokeWidth="2.5" />
                <circle cx="18" cy="16" r="3" stroke="#fff" strokeWidth="2.5" />
              </svg>
            </div>
            <span style={{
              fontSize: '.95rem', fontWeight: 800, letterSpacing: '-.04em',
            }} className="grad-text grad-brand">Flyrics</span>
          </div>
          <div style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.18)', letterSpacing: '.01em' }}>
            © 2026 Flyrics · Not affiliated with Spotify AB
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy', 'Terms', 'GitHub'].map(l => (
              <a key={l} href="#" style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.25)', textDecoration: 'none', letterSpacing: '.01em', transition: 'color .15s' }}
                onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,.7)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.25)'}
              >{l}</a>
            ))}
          </div>
        </footer>

      </div>
    </>
  )
}