"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaClock, FaArrowLeft } from "react-icons/fa6";
import SearchBox from "./SearchBox";
import { normalize, faNum } from "@/lib/utils";

export default function ArticleList({ items, basePath }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("همه");
  const cats = ["همه", ...new Set(items.map((i) => i.category))];

  const list = useMemo(() => {
    const n = normalize(q);
    return items.filter(
      (i) => (cat === "همه" || i.category === cat) && (!n || normalize(i.title + i.summary + i.category).includes(n))
    );
  }, [q, cat, items]);

  return (
    <div className="space-y-6">
      <SearchBox value={q} onChange={setQ} placeholder="جستجو در عنوان و موضوع..." />
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              cat === c ? "bg-teal-600 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => (
          <Link
            key={a.slug}
            href={`${basePath}/${a.slug}`}
            className="group flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="mb-3 w-fit rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">{a.category}</span>
            <h3 className="mb-2 font-bold leading-7 text-slate-800">{a.title}</h3>
            <p className="mb-4 flex-1 text-sm leading-7 text-slate-500">{a.summary}</p>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1"><FaClock /> {faNum(a.readTime)} دقیقه مطالعه</span>
              <span className="flex items-center gap-1 font-medium text-teal-600">ادامه <FaArrowLeft className="transition group-hover:-translate-x-1" /></span>
            </div>
          </Link>
        ))}
      </div>
      {list.length === 0 && <p className="py-10 text-center text-slate-500">موردی یافت نشد.</p>}
    </div>
  );
}
