/* Background layer for the photo hero.

   The synthetic dark three-monitor scene (16:9) is ALWAYS rendered as the base,
   so the hero is never broken. The real lifestyle photo is layered on top via a
   CSS background-image — if public/hero-desk.png is missing the layer is simply
   transparent and the scene shows through (no broken-image icon). Drop the photo
   at public/hero-desk.png to replace the scene; overlay screens line up on both. */
export default function HeroImage() {
  return (
    <div className="absolute inset-0">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="room" cx="50%" cy="38%" r="75%">
            <stop offset="0%" stopColor="#1b2740" />
            <stop offset="100%" stopColor="#080d18" />
          </radialGradient>
          <linearGradient id="desk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#141b2c" />
            <stop offset="100%" stopColor="#0a0f1a" />
          </linearGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#room)" />
        {/* desk surface */}
        <rect x="0" y="640" width="1600" height="260" fill="url(#desk)" />
        {/* three glowing monitors (left / center / right) */}
        {[
          { x: 170, y: 285, w: 380, h: 250, c: "#1b7888" },
          { x: 600, y: 270, w: 400, h: 270, c: "#1f306d" },
          { x: 1050, y: 285, w: 380, h: 250, c: "#58a65c" },
        ].map((m) => (
          <g key={m.x}>
            <rect x={m.x - 24} y={m.y - 24} width={m.w + 48} height={m.h + 48} rx="22" fill={m.c} opacity="0.18" />
            <rect x={m.x} y={m.y} width={m.w} height={m.h} rx="12" fill="#0b1120" stroke="#2c3a55" strokeWidth="6" />
            <rect x={m.x + 12} y={m.y + 12} width={m.w - 24} height={m.h - 24} rx="6" fill="#0f1a2e" />
            <rect x={m.x + m.w / 2 - 14} y={m.y + m.h} width="28" height="70" fill="#1a2438" />
            <rect x={m.x + m.w / 2 - 70} y={m.y + m.h + 70} width="140" height="14" rx="7" fill="#1a2438" />
          </g>
        ))}
      </svg>

      {/* Photo A — covers the scene above; always visible underneath */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-desk.png')" }}
      />
      {/* Photo B — cross-fades in/out over A on a ~6s cycle (same scene, so the
          overlay screens stay aligned across both) */}
      <div
        className="hero-crossfade absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-desk1.png')" }}
      />
    </div>
  )
}
