import { FaSyringe, FaShieldHeart } from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import InfoCard, { SectionTitle } from "@/components/InfoCard";
import VaccineSchedule from "@/components/VaccineSchedule";
import { careCards } from "@/data/vaccines";

export const metadata = { title: "واکسیناسیون" };

export default function VaccinationPage() {
  return (
    <>
      <PageHeader icon={FaSyringe} title="واکسیناسیون" />

      <div className="mx-auto max-w-3xl space-y-5 px-4 py-6">
        {/* معرفی کوتاه */}
        <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-sky-500 to-blue-600 px-5 py-4 text-white shadow-lg shadow-sky-200">
          <FaShieldHeart className="pointer-events-none absolute -bottom-5 -left-3 rotate-12 text-8xl text-white/10" />
          <h2 className="relative text-base font-extrabold">
            واکسیناسیون از بدو تولد تا ۱۸ ماهگی
          </h2>
          <p className="relative mt-1 text-xs leading-6 text-sky-50">
            سن کودک را انتخاب کنید و واکسن‌های همان نوبت را ببینید.
          </p>
        </section>

        {/* برنامه واکسن */}
        <VaccineSchedule />

        {/* مراقبت‌ها */}
        <div className="pt-2">
          <SectionTitle
            icon={FaShieldHeart}
            color="bg-sky-50 text-sky-700"
            note="قبل، هنگام و بعد از واکسن چه کارهایی انجام دهیم؟ برای دیدن جزئیات، روی هر مورد بزنید."
          >
            آنچه درباره واکسیناسیون باید بدانیم
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
      </div>
    </>
  );
}
