import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowRight, FaClock, FaGraduationCap } from "react-icons/fa6";
import DoctorAvatar from "@/components/DoctorAvatar";
import { doctors, days, getDoctor } from "@/data/doctors";
import { faNum } from "@/lib/utils";

export async function generateStaticParams() {
  return doctors.map((d) => ({ id: String(d.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const d = getDoctor(id);
  return { title: d ? d.name : "پزشک" };
}

function Skeleton() {
  return (
    <div>
      <div className="h-32 bg-gradient-to-br from-teal-600 to-sky-600" />
      <div className="mx-auto -mt-12 max-w-3xl space-y-4 px-4">
        <div className="h-64 animate-pulse rounded-3xl bg-white ring-1 ring-slate-200" />
        <div className="h-40 animate-pulse rounded-3xl bg-white ring-1 ring-slate-200" />
      </div>
    </div>
  );
}

export default function DoctorPage({ params }) {
  return (
    <Suspense fallback={<Skeleton />}>
      <DoctorContent params={params} />
    </Suspense>
  );
}

async function DoctorContent({ params }) {
  const { id } = await params;
  const d = getDoctor(id);
  if (!d) notFound();

  return (
    <div>
      <div className="bg-gradient-to-br from-teal-600 to-sky-600 px-4 pb-16 pt-5 text-white">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium transition active:scale-95"
          >
            <FaArrowRight /> پزشکان
          </Link>
        </div>
      </div>

      <div className="mx-auto -mt-12 max-w-3xl space-y-4 px-4 pb-8">
        <div className="flex flex-col items-center gap-2 rounded-3xl bg-white p-6 text-center shadow-lg shadow-slate-200 ring-1 ring-slate-200">
          <DoctorAvatar
            doctor={d}
            className="-mt-16 h-28 w-28 text-5xl ring-4 ring-white"
          />
          <h1 className="mt-2 text-xl font-extrabold text-slate-900">
            {d.name}
          </h1>
          <p className="text-sm font-medium text-teal-700">{d.specialty}</p>
          <span className="rounded-full bg-slate-100 px-4 py-1 text-xs font-medium text-slate-600">
            {faNum(d.experience)} سال سابقه
          </span>
          <p className="mt-2 text-sm leading-8 text-slate-600">{d.bio}</p>
        </div>

        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-4 flex items-center gap-2 font-bold text-slate-800">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-50 text-violet-600">
              <FaGraduationCap />
            </span>
            تحصیلات و سوابق
          </h2>
          <ul className="space-y-2.5 text-sm text-slate-600">
            {d.education.map((e) => (
              <li key={e} className="flex items-center gap-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-violet-400" />
                {e}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-4 flex items-center gap-2 font-bold text-slate-800">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-50 text-teal-600">
              <FaClock />
            </span>
            ساعت حضور در درمانگاه
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {days.map((day) => {
              const time = d.schedule[day];
              return (
                <div
                  key={day}
                  className={`rounded-2xl p-3 text-center ${time ? "bg-teal-50 ring-1 ring-teal-100" : "bg-slate-50"}`}
                >
                  <p className="text-xs text-slate-500">{day}</p>
                  <p
                    className={`mt-1 text-sm font-bold ${time ? "text-teal-700" : "text-slate-300"}`}
                  >
                    {time || "—"}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
