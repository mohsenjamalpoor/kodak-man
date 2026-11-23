"use client";
import { useCallback, useState } from "react";
import { FaStar } from "react-icons/fa6";
import BottomSheet from "@/components/BottomSheet";
import Markdown from "@/components/Markdown";
import { stages } from "@/data/growth";

export default function GrowthStages() {
  const [openId, setOpenId] = useState(null);
  const close = useCallback(() => setOpenId(null), []);
  const cur = stages.find((s) => s.id === openId);

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-sky-100 md:p-5">
      <h2 className="flex items-center gap-2 text-base font-extrabold text-blue-950">
        <FaStar className="text-amber-400" />
        مراحل مهم رشد کودک
      </h2>

      <div className="relative mt-5 grid grid-cols-4 gap-2">
        <span
          aria-hidden
          className="absolute inset-x-8 top-8 h-0.5 bg-blue-100"
        />
        {stages.map((s) => (
          <button
            key={s.id}
            onClick={() => setOpenId(s.id)}
            className="relative flex flex-col items-center gap-1.5 text-center transition active:scale-95"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.image}
              alt=""
              className="h-16 w-16 rounded-full bg-white shadow-md ring-4 ring-white"
            />
            <span className="text-[13px] font-extrabold leading-5 text-blue-950">
              {s.label}
            </span>
            <span className="text-[10px] leading-4 text-slate-400">
              ({s.age})
            </span>
          </button>
        ))}
      </div>

      <p className="mt-4 text-center text-[11px] text-blue-600">
        برای دیدن جزئیات هر مرحله روی آن بزنید
      </p>

      {cur && (
        <BottomSheet title={cur.label} sub={cur.age} onClose={close}>
          <Markdown>{cur.content}</Markdown>
          <p className="mt-4 text-[11px] leading-5 text-slate-400">
            سرعت رشد هر کودک متفاوت است. این مطلب جایگزین مشاوره پزشک نیست.
          </p>
        </BottomSheet>
      )}
    </section>
  );
}
