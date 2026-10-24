import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { Brand } from "@/components/brand";

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link className="nav-active" href="/">Home</Link>
          <Link href="/create">Create</Link>
          <Link href="/#how-it-works">How it works</Link>
          <Link href="/#features">Features</Link>
        </nav>
        <div className="header-actions">
          <Link className="button button-quiet header-login" href="/create">Log in</Link>
          <Link className="button button-primary header-cta" href="/create">Get started <ArrowUpRight size={16} /></Link>
          <Link className="mobile-menu" href="/create" aria-label="Open creator"><Menu size={23} /></Link>
        </div>
      </div>
    </header>
  );
}
