import { FaHospital } from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import { services } from "@/data/services";

export const metadata = { title: "بخش‌ها و خدمات" };

export default function ServicesPage() {
  return (
    <>
      <PageHeader icon={FaHospital} title="بخش‌ها و خدمات مرکز" subtitle="خدمات تشخیصی و درمانی کودکان و نوزادان" />
      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ title, desc, icon: Icon }) => (
          <div key={title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg">
            <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-teal-50 text-xl text-teal-600"><Icon /></span>
            <h2 className="mb-2 font-bold text-slate-800">{title}</h2>
            <p className="text-sm leading-7 text-slate-500">{desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}
