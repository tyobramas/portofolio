export default function SectionHeading({
  index,
  title,
  note,
}: {
  index: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="mb-6 flex items-baseline justify-between gap-3 border-b border-rule pb-3.5">
      <div className="flex items-baseline gap-3">
        <span className="tabular font-mono text-[0.75rem] font-bold text-brass-700 bg-brass-100/80 border border-brass-300/60 px-2 py-0.5 rounded-[2px]">
          {index}
        </span>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-ink-950 tracking-tight">
          {title}
        </h2>
      </div>
      {note && (
        <span className="hidden font-mono text-[0.75rem] text-ink-500 tracking-wide sm:block">
          {note}
        </span>
      )}
    </div>
  );
}
