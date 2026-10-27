import Link from "next/link";
import Image from "next/image";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${compact ? "brand-compact" : ""}`}
      aria-label="Nuvaframe AI home"
    >
      <Image
        src="/file_0000000023188211a80298b246f56f31.png"
        alt="Nuvaframe AI"
        width={180}
height={60}
priority
style={{
  width: compact ? "170px" : "210px",
  height: "auto",
  maxWidth: "100%",
  objectFit: "contain",
  objectPosition: "center",
  display: "block",
  flexShrink: 0,
  transform: "translateY(20px)",
}}

      />
    </Link>
  );
}
