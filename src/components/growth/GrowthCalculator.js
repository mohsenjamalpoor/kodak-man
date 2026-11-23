"use client";
import { useState } from "react";
import {
  FaCalculator,
  FaVenus,
  FaMars,
  FaCalendarDays,
  FaRulerVertical,
  FaChartSimple,
  FaTriangleExclamation,
  FaCircleCheck,
} from "react-icons/fa6";
import { lengthForAge, MAX_MONTHS } from "@/data/who";
import { faNum } from "@/lib/utils";

const toLatin = (s) =>
  String(s)
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    .replace(/[٫,]/g, ".");
const num = (s) => {
  const v = parseFloat(toLatin(s));
  return Number.isFinite(v) ? v : null;
};

const field =
  "w-full rounded-2xl border border-slate-200 bg-white py-3 pe-4 ps-11 text-right text-base font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

function describe(z) {
  if (z < -3)
    return {
      tone: "warn",
      title: "خیلی کمتر از معمول",
      text: "قد کودک خیلی پایین‌تر از محدوده معمول این سن است. برای بررسی روند رشد حتماً با پزشک مشورت کنید.",
    };
  if (z < -2)
    return {
      tone: "warn",
      title: "کمتر از معمول",
      text: "قد کودک پایین‌تر از محدوده معمول است. این نتیجه به‌تنهایی تشخیص نیست؛ برای بررسی روند رشد با پزشک مشورت کنید.",
    };
  if (z > 2)
    return {
      tone: "warn",
      title: "بیشتر از معمول",
      text: "قد کودک بالاتر از محدوده معمول است. این نتیجه به‌تنهایی تشخیص نیست؛ با پزشک مشورت کنید.",
    };
  return {
    tone: "ok",
    title: "در محدوده طبیعی",
    text: "قد کودک شما در محدوده طبیعی استاندارد رشد سازمان جهانی بهداشت (WHO) قرار دارد.",
  };
}

export default function GrowthCalculator() {
  const [sex, setSex] = useState("girl");
  const [age, setAge] = useState("");
  const [cm, setCm] = useState("");
  const [res, setRes] = useState(null);
  const [err, setErr] = useState("");

  const fail = (m) => {
    setRes(null);
    setErr(m);
  };

  const submit = (e) => {
    e.preventDefault();
    const a = num(age);
    const h = num(cm);
    if (a == null || a < 0 || a > MAX_MONTHS)
      return fail(`سن را بین ۰ تا ${faNum(MAX_MONTHS)} ماه وارد کنید.`);
    if (h == null || h < 30 || h > 120)
      return fail("قد را بر حسب سانتی‌متر وارد کنید (مثلاً 75.5).");
    setErr("");
    setRes({ ...lengthForAge(sex, a, h), age: a, cm: h });
  };

  const info = res ? describe(res.z) : null;
  const pct = res ? Math.min(100, Math.max(0, res.percentile)) : 0;
  const pctText = res
    ? res.percentile < 1
      ? "کمتر از ۱"
      : res.percentile > 99
        ? "بیشتر از ۹۹"
        : faNum(Math.round(res.percentile))
    : "";

  return (
    <section
      id="calculator"
      className="relative scroll-mt-20 overflow-hidden rounded-3xl bg-linear-to-br from-sky-100 to-blue-100 p-4 shadow-sm ring-1 ring-sky-200 md:p-5"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/growth/giraffe.webp"
        alt=""
        draggable={false}
        className="pointer-events-none absolute bottom-0 left-0 hidden h-[88%] w-auto object-contain sm:block"
      />

      <div className="relative sm:pe-0 sm:ps-0">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-700 text-lg text-white shadow">
            <FaCalculator />
          </span>
          <div>
            <h2 className="text-base font-extrabold text-blue-950">
              محاسبه‌گر رشد کودک
            </h2>
            <p className="text-[11px] text-blue-900/70">
              قد کودک را با استاندارد WHO مقایسه کنید
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="mt-4 space-y-2.5 sm:ms-[38%]">
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: "girl", label: "دختر", icon: FaVenus, on: "text-pink-600" },
              { k: "boy", label: "پسر", icon: FaMars, on: "text-blue-600" },
            ].map(({ k, label, icon: Icon, on }) => (
              <button
                type="button"
                key={k}
                onClick={() => setSex(k)}
                aria-pressed={sex === k}
                className={`flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold transition active:scale-95 ${
                  sex === k
                    ? "bg-white shadow-md ring-2 ring-blue-500"
                    : "bg-white/70 text-slate-500 ring-1 ring-white"
                }`}
              >
                <Icon className={sex === k ? on : "text-slate-400"} />
                {label}
              </button>
            ))}
          </div>

          <div className="relative">
            <FaCalendarDays className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-700" />
            <input
              inputMode="decimal"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="سن کودک (ماه)"
              aria-label="سن کودک به ماه"
              className={field}
            />
          </div>
          <div className="relative">
            <FaRulerVertical className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-blue-700" />
            <input
              inputMode="decimal"
              value={cm}
              onChange={(e) => setCm(e.target.value)}
              placeholder="قد (سانتی‌متر)"
              aria-label="قد به سانتی‌متر"
              className={field}
            />
          </div>

          {err && (
            <p className="rounded-2xl bg-red-50 p-3 text-xs leading-6 text-red-600">
              {err}
            </p>
          )}

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-800 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition active:scale-[0.98]"
          >
            <FaChartSimple /> مشاهده نتیجه
          </button>
        </form>

        {res && info && (
          <div className="mt-4 rounded-3xl bg-white p-4 shadow-md ring-1 ring-blue-100 sm:ms-[38%]">
            <div className="flex items-start gap-3">
              {info.tone === "ok" ? (
                <FaCircleCheck className="mt-1 shrink-0 text-xl text-emerald-500" />
              ) : (
                <FaTriangleExclamation className="mt-1 shrink-0 text-xl text-amber-500" />
              )}
              <div>
                <p className="text-sm font-extrabold text-slate-800">
                  {info.title}
                </p>
                <p className="mt-1 text-xs leading-6 text-slate-500">
                  {info.text}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-2xl bg-blue-50 p-3">
                <p className="text-[11px] text-slate-500">صدک تقریبی</p>
                <p className="text-xl font-extrabold text-blue-800">
                  {pctText}
                </p>
              </div>
              <div className="rounded-2xl bg-blue-50 p-3">
                <p className="text-[11px] text-slate-500">
                  میانه WHO در این سن
                </p>
                <p className="text-xl font-extrabold text-blue-800">
                  {faNum(Math.round(res.median * 10) / 10)}{" "}
                  <span className="text-xs">سانتی‌متر</span>
                </p>
              </div>
            </div>

            <div dir="ltr" className="mt-5 px-2">
              <div className="relative h-2.5 rounded-full bg-linear-to-r from-amber-300 via-emerald-400 to-amber-300">
                <span
                  className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow ring-4 ring-blue-700"
                  style={{ left: `${pct}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </div>
        )}

        <p className="mt-3 text-[11px] leading-5 text-blue-900/60 sm:ms-[38%]">
          فقط برای ۰ تا {faNum(MAX_MONTHS)} ماه (قد خوابیده). این ابزار تشخیص
          پزشکی نیست.
        </p>
      </div>
    </section>
  );
}
