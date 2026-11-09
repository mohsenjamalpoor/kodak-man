import { FaSyringe, FaShieldHeart, FaCircleInfo } from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import InfoCard, { SectionTitle } from "@/components/InfoCard";
import { schedule, vaccineInfo, careCards } from "@/data/vaccines";

export const metadata = { title: "واکسیناسیون" };

export default function VaccinationPage() {
  return (
    <>
      <PageHeader icon={FaSyringe} title="واکسیناسیون" />

      <div className="mx-auto max-w-3xl space-y-3 px-4 py-6">
        {/* معرفی */}
        <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-sky-500 to-blue-600 p-5 text-white shadow-lg shadow-sky-200">
          <FaShieldHeart className="pointer-events-none absolute -bottom-6 -left-4 rotate-12 text-9xl text-white/10" />
          <div className="relative">
            <h2 className="text-lg font-extrabold leading-8">
              از بدو تولد تا ۲ سالگی
            </h2>
            <p className="mt-2 text-sm leading-7 text-sky-50">
              واکسن‌ها مهم‌ترین راه پیشگیری از بسیاری از بیماری‌های خطرناک
              کودکان هستند. در این صفحه می‌بینید در هر سن چه واکسن‌هایی زده
              می‌شود و والدین چه کارهایی باید انجام دهند.
            </p>
          </div>
        </section>

        {/* جدول زمانی */}
        <SectionTitle
          icon={FaCircleInfo}
          color="bg-sky-50 text-sky-600"
          note="برنامه کشوری ایمن‌سازی؛ همه واکسن‌ها در مراکز بهداشت و بیمارستان‌ها رایگان است. کارت واکسن را همیشه همراه داشته باشید."
        >
          جدول زمانی واکسن‌ها
        </SectionTitle>

        <ol>
          {schedule.map((s, i) => (
            <li key={s.age} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-linear-to-br ${s.color} text-lg text-white shadow-md ring-4 ring-slate-50`}
                >
                  <FaSyringe />
                </span>
                {i < schedule.length - 1 && (
                  <span className="my-1 w-0.5 flex-1 rounded bg-slate-200" />
                )}
              </div>

              <div className="mb-4 flex-1 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <h3 className="font-extrabold text-slate-800">{s.age}</h3>
                {s.sub && <p className="text-xs text-slate-400">{s.sub}</p>}

                <ul className="mt-3 space-y-2">
                  {s.vaccines.map((k) => {
                    const v = vaccineInfo[k];
                    return (
                      <li key={k} className="rounded-2xl bg-slate-50 p-3">
                        <p className="text-sm font-bold text-slate-800">
                          {v.name}
                        </p>
                        <p className="mt-0.5 text-xs leading-5 text-slate-500">
                          {v.prevents}
                        </p>
                        {v.note && (
                          <p className="mt-1 text-[11px] leading-5 text-amber-700">
                            {v.note}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        {/* مراقبت‌ها */}
        <div className="pt-2">
          <SectionTitle
            icon={FaShieldHeart}
            color="bg-emerald-50 text-emerald-600"
            note="والدین قبل، هنگام و بعد از واکسن چه کارهایی انجام دهند. برای دیدن جزئیات، روی هر مورد بزنید."
          >
            مراقبت‌ها و کارهای والدین
          </SectionTitle>
          <div className="space-y-3">
            {careCards.map((c) => (
              <InfoCard
                key={c.key}
                icon={c.icon}
                color={c.color}
                title={c.title}
                sub={c.sub}
                content={c.content}
              />
            ))}
          </div>
        </div>

        <p className="rounded-2xl bg-slate-100 p-4 text-xs leading-6 text-slate-500">
          جدول واکسن ممکن است توسط وزارت بهداشت به‌روز شود؛ برای برنامه دقیق
          کودک خود با مرکز بهداشت یا پزشک مشورت کنید. این مطلب جایگزین مشاوره
          پزشک نیست.
        </p>
      </div>
    </>
  );
}
