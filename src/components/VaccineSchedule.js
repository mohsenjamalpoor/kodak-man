"use client";
import { useEffect, useRef, useState } from "react";
import { FaSyringe, FaDroplet, FaBaby, FaChevronDown } from "react-icons/fa6";
import { schedule, vaccineInfo } from "@/data/vaccines";
import { faNum } from "@/lib/utils";

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

function AgeButton({ s, active, onClick }) {
  const m = s.age.match(/^(\S+)\s+ماهگی$/);
  return (
    <button
      aria-pressed={active}
      aria-expanded={active}
      onClick={onClick}
      className={`flex h-20 flex-col items-center justify-center rounded-2xl transition active:scale-95 ${
        active
          ? `bg-linear-to-br ${s.color} text-white shadow-lg`
          : "bg-white text-slate-700 ring-1 ring-slate-200"
      }`}
    >
      {m ? (
        <>
          <span className="text-2xl font-extrabold leading-none">{m[1]}</span>
          <span
            className={`mt-1 text-[11px] font-medium ${
              active ? "text-white/90" : "text-slate-400"
            }`}
          >
            ماهگی
          </span>
        </>
      ) : (
        <>
          <FaBaby className="text-2xl" />
          <span className="mt-1 text-[11px] font-bold">بدو تولد</span>
        </>
      )}
    </button>
  );
}

export default function VaccineSchedule() {
  const [idx, setIdx] = useState(null); // null = بسته
  const [open, setOpen] = useState(null);
  const panelRef = useRef(null);
  const cur = idx != null ? schedule[idx] : null;

  // لمس سن: باز می‌شود؛ لمس دوباره همان سن: بسته می‌شود
  const pick = (i) => {
    setIdx((prev) => (prev === i ? null : i));
    setOpen(null);
  };

  // بعد از باز شدن، تا محتوا اسکرول می‌کند (روی موبایل)
  useEffect(() => {
    if (idx != null && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [idx]);

  return (
    <div className="space-y-4">
      {/* انتخاب سن */}
      <div>
        <p className="mb-2 text-sm font-extrabold text-slate-800">
          سن کودک شما چند ماه است؟
        </p>
        <div className="grid grid-cols-3 gap-2">
          {schedule.map((s, i) => (
            <AgeButton
              key={s.age}
              s={s}
              active={i === idx}
              onClick={() => pick(i)}
            />
          ))}
        </div>
      </div>

      {/* حالت بسته */}
      {!cur && (
        <p className="rounded-2xl bg-slate-100 p-4 text-center text-xs leading-6 text-slate-500">
          یکی از سن‌ها را انتخاب کنید تا واکسن‌های همان نوبت نمایش داده شود.
        </p>
      )}

      {/* واکسن‌های این سن */}
      {cur && (
        <section ref={panelRef} aria-live="polite" className="scroll-mb-24">
          <div
            className={`flex items-center justify-between rounded-t-3xl bg-linear-to-br ${cur.color} px-5 py-4 text-white`}
          >
            <div>
              <h3 className="text-lg font-extrabold">{cur.age}</h3>
              {cur.sub && (
                <p className="mt-0.5 text-xs text-white/90">{cur.sub}</p>
              )}
            </div>
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
              {faNum(cur.vaccines.length)} واکسن
            </span>
          </div>

          <ul className="divide-y divide-slate-100 overflow-hidden rounded-b-3xl bg-white shadow-sm ring-1 ring-slate-200">
            {cur.vaccines.map((k) => {
              const v = vaccineInfo[k];
              const m = meta[k];
              const isOpen = open === k;
              return (
                <li key={k}>
                  <button
                    onClick={() => setOpen(isOpen ? null : k)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-3 p-4 text-right transition active:bg-slate-50"
                  >
                    <span
                      className={`grid h-8 w-11 shrink-0 place-items-center rounded-2xl bg-linear-to-br text-lg text-white shadow-md ${
                        m.oral
                          ? "from-amber-400 to-orange-500"
                          : "from-sky-500 to-blue-600"
                      }`}
                    >
                      {m.oral ? <FaDroplet /> : <FaSyringe />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-extrabold leading-6 text-slate-800">
                        {v.name}
                      </span>
                      <span
                        className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          m.oral
                            ? "bg-amber-50 text-amber-700"
                            : "bg-sky-50 text-sky-700"
                        }`}
                      >
                        {m.oral ? "خوراکی" : "تزریقی"}
                      </span>
                    </span>
                    <FaChevronDown
                      className={`shrink-0 text-slate-300 transition ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="space-y-3 bg-slate-50 px-4 pb-4 pt-3">
                      <div>
                        <p className="text-[11px] font-bold text-slate-400">
                          برای پیشگیری از
                        </p>
                        <p className="mt-0.5 text-sm leading-7 text-slate-700">
                          {v.prevents}
                        </p>
                      </div>
                      {v.note && (
                        <p className="text-[11px] leading-5 text-amber-700">
                          {v.note}
                        </p>
                      )}
                      <p className="rounded-2xl bg-emerald-50 p-3 text-xs leading-6 text-emerald-800">
                        <span className="font-bold">بعد از واکسن: </span>
                        {m.tip}
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="mt-2 text-center text-[11px] text-slate-400">
            برای دیدن توضیح هر واکسن روی آن بزنید. برای بستن، دوباره روی سن
            بزنید.
          </p>
        </section>
      )}
    </div>
  );
}
