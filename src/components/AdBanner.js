"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { banners } from "@/data/banners";

const INTERVAL = 5000; // زمان تغییر خودکار (میلی‌ثانیه)

function SlideBody({ b }) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-linear-to-br ${b.color} text-white`}
    >
      {b.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={b.image}
          alt={b.title}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      )}
      {b.image && (
        <span className="absolute inset-0 bg-linear-to-l from-black/60 via-black/25 to-transparent" />
      )}
      <span className="pointer-events-none absolute -bottom-10 -left-8 h-40 w-40 rounded-full bg-white/10" />

      {b.ad && (
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
          تبلیغ
        </span>
      )}

      <div className="relative flex h-full flex-col justify-center p-5">
        {!b.ad && b.tag && <p className="text-xs text-white/80">{b.tag}</p>}
        <h2 className="mt-1 max-w-[75%] text-lg font-extrabold leading-8 md:text-xl">
          {b.title}
        </h2>
        {b.text && (
          <p className="mt-1 max-w-[75%] text-xs leading-6 text-white/90">
            {b.text}
          </p>
        )}
        {b.cta && (
          <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-800">
            {b.cta}
            <FaChevronLeft className="text-[10px]" />
          </span>
        )}
      </div>
    </div>
  );
}

function Slide({ b, active }) {
  const external = /^https?:/.test(b.href);
  const common = {
    className: "block h-full w-full",
    tabIndex: active ? 0 : -1,
  };
  return external ? (
    <a
      href={b.href}
      target="_blank"
      rel={b.ad ? "noopener noreferrer sponsored" : "noopener noreferrer"}
      {...common}
    >
      <SlideBody b={b} />
    </a>
  ) : (
    <Link href={b.href} {...common}>
      <SlideBody b={b} />
    </Link>
  );
}

export default function AdBanner({ items = banners }) {
  const n = items.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(0);

  useEffect(() => {
    if (paused || n < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), INTERVAL);
    return () => clearInterval(t);
  }, [paused, n]);

  if (n === 0) return null;

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    // صفحه راست‌به‌چپ است: کشیدن به راست = اسلاید بعدی
    if (Math.abs(dx) > 40)
      setI((v) => (dx > 0 ? (v + 1) % n : (v - 1 + n) % n));
    setPaused(false);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="بنر"
      className="relative overflow-hidden rounded-3xl shadow-lg shadow-slate-200"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(${i * 100}%)` }}
      >
        {items.map((b, idx) => (
          <div
            key={b.id}
            className="h-40 w-full shrink-0 md:h-48"
            aria-hidden={idx !== i}
          >
            <Slide b={b} active={idx === i} />
          </div>
        ))}
      </div>

      {n > 1 && (
        <div className="absolute inset-x-0 bottom-2.5 flex justify-center gap-1.5">
          {items.map((b, idx) => (
            <button
              key={b.id}
              onClick={() => setI(idx)}
              aria-label={`اسلاید ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-5 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
