import { FaChevronDown } from "react-icons/fa6";
import Markdown from "./Markdown";

export function SectionTitle({ icon: Icon, color, children, note }) {
  return (
    <div className="mb-3 mt-2">
      <h2 className="flex items-center gap-3 font-extrabold text-slate-800">
        <span className={`grid h-9 w-9 place-items-center rounded-xl ${color}`}>
          <Icon />
        </span>
        {children}
      </h2>
      {note && <p className="mt-2 text-xs leading-6 text-slate-500">{note}</p>}
    </div>
  );
}

export default function InfoCard({ icon: Icon, color, title, sub, content }) {
  return (
    <details className="group rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition open:shadow-lg">
      <summary className="flex cursor-pointer list-none items-center gap-4 p-4 [&::-webkit-details-marker]:hidden">
        <span
          className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-linear-to-br ${color} text-2xl text-white shadow-lg ring-4 ring-white`}
        >
          <Icon />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold leading-6 text-slate-800">
            {title}
          </h3>
          {sub && <p className="text-xs leading-5 text-slate-400">{sub}</p>}
        </div>
        <FaChevronDown className="shrink-0 text-slate-300 transition group-open:rotate-180" />
      </summary>
      <div className="border-t border-slate-100 px-4 pb-4 pt-1">
        <Markdown>{content}</Markdown>
      </div>
    </details>
  );
}
