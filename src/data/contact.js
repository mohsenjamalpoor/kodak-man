import {
  FaPhone,
  FaMobileScreenButton,
  FaComments,
  FaDove,
  FaWhatsapp,
  FaTelegram,
  FaInstagram,
  FaEnvelope,
  FaLocationDot,
} from "react-icons/fa6";

// تلفن‌ها: value = متنی که نمایش داده می‌شود، href = لینک تماس (tel:)
export const callItems = [
  {
    key: "phone",
    title: "تلفن بیمارستان",
    value: "۰۲۱-۱۲۳۴۵۶۷۸",
    href: "tel:02112345678",
    icon: FaPhone,
    color: "from-teal-500 to-emerald-600",
  },
  {
    key: "mobile",
    title: "موبایل",
    value: "۰۹۱۲-۰۰۰-۰۰۰۰",
    href: "tel:09120000000",
    icon: FaMobileScreenButton,
    color: "from-sky-500 to-blue-600",
  },
];

// شماره پیامک پیشنهادات و نظرات
export const sms = {
  value: "۰۹۱۲-۰۰۰-۰۰۰۰",
  href: "sms:09120000000",
};

// پیام‌رسان‌ها و شبکه‌های اجتماعی
// id = نام کاربری برای نمایش، href = لینک کامل (خالی = «به‌زودی»)
// مثال بله: "https://ble.ir/نام_کاربری"   ایتا: "https://eitaa.com/نام_کاربری"
export const messengers = [
  {
    key: "bale",
    title: "بله",
    id: "",
    href: "",
    icon: FaComments,
    color: "from-teal-400 to-cyan-600",
  },
  {
    key: "eitaa",
    title: "ایتا",
    id: "",
    href: "",
    icon: FaDove,
    color: "from-orange-500 to-amber-600",
  },
  {
    key: "whatsapp",
    title: "واتس‌اپ",
    id: "",
    href: "",
    icon: FaWhatsapp,
    color: "from-green-500 to-emerald-600",
  },
  {
    key: "telegram",
    title: "تلگرام",
    id: "",
    href: "",
    icon: FaTelegram,
    color: "from-sky-500 to-blue-600",
  },
  {
    key: "instagram",
    title: "اینستاگرام",
    id: "",
    href: "",
    icon: FaInstagram,
    color: "from-pink-500 to-rose-600",
  },
];

// سایر راه‌ها؛ اگر value خالی باشد نمایش داده نمی‌شود
export const others = [
  { key: "email", title: "ایمیل", value: "", href: "", icon: FaEnvelope },
  { key: "address", title: "آدرس", value: "", href: "", icon: FaLocationDot },
];
