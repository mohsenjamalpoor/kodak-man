import Link from "next/link";
import { FaBookOpen, FaChevronLeft } from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import AdBanner from "@/components/AdBanner";
import { eduBanners } from "@/data/eduBanners";
import { topics, topicHref } from "@/data/topics";
import { education } from "@/data/articles";
import { faNum } from "@/lib/utils";

export const metadata = { title: "آموزش به والدین" };

export default function Page() {
  const items = topics
    .map((t) => ({
      ...t,
      count: t.category
        ? education.filter((a) => a.category === t.category).length
        : null,
    }))
    // موضوعی که مطلب ندارد نمایش داده نمی‌شود (واکسیناسیون همیشه نمایش داده می‌شود)
    .filter((t) => t.href || t.count > 0);

  return (
    <>
      <PageHeader icon={FaBookOpen} title="آموزش به والدین" />

      <div className="mx-auto max-w-3xl space-y-5 px-4 py-6">
        <AdBanner items={eduBanners} />

        <section>
          <h2 className="mb-3 flex items-center gap-2 text-base font-extrabold text-slate-800">
            <span className="h-5 w-1.5 rounded-full bg-violet-500" />
            موضوعات آموزشی
          </h2>

          <div className="grid grid-cols-2 gap-3 md:gap-5">
            {items.map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.slug}
                  href={topicHref(t)}
                  className="group relative flex min-h-40 flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-200 transition duration-200 hover:-translate-y-1 hover:shadow-xl active:scale-95 md:min-h-44"
                >
                  <Icon className="pointer-events-none absolute -bottom-6 -left-6 rotate-12 text-8xl text-slate-100" />
                  <span
                    className={`relative grid h-16 w-16 place-items-center rounded-2xl bg-linear-to-br ${t.color} text-3xl text-white shadow-lg ring-4 ring-white`}
                  >
                    <Icon />
                  </span>
                  <div className="relative">
                    <h3 className="text-sm font-extrabold leading-6 text-slate-800 md:text-base">
                      {t.title}
                    </h3>
                    <p className="text-[11px] leading-5 text-slate-400">
                      {t.sub}
                    </p>
                  </div>
                  <span className="relative flex items-center gap-1 text-[11px] font-bold text-teal-600">
                    {t.count != null ? `${faNum(t.count)} مطلب` : "مشاهده"}
                    <FaChevronLeft className="text-[9px] transition group-hover:-translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <p className="rounded-2xl bg-slate-100 p-4 text-xs leading-6 text-slate-500">
          مطالب این بخش جنبه آموزشی دارند و جایگزین مشاوره پزشک نیستند.
        </p>
      </div>
    </>
  );
}
