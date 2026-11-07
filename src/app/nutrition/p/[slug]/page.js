import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowRight, FaTriangleExclamation } from "react-icons/fa6";
import Markdown from "@/components/Markdown";
import InfoCard from "@/components/InfoCard";
import AcetaminophenGuide from "@/components/AcetaminophenGuide";
import ProductCard from "@/components/ProductCard";
import { products, getProduct } from "@/data/products";
import { acetaminophenTypes } from "@/data/nutrition";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  return { title: p ? p.title : "محصول" };
}

async function Content({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const Icon = p.icon;
  const isSupplement = p.category === "supplement";
  const backHref = isSupplement ? "/nutrition/supplements" : "/nutrition/drugs";
  const backLabel = isSupplement ? "مکمل‌ها" : "دارو";
  const related = products
    .filter((x) => x.category === p.category && x.slug !== p.slug)
    .slice(0, 2);

  return (
    <div>
      <div className="bg-linear-to-br from-teal-500 via-cyan-500 to-sky-600 px-4 pb-24 pt-5 text-white">
        <div className="mx-auto max-w-3xl">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium transition active:scale-95"
          >
            <FaArrowRight /> {backLabel}
          </Link>
        </div>
      </div>

      <div className="mx-auto -mt-10 max-w-3xl space-y-4 px-4 pb-10">
        <header className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200 ring-1 ring-slate-200">
          <span
            className={`-mt-14 mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-linear-to-br ${p.color} text-3xl text-white shadow-lg ring-4 ring-white`}
          >
            <Icon />
          </span>
          {p.tag && (
            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
              {p.tag}
            </span>
          )}
          <h1 className="mt-3 text-xl font-extrabold leading-9 text-slate-900">
            {p.title}
          </h1>
          <p className="mt-1 text-sm leading-7 text-slate-500">{p.sub}</p>
        </header>

        {p.slug === "acetaminophen" ? (
          <>
            <AcetaminophenGuide />
            <div className="space-y-3 pt-2">
              {acetaminophenTypes.map((t) => (
                <InfoCard
                  key={t.key}
                  icon={t.icon}
                  color={t.color}
                  title={t.title}
                  sub={t.sub}
                  content={t.content}
                />
              ))}
            </div>
          </>
        ) : (
          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <Markdown>{p.content}</Markdown>
          </article>
        )}

        <p className="flex items-start gap-3 rounded-2xl bg-slate-100 p-4 text-xs leading-6 text-slate-500">
          <FaTriangleExclamation className="mt-1 shrink-0 text-amber-500" />
          این مطلب جنبه آموزشی دارد و جایگزین مشاوره پزشک نیست. دارو یا مکمل را
          با نظر پزشک یا داروساز مصرف کنید.
        </p>

        {related.length > 0 && (
          <section className="pt-2">
            <h2 className="mb-3 font-bold text-slate-800">محصولات مرتبط</h2>
            <div className="grid grid-cols-2 gap-3">
              {related.map((r) => (
                <ProductCard key={r.slug} p={r} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default function Page({ params }) {
  return (
    <Suspense fallback={<div className="min-h-dvh" />}>
      <Content params={params} />
    </Suspense>
  );
}
