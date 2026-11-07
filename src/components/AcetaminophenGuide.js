"use client";
import { useState } from "react";
import {
  FaWeightScale,
  FaBottleDroplet,
  FaPills,
  FaTriangleExclamation,
  FaCircleCheck,
  FaSyringe,
} from "react-icons/fa6";
import {
  doseRows,
  forms,
  INTERVAL_HOURS,
  MAX_DOSES,
} from "@/data/acetaminophen";
import { faNum } from "@/lib/utils";

const icons = {
  syrup: FaBottleDroplet,
  drops: FaSyringe,
  suppository: FaPills,
};
const rows = [...doseRows].sort((a, b) => a.minKg - b.minKg);

const toLatin = (s) =>
  String(s)
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    .replace(/[٫,]/g, ".");
const num = (s) => {
  const v = parseFloat(toLatin(s));
  return Number.isFinite(v) ? v : null;
};

const inputCls =
  "w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-base font-bold outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100";

export default function AcetaminophenGuide() {
  const [weight, setWeight] = useState("");
  const [form, setForm] = useState("syrup");
  const [mg, setMg] = useState("160");
  const [ml, setMl] = useState("5");

  const chooseForm = (f) => {
    setForm(f.key);
    if (f.defaults) {
      setMg(f.defaults.mg);
      setMl(f.defaults.ml);
    }
  };

  const kg = num(weight);
  const first = rows[0].minKg;
  const row =
    kg != null && kg >= first
      ? [...rows].reverse().find((r) => kg >= r.minKg)
      : null;
  const mgN = num(mg);
  const mlN = num(ml);
  const volume =
    row && form !== "suppository" && mgN > 0 && mlN > 0
      ? Math.round((row.mg / (mgN / mlN)) * 10) / 10
      : null;

  let state = "empty";
  if (kg != null && (kg <= 0 || kg > 150)) state = "invalid";
  else if (kg != null && !row) state = "light";
  else if (row) state = "ok";

  return (
    <div className="space-y-4">
      {/* وزن */}
      <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-50 text-teal-600">
            <FaWeightScale />
          </span>
          وزن کودک (کیلوگرم)
        </label>
        <input
          dir="ltr"
          inputMode="decimal"
          placeholder="مثلاً 12.5"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className={inputCls}
        />
      </div>

      {/* نوع دارو */}
      <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <p className="mb-3 text-sm font-bold text-slate-800">نوع استامینوفن</p>
        <div className="grid grid-cols-3 gap-2">
          {forms.map((f) => {
            const Icon = icons[f.key];
            const active = form === f.key;
            return (
              <button
                key={f.key}
                onClick={() => chooseForm(f)}
                className={`flex flex-col items-center gap-1.5 rounded-2xl py-3 text-xs font-bold transition active:scale-95 ${
                  active
                    ? "bg-teal-600 text-white shadow-md shadow-teal-200"
                    : "bg-slate-50 text-slate-600 ring-1 ring-slate-200"
                }`}
              >
                <Icon className="text-xl" />
                {f.title}
              </button>
            );
          })}
        </div>

        {form !== "suppository" && (
          <div className="mt-4">
            <p className="mb-2 text-xs leading-6 text-slate-500">
              غلظت را از روی برچسب همین بسته وارد کنید («… میلی‌گرم در …
              میلی‌لیتر»). غلظت محصولات مختلف فرق دارد و مقدار میلی‌لیتر به آن
              بستگی دارد.
            </p>
            <div className="flex items-center gap-2" dir="ltr">
              <input
                inputMode="decimal"
                value={mg}
                onChange={(e) => setMg(e.target.value)}
                className={inputCls}
                aria-label="میلی‌گرم"
              />
              <span className="shrink-0 text-xs font-bold text-slate-500">
                mg /
              </span>
              <input
                inputMode="decimal"
                value={ml}
                onChange={(e) => setMl(e.target.value)}
                className={inputCls}
                aria-label="میلی‌لیتر"
              />
              <span className="shrink-0 text-xs font-bold text-slate-500">
                mL
              </span>
            </div>
          </div>
        )}
      </div>

      {/* نتیجه */}
      {state === "empty" && (
        <p className="rounded-2xl bg-slate-100 p-4 text-center text-xs leading-6 text-slate-500">
          وزن کودک را وارد کنید تا مقدار هر نوبت نمایش داده شود.
        </p>
      )}

      {state === "invalid" && (
        <p className="rounded-2xl bg-red-50 p-4 text-center text-xs leading-6 text-red-600">
          وزن واردشده معتبر نیست.
        </p>
      )}

      {state === "light" && (
        <div className="flex items-start gap-3 rounded-3xl bg-amber-50 p-4 ring-1 ring-amber-200">
          <FaTriangleExclamation className="mt-1 shrink-0 text-xl text-amber-500" />
          <div>
            <p className="text-sm font-bold text-amber-900">
              مقدار را پزشک تعیین کند
            </p>
            <p className="mt-1 text-xs leading-6 text-amber-900">
              برای وزن کمتر از {faNum(first)} کیلوگرم (حدود ۲ سال)، برچسب دارو
              مقدار مشخصی ندارد و دوز باید توسط پزشک تعیین شود. اگر نوزاد کمتر
              از ۳ ماه دارد و تب کرده، دارو ندهید و فوراً به پزشک یا اورژانس
              مراجعه کنید.
            </p>
          </div>
        </div>
      )}

      {state === "ok" && (
        <div className="rounded-3xl bg-linear-to-br from-emerald-500 to-teal-600 p-5 text-white shadow-lg shadow-emerald-200">
          <p className="flex items-center gap-2 text-xs text-emerald-50">
            <FaCircleCheck /> مقدار هر نوبت
          </p>
          <p className="mt-1 text-3xl font-extrabold">
            {volume != null
              ? `${faNum(volume)} میلی‌لیتر`
              : `${faNum(row.mg)} میلی‌گرم`}
          </p>
          <p className="mt-1 text-sm text-emerald-50">
            دوز دارو: {faNum(row.mg)} میلی‌گرم استامینوفن
          </p>

          {form === "suppository" && (
            <p className="mt-3 rounded-2xl bg-white/15 p-3 text-xs leading-6">
              قدرت شیاف (میلی‌گرم) را روی بسته با این دوز مقایسه کنید. شیاف را
              خودتان نبرید یا تقسیم نکنید؛ اگر قدرت شیاف شما با دوز نمی‌خواند از
              پزشک یا داروساز بپرسید.
            </p>
          )}
          {form !== "suppository" && volume == null && (
            <p className="mt-3 rounded-2xl bg-white/15 p-3 text-xs leading-6">
              برای تبدیل به میلی‌لیتر، غلظت دارو را (میلی‌گرم در میلی‌لیتر) از
              روی برچسب بالا وارد کنید.
            </p>
          )}
        </div>
      )}

      <ul className="space-y-2 rounded-3xl bg-slate-100 p-4 text-xs leading-6 text-slate-600">
        <li>
          • حداقل فاصله بین دو نوبت {faNum(INTERVAL_HOURS)} ساعت؛ حداکثر{" "}
          {faNum(MAX_DOSES)} نوبت در ۲۴ ساعت.
        </li>
        <li>
          • فقط با سرنگ یا ابزار همان بسته اندازه بگیرید؛ قاشق خانگی استفاده
          نکنید.
        </li>
        <li>
          • داروهای سرماخوردگی ترکیبی ممکن است استامینوفن داشته باشند؛ هم‌زمان
          ندهید.
        </li>
        <li>
          • اگر بیش از مقدار مجاز داده شد، حتی بدون علامت فوراً با ۱۱۵ یا
          اورژانس تماس بگیرید.
        </li>
        <li>
          • این ابزار جایگزین دستور پزشک نیست؛ اگر پزشک مقدار دیگری گفته، همان
          را رعایت کنید.
        </li>
      </ul>
    </div>
  );
}
