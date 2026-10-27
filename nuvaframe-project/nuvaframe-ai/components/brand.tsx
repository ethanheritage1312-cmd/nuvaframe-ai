
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
  width: compact ? "120px" : "155px",
  height: "auto",
  maxHeight: "44px",
  objectFit: "contain",
  objectPosition: "center",
  display: "block",
}}
      />
    </Link>
  );
}
