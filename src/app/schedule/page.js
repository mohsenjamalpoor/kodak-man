"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaCalendarDays, FaClock } from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import SearchBox from "@/components/SearchBox";
import DoctorAvatar from "@/components/DoctorAvatar";
import { doctors, days } from "@/data/doctors";
import { normalize } from "@/lib/utils";

const specialties = [...new Set(doctors.map((d) => d.specialty))];
const todayMap = { 6: "شنبه", 0: "یکشنبه", 1: "دوشنبه", 2: "سه‌شنبه", 3: "چهارشنبه" };

export default function SchedulePage() {
  const [q, setQ] = useState("");
  const [day, setDay] = useState("همه");
  const [spec, setSpec] = useState("همه");
  const [today, setToday] = useState(null);

  useEffect(() => {
    setToday(todayMap[new Date().getDay()] || null);
  }, []);

  const sections = useMemo(() => {
    const n = normalize(q);
    const shown = day === "همه" ? days : [day];
    return shown
      .map((d) => ({
        day: d,
        rows: doctors
          .filter((doc) => doc.schedule[d])
          .filter((doc) => spec === "همه" || doc.specialty === spec)
          .filter((doc) => !n || normalize(doc.name + " " + doc.specialty).includes(n))
          .map((doc) => ({ doc, time: doc.schedule[d] })),
      }))
      .filter((s) => s.rows.length);
  }, [q, day, spec]);

  return (
    <>
      <PageHeader icon={FaCalendarDays} title="برنامه هفتگی درمانگاه" subtitle="ساعت حضور پزشکان از شنبه تا چهارشنبه" />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        <div className="grid gap-3 md:grid-cols-[1fr_260px]">
          <SearchBox value={q} onChange={setQ} placeholder="جستجوی نام پزشک یا تخصص..." />
          <select
            value={spec}
            onChange={(e) => setSpec(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
          >
            <option value="همه">همه تخصص‌ها</option>
            {specialties.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {["همه", ...days].map((d) => (
            <button
              key={d}
              onClick={() => setDay(d)}
              className={`shrink-0 rounded-xl px-5 py-2 text-sm font-medium transition ${
                day === d ? "bg-teal-600 text-white shadow" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              {d}
              {d === today && <span className="mr-1 text-[10px] opacity-80">(امروز)</span>}
            </button>
          ))}
        </div>

        {sections.map((s) => (
          <section key={s.day}>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-800">
              {s.day}
              {s.day === today && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">امروز</span>}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {s.rows.map(({ doc, time }) => (
                <Link
                  key={doc.id}
                  href={`/doctors/${doc.id}`}
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
                >
                  <DoctorAvatar doctor={doc} />
                  <div className="min-w-0">
                    <h3 className="truncate font-bold text-slate-800">{doc.name}</h3>
                    <p className="truncate text-xs text-slate-500">{doc.specialty}</p>
                    <p className="mt-2 flex items-center gap-1 text-sm font-medium text-teal-700">
                      <FaClock className="text-xs" /> {time}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {sections.length === 0 && <p className="py-12 text-center text-slate-500">پزشکی با این مشخصات پیدا نشد.</p>}
      </div>
    </>
  );
}
