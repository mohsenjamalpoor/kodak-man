"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaXmark } from "react-icons/fa6";
import { navLinks } from "@/lib/utils";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/site-logo.png"
            alt="لوگوی کودک من"
            width={44}
            height={40}
            className="h-10 w-auto shrink-0"
          />

          <span className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold text-[#0f8ceb]">
              کودک من
            </span>

            <span className="text-[10px] font-medium text-slate-400">
              سلامتی کودک، آرامش خانواده
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive(l.href)
                  ? "bg-blue-50 text-[#0f8ceb]"
                  : "text-slate-600 hover:bg-blue-50 hover:text-[#0f8ceb]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 transition hover:bg-blue-50 hover:text-[#0f8ceb] lg:hidden"
          aria-label="منو"
          aria-expanded={open}
        >
          {open ? <FaXmark size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <nav className="border-t border-slate-100 bg-white px-4 py-3 shadow-sm lg:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`mb-1 block rounded-lg px-3 py-3 text-sm font-medium transition ${
                isActive(l.href)
                  ? "bg-blue-50 font-bold text-[#0f8ceb]"
                  : "text-slate-700 hover:bg-blue-50 hover:text-[#0f8ceb]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
