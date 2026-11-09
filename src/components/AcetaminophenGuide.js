"use client";

import { useState } from "react";
import {
  FaBottleDroplet,
  FaCircleCheck,
  FaPills,
  FaSyringe,
  FaWeightScale,
} from "react-icons/fa6";
import {
  DOSE_MG_PER_KG,
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

const inputCls =
  "w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center text-base font-bold outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100";

const toLatin = (value) =>
  String(value)
    .replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
    .replace(/[٫,]/g, ".");

const toNumber = (value) => {
  const parsed = Number.parseFloat(toLatin(value));
  return Number.isFinite(parsed) ? parsed : null;
};

const round = (value) => Math.round(value * 10) / 10;

export default function AcetaminophenGuide() {
  const [weight, setWeight] = useState("");
  const [form, setForm] = useState("syrup");

  const kg = toNumber(weight);
  const isInvalid = kg !== null && (kg <= 0 || kg > 150);
  const hasValidWeight = kg !== null && !isInvalid;
  const minDose = hasValidWeight ? round(kg * DOSE_MG_PER_KG.min) : null;
  const maxDose = hasValidWeight ? round(kg * DOSE_MG_PER_KG.max) : null;

  // قواعد درخواستی: شربت = نصف وزن به میلی‌لیتر؛ قطره = دوبرابر وزن به قطره.
  const amount =
    hasValidWeight && form !== "suppository"
      ? form === "syrup"
        ? round(kg / 2)
        : Math.round(kg * 2)
      : null;
  const amountUnit = form === "syrup" ? "میلی‌لیتر" : "قطره";

  return (
    <div className="space-y-4">
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
          onChange={(event) => setWeight(event.target.value)}
          className={inputCls}
        />
      </div>

      <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <p className="mb-3 text-sm font-bold text-slate-800">نوع استامینوفن</p>
        <div className="grid grid-cols-3 gap-2">
          {forms.map((item) => {
            const Icon = icons[item.key];
            const active = form === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setForm(item.key)}
                className={`flex flex-col items-center gap-1.5 rounded-2xl py-3 text-xs font-bold transition active:scale-95 ${
                  active
                    ? "bg-teal-600 text-white shadow-md shadow-teal-200"
                    : "bg-slate-50 text-slate-600 ring-1 ring-slate-200"
                }`}
              >
                <Icon className="text-xl" />
                {item.title}
              </button>
            );
          })}
        </div>
      </div>

      {isInvalid && (
        <p className="rounded-2xl bg-red-50 p-4 text-center text-xs leading-6 text-red-600">
          وزن واردشده معتبر نیست.
        </p>
      )}

      {hasValidWeight && (
        <div className="rounded-3xl bg-linear-to-br from-emerald-500 to-teal-600 p-5 text-white shadow-lg shadow-emerald-200">
          <p className="flex items-center gap-2 text-xs text-emerald-50">
            <FaCircleCheck /> مقدار هر نوبت
          </p>
          <p className="mt-1 text-3xl font-extrabold">
            {form === "suppository"
              ? `${faNum(minDose)} تا ${faNum(maxDose)} میلی‌گرم`
              : `${faNum(amount)} ${amountUnit}`}
          </p>
          <p className="mt-1 text-sm text-emerald-50">
            دوز وزنی: {faNum(minDose)} تا {faNum(maxDose)} میلی‌گرم استامینوفن
          </p>

          {form === "suppository" && (
            <p className="mt-3 rounded-2xl bg-white/15 p-3 text-xs leading-6">
              قدرت شیافِ روی بسته را با بازهٔ دوز بالا مقایسه کنید. شیاف را
              خودتان نبرید یا تقسیم نکنید؛ در صورت نیاز از پزشک یا داروساز
              بپرسید.
            </p>
          )}
        </div>
      )}

      <ul className="space-y-2 rounded-3xl bg-slate-100 p-4 text-xs leading-6 text-slate-600">
        <li>
          • دوز وزنی استامینوفن در هر نوبت {faNum(DOSE_MG_PER_KG.min)} تا{" "}
          {faNum(DOSE_MG_PER_KG.max)} میلی‌گرم به‌ازای هر کیلوگرم است.
        </li>
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
