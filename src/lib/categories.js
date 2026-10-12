import {
  FaTemperatureHalf,
  FaAppleWhole,
  FaSyringe,
  FaChildReaching,
  FaShieldHalved,
  FaShieldVirus,
  FaHeartPulse,
  FaWheatAwn,
  FaLaptopMedical,
  FaBookMedical,
} from "react-icons/fa6";

const map = {
  "بیماری‌های شایع": {
    icon: FaTemperatureHalf,
    color: "from-rose-500 to-red-500",
  },
  تغذیه: { icon: FaAppleWhole, color: "from-emerald-500 to-green-600" },
  واکسیناسیون: { icon: FaSyringe, color: "from-sky-500 to-blue-600" },
  "رشد و تکامل": {
    icon: FaChildReaching,
    color: "from-violet-500 to-purple-600",
  },
  ایمنی: { icon: FaShieldHalved, color: "from-orange-500 to-amber-600" },
  پیشگیری: { icon: FaShieldVirus, color: "from-teal-500 to-emerald-600" },
  غربالگری: { icon: FaHeartPulse, color: "from-pink-500 to-rose-600" },
  "تغذیه و آلرژی": { icon: FaWheatAwn, color: "from-amber-500 to-orange-600" },
  "فناوری سلامت": {
    icon: FaLaptopMedical,
    color: "from-indigo-500 to-blue-600",
  },
};

export const getCategory = (name) =>
  map[name] || { icon: FaBookMedical, color: "from-teal-500 to-sky-600" };
