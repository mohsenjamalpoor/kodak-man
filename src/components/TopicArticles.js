import Link from "next/link";
import { FaClock, FaChevronLeft } from "react-icons/fa6";
import { getCategory } from "@/lib/categories";
import { faNum } from "@/lib/utils";

export default function TopicArticles({ items, basePath }) {
  if (!items.length) {
    return (
      <p className="rounded-3xl bg-white p-8 text-center text-sm text-slate-500 ring-1 ring-slate-200">
        هنوز مطلبی در این موضوع نیست.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-5">
      {items.map((a) => {
        const { icon: Icon, color } = getCategory(a.category);
        return (
          <Link
            key={a.slug}
            href={`${basePath}/${a.slug}`}
            className="group relative flex min-h-52 flex-col overflow-hidden rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:-translate-y-1 hover:shadow-xl active:scale-95"
          >
            <Icon className="pointer-events-none absolute -bottom-6 -left-6 rotate-12 text-8xl text-slate-100" />
            <span
              className={`relative grid h-12 w-12 place-items-center rounded-2xl bg-linear-to-br ${color} text-xl text-white shadow-lg ring-4 ring-white`}
            >
              <Icon />
            </span>
            <h3 className="relative mt-3 line-clamp-4 text-sm font-bold leading-6 text-slate-800">
              {a.title}
            </h3>
            <div className="relative mt-auto flex items-center justify-between pt-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <FaClock /> {faNum(a.readTime)} دقیقه
              </span>
              <FaChevronLeft className="text-slate-300 transition group-hover:-translate-x-1" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
