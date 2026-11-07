import { FaPills } from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import PharmacyHome from "@/components/PharmacyHome";

export const metadata = { title: "تغذیه و دارو" };

export default function NutritionHub() {
  return (
    <>
      <PageHeader icon={FaPills} title="تغذیه و دارو برای کودکان" />
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-6">
        <PharmacyHome />
        <p className="rounded-2xl bg-slate-100 p-4 text-xs leading-6 text-slate-500">
          این مطالب جنبه آموزشی دارند و جایگزین مشاوره پزشک نیستند. هر دارو یا
          مکمل را با نظر پزشک یا داروساز مصرف کنید.
        </p>
      </div>
    </>
  );
}
