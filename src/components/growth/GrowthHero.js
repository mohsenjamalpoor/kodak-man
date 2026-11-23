"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { heroSlides } from "@/data/growth";

const INTERVAL = 5000;

function SlideImage({ s }) {
  if (s.fit === "photo") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={s.image}
        alt=""
        draggable={false}
        className="absolute bottom-0 left-0 h-full w-[52%] object-cover object-left"
      />
    );
  }
  if (s.fit === "giraffe") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={s.image}
        alt=""
        draggable={false}
        className="absolute bottom-0 left-3 h-[92%] w-auto object-contain"
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={s.image}
      alt=""
      draggable={false}
      className="absolute bottom-4 left-4 h-[62%] w-auto object-contain drop-shadow-lg"
    />
  );
}

function Slide({ s, active }) {
  const body = (
    <div className="relative h-full w-full overflow-hidden bg-linear-to-br from-sky-50 via-blue-50 to-sky-100">
      <span className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/60" />
      <SlideImage s={s} />
      <div className="relative flex h-full flex-col items-start justify-center gap-2 pe-[46%] ps-5 md:gap-3 md:pe-[48%]">
        <span className="rounded-full bg-sky-200/70 px-3 py-1 text-[11px] font-bold text-blue-900 md:text-sm">
          {s.pill}
        </span>
        <h2 className="text-3xl font-extrabold leading-tight text-blue-950 md:text-5xl">
          {s.title}
        </h2>
        <p className="text-xs leading-6 text-blue-900/80 md:text-base md:leading-8">
          {s.text}
        </p>
        <span className="mt-1 inline-flex items-center gap-2 rounded-full bg-blue-900 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-900/20 md:text-sm">
          {s.cta}
          <FaArrowLeft className="text-[10px]" />
        </span>
      </div>
    </div>
  );

  const common = {
    className: "block h-full w-full",
    tabIndex: active ? 0 : -1,
  };
  return s.href.startsWith("#") ? (
    <a href={s.href} {...common}>
      {body}
    </a>
  ) : (
    <Link href={s.href} {...common}>
      {body}
    </Link>
  );
}

export default function GrowthHero() {
  const n = heroSlides.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(0);

  useEffect(() => {
    if (paused || n < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), INTERVAL);
    return () => clearInterval(t);
  }, [paused, n]);

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
      aria-label="راهنمای رشد و تکامل"
      className="relative overflow-hidden rounded-3xl shadow-lg shadow-sky-100 ring-1 ring-sky-100"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(${i * 100}%)` }}
      >
        {heroSlides.map((s, idx) => (
          <div
            key={s.id}
            className="h-56 w-full shrink-0 md:h-80"
            aria-hidden={idx !== i}
          >
            <Slide s={s} active={idx === i} />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-2.5 flex justify-center gap-1.5">
        {heroSlides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setI(idx)}
            aria-label={`اسلاید ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${
              idx === i ? "w-5 bg-blue-700" : "w-2 bg-blue-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
