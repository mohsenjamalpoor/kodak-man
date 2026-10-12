import { FaPhone, FaLocationDot, FaClock } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="mb-2 text-lg font-bold text-white">کودک من</h3>
          <p className="text-sm leading-7">
            مرکز تخصصی و فوق تخصصی کودکان و نوزادان؛ مراقبت دلسوزانه با دانش روز
            پزشکی.
          </p>
        </div>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-2">
            <FaLocationDot className="text-teal-400" /> تهران، شهر ری
          </li>
          <li className="flex items-center gap-2">
            <FaPhone className="text-teal-400" />{" "}
            <span dir="ltr">۰۲۱-۱۲۳۴۵۶۷۸</span>
          </li>
          <li className="flex items-center gap-2">
            <FaClock className="text-teal-400" /> درمانگاه: شنبه تا چهارشنبه
          </li>
        </ul>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © کودک من - تمامی حقوق محفوظ است
      </div>
    </footer>
  );
}
