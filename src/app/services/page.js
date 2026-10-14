import Link from "next/link";
import { FaHospital } from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import { services } from "@/data/services";

export const metadata = { title: "بخش‌ها و خدمات" };

const fallbackColors = [
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
        {services.map(({ slug, title, icon: Icon, color }, i) => {
          const cls =
            "group relative flex min-h-36 flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-200 transition duration-200 hover:-translate-y-1 hover:shadow-xl active:scale-95 md:min-h-44";
          const inner = (
            <>
              <Icon className="pointer-events-none absolute -bottom-6 -left-6 rotate-12 text-8xl text-slate-100" />
              <span
                className={`relative grid h-16 w-16 place-items-center rounded-2xl bg-linear-to-br ${
                  color || fallbackColors[i % fallbackColors.length]
                } text-3xl text-white shadow-lg ring-4 ring-white`}
              >
                <Icon />
              </span>
              <h2 className="relative text-sm font-bold leading-6 text-slate-800 md:text-base">
                {title}
              </h2>
            </>
          );
          return slug ? (
            <Link key={title} href={`/services/${slug}`} className={cls}>
              {inner}
            </Link>
          ) : (
            <div key={title} className={cls}>
              {inner}
            </div>
          );
        })}
      </div>
    </>
  );
}
