import { FaHouseMedical } from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import { facilities } from "@/data/facilities";

export const metadata = { title: "امکانات بیمارستان" };

export default function FacilitiesPage() {
  return (
    <>
      <PageHeader icon={FaHouseMedical} title="امکانات بیمارستان" />
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 px-4 py-6 md:gap-5">
        {facilities.map(({ title, sub, icon: Icon, color }) => (
          <div
            key={title}
            className="relative flex min-h-36 flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-200 md:min-h-44"
          >
            <Icon className="pointer-events-none absolute -bottom-6 -left-6 rotate-12 text-8xl text-slate-100" />
            <span
              className={`relative grid h-16 w-16 place-items-center rounded-2xl bg-linear-to-br ${color} text-3xl text-white shadow-lg ring-4 ring-white`}
            >
              <Icon />
            </span>
            <div className="relative">
              <h2 className="text-sm font-bold leading-6 text-slate-800 md:text-base">
                {title}
              </h2>
              {sub && (
                <p className="text-[11px] leading-5 text-slate-400">{sub}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
