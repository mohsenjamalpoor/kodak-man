"use client";

import { useState } from "react";
import {
  FaChartSimple,
  FaPersonDress,
  FaPerson,
  FaCalendarDays,
  FaRuler,
  FaWeightHanging,
  FaTriangleExclamation,
  FaCircleCheck,
} from "react-icons/fa6";

import {
  evaluateHeight,
  evaluateWeight,
  MAX_HEIGHT_MONTHS,
  MAX_WEIGHT_MONTHS,
} from "@/data/who";

import { faNum } from "@/lib/utils";

const toLatin = (s) =>
  String(s)
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    .replace(/[٫,]/g, ".");

const num = (s) => {
  const v = parseFloat(toLatin(s));
  return Number.isFinite(v) ? v : null;
};

function describe(kind, z) {
  const what = kind === "height" ? "قد" : "وزن";

  if (z < -3) {
    return {
      tone: "warn",
      title: `${what} خیلی کمتر از معمول`,
      text: `${what} کودک خیلی پایین‌تر از محدوده معمول این سن است. برای بررسی روند رشد حتماً با پزشک مشورت کنید.`,
    };
  }

  if (z < -2) {
    return {
      tone: "warn",
      title: `${what} کمتر از معمول`,
      text: `${what} کودک پایین‌تر از محدوده معمول است. این نتیجه به‌تنهایی تشخیص نیست؛ با پزشک مشورت کنید.`,
    };
  }

  if (z > 2) {
    return {
      tone: "warn",
      title: `${what} بیشتر از معمول`,
      text: `${what} کودک بالاتر از محدوده معمول است. این نتیجه به‌تنهایی تشخیص نیست؛ با پزشک مشورت کنید.`,
    };
  }

  return {
    tone: "ok",
    title: `${what} در محدوده طبیعی`,
    text: `${what} کودک شما در محدوده طبیعی استاندارد رشد سازمان جهانی بهداشت (WHO) قرار دارد.`,
  };
}

function fmtPct(p) {
  if (p < 1) return "کمتر از ۱";
  if (p > 99) return "بیشتر از ۹۹";

  return faNum(Math.round(p));
}

function Row({ icon: Icon, label, unit, value, onChange, placeholder }) {
  return (
    <label className="flex items-center gap-2 rounded-2xl bg-white/95 px-3 py-2.5 shadow-sm ring-1 ring-sky-100 backdrop-blur-sm transition focus-within:ring-2 focus-within:ring-blue-500">
      <Icon className="shrink-0 text-lg text-blue-700" />

      <span className="shrink-0 text-xs font-bold text-slate-700">{label}</span>

      <input
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={`${label} ${unit}`}
        dir="ltr"
        className="min-w-0 flex-1 bg-transparent text-left text-base font-semibold text-slate-800 outline-none placeholder:text-slate-300"
      />
    </label>
  );
}

function ResultBlock({ title, unit, r, kind }) {
  const info = describe(kind, r.z);
  const pct = Math.min(100, Math.max(0, r.percentile));

  return (
    <div className="rounded-3xl bg-white p-4 shadow-md ring-1 ring-blue-100">
      <div className="flex items-start gap-3">
        {info.tone === "ok" ? (
          <FaCircleCheck className="mt-1 shrink-0 text-xl text-emerald-500" />
        ) : (
          <FaTriangleExclamation className="mt-1 shrink-0 text-xl text-amber-500" />
        )}

        <div>
          <p className="text-sm font-extrabold text-slate-800">{info.title}</p>

          <p className="mt-1 text-xs leading-6 text-slate-500">{info.text}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-center">
        <div className="rounded-2xl bg-blue-50 p-3">
          <p className="text-[11px] text-slate-500">صدک تقریبی {title}</p>

          <p className="text-xl font-extrabold text-blue-800">
            {fmtPct(r.percentile)}
          </p>
        </div>

        <div className="rounded-2xl bg-blue-50 p-3">
          <p className="text-[11px] text-slate-500">میانه WHO در این سن</p>

          <p className="text-xl font-extrabold text-blue-800">
            {faNum(Math.round(r.median * 10) / 10)}{" "}
            <span className="text-xs">{unit}</span>
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
  );
}

