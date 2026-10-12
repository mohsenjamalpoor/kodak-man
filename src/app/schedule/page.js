"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FaCalendarDays,
  FaCalendarCheck,
  FaClock,
  FaArrowUpRightFromSquare,
  FaChevronLeft,
} from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import SearchBox from "@/components/SearchBox";
import DoctorAvatar from "@/components/DoctorAvatar";
import { doctors, days } from "@/data/doctors";
import { normalize, faNum } from "@/lib/utils";

// لینک سامانه نوبت‌دهی را اینجا بگذارید
const BOOKING_URL = "https://firoozabadinobat.iums.ac.ir/tc";

const todayMap = {
  6: "شنبه",
  0: "یکشنبه",
  1: "دوشنبه",
  2: "سه‌شنبه",
  3: "چهارشنبه",
};
const specialties = [...new Set(doctors.map((d) => d.specialty))];
const shortSpec = (s) => s.replace("فوق تخصص ", "");

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
    label: "اکنون حاضر",
    cls: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
  },
  soon: {
    label: "به‌زودی",
    cls: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
  },
  ended: {
    label: "پایان حضور",
    cls: "bg-slate-100 text-slate-500",
    dot: "bg-slate-400",
  },
};

export default function SchedulePage() {
  const [q, setQ] = useState("");
  const [spec, setSpec] = useState("همه");
  const [day, setDay] = useState("شنبه");
  const [today, setToday] = useState(null);
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setToday(todayMap[d.getDay()] || null);
      setNow(d.getHours() * 60 + d.getMinutes());
    };
    tick();
    const t = todayMap[new Date().getDay()];
    if (t) setDay(t);
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        days.map((d) => [d, doctors.filter((x) => x.schedule[d]).length]),
      ),
    [],
  );

  const rows = useMemo(() => {
    const n = normalize(q);
    return doctors
      .filter((d) => d.schedule[day])
      .filter((d) => spec === "همه" || d.specialty === spec)
      .filter((d) => !n || normalize(d.name + " " + d.specialty).includes(n))
      .map((d) => ({ doc: d, time: d.schedule[day] }));
  }, [q, spec, day]);

  const todayCount = today ? counts[today] : 0;

  return (
    <>
      <PageHeader icon={FaCalendarDays} title="برنامه هفتگی درمانگاه" />

      <div className="mx-auto max-w-3xl px-4 pb-8">
        {/* کارت امروز */}
        <div className="mt-5 flex items-center gap-4 rounded-3xl bg-linear-to-br from-teal-500 to-emerald-600 p-5 text-white shadow-lg shadow-teal-200">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/20 text-2xl">
            <FaCalendarCheck />
          </span>
          {today ? (
            <div>
              <p className="text-xs text-teal-50">امروز</p>
              <p className="text-lg font-extrabold">{today}</p>
              <p className="mt-0.5 text-sm text-teal-50">
                {faNum(todayCount)} پزشک در درمانگاه حضور دارند
              </p>
            </div>
          ) : (
            <div>
              <p className="text-lg font-extrabold">درمانگاه امروز تعطیل است</p>
              <p className="mt-0.5 text-sm text-teal-50">
                درمانگاه شنبه تا چهارشنبه فعال است
              </p>
            </div>
          )}
        </div>

        {/* جستجو و فیلتر (غیرچسبان) */}
        <div className="space-y-3 py-4">
          <SearchBox
            value={q}
            onChange={setQ}
            placeholder="جستجوی نام پزشک یا تخصص..."
          />

          <div className="grid grid-cols-5 gap-2 pt-2">
            {days.map((d) => {
              const active = day === d;
              return (
                <button
                  key={d}
                  onClick={() => setDay(d)}
                  className={`relative flex flex-col items-center rounded-2xl px-1 py-2.5 transition active:scale-95 ${
                    active
                      ? "bg-teal-600 text-white shadow-md shadow-teal-200"
                      : "bg-white text-slate-600 ring-1 ring-slate-200"
                  }`}
                >
                  <span className="text-[13px] font-bold">{d}</span>
                  <span
                    className={`mt-0.5 text-[10px] ${active ? "text-teal-50" : "text-slate-400"}`}
                  >
                    {faNum(counts[d])} پزشک
                  </span>
                  {d === today && (
                    <span
                      className={`absolute -top-1.5 right-1/2 translate-x-1/2 rounded-full px-1.5 text-[9px] font-bold ${
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

          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none]">
            {["همه", ...specialties].map((s) => (
              <button
                key={s}
                onClick={() => setSpec(s)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition active:scale-95 ${
                  spec === s
                    ? "bg-slate-800 text-white"
                    : "bg-white text-slate-600 ring-1 ring-slate-200"
                }`}
              >
                {s === "همه" ? "همه تخصص‌ها" : shortSpec(s)}
              </button>
            ))}
          </div>
        </div>

        {/* لیست پزشکان */}
        <div className="space-y-3">
          {rows.map(({ doc, time }) => {
            const st = day === today ? statusUI[getStatus(time, now)] : null;
            return (
              <Link
                key={doc.id}
                href={`/doctors/${doc.id}`}
                className="group flex items-center gap-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
              >
                <DoctorAvatar doctor={doc} className="h-16 w-16 text-2xl" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold leading-6 text-slate-800">
                      {doc.name}
                    </h3>
                    {st && (
                      <span
                        className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${st.cls}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${st.dot}`}
                        />
                        {st.label}
                      </span>
                    )}
                  </div>
                  <p className="text-xs leading-5 text-teal-700">
                    {doc.specialty}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                    <FaClock className="text-[10px]" /> {time}
                  </p>
                </div>
                <FaChevronLeft className="shrink-0 text-slate-300 transition group-hover:-translate-x-1" />
              </Link>
            );
          })}
        </div>

        {rows.length === 0 && (
          <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">
              در {day} پزشکی با این مشخصات حضور ندارد.
            </p>
            <button
              onClick={() => {
                setQ("");
                setSpec("همه");
              }}
              className="mt-4 rounded-full bg-teal-600 px-5 py-2 text-xs font-bold text-white active:scale-95"
            >
              پاک کردن فیلترها
            </button>
          </div>
        )}

        {/* ورود به سامانه نوبت‌دهی */}
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center gap-4 rounded-3xl bg-slate-900 p-4 text-white transition active:scale-[0.98]"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-500 text-xl">
            <FaCalendarCheck />
          </span>
          <div className="flex-1">
            <p className="text-sm font-bold">دریافت نوبت</p>
            <p className="mt-0.5 text-xs text-slate-300">
              ورود به سامانه نوبت‌دهی
            </p>
          </div>
          <FaArrowUpRightFromSquare className="text-slate-500" />
        </a>

        <p className="mt-4 text-center text-[11px] leading-6 text-slate-400">
          برنامه ممکن است تغییر کند؛ پیش از مراجعه با درمانگاه تماس بگیرید.
        </p>
      </div>
    </>
  );
}
