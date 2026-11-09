import {
  FaSyringe,
  FaShieldHeart,
  FaIdCard,
  FaCalendarCheck,
} from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import InfoCard, { SectionTitle } from "@/components/InfoCard";
import VaccineSchedule from "@/components/VaccineSchedule";
import { careCards } from "@/data/vaccines";

export const metadata = { title: "واکسیناسیون" };

const facts = [
  { icon: FaIdCard, text: "کارت واکسن را همراه ببرید" },
  { icon: FaCalendarCheck, text: "نوبت‌ها را به‌موقع انجام دهید" },
  { icon: FaShieldHeart, text: "عقب افتاد؟ از همان‌جا ادامه دهید" },
];

export default function VaccinationPage() {
  return (
    <>
      <PageHeader icon={FaSyringe} title="واکسیناسیون" />

      <div className="mx-auto max-w-3xl space-y-5 px-4 py-6">
        {/* معرفی */}
        <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-sky-500 to-blue-600 p-5 text-white shadow-lg shadow-sky-200">
          <FaShieldHeart className="pointer-events-none absolute -bottom-6 -left-4 rotate-12 text-9xl text-white/10" />
          <div className="relative">
            <h2 className="text-lg font-extrabold leading-8">
              از بدو تولد تا ۲ سالگی
            </h2>
            <p className="mt-2 text-sm leading-7 text-sky-50">
              واکسن‌ها مهم‌ترین راه پیشگیری از بسیاری از بیماری‌های خطرناک
              کودکان هستند. سن کودک را انتخاب کنید تا واکسن‌های همان نوبت و
              مراقبت‌های بعدش را ببینید.
            </p>
          </div>
        </section>

        {/* نکته‌های سریع */}
        <div className="grid grid-cols-3 gap-2">
          {facts.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex flex-col items-center gap-2 rounded-2xl bg-white p-3 text-center shadow-sm ring-1 ring-slate-200"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 text-lg text-sky-600">
                <Icon />
              </span>
              <p className="text-[11px] font-medium leading-5 text-slate-600">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* برنامه واکسن */}
        <VaccineSchedule />

        {/* مراقبت‌ها */}
        <div className="pt-2">
          <SectionTitle
            icon={FaShieldHeart}
            color="bg-emerald-50 text-emerald-600"
            note="قبل، هنگام و بعد از واکسن چه کارهایی انجام دهیم؟ برای دیدن جزئیات، روی هر مورد بزنید."
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
