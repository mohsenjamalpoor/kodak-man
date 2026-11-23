import Link from "next/link";
import {
  FaArrowRight,
  FaArrowLeft,
  FaLightbulb,
  FaCircleCheck,
} from "react-icons/fa6";
import GrowthHero from "@/components/growth/GrowthHero";
import GrowthTopics from "@/components/growth/GrowthTopics";
import GrowthStages from "@/components/growth/GrowthStages";
import GrowthCalculator from "@/components/growth/GrowthCalculator";
import TopicArticles from "@/components/TopicArticles";
import { education } from "@/data/articles";
import { tips } from "@/data/growth";

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

        {/* نکات طلایی */}
        <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-sky-50 to-blue-100 shadow-sm ring-1 ring-sky-100 md:flex md:items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/growth/tips-mom.webp"
            alt=""
            draggable={false}
            className="h-40 w-full object-cover object-left md:absolute md:inset-y-0 md:left-0 md:h-full md:w-2/5"
          />
          <div className="relative p-5 md:ms-auto md:w-3/5 md:py-8">
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-blue-950">
              <FaLightbulb className="text-amber-400" />
              نکات طلایی برای رشد بهتر
            </h2>
            <ul className="mt-3 space-y-2.5">
              {tips.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2.5 text-sm text-blue-950"
                >
                  <FaCircleCheck className="shrink-0 text-lg text-blue-600" />
                  {t}
                </li>
              ))}
            </ul>
            <a
              href="#articles"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-blue-800 shadow transition active:scale-95"
            >
              مطالعه نکات بیشتر
              <FaArrowLeft className="text-[10px]" />
            </a>
          </div>
        </section>

        {/* مقاله‌ها */}
        <section id="articles" className="scroll-mt-20">
          <h2 className="mb-3 text-lg font-extrabold text-blue-950">
            مقاله‌های رشد و تکامل
          </h2>
          <TopicArticles items={articles} basePath="/parent-education" />
        </section>

        <p className="rounded-2xl bg-slate-100 p-4 text-xs leading-6 text-slate-500">
          مطالب این صفحه جنبه آموزشی دارند و جایگزین مشاوره پزشک نیستند. رشد هر
          کودک متفاوت است.
        </p>
      </div>
    </div>
  );
}
