import ReactMarkdown from "react-markdown";

const components = {
  h2: ({ children }) => (
    <h2 className="mb-3 mt-8 flex items-center gap-2 text-lg font-extrabold text-slate-900 before:h-6 before:w-1.5 before:rounded-full before:bg-teal-500">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-6 text-base font-bold text-slate-800">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="my-3 text-[15px] leading-8 text-slate-700">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-extrabold text-slate-900">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="my-3 list-disc space-y-2 ps-6 text-[15px] leading-8 text-slate-700 marker:text-teal-500">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 list-decimal space-y-2 ps-6 text-[15px] leading-8 text-slate-700 marker:font-bold marker:text-teal-600">
      {children}
    </ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900 [&>p]:my-1 [&>p]:text-sm [&>p]:leading-7 [&>p]:text-amber-900">
      {children}
    </blockquote>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="font-medium text-teal-700 underline underline-offset-4"
    >
      {children}
    </a>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt || ""}
      loading="lazy"
      className="my-4 w-full rounded-2xl ring-1 ring-slate-200"
    />
  ),
  hr: () => <hr className="my-6 border-slate-200" />,
};

export default function Markdown({ children }) {
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>;
}
