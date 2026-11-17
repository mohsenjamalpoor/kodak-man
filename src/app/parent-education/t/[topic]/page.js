import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import TopicArticles from "@/components/TopicArticles";
import { topics, getTopic } from "@/data/topics";
import { education } from "@/data/articles";

export async function generateStaticParams() {
  return topics.filter((t) => t.category).map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }) {
  const { topic } = await params;
  const t = getTopic(topic);
  return { title: t ? t.title : "موضوع" };
}

async function Content({ params }) {
  const { topic } = await params;
  const t = getTopic(topic);
  if (!t || !t.category) notFound();

  const items = education.filter((a) => a.category === t.category);

  return (
    <>
      <PageHeader icon={t.icon} title={t.title} />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-6">
        <Link
          href="/parent-education"
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm ring-1 ring-slate-200 transition active:scale-95"
        >
          <FaArrowRight /> همه موضوع‌ها
        </Link>
        <TopicArticles items={items} basePath="/parent-education" />
      </div>
    </>
  );
}

export default function Page({ params }) {
  return (
    <Suspense fallback={<div className="min-h-dvh" />}>
      <Content params={params} />
    </Suspense>
  );
}
