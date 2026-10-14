"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaXmark, FaUserDoctor } from "react-icons/fa6";
import DoctorAvatar from "@/components/DoctorAvatar";
import { doctors, days } from "@/data/doctors";

/**
 * props:
 *  - specialty: نام تخصص (رشته)
 *  - today: نام روز جاری (مثلاً "شنبه") یا null؛ برای برجسته کردن امروز
 *  - onClose: تابع بستن مودال (بهتر است با useCallback ساخته شود)
 */
export default function SpecialtyModal({ specialty, today = null, onClose }) {
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

  const list = doctors.filter(
    (d) => d.specialty === specialty && days.some((day) => d.schedule[day]),
  );

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center md:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={specialty}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-200 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-slate-50 shadow-2xl transition-transform duration-300 md:rounded-3xl ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-linear-to-br from-teal-500 via-cyan-500 to-sky-600 px-4 pb-4 pt-2.5 text-white">
          <span className="mx-auto mb-3 block h-1.5 w-10 rounded-full bg-white/50 md:hidden" />
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/20 text-lg">
              <FaUserDoctor />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-extrabold leading-6">
                {specialty}
              </h2>
              <p className="text-[11px] text-white/90">
                پزشکان و روزهای حضور در درمانگاه
              </p>
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

        <div className="space-y-3 overflow-y-auto p-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {list.map((d) => (
            <div
              key={d.id}
              className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200"
            >
              <Link
                href={`/doctors/${d.id}`}
                onClick={onClose}
                className="flex items-center gap-3"
              >
                <DoctorAvatar doctor={d} className="h-12 w-12 text-lg" />
                <span className="flex-1 text-sm font-bold leading-6 text-slate-800">
                  {d.name}
                </span>
                <FaChevronLeft className="text-slate-300" />
              </Link>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {days
                  .filter((day) => d.schedule[day])
                  .map((day) => {
                    const isToday = day === today;
                    return (
                      <div
                        key={day}
                        className={`rounded-xl px-3 py-2 text-center ${
                          isToday
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-200"
                            : "bg-teal-50 text-teal-800"
                        }`}
                      >
                        <p className="text-[11px] font-medium opacity-80">
                          {day}
                          {isToday && " (امروز)"}
                        </p>
                        <p className="mt-0.5 text-xs font-bold">
                          {d.schedule[day]}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}

          {list.length === 0 && (
            <p className="py-8 text-center text-xs text-slate-500">
              پزشکی با این تخصص در درمانگاه حضور ندارد.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
