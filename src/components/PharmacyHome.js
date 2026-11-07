"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FaAppleWhole,
  FaCapsules,
  FaPills,
  FaWeightScale,
  FaHeart,
  FaChevronLeft,
} from "react-icons/fa6";
import SearchBox from "@/components/SearchBox";
import ProductCard from "@/components/ProductCard";
import { supplementProducts, drugProducts, products } from "@/data/products";
import { slogan } from "@/data/nutrition";
import { normalize } from "@/lib/utils";

const cats = [
  {
    href: "/nutrition/feeding",
    label: "تغذیه",
    icon: FaAppleWhole,
    color: "from-emerald-500 to-teal-600",
  },
  {
    href: "/nutrition/supplements",
    label: "مکمل‌ها",
    icon: FaCapsules,
    color: "from-amber-400 to-orange-500",
  },
  {
    href: "/nutrition/drugs",
    label: "دارو",
    icon: FaPills,
    color: "from-sky-500 to-blue-600",
  },
  {
    href: "/nutrition/p/acetaminophen",
    label: "دوز استامینوفن",
    icon: FaWeightScale,
    color: "from-rose-500 to-pink-600",
  },
];

function SectionHead({ title, href, accent }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-800">
        <span className={`h-5 w-1.5 rounded-full ${accent}`} />
        {title}
      </h2>
      <Link
        href={href}
        className="flex items-center gap-1 text-xs font-bold text-teal-600 active:scale-95"
      >
        مشاهده همه
        <FaChevronLeft className="text-[10px]" />
      </Link>
    </div>
  );
}

export default function PharmacyHome() {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const n = normalize(q);
    if (!n) return null;
    return products.filter((p) =>
      normalize(`${p.title} ${p.sub} ${p.tag || ""}`).includes(n),
    );
  }, [q]);

  return (
    <div className="space-y-6">
      <SearchBox
        value={q}
        onChange={setQ}
        placeholder="جستجوی دارو، مکمل و مراقبت..."
      />

      {results ? (
        <section>
          <p className="mb-3 text-xs text-slate-400">نتیجه جستجو</p>
          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 md:gap-5">
              {results.map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-slate-200">
              <p className="text-sm text-slate-500">محصولی پیدا نشد.</p>
              <button
                onClick={() => setQ("")}
                className="mt-4 rounded-full bg-teal-600 px-5 py-2 text-xs font-bold text-white active:scale-95"
              >
                پاک کردن جستجو
              </button>
            </div>
          )}
        </section>
      ) : (
        <>
          {/* بنر شیر مادر */}
          <Link
            href="/nutrition/feeding"
            className="relative block overflow-hidden rounded-3xl bg-linear-to-br from-pink-500 to-rose-600 p-5 text-white shadow-lg shadow-rose-200 transition active:scale-[0.98]"
          >
            <FaHeart className="pointer-events-none absolute -bottom-8 -left-6 rotate-12 text-[8rem] text-white/10" />
            <div className="relative">
              <p className="text-xs text-rose-100">تغذیه نوزاد و کودک</p>
              <h2 className="mt-1 text-lg font-extrabold leading-8">
                {slogan.title}
              </h2>
              <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-bold text-rose-600">
                شیر مادر و شیر خشک
                <FaChevronLeft className="text-[10px]" />
              </span>
            </div>
          </Link>

          {/* دسته‌بندی‌ها */}
          <div className="grid grid-cols-4 gap-2">
            {cats.map(({ href, label, icon: Icon, color }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-2 active:scale-95"
              >
                <span
                  className={`grid h-14 w-14 place-items-center rounded-full bg-linear-to-br ${color} text-xl text-white shadow-md ring-4 ring-white`}
                >
                  <Icon />
                </span>
                <span className="text-center text-[11px] font-bold leading-4 text-slate-700">
                  {label}
                </span>
              </Link>
            ))}
          </div>

          {/* مکمل‌ها */}
          <section>
            <SectionHead
              title="مکمل‌ها"
              href="/nutrition/supplements"
              accent="bg-amber-500"
            />
            <div className="grid grid-cols-2 gap-3 md:gap-5">
              {supplementProducts.slice(0, 2).map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
            </div>
          </section>

          {/* دارو */}
          <section>
            <SectionHead
              title="دارو"
              href="/nutrition/drugs"
              accent="bg-sky-500"
            />
            <div className="grid grid-cols-2 gap-3 md:gap-5">
              {drugProducts.slice(0, 2).map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
