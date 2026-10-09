import ArticleDetail from "@/components/ArticleDetail";
import { education, getBySlug } from "@/data/articles";

export async function generateStaticParams() {
  return education.map((a) => ({ slug: a.slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <ArticleDetail article={getBySlug(education, slug)} backHref="/parent-education" backLabel="بازگشت به آموزش والدین" />;
}
