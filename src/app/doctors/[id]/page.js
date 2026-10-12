import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowRight,
  FaClock,
  FaGraduationCap,
  FaBuildingColumns,
  FaHospitalUser,
  FaCalendarCheck,
  FaArrowUpRightFromSquare,
  FaChevronLeft,
  FaTriangleExclamation,
  FaUserDoctor,
} from "react-icons/fa6";
import DoctorAvatar from "@/components/DoctorAvatar";
import WeeklySchedule from "@/components/WeeklySchedule";
import { doctors, days, getDoctor } from "@/data/doctors";
import { getBookingUrl } from "@/data/booking";

export async function generateStaticParams() {
  return doctors.map((d) => ({ id: String(d.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const d = getDoctor(id);
  return { title: d ? d.name : "پزشک" };
}

function Skeleton() {
  return (
    <div>
      <div className="h-32 bg-gradient-to-br from-teal-600 to-sky-600" />
      <div className="mx-auto -mt-12 max-w-3xl space-y-4 px-4">
        <div className="h-64 animate-pulse rounded-3xl bg-white ring-1 ring-slate-200" />
        <div className="h-40 animate-pulse rounded-3xl bg-white ring-1 ring-slate-200" />
      </div>
    </div>
  );
}

function SectionTitle({ icon: Icon, color, children }) {
  return (
    <h2 className="mb-4 flex items-center gap-3 font-bold text-slate-800">
      <span className={`grid h-9 w-9 place-items-center rounded-xl ${color}`}>
        <Icon />
      </span>
      {children}
    </h2>
  );
}

export default function DoctorPage({ params }) {
  return (
    <Suspense fallback={<Skeleton />}>
      <DoctorContent params={params} />
    </Suspense>
  );
}

async function DoctorContent({ params }) {
  const { id } = await params;
  const d = getDoctor(id);
  if (!d) notFound();

  const hasClinic = days.some((day) => d.schedule[day]);
  const bookingUrl = getBookingUrl(d.specialty);
  const clinicDays = days.filter((day) => d.schedule[day]);
  const same = doctors
    .filter((x) => x.specialty === d.specialty && x.id !== d.id)
    .slice(0, 3);
  const edu = d.education.map((e) =>
    typeof e === "string" ? { degree: e, place: "" } : e,
  );

  return (
    <div>
      <div className="bg-gradient-to-br from-teal-600 to-sky-600 px-4 pb-24 pt-5 text-white">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium transition active:scale-95"
          >
            <FaArrowRight /> پزشکان
          </Link>
        </div>
      </div>

      <div className="mx-auto -mt-10 max-w-3xl space-y-4 px-4 pb-10">
        {/* کارت پزشک */}
        <div className="flex flex-col items-center rounded-3xl bg-white p-6 text-center shadow-lg shadow-slate-200 ring-1 ring-slate-200">
          <DoctorAvatar
            doctor={d}
            className="-mt-16 h-28 w-28 text-5xl ring-4 ring-white"
          />
          <h1 className="mt-3 text-xl font-extrabold text-slate-900">
            {d.name}
          </h1>
          <span className="mt-2 rounded-full bg-teal-50 px-4 py-1.5 text-xs font-bold text-teal-700">
            {d.specialty}
          </span>

          {hasClinic && (
            <p className="mt-3 text-xs text-slate-400">
              حضور در درمانگاه: {clinicDays.join("، ")}
            </p>
          )}

          <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-8 text-slate-600">
            {d.bio}
          </p>
        </div>

        {/* دریافت نوبت */}
        {hasClinic &&
          (bookingUrl ? (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-3xl bg-slate-900 p-4 text-white shadow-lg transition active:scale-[0.98]"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-500 text-xl">
                <FaCalendarCheck />
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold">دریافت نوبت</p>
                <p className="mt-0.5 text-xs text-slate-300">
                  ورود به سامانه نوبت‌دهی
                </p>
              </div>
              <FaArrowUpRightFromSquare className="text-slate-500" />
            </a>
          ) : (
            <div className="flex items-center gap-4 rounded-3xl bg-slate-100 p-4 text-slate-400">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-200 text-xl">
                <FaCalendarCheck />
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold">دریافت نوبت</p>
                <p className="mt-0.5 text-xs">
                  لینک نوبت‌دهی به‌زودی اضافه می‌شود
                </p>
              </div>
            </div>
          ))}

        {/* حضور */}
        {hasClinic ? (
          <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <SectionTitle icon={FaClock} color="bg-teal-50 text-teal-600">
              برنامه هفتگی درمانگاه
            </SectionTitle>
            <WeeklySchedule days={days} schedule={d.schedule} />
            {d.note && (
              <p className="mt-4 rounded-2xl bg-amber-50 p-3 text-xs leading-6 text-amber-800">
                {d.note}
              </p>
            )}
          </section>
        ) : (
          <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <SectionTitle
              icon={FaHospitalUser}
              color="bg-orange-50 text-orange-600"
            >
              محل حضور
            </SectionTitle>
            <p className="rounded-2xl bg-orange-50 p-4 text-sm leading-7 text-orange-900">
              {d.note || "این پزشک در درمانگاه ویزیت ندارد."}
            </p>
          </section>
        )}

        {/* مدارک */}
        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <SectionTitle
            icon={FaGraduationCap}
            color="bg-violet-50 text-violet-600"
          >
            محل اخذ مدرک تحصیلی
          </SectionTitle>
          <ol>
            {edu.map((e, i) => (
              <li key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-600">
                    <FaBuildingColumns />
                  </span>
                  {i < edu.length - 1 && (
                    <span className="my-1 w-0.5 flex-1 rounded bg-violet-100" />
                  )}
                </div>
                <div className="pb-5">
                  <p className="text-sm font-bold leading-6 text-slate-800">
                    {e.degree}
                  </p>
                  {e.place && (
                    <p className="mt-0.5 text-xs leading-6 text-slate-500">
                      {e.place}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* پزشکان هم‌تخصص */}
        {same.length > 0 && (
          <section className="pt-2">
            <h2 className="mb-3 font-bold text-slate-800">پزشکان هم‌تخصص</h2>
            <div className="space-y-3">
              {same.map((x) => (
                <Link
                  key={x.id}
                  href={`/doctors/${x.id}`}
                  className="flex items-center gap-4 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200 transition active:scale-[0.98]"
                >
                  <DoctorAvatar doctor={x} className="h-12 w-12 text-lg" />
                  <span className="flex-1 text-sm font-bold leading-6 text-slate-800">
                    {x.name}
                  </span>
                  <FaChevronLeft className="text-slate-300" />
                </Link>
              ))}
            </div>
          </section>
        )}

        <p className="flex items-start gap-3 rounded-2xl bg-slate-100 p-4 text-xs leading-6 text-slate-500">
          <FaTriangleExclamation className="mt-1 shrink-0 text-amber-500" />
          ساعت حضور پزشکان ممکن است تغییر کند؛ پیش از مراجعه با درمانگاه تماس
          بگیرید.
        </p>
      </div>
    </div>
  );
}
