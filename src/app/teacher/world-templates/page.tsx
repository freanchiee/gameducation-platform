import { WORLD_TEMPLATES } from "@/lib/worlds/templates";

export default function WorldTemplatesPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-3xl font-extrabold text-navy">World Templates</h2>
        <p className="mt-2 text-sm text-ink/70">
          Shared artifact templates and rubric hints for LearnBook subject worlds.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Object.values(WORLD_TEMPLATES).map((template) => (
          <article key={template.slug} className="lb-card p-5">
            <div className={`mb-3 inline-flex rounded-md px-3 py-2 text-xs font-extrabold ${template.accentClass}`}>
              {template.slug}
            </div>
            <h3 className="font-display text-2xl font-bold text-navy">{template.displayName}</h3>
            <p className="mt-2 text-sm text-ink/70">{template.description}</p>
            <p className="mt-3 text-sm font-bold text-navy">Artifact: {template.artifactType}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {template.rubricHints.map((hint) => (
                <span key={hint} className="rounded-md bg-surface-soft px-2 py-1 text-xs font-bold text-navy">
                  {hint}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
