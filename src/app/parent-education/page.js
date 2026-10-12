import { FaBookOpen } from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import ArticleList from "@/components/ArticleList";
import { education } from "@/data/articles";

export const metadata = { title: "آموزش به والدین" };

export default function Page() {
  return (
    <>
      <PageHeader icon={FaBookOpen} title="آموزش به والدین" />
      <div className="mx-auto max-w-3xl px-4 py-6">
        <ArticleList items={education} basePath="/parent-education" />
      </div>
    </>
  );
}
