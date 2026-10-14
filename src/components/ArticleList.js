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
    <div className="space-y-4">
      <SearchBox value={q} onChange={setQ} placeholder="جستجو در مطالب..." />

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition active:scale-95 ${
              cat === c
                ? "bg-teal-600 text-white shadow-md shadow-teal-200"
                : "bg-white text-slate-600 ring-1 ring-slate-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-400">{faNum(list.length)} مطلب</p>

      <div className="grid grid-cols-2 gap-3 md:gap-5">
        {list.map((a) => {
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

              <p className="relative mt-3 text-[11px] font-medium text-slate-400">
                {a.category}
              </p>
              <h3 className="relative mt-1 line-clamp-3 text-sm font-bold leading-6 text-slate-800">
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

      {list.length === 0 && (
        <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">مطلبی پیدا نشد.</p>
          <button
            onClick={() => {
              setQ("");
              setCat("همه");
            }}
            className="mt-4 rounded-full bg-teal-600 px-5 py-2 text-xs font-bold text-white active:scale-95"
          >
            پاک کردن فیلترها
          </button>
        </div>
      )}
    </div>
  );
}
