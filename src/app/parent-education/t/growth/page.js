import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import GrowthHero from "@/components/growth/GrowthHero";
import GrowthTopics from "@/components/growth/GrowthTopics";
import GrowthStages from "@/components/growth/GrowthStages";
import GrowthCalculator from "@/components/growth/GrowthCalculator";
import GrowthTips from "@/components/growth/GrowthTips";

import { education } from "@/data/articles";

export const metadata = {
  title: "رشد و تکامل",
};

export default function GrowthPage() {
  const articles = education.filter((a) => a.category === "رشد و تکامل");

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-50/80 via-white to-white">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-4 md:py-6">
        {/* =====================================
            دکمه بازگشت به آموزش والدین
        ====================================== */}
        <Link
          href="/parent-education"
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-white
            px-4
            py-2
            text-xs
            font-bold
            text-slate-600
            shadow-sm
            ring-1
            ring-slate-200
            transition
            hover:-translate-y-0.5
            hover:shadow-md
            active:scale-95
          "
        >
          <FaArrowRight />
          آموزش به والدین
        </Link>

        {/* =====================================
            Hero
        ====================================== */}
        <GrowthHero />

        {/* =====================================
            موضوعات آموزشی
        ====================================== */}
        <section id="topics" className="scroll-mt-20">
          <div
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              bg-white
              px-3
              py-6
              shadow-sm
              ring-1
              ring-sky-100
              md:px-6
              md:py-8
            "
          >
            {/* =====================================
                افکت نور پس‌زمینه
            ====================================== */}
            <div
              className="
                pointer-events-none
                absolute
                -top-20
                left-1/2
                h-40
                w-72
                -translate-x-1/2
                rounded-full
                bg-sky-100/40
                blur-3xl
              "
            />

            {/* =====================================
                عنوان وسط با دو خط اطراف
            ====================================== */}
            <div
              className="
                relative
                mb-6
                flex
                w-full
                items-center
                gap-2
                md:gap-4
              "
            >
              {/* خط سمت راست */}
              <div
                className="
                  h-px
                  min-w-0
                  flex-1
                  rounded-full
                  bg-linear-to-l
                  from-sky-300
                  to-sky-100
                  md:h-0.5
                "
              />

              {/* عنوان */}
              <div className="shrink-0 text-center">
                <h2
                  className="
                    whitespace-nowrap
                    text-lg
                    font-black
                    tracking-tight
                   text-[#0f8ceb]
                    md:text-2xl
                  "
                >
                  موضوعات آموزشی
                </h2>
              </div>

              {/* خط سمت چپ */}
              <div
                className="
                  h-px
                  min-w-0
                  flex-1
                  rounded-full
                  bg-linear-to-r
                  from-sky-300
                  to-sky-100
                  md:h-0.5
                "
              />
            </div>

            {/* =====================================
                کارت‌های موضوعات
            ====================================== */}
            <div className="relative">
              <GrowthTopics />
            </div>
          </div>
        </section>

        {/* =====================================
            محاسبه‌گر رشد + مراحل رشد
        ====================================== */}
        <div className="grid gap-4 md:grid-cols-2 md:items-start">
          <GrowthCalculator />
          <GrowthStages />
        </div>

        {/* =====================================
            نکات و مقالات آموزشی
        ====================================== */}
        <GrowthTips articles={articles} />

        {/* =====================================
            توضیح پایانی
        ====================================== */}
        <p
          className="
            rounded-2xl
            bg-slate-100
            p-4
            text-xs
            leading-6
            text-slate-500
          "
        >
          مطالب این صفحه جنبه آموزشی دارند و جایگزین مشاوره پزشک نیستند. رشد هر
          کودک متفاوت است.
        </p>
      </div>
    </div>
  );
}
