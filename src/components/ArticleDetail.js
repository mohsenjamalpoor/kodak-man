import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import {
  FaArrowRight,
  FaClock,
  FaCalendarDays,
  FaChevronLeft,
  FaTriangleExclamation,
} from "react-icons/fa6";
import { getCategory } from "@/lib/categories";
import { faNum } from "@/lib/utils";

const md = {
  h2: ({ children }) => (
    <h2 className="mb-3 mt-8 flex items-center gap-2 text-lg font-extrabold text-slate-900 before:h-6 before:w-1.5 before:rounded-full before:bg-teal-500">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-6 text-base font-bold text-slate-800">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="my-3 text-[15px] leading-8 text-slate-700">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-extrabold text-slate-900">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="my-3 list-disc space-y-2 ps-6 text-[15px] leading-8 text-slate-700 marker:text-teal-500">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 list-decimal space-y-2 ps-6 text-[15px] leading-8 text-slate-700 marker:font-bold marker:text-teal-600">
      {children}
    </ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900 [&>p]:my-1 [&>p]:text-sm [&>p]:leading-7 [&>p]:text-amber-900">
      {children}
    </blockquote>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="font-medium text-teal-700 underline underline-offset-4"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-6 border-slate-200" />,
};

export default function ArticleDetail({
  article,
  basePath,
  backLabel,
  related = [],
}) {
  if (!article) notFound();
  const { icon: Icon, color } = getCategory(article.category);
  const body = Array.isArray(article.content)
    ? article.content.join("\n\n")
    : article.content;

  return (
    <div>
      <div className="bg-gradient-to-br from-teal-600 to-sky-600 px-4 pb-24 pt-5 text-white">
        <div className="mx-auto max-w-3xl">
          <Link
            href={basePath}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium transition active:scale-95"
          >
            <FaArrowRight /> {backLabel}
          </Link>
        </div>
      </div>

      <div className="mx-auto -mt-10 max-w-3xl space-y-4 px-4 pb-10">
        <header className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200 ring-1 ring-slate-200">
          <span
            className={`-mt-14 mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${color} text-3xl text-white shadow-lg ring-4 ring-white`}
          >
            <Icon />
          </span>
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
            {article.category}
          </span>
          <h1 className="mt-3 text-xl font-extrabold leading-9 text-slate-900">
            {article.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <FaClock /> {faNum(article.readTime)} دقیقه مطالعه
            </span>
            {article.date && (
              <span className="flex items-center gap-1.5">
                <FaCalendarDays /> {article.date}
              </span>
            )}
          </div>
          <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-8 text-slate-500">
            {article.summary}
          </p>
        </header>

        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <ReactMarkdown components={md}>{body}</ReactMarkdown>
        </article>

        <p className="flex items-start gap-3 rounded-2xl bg-slate-100 p-4 text-xs leading-6 text-slate-500">
          <FaTriangleExclamation className="mt-1 shrink-0 text-amber-500" />
          این مطلب جنبه آموزشی دارد و جایگزین مشاوره پزشک نیست.
        </p>

        {related.length > 0 && (
          <section className="pt-4">
            <h2 className="mb-3 font-bold text-slate-800">مطالب مرتبط</h2>
            <div className="space-y-3">
              {related.slice(0, 2).map((r) => {
                const { icon: RIcon, color: rColor } = getCategory(r.category);
                return (
                  <Link
                    key={r.slug}
                    href={`${basePath}/${r.slug}`}
                    className="group flex items-center gap-4 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200 transition active:scale-[0.98]"
                  >
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${rColor} text-white`}
                    >
                      <RIcon />
                    </span>
                    <span className="flex-1 text-sm font-bold leading-6 text-slate-800">
                      {r.title}
                    </span>
                    <FaChevronLeft className="text-slate-300" />
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
