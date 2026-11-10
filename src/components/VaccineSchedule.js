"use client";
import { useState } from "react";
import {
  FaSyringe,
  FaDroplet,
  FaCircleCheck,
  FaCalendarCheck,
} from "react-icons/fa6";
import { schedule, vaccineInfo } from "@/data/vaccines";

const meta = {
  bcg: {
    oral: false,
    tip: "چند هفته بعد جوش یا زخم کوچک طبیعی است؛ پانسمان و پماد نگذارید.",
  },
  hepb: {
    oral: false,
    tip: "عارضه خاصی ندارد؛ ممکن است محل تزریق کمی درد کند.",
  },
  opv: {
    oral: true,
    tip: "عارضه خاصی ندارد؛ اگر بلافاصله استفراغ کرد، به مرکز اطلاع دهید.",
  },
  ipv: { oral: false, tip: "قرمزی و درد محل تزریق گذراست." },
  penta: { oral: false, tip: "تب خفیف و بی‌قراری تا ۱ یا ۲ روز طبیعی است." },
  rota: {
    oral: true,
    tip: "اسهال یا استفراغ خفیف گذراست؛ استفراغ شدید یا خون در مدفوع نیاز به اورژانس دارد.",
  },
  pcv: { oral: false, tip: "قرمزی محل تزریق و تب خفیف گذراست." },
  measles: {
    oral: false,
    tip: "تب یا بثورات خفیف حدود یک هفته بعد ممکن است دیده شود.",
  },
  mmr: {
    oral: false,
    tip: "تب یا بثورات خفیف حدود یک هفته بعد ممکن است دیده شود.",
  },
  dtp: { oral: false, tip: "درد و تورم محل تزریق و تب خفیف گذراست." },
};

const order = [
  "bcg",
  "hepb",
  "opv",
  "ipv",
  "penta",
  "rota",
  "pcv",
  "measles",
  "mmr",
  "dtp",
];

export default function VaccineSchedule() {
  const [idx, setIdx] = useState(0);
  const cur = schedule[idx];
  const next = schedule[idx + 1];

  return (
    <div className="space-y-5">
      {/* انتخاب سن */}
      <div>
        <p className="mb-2 text-xs font-bold text-slate-500">
          سن کودک را انتخاب کنید
        </p>
        <div
          role="tablist"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none"
        >
          {schedule.map((s, i) => (
            <button
              key={s.age}
              role="tab"
              aria-selected={i === idx}
              onClick={() => setIdx(i)}
              className={`shrink-0 rounded-2xl px-4 py-2.5 text-xs font-bold transition active:scale-95 ${
                i === idx
                  ? `bg-linear-to-br ${s.color} text-white shadow-md`
                  : "bg-white text-slate-600 ring-1 ring-slate-200"
              }`}
            >
              {s.age}
            </button>
          ))}
        </div>
      </div>

      {/* واکسن‌های این سن */}
      <section>
        <div
          className={`mb-3 rounded-3xl bg-linear-to-br ${cur.color} p-5 text-white shadow-lg`}
        >
          <p className="text-xs text-white/80">نوبت واکسن</p>
          <h3 className="mt-1 text-xl font-extrabold">{cur.age}</h3>
          {cur.sub && <p className="mt-1 text-xs text-white/90">{cur.sub}</p>}
          {next && (
            <p className="mt-3 flex items-center gap-2 text-xs text-white/90">
              <FaCalendarCheck /> نوبت بعدی: {next.age}
            </p>
          )}
        </div>

        <ul className="space-y-3">
          {cur.vaccines.map((k) => {
            const v = vaccineInfo[k];
            const m = meta[k];
            return (
              <li
                key={k}
                className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br text-xl text-white shadow-md ${
                      m.oral
                        ? "from-amber-400 to-orange-500"
                        : "from-sky-500 to-blue-600"
                    }`}
                  >
                    {m.oral ? <FaDroplet /> : <FaSyringe />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-extrabold text-slate-800">
                        {v.name}
                      </h4>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          m.oral
                            ? "bg-amber-50 text-amber-700"
                            : "bg-sky-50 text-sky-700"
                        }`}
                      >
                        {m.oral ? "خوراکی" : "تزریقی"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-6 text-slate-500">
                      {v.prevents}
                    </p>
                    {v.note && (
                      <p className="mt-1 text-[11px] leading-5 text-amber-700">
                        {v.note}
                      </p>
                    )}
                  </div>
                </div>
                <p className="mt-3 rounded-2xl bg-emerald-50 p-3 text-xs leading-6 text-emerald-800">
                  <span className="font-bold">بعد از واکسن: </span>
                  {m.tip}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
