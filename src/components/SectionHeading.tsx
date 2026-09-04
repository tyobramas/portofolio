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
    <div className="mb-6 flex items-baseline gap-3 border-b border-rule pb-3">
      <span className="tabular font-mono text-meta text-brass-500">{index}</span>
      <h2 className="font-display text-h2 text-ink-900">{title}</h2>
      {note && <span className="ml-auto hidden text-meta text-ink-500 sm:block">{note}</span>}
    </div>
  );
}
