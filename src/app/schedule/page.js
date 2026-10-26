"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaCalendarDays,
  FaCalendarCheck,
  FaClock,
  FaArrowUpRightFromSquare,
  FaAngleDown,
} from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import SearchBox from "@/components/SearchBox";
import DoctorAvatar from "@/components/DoctorAvatar";
import SpecialtyModal from "@/components/SpecialtyModal";
import { doctors, days } from "@/data/doctors";
import { normalize } from "@/lib/utils";

// لینک سامانه نوبت‌دهی را اینجا بگذارید
const BOOKING_URL = "https://firoozabadinobat.iums.ac.ir/tc";

const todayMap = {
  6: "شنبه",
  0: "یکشنبه",
  1: "دوشنبه",
  2: "سه‌شنبه",
  3: "چهارشنبه",
};

// فقط پزشکانی که حداقل یک روز درمانگاه دارند
const hasClinic = (d) => days.some((day) => d.schedule[day]);
const specialties = [
  ...new Set(doctors.filter(hasClinic).map((d) => d.specialty)),
];
const shortSpec = (s) => s.replace("فوق تخصص ", "").trim();

const toLatin = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
const toMin = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
};
function parseRanges(str) {
  return toLatin(str)
    .split("و")
    .map((p) => p.split("-").map((x) => x.trim()))
    .filter((r) => r.length === 2 && r[0].includes(":") && r[1].includes(":"))
    .map(([a, b]) => [toMin(a), toMin(b)]);
}
function getStatus(time, now) {
  if (now == null) return null;
  const r = parseRanges(time);
  if (!r.length) return null;
  if (r.some(([a, b]) => now >= a && now < b)) return "present";
  if (now >= Math.max(...r.map((x) => x[1]))) return "ended";
  return "soon";
}

const statusUI = {
  present: {
    label: "حاضر",
    cls: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
  },
  soon: {
    label: "به‌زودی",
    cls: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
  },
  ended: {
    label: "پایان",
    cls: "bg-slate-100 text-slate-500",
    dot: "bg-slate-400",
  },
};

export default function SchedulePage() {
  const [q, setQ] = useState("");
  const [day, setDay] = useState("شنبه");
  const [today, setToday] = useState(null);
  const [now, setNow] = useState(null);
  const [modalSpec, setModalSpec] = useState(null);

  const closeModal = useCallback(() => setModalSpec(null), []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setToday(todayMap[d.getDay()] || null);
      setNow(d.getHours() * 60 + d.getMinutes());
    };
    tick();
    const t = todayMap[new Date().getDay()];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (t) setDay(t);
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  const rows = useMemo(() => {
    const n = normalize(q);
    return doctors
      .filter((d) => d.schedule[day])
      .filter((d) => !n || normalize(d.name + " " + d.specialty).includes(n))
      .map((d) => ({ doc: d, time: d.schedule[day] }));
  }, [q, day]);

  return (
    <>
      <PageHeader icon={FaCalendarDays} title="برنامه هفتگی درمانگاه" />

      <div className="mx-auto max-w-3xl px-3 pb-6">
        {/* جستجو، روزها و تخصص‌ها (غیرچسبان) */}
        <div className="space-y-2 py-2.5">
          <SearchBox
            value={q}
            onChange={setQ}
            placeholder="جستجوی نام پزشک یا تخصص..."
          />

          <div className="grid grid-cols-5 gap-1.5 pt-1.5">
            {days.map((d) => {
              const active = day === d;
              return (
                <button
                  key={d}
                  onClick={() => setDay(d)}
                  className={`relative rounded-xl px-1 py-2 text-xs font-bold transition active:scale-95 ${
                    active
                      ? "bg-teal-600 text-white shadow-md shadow-teal-200"
                      : "bg-white text-slate-600 ring-1 ring-slate-200"
                  }`}
                >
                  {d}
                  {d === today && (
                    <span
                      className={`absolute -top-1.5 right-1/2 translate-x-1/2 rounded-full px-1.5 text-[8px] font-bold leading-3 ${
                        active
                          ? "bg-white text-teal-700"
                          : "bg-emerald-500 text-white"
                      }`}
                    >
                      امروز
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* انواع تخصص‌ها: با لمس، مودال پزشکان آن تخصص باز می‌شود */}
          <div className="-mx-3 flex gap-1.5 overflow-x-auto px-3 pb-0.5 [scrollbar-width:none]">
            {specialties.map((s) => (
              <button
                key={s}
                onClick={() => setModalSpec(s)}
                className="flex shrink-0 items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-teal-700 ring-1 ring-teal-200 transition active:scale-95"
              >
                {shortSpec(s)}
                <FaAngleDown className="text-[9px]" />
              </button>
            ))}
          </div>
        </div>

        {/* لیست پزشکان: دو ستون در موبایل، سه ستون در دسکتاپ */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
          {rows.map(({ doc, time }) => {
            const st = day === today ? statusUI[getStatus(time, now)] : null;
            return (
              <Link
                key={doc.id}
                href={`/doctors/${doc.id}`}
                className="relative flex flex-col items-center gap-1 rounded-xl bg-white px-2 pb-2 pt-2.5 text-center shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
              >
                {st && (
                  <span
                    className={`absolute left-1.5 top-1.5 flex items-center gap-1 rounded-full px-1.5 py-px text-[8px] font-bold leading-3 ${st.cls}`}
                  >
                    <span className={`h-1 w-1 rounded-full ${st.dot}`} />
                    {st.label}
                  </span>
                )}
                <DoctorAvatar
                  doctor={doc}
                  className="mt-1 h-12 w-12 text-lg md:h-14 md:w-14"
                />
                <h3 className="line-clamp-2 min-h-8 text-[11px] font-medium leading-4 text-slate-600">
                  {doc.name}
                </h3>
                <p className="line-clamp-2 min-h-8 text-xs font-extrabold leading-4 text-teal-700">
                  {doc.specialty.trim()}
                </p>
                <p className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold leading-4 text-slate-700">
                  <FaClock className="shrink-0 text-[8px]" /> {time}
                </p>
              </Link>
            );
          })}
        </div>

        {rows.length === 0 && (
          <div className="rounded-2xl bg-white p-6 text-center ring-1 ring-slate-200">
            <p className="text-xs text-slate-500">
              در {day} پزشکی با این مشخصات حضور ندارد.
            </p>
            {q && (
              <button
                onClick={() => setQ("")}
                className="mt-3 rounded-full bg-teal-600 px-4 py-1.5 text-[11px] font-bold text-white active:scale-95"
              >
                پاک کردن جستجو
              </button>
            )}
          </div>
        )}

        {/* ورود به سامانه نوبت‌دهی */}
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-900 p-3 text-white transition active:scale-[0.98]"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500 text-lg">
            <FaCalendarCheck />
          </span>
          <div className="flex-1">
            <p className="text-xs font-bold">دریافت نوبت</p>
            <p className="text-[10px] text-slate-300">
              ورود به سامانه نوبت‌دهی
            </p>
          </div>
          <FaArrowUpRightFromSquare className="text-sm text-slate-500" />
        </a>

        <p className="mt-2 text-center text-[10px] leading-5 text-slate-400">
          برنامه ممکن است تغییر کند؛ پیش از مراجعه تماس بگیرید.
        </p>
      </div>

      {modalSpec && (
        <SpecialtyModal
          specialty={modalSpec}
          today={today}
          onClose={closeModal}
        />
      )}
    </>
  );
}
