"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import SearchBox from "@/components/SearchBox";
import DoctorAvatar from "@/components/DoctorAvatar";
import { doctors } from "@/data/doctors";
import { normalize } from "@/lib/utils";

// فاصله‌های اضافه ابتدا و انتهای تخصص نادیده گرفته می‌شود
const clean = (s = "") => s.trim();
const specialties = [...new Set(doctors.map((d) => clean(d.specialty)))];

export default function DoctorsPage() {
  const [q, setQ] = useState("");
  const [spec, setSpec] = useState("همه");

  const list = useMemo(() => {
    const n = normalize(q);
    return doctors
      .filter((d) => spec === "همه" || clean(d.specialty) === spec)
      .filter((d) => !n || normalize(d.name + " " + d.specialty).includes(n));
  }, [q, spec]);

  return (
    <>
      <PageHeader icon={FaUserDoctor} title="معرفی پزشکان" />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-6">
        <SearchBox
          value={q}
          onChange={setQ}
          placeholder="جستجوی نام یا تخصص..."
        />

        {/* فیلتر تخصص */}
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none">
          {["همه", ...specialties].map((s) => (
            <button
              key={s}
              onClick={() => setSpec(s)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition active:scale-95 ${
                spec === s
                  ? "bg-teal-600 text-white shadow-md shadow-teal-200"
                  : "bg-white text-slate-600 ring-1 ring-slate-200"
              }`}
            >
              {s === "همه" ? "همه تخصص‌ها" : s}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-5">
          {list.map((d) => (
            <Link
              key={d.id}
              href={`/doctors/${d.id}`}
              className="flex flex-col items-center gap-2 rounded-3xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl active:scale-95"
            >
              <DoctorAvatar
                doctor={d}
                className="mb-1 h-20 w-20 text-3xl md:h-24 md:w-24"
              />
              <h3 className="text-sm font-bold leading-6 text-slate-800 md:text-base">
                {d.name}
              </h3>
              <p className="min-h-10 text-xs leading-5 text-teal-700">
                {clean(d.specialty)}
              </p>
            </Link>
          ))}
        </div>

        {list.length === 0 && (
          <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">پزشکی یافت نشد.</p>
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
      </div>
    </>
  );
}
