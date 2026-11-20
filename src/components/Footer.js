import { FaPhone, FaLocationDot, FaClock } from "react-icons/fa6";

const LOCATION = "35.594394683837876,51.4365348815918";

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        {/* معرفی */}
        <div>
          <h3 className="mb-2 text-lg font-bold text-white">کودک من</h3>

          <p className="text-sm leading-7">
            مرکز تخصصی و فوق تخصصی کودکان و نوزادان؛ مراقبت دلسوزانه با دانش روز
            پزشکی.
          </p>
        </div>

        {/* اطلاعات تماس */}
        <ul className="space-y-3 text-sm">
          {/* لوکیشن */}
          <li>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${LOCATION}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-2 rounded-lg transition-colors hover:text-white"
              aria-label="مسیریابی به مرکز کودک من"
            >
              <FaLocationDot className="mt-1 shrink-0 text-teal-400 transition-transform group-hover:scale-110" />

              <span className="leading-6 underline-offset-4 group-hover:underline">
                تهران، شهر ری، خیابان فدائیان اسلام، نرسیده به میدان شهر ری
              </span>
            </a>
          </li>

          {/* تلفن */}
          <li>
            <a
              href="tel:02112345678"
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <FaPhone className="shrink-0 text-teal-400" />

              <span dir="ltr">۰۲۱-۱۲۳۴۵۶۷۸</span>
            </a>
          </li>

          {/* ساعت */}
          <li className="flex items-center gap-2">
            <FaClock className="shrink-0 text-teal-400" />

            <span>درمانگاه: شنبه تا چهارشنبه</span>
          </li>
        </ul>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © کودک من - تمامی حقوق محفوظ است
      </div>
    </footer>
  );
}
