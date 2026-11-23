"use client";
import Link from "next/link";
import { useCallback, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import BottomSheet from "@/components/BottomSheet";
import Markdown from "@/components/Markdown";
import { topics } from "@/data/growth";

export default function GrowthTopics() {
  const [openId, setOpenId] = useState(null);
  const close = useCallback(() => setOpenId(null), []);
  const cur = topics.find((t) => t.id === openId);

  const goAnchor = (href) => {
    close();
    setTimeout(() => {
      document
        .querySelector(href)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
        {topics.map((t, i) => {
          const last = i === topics.length - 1 && topics.length % 2 === 1;
          return (
            <button
              key={t.id}
              onClick={() => setOpenId(t.id)}
              className={`group relative flex min-h-44 flex-col items-center justify-between rounded-3xl bg-linear-to-br ${t.bg} p-4 pb-3 text-center shadow-sm ring-1 ${t.ring} transition duration-200 hover:-translate-y-1 hover:shadow-xl active:scale-95 ${
                last ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.image}
                alt=""
                className="h-20 w-auto object-contain"
              />
              <h3 className="mt-2 text-sm font-extrabold leading-6 text-slate-800">
                {t.lines.map((l, k) => (
                  <span key={k} className="block">
                    {l}
                  </span>
                ))}
              </h3>
              <span className="mt-2 grid h-8 w-8 place-items-center rounded-full bg-white text-blue-700 shadow">
                <FaChevronLeft className="text-xs" />
              </span>
            </button>
          );
        })}
      </div>

      {cur && (
        <BottomSheet
          title={cur.lines.join(" ")}
          icon={cur.icon}
          onClose={close}
        >
          <Markdown>{cur.content}</Markdown>
          {cur.action &&
            (cur.action.href.startsWith("#") ? (
              <button
                onClick={() => goAnchor(cur.action.href)}
                className="mt-2 w-full rounded-2xl bg-blue-700 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 active:scale-[0.98]"
              >
                {cur.action.label}
              </button>
            ) : (
              <Link
                href={cur.action.href}
                onClick={close}
                className="mt-2 block w-full rounded-2xl bg-blue-700 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-blue-200 active:scale-[0.98]"
              >
                {cur.action.label}
              </Link>
            ))}
          <p className="mt-4 text-[11px] leading-5 text-slate-400">
            این مطلب جنبه آموزشی دارد و جایگزین مشاوره پزشک نیست.
          </p>
        </BottomSheet>
      )}
    </>
  );
}
