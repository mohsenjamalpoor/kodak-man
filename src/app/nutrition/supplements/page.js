import { FaCapsules } from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { supplementProducts } from "@/data/products";

export const metadata = { title: "مکمل‌ها" };

export default function SupplementsPage() {
  return (
    <>
      <PageHeader icon={FaCapsules} title="مکمل‌ها" />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-6">
        <div className="grid grid-cols-2 gap-3 md:gap-5">
          {supplementProducts.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
        <p className="rounded-2xl bg-slate-100 p-4 text-xs leading-6 text-slate-500">
          مقدار دقیق هر مکمل را پزشک یا مراکز بهداشت تعیین می‌کنند.
        </p>
      </div>
    </>
  );
}
