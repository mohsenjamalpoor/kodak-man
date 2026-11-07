import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";

export default function ProductCard({ p }) {
  const Icon = p.icon;
  return (
    <Link
      href={`/nutrition/p/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-200 hover:-translate-y-1 hover:shadow-xl active:scale-95"
    >
      <div
        className={`relative grid h-28 place-items-center overflow-hidden bg-linear-to-br ${p.color}`}
      >
        <span className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15" />
        <span className="pointer-events-none absolute -bottom-8 left-2 h-20 w-20 rounded-full bg-white/10" />
        {p.tag && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-slate-700">
            {p.tag}
          </span>
        )}
        <Icon className="relative text-6xl text-white drop-shadow-lg" />
      </div>

      <div className="flex flex-1 flex-col p-3">
        <h3 className="text-sm font-extrabold leading-6 text-slate-800">
          {p.title}
        </h3>
        <p className="mt-0.5 line-clamp-2 min-h-10 text-[11px] leading-5 text-slate-500">
          {p.sub}
        </p>
        <span className="mt-auto flex items-center justify-between pt-3 text-xs font-bold text-teal-600">
          مشاهده
          <FaChevronLeft className="text-[10px] transition group-hover:-translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
