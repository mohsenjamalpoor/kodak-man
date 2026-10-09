export default function PageHeader({ icon: Icon, title, subtitle }) {
  return (
    <section className="bg-gradient-to-br from-teal-600 to-sky-600 text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-10">
        {Icon && (
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15 text-2xl">
            <Icon />
          </span>
        )}
        <div>
          <h1 className="text-2xl font-extrabold md:text-3xl">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-teal-50 md:text-base">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
