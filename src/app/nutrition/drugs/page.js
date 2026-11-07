import { FaPills } from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { drugProducts } from "@/data/products";

export const metadata = { title: "دارو برای کودکان" };

export default function DrugsPage() {
  return (
    <>
      <PageHeader icon={FaPills} title="دارو" />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-6">
        <div className="grid grid-cols-2 gap-3 md:gap-5">
          {drugProducts.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
        <p className="rounded-2xl bg-slate-100 p-4 text-xs leading-6 text-slate-500">
          هر دارو را با نظر پزشک یا داروساز مصرف کنید.
        </p>
      </div>
    </>
  );
}
