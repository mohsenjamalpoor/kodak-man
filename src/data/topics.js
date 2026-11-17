import {
  FaSyringe,
  FaChildReaching,
  FaAppleWhole,
  FaShieldHalved,
  FaTemperatureHalf,
  FaWheatAwn,
} from "react-icons/fa6";

// category = نام دسته در articles.js (مقاله‌های آن دسته در صفحه موضوع نمایش داده می‌شود)
// href = برای موضوع‌هایی که صفحه جدا دارند (مثل واکسیناسیون)
export const topics = [
  {
    slug: "vaccination",
    title: "واکسیناسیون",
    sub: "برنامه واکسن تا ۱۸ ماهگی",
    icon: FaSyringe,
    color: "from-blue-500 to-indigo-600",
    href: "/vaccination",
  },
  {
    slug: "growth",
    category: "رشد و تکامل",
    title: "رشد و تکامل",
    sub: "خواب، رشد و رفتار کودک",
    icon: FaChildReaching,
    color: "from-violet-500 to-purple-600",
  },
  {
    slug: "nutrition",
    category: "تغذیه",
    title: "تغذیه",
    sub: "شیر مادر و غذای کمکی",
    icon: FaAppleWhole,
    color: "from-emerald-500 to-teal-600",
  },
  {
    slug: "safety",
    category: "ایمنی",
    title: "ایمنی",
    sub: "خواب ایمن و پیشگیری از حوادث",
    icon: FaShieldHalved,
    color: "from-orange-500 to-amber-600",
  },
  {
    slug: "common-illness",
    category: "بیماری‌های شایع",
    title: "بیماری‌های شایع",
    sub: "تب و بیماری‌های رایج کودکان",
    icon: FaTemperatureHalf,
    color: "from-rose-500 to-red-600",
  },
  {
    slug: "allergy",
    category: "تغذیه و آلرژی",
    title: "تغذیه و آلرژی",
    sub: "غذاهای آلرژی‌زا",
    icon: FaWheatAwn,
    color: "from-amber-500 to-orange-600",
  },
];

export const topicHref = (t) => t.href || `/parent-education/t/${t.slug}`;
export const getTopic = (slug) => topics.find((t) => t.slug === slug);
