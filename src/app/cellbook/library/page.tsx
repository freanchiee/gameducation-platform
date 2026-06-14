const sampleCards = [
  { title: "Nucleus", note: "Control center and DNA storage", accent: "bg-mint" },
  { title: "Mitochondria", note: "ATP production and energy release", accent: "bg-blue-muted text-white" },
  { title: "Ribosome", note: "Protein synthesis factory", accent: "bg-green text-white" },
  { title: "Golgi Apparatus", note: "Sorting and packaging proteins", accent: "bg-red text-white" },
];

export default function CellBookLibraryPage() {
  return (
    <div className="space-y-5">
      <h2 className="font-display text-3xl font-extrabold text-navy">Library</h2>
      <p className="text-ink/70">Starter concept cards for the native CellBook library experience.</p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {sampleCards.map((card) => (
          <article key={card.title} className="lb-card overflow-hidden">
            <div className={`h-28 ${card.accent}`} />
            <div className="p-4">
              <h3 className="font-display text-xl font-bold text-navy">{card.title}</h3>
              <p className="mt-2 text-sm text-ink/75">{card.note}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
