export default function CellBookAssessmentPage() {
  return (
    <div className="space-y-5">
      <h2 className="font-display text-3xl font-extrabold text-navy">Assessment</h2>
      <p className="text-ink/70">
        Criteria shells for AI scoring and teacher override workflows.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="lb-card p-4">
          <h3 className="font-display text-2xl font-bold text-navy">Criteria A</h3>
          <p className="mt-2 text-sm text-ink/75">Scientific understanding and concept accuracy.</p>
        </article>
        <article className="lb-card p-4">
          <h3 className="font-display text-2xl font-bold text-navy">Criteria B</h3>
          <p className="mt-2 text-sm text-ink/75">Application, analysis, and evidence in profile response.</p>
        </article>
        <article className="lb-card p-4">
          <h3 className="font-display text-2xl font-bold text-navy">Criteria C</h3>
          <p className="mt-2 text-sm text-ink/75">Communication quality and structure.</p>
        </article>
        <article className="lb-card p-4">
          <h3 className="font-display text-2xl font-bold text-navy">Criteria D</h3>
          <p className="mt-2 text-sm text-ink/75">Reflection, iteration, and improvement evidence.</p>
        </article>
      </div>
    </div>
  );
}
