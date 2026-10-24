"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Captions, Check, Clapperboard, Clock3, Mic2, Sparkles, WandSparkles } from "lucide-react";
import { Brand } from "@/components/brand";

const styles = ["Cinematic", "Motivational", "Documentary", "Anime", "Luxury"];
const lengths = ["15 seconds", "30 seconds", "60 seconds"];

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Cinematic");
  const [length, setLength] = useState("30 seconds");
  const [voice, setVoice] = useState("Deep, confident");
  const [notice, setNotice] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (prompt.trim().length < 12) {
      setNotice("Add a little more detail (at least 12 characters) so your video concept has a clear direction.");
      return;
    }
    setNotice("Your brief is ready. The AI generation provider is not connected yet; the next setup step will connect a real provider before generation is enabled.");
  }

  return (
    <main className="create-page">
      <header className="create-header"><Brand /><Link href="/" className="back-link"><ArrowLeft size={16} /> Back to home</Link></header>
      <div className="create-shell">
        <div className="create-intro"><div className="eyebrow"><span className="eyebrow-dot" /> YOUR CREATIVE STUDIO</div><h1>Let's make something<br /><span>worth watching.</span></h1><p>Start with the idea. Set the direction. We'll build the workflow around your vision.</p></div>
        <div className="studio-grid">
          <form className="studio-form" onSubmit={handleSubmit}>
            <div className="form-section"><div className="form-section-title"><span className="form-icon"><WandSparkles size={17} /></span><div><h2>Describe your video</h2><p>Be specific about the story, mood or message.</p></div><span className="required-tag">REQUIRED</span></div>
              <label className="field-label" htmlFor="prompt">Your prompt</label>
              <textarea id="prompt" value={prompt} onChange={(e) => { setPrompt(e.target.value); setNotice(""); }} maxLength={1200} placeholder="Example: Create a suspenseful 30-second short about three mysterious places deep in the ocean. Use dramatic visuals and end with a surprising fact." />
              <div className="field-foot"><span>Tip: mention your audience, mood and ending.</span><span>{prompt.length}/1200</span></div>
            </div>
            <div className="form-section"><div className="form-section-title"><span className="form-icon"><Clapperboard size={17} /></span><div><h2>Choose a visual style</h2><p>Set the look and feel of your short.</p></div></div>
              <div className="choice-grid">{styles.map((item) => <button type="button" key={item} onClick={() => setStyle(item)} className={`choice-button ${style === item ? "selected" : ""}`}>{style === item && <Check size={14} />}{item}</button>)}</div>
            </div>
            <div className="form-section"><div className="form-section-title"><span className="form-icon"><Clock3 size={17} /></span><div><h2>Length and voice</h2><p>Choose a target duration and narration style.</p></div></div>
              <div className="field-label">Video length</div><div className="choice-grid choice-grid-three">{lengths.map((item) => <button type="button" key={item} onClick={() => setLength(item)} className={`choice-button ${length === item ? "selected" : ""}`}>{length === item && <Check size={14} />}{item}</button>)}</div>
              <label className="field-label voice-label" htmlFor="voice">Voice direction</label><div className="select-wrap"><Mic2 size={16} /><select id="voice" value={voice} onChange={(e) => setVoice(e.target.value)}><option>Deep, confident</option><option>Warm, conversational</option><option>Bright, energetic</option><option>Calm, documentary</option><option>No voiceover</option></select></div>
            </div>
            <button className="button button-primary generate-button" type="submit"><Sparkles size={17} /> Prepare my video brief <ArrowRight size={17} /></button>
            {notice && <div className={`form-notice ${notice.startsWith("Your brief") ? "notice-info" : "notice-warn"}`} role="status">{notice}</div>}
            <p className="privacy-note"><Captions size={14} /> Your choices stay in this page for now. Sign-in and saved projects will be added with the backend.</p>
          </form>
          <aside className="studio-aside">
            <div className="aside-preview"><div className="aside-preview-head"><span>CONCEPT PREVIEW</span><span className="live-dot" /> DRAFT</div><div className="aside-art"><div className="art-ring ring-one" /><div className="art-ring ring-two" /><div className="art-core"><PlayGlyph /></div><div className="art-title">YOUR IDEA<br /><em>IN MOTION.</em></div><div className="art-index">NF / 001</div></div><div className="aside-preview-foot"><span><span className="tiny-dot" /> Concept only</span><span>9:16 FORMAT</span></div></div>
            <div className="aside-note"><span className="aside-note-icon"><Sparkles size={17} /></span><div><strong>Made for short-form storytelling</strong><p>We’ll connect the real generation engine after the core app and provider are configured. This preview does not pretend to be a generated video.</p></div></div>
            <div className="aside-checklist"><h3>YOUR CREATIVE BRIEF</h3><div><Check size={15} /><span>Prompt-led concept</span></div><div><Check size={15} /><span>Style: {style}</span></div><div><Check size={15} /><span>Duration: {length}</span></div><div><Check size={15} /><span>Voice: {voice}</span></div></div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function PlayGlyph() {
  return <span className="play-glyph" aria-hidden="true">▶</span>;
}
