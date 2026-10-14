import Link from "next/link";
import { FaHospital, FaHouseMedical } from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import { services } from "@/data/services";
import { facilities } from "@/data/facilities";

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

function SectionTitle({ icon: Icon, color, children }) {
  return (
    <h2 className="mb-3 flex items-center gap-3 font-extrabold text-slate-800">
      <span className={`grid h-9 w-9 place-items-center rounded-xl ${color}`}>
        <Icon />
      </span>
      {children}
    </h2>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader icon={FaHospital} title="بخش‌ها و خدمات مرکز" />

      <div className="mx-auto max-w-3xl space-y-8 px-4 py-6">
        {/* بخش‌ها و خدمات */}
        <section>
          <div className="grid grid-cols-2 gap-3 md:gap-5">
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
                  <h3 className="relative text-sm font-bold leading-6 text-slate-800 md:text-base">
                    {title}
                  </h3>
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
        </section>

        {/* امکانات بیمارستان */}
        <section>
          <SectionTitle
            icon={FaHouseMedical}
            color="bg-indigo-50 text-indigo-600"
          >
            امکانات بیمارستان
          </SectionTitle>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {facilities.map(({ title, sub, icon: Icon, color }) => (
              <div
                key={title}
                className="relative flex min-h-32 flex-col items-center justify-center gap-2 overflow-hidden rounded-3xl bg-white p-3 text-center shadow-sm ring-1 ring-slate-200"
              >
                <Icon className="pointer-events-none absolute -bottom-5 -left-5 rotate-12 text-7xl text-slate-100" />
                <span
                  className={`relative grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br ${color} text-2xl text-white shadow-lg ring-4 ring-white`}
                >
                  <Icon />
                </span>
                <div className="relative">
                  <h3 className="text-sm font-bold leading-6 text-slate-800">
                    {title}
                  </h3>
                  {sub && (
                    <p className="text-[11px] leading-5 text-slate-400">
                      {sub}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
