import { Suspense } from "react";
import ArticleDetail from "@/components/ArticleDetail";
import { news, getBySlug } from "@/data/articles";

export async function generateStaticParams() {
  return news.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = getBySlug(news, slug);
  return { title: a ? a.title : "خبر" };
}

async function Content({ params }) {
  const { slug } = await params;
  return (
    <ArticleDetail
      article={getBySlug(news, slug)}
      basePath="/news"
      backLabel="تازه‌های پزشکی"
      related={news.filter((a) => a.slug !== slug)}
    />
  );
}

export default function Page({ params }) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Content params={params} />
    </Suspense>
  );
}
