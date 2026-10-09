import ArticleDetail from "@/components/ArticleDetail";
import { news, getBySlug } from "@/data/articles";

export async function generateStaticParams() {
  return news.map((a) => ({ slug: a.slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <ArticleDetail article={getBySlug(news, slug)} backHref="/news" backLabel="بازگشت به تازه‌های پزشکی" />;
}
