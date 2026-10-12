import Link from "next/link";
import {
  FaCalendarDays,
  FaUserDoctor,
  FaBookOpen,
  FaNewspaper,
  FaHospital,
  FaMagnifyingGlass,
  FaChevronLeft,
} from "react-icons/fa6";

// مسیر لوگو: فایل را داخل public/images/logo.png بگذارید و این مقدار را بنویسید: "/images/logo.png"
const LOGO_SRC = "";

const features = [
  {
    href: "/schedule",
    title: "برنامه درمانگاه",
    icon: FaCalendarDays,
    color: "from-teal-500 to-emerald-500",
  },
  {
    href: "/doctors",
    title: "معرفی پزشکان",
    icon: FaUserDoctor,
    color: "from-sky-500 to-blue-500",
  },
  {
    href: "/parent-education",
    title: "آموزش به والدین",
    icon: FaBookOpen,
    color: "from-violet-500 to-purple-500",
  },
  {
    href: "/news",
    title: "تازه‌های پزشکی کودکان",
    icon: FaNewspaper,
    color: "from-orange-500 to-amber-500",
  },
  {
    href: "/services",
    title: "بخش‌ها و خدمات",
    icon: FaHospital,
    color: "from-rose-500 to-pink-500",
  },
];

export default function Home() {
  const odd = features.length % 2 === 1;

  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-br from-teal-600 via-teal-500 to-sky-500 pb-16 pt-8 text-white md:pb-24 md:pt-14">
        <span className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
        <span className="pointer-events-none absolute -bottom-20 right-10 h-48 w-48 rounded-full bg-white/10" />

        <div className="relative mx-auto max-w-3xl px-4">
          <div className="flex items-center gap-4">
            {/* جای لوگو */}
            <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-3xl bg-white p-2 shadow-xl shadow-teal-900/20 ring-4 ring-white/30 md:h-24 md:w-24">
              {LOGO_SRC ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={LOGO_SRC}
                  alt="لوگوی بیمارستان فیروزآبادی"
                  className="h-full w-full object-contain"
                />
              ) : (
                <FaHospital className="text-4xl text-teal-600" />
              )}
            </div>

            <div>
              <h1 className="text-2xl font-extrabold leading-snug md:text-3xl">
                بیمارستان فیروزآبادی
              </h1>
              <p className="mt-1 text-sm font-medium text-teal-50 md:text-base">
                سلامت کودک شما، اولویت ماست
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-md text-xs leading-7 text-teal-50 md:text-base md:leading-8">
            مرکز تخصصی و فوق تخصصی کودکان و نوزادان با پزشکان مجرب و تجهیزات
            روز. برنامه ویزیت را ببینید و به‌راحتی نوبت خود را برنامه‌ریزی کنید.
          </p>

          <div className="mt-6 hidden flex-wrap gap-3 md:flex">
            <Link
              href="/schedule"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-teal-700 shadow-lg transition hover:scale-105"
            >
              مشاهده برنامه درمانگاه
            </Link>
            <Link
              href="/doctors"
              className="rounded-2xl bg-white/15 px-6 py-3 text-sm font-bold ring-1 ring-white/40 transition hover:bg-white/25"
            >
              معرفی پزشکان
            </Link>
          </div>
        </div>
      </section>

      <section className="relative -mt-8 rounded-t-[2rem] bg-slate-50 px-4 pt-6 md:-mt-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/doctors"
            className="mb-5 flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-sm text-slate-400 shadow-sm ring-1 ring-slate-200 transition active:scale-[0.98]"
          >
            <FaMagnifyingGlass className="text-teal-600" />
            <span className="flex-1">جستجوی پزشک یا تخصص...</span>
            <FaChevronLeft className="text-slate-300" />
          </Link>

          <div className="grid grid-cols-2 gap-3 md:gap-5">
            {features.map(({ href, title, icon: Icon, color }, i) => {
              const wide = odd && i === features.length - 1;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`group relative flex items-center justify-center overflow-hidden rounded-3xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl active:scale-95 ${
                    wide
                      ? "col-span-2 min-h-28 flex-row gap-5"
                      : "min-h-36 flex-col gap-4 md:min-h-44"
                  }`}
                >
                  <Icon className="pointer-events-none absolute -bottom-5 -left-5 rotate-12 text-8xl text-slate-100" />
                  <span
                    className={`relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-linear-to-br ${color} text-3xl text-white shadow-md`}
                  >
                    <Icon />
                  </span>
                  <h2 className="relative text-sm font-bold text-slate-800 md:text-base">
                    {title}
                  </h2>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
