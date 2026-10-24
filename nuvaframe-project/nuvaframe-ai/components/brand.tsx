import Link from "next/link";
import { Scan, Play, Sparkles } from "lucide-react";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={`brand ${compact ? "brand-compact" : ""}`} aria-label="Nuvaframe AI home">
      <span className="brand-mark" aria-hidden="true">
        <Scan className="brand-scan" size={37} strokeWidth={1.8} />
        <Play className="brand-play" size={17} fill="currentColor" strokeWidth={1.5} />
        <Sparkles className="brand-spark" size={12} fill="currentColor" />
      </span>
      <span className="brand-word">NUVA<span>FRAME</span></span>
    </Link>
  );
}
