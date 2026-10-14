import {
  FaMagnet,
  FaCircleNotch,
  FaBrain,
  FaHeartPulse,
  FaDroplet,
  FaXRay,
  FaWaveSquare,
  FaHeart,
} from "react-icons/fa6";

// مواردی را که در بیمارستان نیست حذف و موارد جدید را به همین شکل اضافه کنید.
export const facilities = [
  {
    title: "MRI",
    sub: "تصویربرداری تشدید مغناطیسی",
    icon: FaMagnet,
    color: "from-indigo-500 to-blue-600",
  },
  {
    title: "سی‌تی‌اسکن",
    sub: "CT Scan",
    icon: FaCircleNotch,
    color: "from-sky-500 to-cyan-600",
  },
  {
    title: "نوار مغز",
    sub: "EEG",
    icon: FaBrain,
    color: "from-fuchsia-500 to-pink-600",
  },
  {
    title: "نوار قلب",
    sub: "ECG",
    icon: FaHeartPulse,
    color: "from-rose-500 to-red-600",
  },
  {
    title: "همودیالیز",
    sub: "HD",
    icon: FaDroplet,
    color: "from-teal-500 to-emerald-600",
  },
  {
    title: "رادیولوژی",
    sub: "رادیوگرافی",
    icon: FaXRay,
    color: "from-slate-600 to-slate-800",
  },
  {
    title: "سونوگرافی",
    sub: "Ultrasound",
    icon: FaWaveSquare,
    color: "from-cyan-500 to-teal-600",
  },
  {
    title: "اکوکاردیوگرافی",
    sub: "سونوگرافی قلب",
    icon: FaHeart,
    color: "from-pink-500 to-rose-600",
  },
];
