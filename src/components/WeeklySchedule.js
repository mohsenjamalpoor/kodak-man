"use client";
import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa6";

const todayMap = {
  6: "شنبه",
  0: "یکشنبه",
  1: "دوشنبه",
  2: "سه‌شنبه",
  3: "چهارشنبه",
};

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

export default function WeeklySchedule({ days, schedule }) {
  const [today, setToday] = useState(null);
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setToday(todayMap[d.getDay()] || null);
      setNow(d.getHours() * 60 + d.getMinutes());
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <ul className="space-y-2.5">
      {days.map((day) => {
        const time = schedule[day];
        const isToday = day === today;
        const st = isToday && time ? statusUI[getStatus(time, now)] : null;

        const cls = !time
          ? "bg-slate-50 text-slate-300"
          : isToday
            ? "bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-200"
            : "bg-teal-50 text-teal-800 ring-1 ring-teal-100";

        return (
          <li
            key={day}
            className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 ${cls}`}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold">{day}</span>
              {isToday && time && (
                <span className="rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-bold">
                  امروز
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {st && (
                <span
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${st.cls}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
                  {st.label}
                </span>
              )}
              {time ? (
                <span className="flex items-center gap-1.5 text-sm font-bold">
                  <FaClock className="text-[11px] opacity-70" /> {time}
                </span>
              ) : (
                <span className="text-sm">—</span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
