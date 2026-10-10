import Link from "next/link";
import {
  FaCalendarDays,
  FaUserDoctor,
  FaBookOpen,
  FaNewspaper,
  FaHospital,
  FaArrowLeft,
  FaBaby,
  FaPhone,
} from "react-icons/fa6";

const features = [
  {
    href: "/schedule",
    title: "برنامه درمانگاه",
    desc: "برنامه هفتگی پزشکان از شنبه تا چهارشنبه، با جستجوی نام و تخصص.",
    icon: FaCalendarDays,
    color: "from-teal-500 to-emerald-500",
  },
  {
    href: "/doctors",
    title: "معرفی پزشکان",
    desc: "تخصص، سابقه و اطلاعات تماس پزشکان مجموعه.",
    icon: FaUserDoctor,
    color: "from-sky-500 to-blue-500",
  },
  {
    href: "/parent-education",
    title: "آموزش به والدین",
    desc: "مطالب کاربردی درباره تغذیه، تب، واکسن، خواب و ایمنی کودک.",
    icon: FaBookOpen,
    color: "from-violet-500 to-purple-500",
  },
  {
    href: "/news",
    title: "تازه‌های پزشکی کودکان",
    desc: "آخرین دستاوردها و راهنمایی‌های روز پزشکی کودکان.",
    icon: FaNewspaper,
    color: "from-orange-500 to-amber-500",
  },
  {
    href: "/services",
    title: "بخش‌ها و خدمات",
    desc: "آشنایی با بخش‌ها، آزمایشگاه، واکسیناسیون و اورژانس مرکز.",
    icon: FaHospital,
    color: "from-rose-500 to-pink-500",
  },
];

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-br from-teal-600 via-teal-500 to-sky-500 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2">
          <div>
            <h1 className="mb-4 text-3xl font-extrabold leading-snug md:text-5xl">
              سلامت کودک شما،
              <br />
              اولویت ماست
            </h1>
            <p className="mb-8 max-w-md text-sm leading-8 text-teal-50 md:text-base">
              مرکز تخصصی و فوق تخصصی کودکان و نوزادان با پزشکان مجرب و تجهیزات
              روز. برنامه ویزیت را ببینید و به‌راحتی نوبت خود را برنامه‌ریزی
              کنید.
            </p>
            <div className="flex flex-wrap gap-3">
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

      <section className="mx-auto -mt-8 max-w-6xl px-4">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ href, title, desc, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <span
                className={`mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${color} text-2xl text-white shadow-md`}
              >
                <Icon />
              </span>
              <h2 className="mb-2 text-lg font-bold text-slate-800">{title}</h2>
              <p className="mb-4 text-sm leading-7 text-slate-500">{desc}</p>
              <span className="flex items-center gap-2 text-sm font-medium text-teal-600">
                ورود{" "}
                <FaArrowLeft className="transition group-hover:-translate-x-1" />
              </span>
            </Link>
          ))}

          <a
            href="tel:115"
            className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-red-500 to-rose-600 p-6 text-white shadow-sm"
          >
            <div>
              <h2 className="mb-2 text-lg font-bold">وضعیت اورژانسی؟</h2>
              <p className="text-sm leading-7 text-red-50">
                در شرایط اورژانسی بلافاصله با اورژانس تماس بگیرید.
              </p>
            </div>
            <span className="mt-4 flex items-center gap-2 text-2xl font-extrabold">
              <FaPhone /> ۱۱۵
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
