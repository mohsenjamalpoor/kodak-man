import { FaPills } from "react-icons/fa6";
import { supplements, dropInfo, careInfo } from "./nutrition";

const pick = (list, key) => list.find((x) => x.key === key);

const ad = pick(supplements, "ad");
const iron = pick(supplements, "iron");
const multi = pick(supplements, "multi");
const other = pick(supplements, "other");

const adDrug = pick(dropInfo, "ad-drug");
const multiDrug = pick(dropInfo, "multi-drug");
const ironDrug = pick(dropInfo, "iron-drug");
const ironTeeth = pick(dropInfo, "iron-teeth");

/* ---------- مکمل‌ها ---------- */
export const supplementProducts = [
  {
    slug: "vitamin-ad",
    category: "supplement",
    tag: "ویتامین A و D",
    title: "قطره آ+د",
    sub: ad.sub,
    icon: ad.icon,
    color: ad.color,
    content: ad.content + "\n" + adDrug.content,
  },
  {
    slug: "iron-drops",
    category: "supplement",
    tag: "پیشگیری از کم‌خونی",
    title: "قطره آهن",
    sub: iron.sub,
    icon: iron.icon,
    color: iron.color,
    content:
      iron.content.replace(
        /\s*جزئیات انواع قطره آهن و لکه دندان در بخش «دارو» آمده است\.\s*$/,
        "\n",
      ) +
      "\n" +
      ironDrug.content.replace(
        "لکه روی دندان (جزئیات در کارت بعدی)",
        "لکه روی دندان (جزئیات در بخش «انواع قطره آهن و لکه دندان»)",
      ),
  },
  {
    slug: "multivitamin",
    category: "supplement",
    tag: "چند ویتامین",
    title: "قطره مولتی‌ویتامین",
    sub: "انتخاب و مصرف",
    icon: multi.icon,
    color: multi.color,
    content: multi.content + "\n" + multiDrug.content,
  },
  {
    slug: "iron-teeth",
    category: "supplement",
    tag: "مقایسه انواع",
    title: "انواع قطره آهن و لکه دندان",
    sub: "کدام‌ها دندان را لکه می‌کنند؟",
    icon: ironTeeth.icon,
    color: ironTeeth.color,
    content: ironTeeth.content,
  },
  {
    slug: "other-supplements",
    category: "supplement",
    tag: "با نسخه پزشک",
    title: "سایر مکمل‌ها",
    sub: other.sub,
    icon: other.icon,
    color: other.color,
    content: other.content,
  },
];

/* ---------- دارو ---------- */
const care = (key) => pick(careInfo, key);

export const drugProducts = [
  {
    slug: "acetaminophen",
    category: "drug",
    tag: "محاسبه دوز",
    title: "استامینوفن",
    sub: "شربت، قطره و شیاف براساس وزن",
    icon: FaPills,
    color: "from-orange-500 to-amber-600",
    content: null, // صفحه محصول از ابزار وزن‌محور و کارت‌های انواع استفاده می‌کند
  },
  {
    slug: "diaper-ointment",
    category: "drug",
    tag: "پماد",
    title: care("diaper").title,
    sub: care("diaper").sub,
    icon: care("diaper").icon,
    color: care("diaper").color,
    content: care("diaper").content,
  },
  {
    slug: "emollient",
    category: "drug",
    tag: "مراقبت پوست",
    title: care("emollient").title,
    sub: care("emollient").sub,
    icon: care("emollient").icon,
    color: care("emollient").color,
    content: care("emollient").content,
  },
  {
    slug: "nasal-saline",
    category: "drug",
    tag: "قطره",
    title: care("nasal").title,
    sub: care("nasal").sub,
    icon: care("nasal").icon,
    color: care("nasal").color,
    content: care("nasal").content,
  },
  {
    slug: "cord-care",
    category: "drug",
    tag: "مراقبت",
    title: care("cord").title,
    sub: care("cord").sub,
    icon: care("cord").icon,
    color: care("cord").color,
    content: care("cord").content,
  },
  {
    slug: "topical-steroids",
    category: "drug",
    tag: "فقط با نسخه",
    title: care("steroid").title,
    sub: care("steroid").sub,
    icon: care("steroid").icon,
    color: care("steroid").color,
    content: care("steroid").content,
  },
  {
    slug: "drug-safety",
    category: "drug",
    tag: "راهنما",
    title: care("general").title,
    sub: care("general").sub,
    icon: care("general").icon,
    color: care("general").color,
    content: care("general").content,
  },
];

export const products = [...supplementProducts, ...drugProducts];
export const getProduct = (slug) => products.find((p) => p.slug === slug);
