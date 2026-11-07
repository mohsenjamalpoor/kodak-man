import {
  FaAppleWhole,
  FaHeart,
  FaBottleDroplet,
  FaCapsules,
} from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import InfoCard, { SectionTitle } from "@/components/InfoCard";
import { slogan, formulas, supplements } from "@/data/nutrition";

export const metadata = { title: "تغذیه نوزاد و کودک" };

export default function FeedingPage() {
  return (
    <>
      <PageHeader icon={FaAppleWhole} title="تغذیه" />
      <div className="mx-auto max-w-3xl space-y-3 px-4 py-6">
        {/* شعار شیر مادر */}
        <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-pink-500 to-rose-600 p-6 text-white shadow-lg shadow-rose-200">
          <FaHeart className="pointer-events-none absolute -bottom-8 -left-6 rotate-12 text-[9rem] text-white/10" />
          <div className="relative">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/20 text-3xl">
              <FaHeart />
            </span>
            <h2 className="mt-4 text-xl font-extrabold leading-9">
              {slogan.title}
            </h2>
            <p className="mt-2 text-sm leading-8 text-rose-50">{slogan.text}</p>
          </div>
        </section>

        {/* شیر خشک */}
        <SectionTitle
          icon={FaBottleDroplet}
          color="bg-sky-50 text-sky-600"
          note="شیر خشک جایگزین شیر مادر نیست و فقط در صورت نیاز و طبق نظر پزشک استفاده می‌شود. برای دیدن جزئیات، روی هر مورد بزنید."
        >
          شیر خشک
        </SectionTitle>
        <div className="space-y-3">
          {formulas.map((f) => (
            <InfoCard key={f.key} {...f} />
          ))}
        </div>

        {/* مکمل‌ها */}
        <div className="pt-4">
          <SectionTitle
            icon={FaCapsules}
            color="bg-amber-50 text-amber-600"
            note="مکمل‌های رایج در نوزادان و کودکان؛ مقدار دقیق را پزشک یا مراکز بهداشت تعیین می‌کنند."
          >
            مکمل‌ها
          </SectionTitle>
          <div className="space-y-3">
            {supplements.map((s) => (
              <InfoCard key={s.key} {...s} />
            ))}
          </div>
        </div>

        <p className="rounded-2xl bg-slate-100 p-4 text-xs leading-6 text-slate-500">
          این مطالب جنبه آموزشی دارند و جایگزین مشاوره پزشک نیستند.
        </p>
      </div>
    </>
  );
}
