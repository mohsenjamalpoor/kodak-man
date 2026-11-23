"use client";
import { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaChevronUp,
  FaLightbulb,
  FaCircleCheck,
} from "react-icons/fa6";
import TopicArticles from "@/components/TopicArticles";
import { tips } from "@/data/growth";

export default function GrowthTips({ articles }) {
  const [open, setOpen] = useState(false);
  const articlesRef = useRef(null);

  // بعد از باز شدن، تا فهرست مقاله‌ها اسکرول می‌کند
  useEffect(() => {
    if (open && articlesRef.current) {
      articlesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [open]);

  return (
    <>
      {/* نکات طلایی */}
      <section className="overflow-hidden rounded-3xl bg-linear-to-br from-sky-50 to-blue-100 shadow-sm ring-1 ring-sky-100 md:flex md:flex-row-reverse">
        {/* عکس - سمت راست */}
        <div className="flex w-full items-center justify-center md:w-2/5 md:shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/growth/tips-mom.webp"
            alt=""
            draggable={false}
            className="
        h-auto
        max-h-80
        w-full
        object-contain
        md:max-h-none
      "
          />
        </div>

        {/* نکات - سمت چپ */}
        <div className="flex-1 p-5 text-right md:p-8">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-blue-950">
            <FaLightbulb className="shrink-0 text-amber-400" />
            <span>نکات طلایی برای رشد بهتر</span>
          </h2>

          <ul className="mt-3 space-y-2.5">
            {tips.map((t) => (
              <li
                key={t}
                className="flex items-center gap-2.5 text-sm text-blue-950"
              >
                <FaCircleCheck className="shrink-0 text-lg text-blue-600" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="growth-articles"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-blue-800 shadow transition active:scale-95"
          >
            {open ? "بستن مقاله‌ها" : "مطالعه نکات بیشتر"}
            {open ? (
              <FaChevronUp className="text-[10px]" />
            ) : (
              <FaArrowLeft className="text-[10px]" />
            )}
          </button>
        </div>
      </section>

      {/* مقاله‌ها: فقط بعد از لمس دکمه */}
      {open && (
        <section
          id="growth-articles"
          ref={articlesRef}
          className="scroll-mt-20"
        >
          <h2 className="mb-3 text-lg font-extrabold text-blue-950">
            مقاله‌های رشد و تکامل
          </h2>
          <TopicArticles items={articles} basePath="/parent-education" />
        </section>
      )}
    </>
  );
}

//  <a
//             href="#articles"
//             className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-blue-800 shadow transition active:scale-95"
//           >
//             مطالعه نکات بیشتر
//             <FaArrowLeft className="text-[10px]" />
//           </a>
