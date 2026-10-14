export const normalize = (s = "") =>
  s
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\u200c\u200f]/g, " ")
    .toLowerCase()
    .trim();

export const faNum = (n) => Number(n).toLocaleString("fa-IR");

export const navLinks = [
  { href: "/", label: "خانه" },
  { href: "/schedule", label: "برنامه درمانگاه" },
  { href: "/doctors", label: "پزشکان" },
  { href: "/parent-education", label: "آموزش والدین" },
  { href: "/news", label: "تازه‌های پزشکی" },
  { href: "/services", label: "خدمات و بخش‌ها" },
  { href: "/contact", label: "ارتباط با ما" },
];
