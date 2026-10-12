import Link from "next/link";
import {
  FaCalendarDays,
  FaUserDoctor,
  FaBookOpen,
  FaNewspaper,
  FaHospital,
  FaBaby,
} from "react-icons/fa6";

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
  return (
    <>
      <section className="bg-linear-to-br from-teal-600 via-teal-500 to-sky-500 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
          <div>
            <h1 className="mb-4 text-3xl font-extrabold leading-snug md:text-5xl">
              سلامت کودک شما،
              <br />
            </h1>
            <p className="mb-8  max-w-md text-sm leading-8 text-teal-50 md:block md:text-base">
              مرکز تخصصی و فوق تخصصی کودکان و نوزادان با پزشکان مجرب و تجهیزات
              روز. برنامه ویزیت را ببینید و به‌راحتی نوبت خود را برنامه‌ریزی
              کنید.
            </p>
            <div className="hidden flex-wrap gap-3 md:flex">
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
          <div className="hidden justify-center md:flex">
            <div className="grid h-64 w-64 place-items-center rounded-full bg-white/10 ring-8 ring-white/10">
              <FaBaby className="text-9xl text-white/90" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-6 max-w-3xl px-4 md:-mt-8">
        <div className="grid grid-cols-2 gap-3 md:gap-5">
          {features.map(({ href, title, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className="group flex min-h-36 flex-col items-center justify-center gap-4 rounded-3xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl active:scale-95 md:min-h-44"
            >
              <span
                className={`grid h-16 w-16 place-items-center rounded-2xl bg-linear-to-br ${color} text-3xl text-white shadow-md`}
              >
                <Icon />
              </span>
              <h2 className="text-sm font-bold text-slate-800 md:text-base">
                {title}
              </h2>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