export default function GrowthCalculator() {
  const [sex, setSex] = useState("girl");
  const [age, setAge] = useState("");
  const [cm, setCm] = useState("");
  const [kg, setKg] = useState("");
  const [res, setRes] = useState(null);
  const [err, setErr] = useState("");

  const fail = (message) => {
    setRes(null);
    setErr(message);
  };

  // پاک کردن فرم و نتیجه
  const reset = () => {
    setSex("girl");
    setAge("");
    setCm("");
    setKg("");
    setRes(null);
    setErr("");
  };

  const submit = (e) => {
    e.preventDefault();

    const a = num(age);
    const h = num(cm);
    const w = num(kg);

    if (a == null || a < 0 || a > MAX_WEIGHT_MONTHS) {
      return fail(`سن را بین ۰ تا ${faNum(MAX_WEIGHT_MONTHS)} ماه وارد کنید.`);
    }

    if (h == null && w == null) {
      return fail("قد یا وزن کودک را وارد کنید.");
    }

    if (h != null && (h < 30 || h > 130)) {
      return fail("قد را بر حسب سانتی‌متر وارد کنید (مثلاً 75.5).");
    }

    if (w != null && (w < 1 || w > 40)) {
      return fail("وزن را بر حسب کیلوگرم وارد کنید (مثلاً 9.6).");
    }

    setErr("");

    const out = {
      age: a,
      height: null,
      weight: null,
      heightSkipped: false,
    };

    if (h != null) {
      if (a <= MAX_HEIGHT_MONTHS) {
        out.height = evaluateHeight(sex, a, h);
      } else {
        out.heightSkipped = true;
      }
    }

    if (w != null) {
      out.weight = evaluateWeight(sex, a, w);
    }

    setRes(out);
  };

  return (
    <section
      id="calculator"
      className="relative scroll-mt-20 overflow-hidden rounded-3xl bg-linear-to-br from-white via-sky-50 to-blue-50 p-4 shadow-sm ring-1 ring-sky-200 md:p-5"
    >
      {/* =========================================
          عنوان
      ========================================== */}
      <div className="relative z-20 flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-100 text-xl text-blue-700">
          <FaChartSimple />
        </span>

        <div>
          <h2 className="text-base font-extrabold text-blue-950">
            محاسبه و بررسی رشد کودک
          </h2>

          <p className="mt-0.5 text-[11px] leading-5 text-blue-900/70">
            قد، وزن و شاخص‌های رشد کودک را با استانداردهای جهانی مقایسه کنید.
          </p>
        </div>
      </div>

      {/* =========================================
          تصویر + فرم
      ========================================== */}
      <div
        className="
          relative mt-3 overflow-hidden rounded-3xl
          bg-white
          md:flex md:items-stretch md:gap-2
          md:overflow-visible
          md:rounded-none
          md:bg-transparent
        "
      >
        {/* =====================================
            تصویر پس‌زمینه موبایل
        ====================================== */}
        <div
          className="
            absolute inset-0 z-0
            bg-center bg-no-repeat
            bg-contain
            opacity-55
            md:hidden
          "
          style={{
            backgroundImage: "url('/images/growth/calc-boy.webp')",
          }}
        />

        {/* =====================================
            لایه سفید بسیار ملایم روی تصویر
        ====================================== */}
        <div
          className="
            absolute inset-0 z-0
            bg-white/15
            md:hidden
          "
        />

        {/* =====================================
            تصویر دسکتاپ
        ====================================== */}
        <div
          className="
            relative z-10 hidden
            w-[27%] shrink-0
            sm:w-[30%]
            md:block
          "
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/growth/calc-boy.webp"
            alt=""
            draggable={false}
            className="
              pointer-events-none
              absolute inset-0
              h-full w-full
              object-contain
              object-left-bottom
            "
          />
        </div>

        {/* =====================================
            فرم
        ====================================== */}
        <form
          onSubmit={submit}
          className="
            relative z-10
            min-w-0 flex-1
            space-y-2.5
            p-2
            sm:p-3
            md:p-0
          "
        >
          {/* جنسیت */}
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs font-bold text-slate-600">
              جنسیت:
            </span>

            <div className="grid flex-1 grid-cols-2 gap-2">
              {[
                {
                  k: "girl",
                  label: "دختر",
                  icon: FaPersonDress,
                  on: "text-pink-500",
                },
                {
                  k: "boy",
                  label: "پسر",
                  icon: FaPerson,
                  on: "text-blue-600",
                },
              ].map(({ k, label, icon: Icon, on }) => (
                <button
                  type="button"
                  key={k}
                  onClick={() => setSex(k)}
                  aria-pressed={sex === k}
                  className={`flex items-center justify-center gap-1.5 rounded-2xl py-2.5 text-xs font-bold transition active:scale-95 ${
                    sex === k
                      ? "bg-white shadow-md ring-2 ring-blue-500"
                      : "bg-white/85 text-slate-500 ring-1 ring-sky-100"
                  }`}
                >
                  <Icon className={sex === k ? on : "text-slate-400"} />

                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* سن */}
          <Row
            icon={FaCalendarDays}
            label="سن کودک (ماه):"
            unit="ماه"
            value={age}
            onChange={setAge}
            placeholder="0 - 60"
          />

          {/* قد */}
          <Row
            icon={FaRuler}
            label="قد (سانتی‌متر):"
            unit="سانتی‌متر"
            value={cm}
            onChange={setCm}
            placeholder="مثلاً 75.5"
          />

          {/* وزن */}
          <Row
            icon={FaWeightHanging}
            label="وزن (کیلوگرم):"
            unit="کیلوگرم"
            value={kg}
            onChange={setKg}
            placeholder="مثلاً 9.6"
          />

          {/* خطا */}
          {err && (
            <p className="rounded-2xl bg-red-50/95 p-3 text-xs leading-6 text-red-600 shadow-sm">
              {err}
            </p>
          )}

          {/* =====================================
              دکمه‌ها
          ====================================== */}
          <div className="mx-auto flex w-full max-w-xs gap-2 pt-1">
            {/* مشاهده نتیجه */}
            <button
              type="submit"
              className="
                flex flex-1 items-center justify-center gap-2
                rounded-2xl
                bg-blue-800
                py-3
                text-sm font-bold text-white
                shadow-lg shadow-blue-900/20
                transition
                hover:bg-blue-900
                active:scale-[0.98]
              "
            >
              <FaChartSimple />
              مشاهده نتیجه
            </button>

            {/* پاک کردن */}
            <button
              type="button"
              onClick={reset}
              className="
                flex items-center justify-center gap-2
                rounded-2xl
                bg-white
                px-4 py-3
                text-sm font-bold text-slate-600
                shadow-md
                ring-1 ring-slate-200
                transition
                hover:bg-slate-50
                hover:text-red-600
                active:scale-[0.98]
              "
            >
              پاک کردن
            </button>
          </div>
        </form>
      </div>

      {/* =========================================
          نتیجه
      ========================================== */}
      {res && (
        <div className="relative z-20 mt-4 space-y-3">
          {/* نتیجه قد */}
          {res.height && (
            <ResultBlock
              title="قد"
              unit="سانتی‌متر"
              r={res.height}
              kind="height"
            />
          )}

          {/* قد خارج از محدوده */}
          {res.heightSkipped && (
            <p className="rounded-2xl bg-amber-50 p-3 text-xs leading-6 text-amber-900">
              ارزیابی قد در این ابزار فقط تا {faNum(MAX_HEIGHT_MONTHS)} ماهگی
              انجام می‌شود. برای سن بالاتر، قد را با پزشک یا نمودار رشد دفترچه
              سلامت بررسی کنید.
            </p>
          )}

          {/* نتیجه وزن */}
          {res.weight && (
            <ResultBlock
              title="وزن"
              unit="کیلوگرم"
              r={res.weight}
              kind="weight"
            />
          )}
        </div>
      )}

      {/* =========================================
          توضیحات
      ========================================== */}
      <p className="relative z-20 mt-3 text-[11px] leading-5 text-blue-900/60">
        براساس استاندارد WHO: قد برای ۰ تا {faNum(MAX_HEIGHT_MONTHS)} ماه (قد
        خوابیده) و وزن برای ۰ تا {faNum(MAX_WEIGHT_MONTHS)} ماه. این ابزار تشخیص
        پزشکی نیست؛ روند رشد کودک را با پزشک بررسی کنید.
      </p>
    </section>
  );
}
