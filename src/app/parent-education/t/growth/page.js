import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import GrowthHero from "@/components/growth/GrowthHero";
import GrowthTopics from "@/components/growth/GrowthTopics";
import GrowthStages from "@/components/growth/GrowthStages";
import GrowthCalculator from "@/components/growth/GrowthCalculator";
import GrowthTips from "@/components/growth/GrowthTips";
import { education } from "@/data/articles";

export const metadata = { title: "رشد و تکامل" };

export default function GrowthPage() {
  const articles = education.filter((a) => a.category === "رشد و تکامل");

  return (
    <div className="bg-linear-to-b from-sky-50/80 to-white">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-4 md:py-6">
        <Link
          href="/parent-education"
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm ring-1 ring-slate-200 transition active:scale-95"
        >
          <FaArrowRight /> آموزش به والدین
        </Link>

        <GrowthHero />

        <section id="topics" className="scroll-mt-20">
          <h2 className="mb-3 text-lg font-extrabold text-blue-950">
            موضوعات مهم
          </h2>
          <GrowthTopics />
        </section>

        {/* items-start: با باز شدن نتیجه محاسبه‌گر، کادر مراحل کش نیاید */}
        <div className="grid gap-4 md:grid-cols-2 md:items-start">
          <GrowthCalculator />
          <GrowthStages />
        </div>

        <GrowthTips articles={articles} />

        <p className="rounded-2xl bg-slate-100 p-4 text-xs leading-6 text-slate-500">
          مطالب این صفحه جنبه آموزشی دارند و جایگزین مشاوره پزشک نیستند. رشد هر
          کودک متفاوت است.
        </p>
      </div>
    </div>
  );
}
