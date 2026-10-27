
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Captions,
  Check,
  Clapperboard,
  Clock3,
  Gem,
  Mic2,
  MonitorPlay,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { Brand } from "@/components/brand";

const styles = [
  "Cinematic",
  "Motivational",
  "Documentary",
  "Anime",
  "Luxury",
];

const lengths = ["15 seconds", "30 seconds", "60 seconds"];

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Cinematic");
  const [length, setLength] = useState("30 seconds");
  const [voice, setVoice] = useState("Deep, confident");
  const [videoType, setVideoType] = useState<"short" | "full">("short");
  const [quality, setQuality] = useState<"1080p" | "2160p">("1080p");
  const [notice, setNotice] = useState("");
  const [briefReady, setBriefReady] = useState(false);

  const premiumDuration = length === "60 seconds";
  const premiumVideo = videoType === "full" || quality === "2160p";
  const isPremium = premiumDuration || premiumVideo;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBriefReady(false);

    if (prompt.trim().length < 12) {
      setNotice(
        "Please describe your idea in a little more detail (at least 12 characters)."
      );
      return;
    }

    if (isPremium) {
      setNotice(
        "Your Premium brief is prepared. Membership verification and the real video-generation provider must be connected before this video can be generated."
      );
    } else {
      setNotice(
        "Your video brief is prepared. Free exports will include the Nuvaframe AI watermark. Connect the video-generation provider to create and download the actual video."
      );
    }

    setBriefReady(true);
  }

  function chooseLength(item: string) {
    setLength(item);
    setNotice("");
    setBriefReady(false);
  }

  function chooseVideoType(type: "short" | "full") {
    setVideoType(type);
    setNotice("");
    setBriefReady(false);

    if (type === "full") {
      setQuality("2160p");
    } else {
      setQuality("1080p");
    }
  }

  return (
    <main className="create-page">
      <header className="create-header">
        <Brand />
        <Link href="/" className="back-link">
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </header>

      <div className="create-shell">
        <div className="create-intro">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            YOUR CREATIVE STUDIO
          </div>
          <h1>
            Let&apos;s make something
            <br />
            <span>worth watching.</span>
          </h1>
          <p>
            Bring any idea to life. Create a Short first, then explore the
            Premium full-video experience.
          </p>
        </div>

        <form className="studio-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="form-section-title">
              <span className="form-icon">
                <WandSparkles size={17} />
              </span>
              <div>
                <h2>Describe your video</h2>
                <p>Start with any idea, topic, story, product, or message.</p>
              </div>
              <span className="required-tag">REQUIRED</span>
            </div>

            <label className="field-label" htmlFor="prompt">
              Your prompt
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(event) => {
                setPrompt(event.target.value);
                setNotice("");
                setBriefReady(false);
              }}
              maxLength={1200}
              placeholder="Example: Create a cinematic advert for a futuristic electric sports car driving through a neon-lit city at night. Use dramatic camera movements, atmospheric music and a powerful ending."
              required
            />
            <div className="field-foot">
              <span>Tip: describe the subject, mood, audience and ending.</span>
              <span>{prompt.length}/1200</span>
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">
              <span className="form-icon">
                <Clapperboard size={17} />
              </span>
              <div>
                <h2>Choose a visual style</h2>
                <p>Set the look and feel of your video.</p>
              </div>
            </div>

            <div className="choice-grid">
              {styles.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => {
                    setStyle(item);
                    setNotice("");
                    setBriefReady(false);
                  }}
                  className={`choice-button ${
                    style === item ? "selected" : ""
                  }`}
                  aria-pressed={style === item}
                >
                  {style === item && <Check size={14} />}
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">
              <span className="form-icon">
                <Clock3 size={17} />
              </span>
              <div>
                <h2>Short duration</h2>
                <p>Choose how long your Short should be.</p>
              </div>
            </div>

            <div className="choice-grid choice-grid-three">
              {lengths.map((item) => {
                const premium = item === "60 seconds";

                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => chooseLength(item)}
                    className={`choice-button ${
                      length === item ? "selected" : ""
                    }`}
                    aria-pressed={length === item}
                    title={
                      premium
                        ? "Premium membership required"
                        : "Available on the free tier"
                    }
                  >
                    {length === item && <Check size={14} />}
                    {item}
                    {premium ? (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          color: "#36d9d0",
                        }}
                      >
                        <Gem size={14} />
                        Premium
                      </span>
                    ) : (
                      <span>Free</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">
              <span className="form-icon">
                <MonitorPlay size={17} />
              </span>
              <div>
                <h2>Want a full-size video too?</h2>
                <p>Create your Short first, with an additional Premium option.</p>
              </div>
            </div>

            <div className="choice-grid choice-grid-three">
              <button
                type="button"
                onClick={() => chooseVideoType("short")}
                className={`choice-button ${
                  videoType === "short" ? "selected" : ""
                }`}
                aria-pressed={videoType === "short"}
              >
                {videoType === "short" && <Check size={14} />}
                Short only
                <span>Free</span>
              </button>

              <button
                type="button"
                onClick={() => chooseVideoType("full")}
                className={`choice-button ${
                  videoType === "full" ? "selected" : ""
                }`}
                aria-pressed={videoType === "full"}
                title="Premium membership required"
              >
                {videoType === "full" && <Check size={14} />}
                <Gem size={14} />
                Full Video
                <span style={{ color: "#36d9d0" }}>Premium</span>
              </button>
            </div>

            <label className="field-label voice-label" htmlFor="quality">
              Export quality
            </label>
            <div className="select-wrap">
              <select
                id="quality"
                value={quality}
                onChange={(event) => {
                  setQuality(event.target.value as "1080p" | "2160p");
                  setNotice("");
                  setBriefReady(false);
                }}
              >
                <option value="1080p">1080p — Standard</option>
                <option value="2160p">◇ 2160p (4K) — Premium</option>
              </select>
            </div>

            <p className="privacy-note">
              <Gem size={14} />
              Full Video and 4K are planned Premium features. Actual output
              depends on the connected provider.
            </p>
          </div>

          <div className="form-section">
            <div className="form-section-title">
              <span className="form-icon">
                <Mic2 size={17} />
              </span>
              <div>
                <h2>Voice direction</h2>
                <p>Choose the narration style that fits your idea.</p>
              </div>
            </div>

            <label className="field-label" htmlFor="voice">
              Narration
            </label>
            <div className="select-wrap">
              <Mic2 size={16} />
              <select
                id="voice"
                value={voice}
                onChange={(event) => {
                  setVoice(event.target.value);
                  setNotice("");
                  setBriefReady(false);
                }}
              >
                <option>Deep, confident</option>
                <option>Warm, conversational</option>
                <option>Bright, energetic</option>
                <option>Calm, documentary</option>
                <option>No voiceover</option>
              </select>
            </div>
          </div>

          <button
            className="button button-primary generate-button"
            type="submit"
          >
            <Sparkles size={17} />
            Prepare my video brief
            <ArrowRight size={17} />
          </button>

          {notice && (
            <div
              className={`form-notice ${
                briefReady ? "notice-info" : "notice-warn"
              }`}
              role="status"
            >
              {notice}
            </div>
          )}

          <p className="privacy-note">
            <Captions size={14} />
            Free video exports will carry the Nuvaframe AI watermark.
            Eligible Premium exports are planned to be watermark-free.
          </p>
        </form>

        <aside className="studio-aside">
          <div className="aside-preview">
            <div className="aside-preview-head">
              <span>CONCEPT PREVIEW</span>
              <span className="live-dot" />
              DRAFT
            </div>

            <div className="aside-art">
              <div className="art-ring ring-one" />
              <div className="art-ring ring-two" />
              <div className="art-core">
                <PlayGlyph />
              </div>
              <div className="art-title">
                YOUR IDEA
                <br />
                <em>IN MOTION.</em>
              </div>
              <div className="art-index">NF / 001</div>
            </div>

            <div className="aside-preview-foot">
              <span>
                <span className="tiny-dot" />
                Concept only
              </span>
              <span>{videoType === "full" ? "FULL VIDEO" : "9:16 SHORT"}</span>
            </div>
          </div>

          <div className="aside-note">
            <span className="aside-note-icon">
              <Sparkles size={17} />
            </span>
            <div>
              <strong>
                {videoType === "full"
                  ? "Premium full-video concept"
                  : "Made for short-form storytelling"}
              </strong>
              <p>
                {videoType === "full"
                  ? "The full-video option is designed to extend your Short into a larger video. A compatible generation provider and Premium verification are required."
                  : "Describe any idea and choose a style. The real video-generation engine must be connected before actual videos can be rendered."}
              </p>
            </div>
          </div>

          <div className="aside-checklist">
            <h3>YOUR CREATIVE BRIEF</h3>
            <div>
              <Check size={15} />
              <span>Prompt-led concept</span>
            </div>
            <div>
              <Check size={15} />
              <span>Style: {style}</span>
            </div>
            <div>
              <Check size={15} />
              <span>Duration: {length}</span>
            </div>
            <div>
              <Check size={15} />
              <span>
                Output: {videoType === "full" ? "Full Video" : "Short"}
              </span>
            </div>
            <div>
              <Check size={15} />
              <span>Quality: {quality}</span>
            </div>
            <div>
              <Check size={15} />
              <span>Voice: {voice}</span>
            </div>
            <div>
              <Gem size={15} />
              <span>
                {isPremium
                  ? "Premium feature selected"
                  : "Free tier — watermark on exports"}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function PlayGlyph() {
  return (
    <span className="play-glyph" aria-hidden="true">
      ▶
    </span>
  );
}
