"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaClock, FaChevronLeft } from "react-icons/fa6";
import SearchBox from "./SearchBox";
import { getCategory } from "@/lib/categories";
import { normalize, faNum } from "@/lib/utils";

export default function ArticleList({ items, basePath }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("همه");
  const cats = ["همه", ...new Set(items.map((i) => i.category))];

  const list = useMemo(() => {
    const n = normalize(q);
    return items.filter(
      (i) =>
        (cat === "همه" || i.category === cat) &&
        (!n ||
          normalize(i.title + " " + i.summary + " " + i.category).includes(n)),
    );
  }, [q, cat, items]);

  return (
    <div className="space-y-5">
      <SearchBox value={q} onChange={setQ} placeholder="جستجو در مطالب..." />

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition active:scale-95 ${
              cat === c
                ? "bg-teal-600 text-white shadow"
                : "bg-white text-slate-600 ring-1 ring-slate-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {list.map((a) => {
          const { icon: Icon, color } = getCategory(a.category);
          return (
            <Link
              key={a.slug}
              href={`${basePath}/${a.slug}`}
              className="group flex items-center gap-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
            >
              <span
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${color} text-2xl text-white shadow-md`}
              >
                <Icon />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-slate-400">
                  {a.category}
                </p>
                <h3 className="mt-0.5 text-sm font-bold leading-6 text-slate-800">
                  {a.title}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
                  <FaClock /> {faNum(a.readTime)} دقیقه
                  {a.date && <span>• {a.date}</span>}
                </p>
              </div>
              <FaChevronLeft className="shrink-0 text-slate-300 transition group-hover:-translate-x-1" />
            </Link>
          );
        })}
      </div>

      {list.length === 0 && (
        <p className="py-12 text-center text-slate-500">موردی یافت نشد.</p>
      )}
    </div>
  );
}
