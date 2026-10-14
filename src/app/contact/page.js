import {
  FaHeadset,
  FaCommentSms,
  FaArrowUpRightFromSquare,
  FaTriangleExclamation,
} from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import { callItems, sms, messengers, others } from "@/data/contact";

export const metadata = { title: "ارتباط با ما" };

function SectionTitle({ children }) {
  return (
    <h2 className="mb-3 mt-2 text-sm font-extrabold text-slate-800">
      {children}
    </h2>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHeader icon={FaHeadset} title="ارتباط با ما" />

      <div className="mx-auto max-w-3xl space-y-3 px-4 py-6">
        {/* تماس */}
        <SectionTitle>تماس تلفنی</SectionTitle>
        {callItems.map(({ key, title, value, href, icon: Icon, color }) => (
          <a
            key={key}
            href={href}
            className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
          >
            <span
              className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-linear-to-br ${color} text-2xl text-white shadow-lg ring-4 ring-white`}
            >
              <Icon />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-slate-400">{title}</p>
              <p
                dir="ltr"
                className="text-right text-lg font-extrabold text-slate-800"
              >
                {value}
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
              تماس
            </span>
          </a>
        ))}

        {/* پیامک پیشنهادات و نظرات */}
        <SectionTitle>پیشنهادات و نظرات</SectionTitle>
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-violet-500 to-purple-600 p-5 text-white shadow-lg shadow-violet-200">
          <FaCommentSms className="pointer-events-none absolute -bottom-6 -left-4 rotate-12 text-9xl text-white/10" />
          <div className="relative">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20 text-2xl">
              <FaCommentSms />
            </span>
            <p className="mt-4 text-sm leading-7 text-violet-50">
              اگر پیشنهاد، انتقاد یا نظری دارید، لطفاً آن را به این شماره پیامک
              کنید. نظر شما در بهبود خدمات ما مؤثر است.
            </p>
            <p
              dir="ltr"
              className="mt-3 text-right text-2xl font-extrabold tracking-wide"
            >
              {sms.value}
            </p>
            <a
              href={sms.href}
              className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-white py-3.5 text-sm font-bold text-violet-700 shadow transition active:scale-[0.98]"
            >
              <FaCommentSms /> ارسال پیامک
            </a>
          </div>
        </div>

        {/* پیام‌رسان‌ها */}
        <SectionTitle>پیام‌رسان‌ها و شبکه‌های اجتماعی</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          {messengers.map(({ key, title, id, href, icon: Icon, color }) => {
            const cls =
              "relative flex flex-col items-center gap-2 rounded-3xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-200";
            const inner = (
              <>
                <span
                  className={`grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br ${color} text-2xl text-white shadow-lg ring-4 ring-white`}
                >
                  <Icon />
                </span>
                <p className="text-sm font-bold text-slate-800">{title}</p>
                {href ? (
                  <p
                    dir="ltr"
                    className="line-clamp-1 text-[11px] text-slate-400"
                  >
                    {id || "باز کردن"}
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-300">به‌زودی</p>
                )}
                {href && (
                  <FaArrowUpRightFromSquare className="absolute left-3 top-3 text-[10px] text-slate-300" />
                )}
              </>
            );
            return href ? (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cls} transition hover:-translate-y-1 hover:shadow-xl active:scale-95`}
              >
                {inner}
              </a>
            ) : (
              <div key={key} className={`${cls} opacity-60`}>
                {inner}
              </div>
            );
          })}
        </div>

        {/* ایمیل و آدرس */}
        {others
          .filter((o) => o.value)
          .map(({ key, title, value, href, icon: Icon }) => {
            const cls =
              "flex items-center gap-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200";
            const inner = (
              <>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-100 text-xl text-slate-600">
                  <Icon />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400">{title}</p>
                  <p className="text-sm font-bold leading-6 text-slate-800">
                    {value}
                  </p>
                </div>
              </>
            );
            return href ? (
              <a key={key} href={href} className={`${cls} active:scale-[0.98]`}>
                {inner}
              </a>
            ) : (
              <div key={key} className={cls}>
                {inner}
              </div>
            );
          })}

        <p className="flex items-start gap-3 rounded-2xl bg-slate-100 p-4 text-xs leading-6 text-slate-500">
          <FaTriangleExclamation className="mt-1 shrink-0 text-amber-500" />
          در شرایط اورژانسی با ۱۱۵ تماس بگیرید یا به نزدیک‌ترین مرکز اورژانس
          مراجعه کنید.
        </p>
      </div>
    </>
  );
}
