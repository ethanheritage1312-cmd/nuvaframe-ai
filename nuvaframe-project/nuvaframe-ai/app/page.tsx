import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, AudioLines, Captions, Check, Clapperboard,
  Download, Image as ImageIcon, Mic2, Play, Scan, Sparkles, WandSparkles,
  Zap,
} from "lucide-react";
import { Brand } from "@/components/brand";
import { Header } from "@/components/header";

const features = [
  { icon: WandSparkles, title: "Script from a prompt", text: "Turn a rough idea into a clear, engaging short-video script." },
  { icon: ImageIcon, title: "Visual direction", text: "Shape the mood, scene style and visual rhythm of your story." },
  { icon: Mic2, title: "AI narration", text: "Plan natural voiceover with a tone that fits your content." },
  { icon: Captions, title: "Ready for captions", text: "Build your story around concise, easy-to-follow on-screen text." },
  { icon: Download, title: "Vertical-first exports", text: "Designed around the 9:16 format people watch on their phones." },
  { icon: Zap, title: "One focused workflow", text: "Prompt, refine, review and prepare your video in one place." },
];

const steps = [
  { n: "01", title: "Describe your idea", text: "Write a prompt or choose a starting point for your next short." },
  { n: "02", title: "Set your creative style", text: "Choose the format, tone, voice direction and video length." },
  { n: "03", title: "Generate and review", text: "Review the result, refine the details and prepare it for export." },
  { n: "04", title: "Share your story", text: "Download your finished video and publish it on your channels." },
];

export default function HomePage() {
  return (
    <main>
      <Header />
      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> AI VIDEO STUDIO <span className="eyebrow-divider">/</span> FACELESS CONTENT</div>
          <h1>Your idea.<br /><span>Your next great video.</span></h1>
          <p className="hero-description">
            Make scroll-stopping faceless shorts from a simple prompt. Build the script,
            shape the visuals and plan the voiceover in one focused creative studio.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary button-large" href="/create"><Sparkles size={17} /> Start creating <ArrowRight size={17} /></Link>
            <Link className="button button-outline button-large" href="#how-it-works"><Play size={15} fill="currentColor" /> See how it works</Link>
          </div>
          <div className="hero-proof">
            <span className="proof-icon"><Check size={14} /></span>
            <span>Made for creators who want to move from idea to edit faster.</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Preview of the Nuvaframe video studio">
          <div className="visual-glow" />
          <div className="floating-tag tag-top"><span className="tag-pulse" /> CREATIVE MODE <strong>01</strong></div>
          <div className="video-preview">
            <div className="preview-image">
              <div className="image-grid" />
              <div className="preview-label">STORY / 001</div>
              <div className="preview-center">
                <div className="preview-play"><Play size={24} fill="currentColor" /></div>
                <span>YOUR IDEA, IN MOTION</span>
              </div>
              <div className="preview-caption">MAKE SOMETHING<br /><em>UNFORGETTABLE.</em></div>
            </div>
            <div className="preview-controls">
              <div className="control-left"><span className="tiny-play"><Play size={10} fill="currentColor" /></span><span>00:00</span><span className="control-muted">/ 00:30</span></div>
              <div className="timeline"><span /></div>
              <div className="preview-foot"><span><AudioLines size={15} /> Voiceover</span><span><Captions size={15} /> Captions</span><span className="format-pill">9:16</span></div>
            </div>
          </div>
          <div className="floating-card floating-card-left"><span className="floating-icon"><Sparkles size={16} /></span><div><strong>Prompt to plan</strong><small>One idea. A clear direction.</small></div></div>
          <div className="floating-card floating-card-right"><span className="floating-icon"><AudioLines size={17} /></span><div><strong>Story rhythm</strong><small>Voice · visuals · captions</small></div></div>
          <div className="visual-caption"><span className="caption-line" /> A CREATIVE WORKSPACE FOR SHORT-FORM VIDEO</div>
        </div>
      </section>

      <section className="signal-strip shell" aria-label="Platform principles">
        <div><span className="signal-icon"><Scan size={18} /></span><span><strong>Prompt-led</strong><small>Start with your idea</small></span></div>
        <div><span className="signal-icon"><Clapperboard size={18} /></span><span><strong>Creator-first</strong><small>Built for short-form</small></span></div>
        <div><span className="signal-icon"><Captions size={18} /></span><span><strong>Story-focused</strong><small>Keep every second clear</small></span></div>
        <div><span className="signal-icon"><Download size={18} /></span><span><strong>Export-minded</strong><small>Designed for vertical video</small></span></div>
      </section>

      <section className="section shell" id="features">
        <div className="section-heading">
          <div><div className="section-kicker">THE TOOLKIT</div><h2>Everything starts<br /><span>with one good idea.</span></h2></div>
          <p>Less time juggling tools. More time shaping the story you want people to remember.</p>
        </div>
        <div className="feature-grid">
          {features.map(({ icon: Icon, title, text }, index) => (
            <article className="feature-card" key={title}>
              <div className="feature-top"><span className="feature-icon"><Icon size={20} /></span><span className="feature-number">0{index + 1}</span></div>
              <h3>{title}</h3><p>{text}</p><span className="feature-accent" />
            </article>
          ))}
        </div>
      </section>

      <section className="workflow-section" id="how-it-works">
        <div className="shell workflow-inner">
          <div className="workflow-heading"><div className="section-kicker">A SIMPLE FLOW</div><h2>From blank page<br />to <span>ready to create.</span></h2><p>A clean, guided process keeps the creative decisions in your hands.</p><Link href="/create" className="text-link">Try the creator <ArrowUpRight size={16} /></Link></div>
          <div className="steps-grid">
            {steps.map((step, index) => <article className="step-card" key={step.n}><div className="step-top"><span>{step.n}</span>{index === 0 ? <Sparkles size={18} /> : index === 1 ? <Scan size={18} /> : index === 2 ? <Play size={18} /> : <Download size={18} />}</div><h3>{step.title}</h3><p>{step.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="final-cta shell">
        <div className="cta-orb"><Sparkles size={25} /></div>
        <div><div className="section-kicker">YOUR NEXT STORY STARTS HERE</div><h2>Got an idea? <span>Give it a frame.</span></h2><p>Open the creator and start shaping your first video concept.</p></div>
        <Link className="button button-primary button-large" href="/create">Open the studio <ArrowRight size={17} /></Link>
      </section>

      <footer className="site-footer shell">
        <Brand compact />
        <p>Make ideas move.</p>
        <span>© {new Date().getFullYear()} Nuvaframe AI. Built for the next frame.</span>
      </footer>
    </main>
  );
}
