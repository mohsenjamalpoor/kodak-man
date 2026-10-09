"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaUserDoctor, FaArrowLeft } from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import SearchBox from "@/components/SearchBox";
import DoctorAvatar from "@/components/DoctorAvatar";
import { doctors } from "@/data/doctors";
import { normalize, faNum } from "@/lib/utils";

export default function DoctorsPage() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const n = normalize(q);
    return doctors.filter((d) => !n || normalize(d.name + " " + d.specialty).includes(n));
  }, [q]);

  return (
    <>
      <PageHeader icon={FaUserDoctor} title="معرفی پزشکان" subtitle="با پزشکان متخصص و فوق تخصص مجموعه آشنا شوید" />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        <SearchBox value={q} onChange={setQ} placeholder="جستجوی نام یا تخصص..." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((d) => (
            <Link
              key={d.id}
              href={`/doctors/${d.id}`}
              className="group rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex justify-center"><DoctorAvatar doctor={d} className="h-24 w-24 text-4xl" /></div>
              <h3 className="font-bold text-slate-800">{d.name}</h3>
              <p className="mb-3 text-sm text-teal-700">{d.specialty}</p>
              <p className="mb-4 text-xs text-slate-500">سابقه: {faNum(d.experience)} سال</p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-teal-600">
                مشاهده پروفایل <FaArrowLeft className="transition group-hover:-translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
        {list.length === 0 && <p className="py-12 text-center text-slate-500">پزشکی یافت نشد.</p>}
      </div>
    </>
  );
}
