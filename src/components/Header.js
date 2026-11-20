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
  //#0f8ceb
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
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

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive(l.href)
                  ? "bg-teal-50 text-teal-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden"
          aria-label="منو"
        >
          {open ? <FaXmark size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-3 text-sm font-medium ${
                isActive(l.href) ? "bg-teal-50 text-teal-700" : "text-slate-700"
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
