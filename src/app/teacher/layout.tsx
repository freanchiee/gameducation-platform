import Link from "next/link";

const tabs = [
  { href: "/teacher/classes", label: "Classes" },
  { href: "/teacher/sessions", label: "Live Sessions" },
  { href: "/teacher/world-templates", label: "World Templates" },
];

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-canvas">
      <header className="border-b border-slate/40 bg-surface/95">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <h1 className="font-display text-2xl font-extrabold text-navy">Teacher Dashboard</h1>
            <p className="text-sm font-semibold text-ink/60">Class management and session control</p>
          </div>
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className="rounded-md border border-slate/50 bg-surface px-3 py-2 text-sm font-bold text-navy"
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </header>
      <section className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6">{children}</section>
    </main>
  );
}
