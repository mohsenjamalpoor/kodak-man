import { Suspense } from "react";
import ArticleDetail from "@/components/ArticleDetail";
import { education, getBySlug } from "@/data/articles";

export async function generateStaticParams() {
  return education.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = getBySlug(education, slug);
  return { title: a ? a.title : "مقاله" };
}

async function Content({ params }) {
  const { slug } = await params;
  return (
    <ArticleDetail
      article={getBySlug(education, slug)}
      basePath="/parent-education"
      backLabel="آموزش والدین"
      related={education.filter((a) => a.slug !== slug)}
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
