"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import SearchBox from "@/components/SearchBox";
import DoctorAvatar from "@/components/DoctorAvatar";
import { doctors } from "@/data/doctors";
import { normalize, faNum } from "@/lib/utils";

export default function DoctorsPage() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const n = normalize(q);
    return doctors.filter(
      (d) => !n || normalize(d.name + " " + d.specialty).includes(n),
    );
  }, [q]);

  return (
    <>
      <PageHeader icon={FaUserDoctor} title="معرفی پزشکان" />
      <div className="mx-auto max-w-3xl space-y-5 px-4 py-6">
        <SearchBox
          value={q}
          onChange={setQ}
          placeholder="جستجوی نام یا تخصص..."
        />

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
                {d.specialty}
              </p>
            </Link>
          ))}
        </div>

        {list.length === 0 && (
          <p className="py-12 text-center text-slate-500">پزشکی یافت نشد.</p>
        )}
      </div>
    </>
  );
}
