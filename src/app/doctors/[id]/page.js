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

export default async function DoctorPage({ params }) {
  const { id } = await params;
  const d = getDoctor(id);
  if (!d) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/doctors" className="mb-6 inline-flex items-center gap-2 text-sm text-teal-700 hover:underline">
        <FaArrowRight /> بازگشت به پزشکان
      </Link>

      <div className="mb-6 flex flex-col items-center gap-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:flex-row md:p-8">
        <DoctorAvatar doctor={d} className="h-32 w-32 text-5xl" />
        <div className="text-center sm:text-right">
          <h1 className="text-2xl font-extrabold text-slate-900">{d.name}</h1>
          <p className="mt-1 text-teal-700">{d.specialty}</p>
          <p className="mt-2 text-sm text-slate-500">سابقه فعالیت: {faNum(d.experience)} سال</p>
          <p className="mt-4 text-sm leading-8 text-slate-600">{d.bio}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-4 flex items-center gap-2 font-bold text-slate-800"><FaGraduationCap className="text-teal-600" /> تحصیلات و سوابق</h2>
          <ul className="space-y-2 text-sm text-slate-600">
            {d.education.map((e) => <li key={e} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-teal-500" />{e}</li>)}
          </ul>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-4 flex items-center gap-2 font-bold text-slate-800"><FaClock className="text-teal-600" /> ساعت حضور در درمانگاه</h2>
          <ul className="divide-y divide-slate-100 text-sm">
            {days.map((day) => (
              <li key={day} className="flex justify-between py-2">
                <span className="text-slate-600">{day}</span>
                <span className={d.schedule[day] ? "font-medium text-teal-700" : "text-slate-300"}>{d.schedule[day] || "—"}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
