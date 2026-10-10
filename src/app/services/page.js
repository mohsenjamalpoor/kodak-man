import { FaHospital } from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import { services } from "@/data/services";

export const metadata = { title: "بخش‌ها و خدمات" };

const colors = [
  "from-teal-500 to-emerald-500",
  "from-sky-500 to-blue-500",
  "from-violet-500 to-purple-500",
  "from-orange-500 to-amber-500",
  "from-rose-500 to-pink-500",
  "from-indigo-500 to-blue-600",
  "from-cyan-500 to-teal-600",
  "from-red-500 to-rose-600",
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader icon={FaHospital} title="بخش‌ها و خدمات مرکز" />
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 px-4 py-6 md:gap-5">
        {services.map(({ title, icon: Icon }, i) => (
          <div
            key={title}
            className="flex min-h-36 flex-col items-center justify-center gap-4 rounded-3xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl active:scale-95 md:min-h-44"
          >
            <span
              className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${colors[i % colors.length]} text-3xl text-white shadow-md`}
            >
              <Icon />
            </span>
            <h2 className="text-sm font-bold leading-6 text-slate-800 md:text-base">
              {title}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
}
