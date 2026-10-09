import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchBox({ value, onChange, placeholder = "جستجو..." }) {
  return (
    <div className="relative">
      <FaMagnifyingGlass className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white py-3 pr-11 pl-4 text-sm shadow-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
      />
    </div>
  );
}
