import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowRight, FaClock } from "react-icons/fa6";
import { faNum } from "@/lib/utils";

export default function ArticleDetail({ article, backHref, backLabel }) {
  if (!article) notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Link href={backHref} className="mb-6 inline-flex items-center gap-2 text-sm text-teal-700 hover:underline">
        <FaArrowRight /> {backLabel}
      </Link>
      <span className="mb-3 block w-fit rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">{article.category}</span>
      <h1 className="mb-3 text-2xl font-extrabold leading-10 text-slate-900 md:text-3xl">{article.title}</h1>
      <div className="mb-8 flex items-center gap-4 text-xs text-slate-400">
        {article.date && <span>{article.date}</span>}
        <span className="flex items-center gap-1"><FaClock /> {faNum(article.readTime)} دقیقه مطالعه</span>
      </div>
      <div className="space-y-5 rounded-3xl bg-white p-6 text-[15px] leading-8 text-slate-700 shadow-sm ring-1 ring-slate-200 md:p-8">
        {article.content.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <p className="mt-6 rounded-2xl bg-amber-50 p-4 text-xs leading-6 text-amber-800">
        این مطلب جنبه آموزشی دارد و جایگزین مشاوره پزشک نیست.
      </p>
    </article>
  );
}
