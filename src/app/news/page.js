import { FaNewspaper } from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import ArticleList from "@/components/ArticleList";
import { news } from "@/data/articles";

export const metadata = { title: "تازه‌های پزشکی کودکان" };

export default function Page() {
  return (
    <>
      <PageHeader icon={FaNewspaper} title="تازه‌های پزشکی کودکان" />
      <div className="mx-auto max-w-3xl px-4 py-6">
        <ArticleList items={news} basePath="/news" />
      </div>
    </>
  );
}
