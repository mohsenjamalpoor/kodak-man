export default function PageHeader({ icon: Icon, title, subtitle }) {
  return (
    <section className="bg-[#0f8ceb] text-white">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4 md:py-5">
        {Icon && (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15 text-lg">
            <Icon />
          </span>
        )}

        <div>
          <h1 className="text-base font-extrabold md:text-xl">{title}</h1>

          {subtitle && (
            <p className="mt-0.5 text-xs text-blue-50">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}
