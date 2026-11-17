// ⚠️ تبلیغ شیر خشک، شیشه شیر، سرشیشه و پستانک طبق قانون ممنوع است.
// تبلیغ مجاز (مثل پوشک و لوازم بهداشتی) را با ad: true اضافه کنید؛ برچسب «تبلیغ» خودکار می‌آید.
export const eduBanners = [
  {
    id: "edu-vaccine",
    ad: false,
    tag: "یادآوری",
    title: "واکسن به‌موقع، کودک سالم",
    text: "برنامه واکسن از بدو تولد تا ۱۸ ماهگی  را ببینید.",
    cta: "واکسیناسیون",
    href: "/vaccination",
    color: "from-blue-500 to-indigo-600",
    image: "",
  },
  {
    id: "edu-growth",
    ad: false,
    tag: "آموزش",
    title: "رشد و تکامل کودک",
    text: "مطالب کاربردی درباره خواب، رشد و رفتار کودک.",
    cta: "مشاهده مطالب",
    href: "/parent-education/t/growth",
    color: "from-violet-500 to-purple-600",
    image: "",
  },

  // نمونه تبلیغ مجاز؛ برای فعال‌سازی از حالت کامنت دربیاورید:
  // {
  //   id: "edu-ad-1",
  //   ad: true,
  //   tag: "تبلیغ",
  //   title: "نام برند",
  //   text: "متن کوتاه تبلیغ",
  //   cta: "مشاهده",
  //   href: "https://example.com",
  //   color: "from-sky-400 to-cyan-600",
  //   image: "/images/ads/example.jpg",
  // },
];
