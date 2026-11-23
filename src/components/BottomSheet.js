"use client";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

export default function BottomSheet({
  title,
  sub,
  icon: Icon,
  onClose,
  children,
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShow(true));
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center md:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-200 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`relative flex max-h-[85dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl transition-transform duration-300 md:rounded-3xl ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-linear-to-br from-blue-700 to-sky-500 px-4 pb-4 pt-2.5 text-white">
          <span className="mx-auto mb-3 block h-1.5 w-10 rounded-full bg-white/50 md:hidden" />
          <div className="flex items-center gap-3">
            {Icon && (
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/20 text-lg">
                <Icon />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-extrabold leading-6">{title}</h2>
              {sub && <p className="text-[11px] text-white/90">{sub}</p>}
            </div>
            <button
              onClick={onClose}
              aria-label="بستن"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/20 transition active:scale-90"
            >
              <FaXmark />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {children}
        </div>
      </div>
    </div>
  );
}
