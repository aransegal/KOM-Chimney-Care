import { useState, useEffect } from "react";

const images = [
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c9ea61bf0c459e3994bae/726bb866f_WhatsAppImage2026-01-21at212517.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c9ea61bf0c459e3994bae/cf53cd502_WhatsAppImage2026-01-21at220105.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c9ea61bf0c459e3994bae/ddc0404ea_WhatsAppImage2026-01-21at220401.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c9ea61bf0c459e3994bae/b05d13ebe_WhatsAppImage2026-01-21at220626.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c9ea61bf0c459e3994bae/e3b871bcf_WhatsAppImage2026-01-21at220759.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c9ea61bf0c459e3994bae/4e8d19b2e_WhatsAppImage2026-01-21at212305.jpeg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699c9ea61bf0c459e3994bae/d466766f3_WhatsAppImage2026-01-21at212511.jpeg",
];

export default function PhotoSlideshow() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFading(false);
      }, 500);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full relative bg-slate-900">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`Work photo ${i + 1}`}
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            opacity: i === current ? (fading ? 0 : 1) : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        />
      ))}
    </section>
  );
}