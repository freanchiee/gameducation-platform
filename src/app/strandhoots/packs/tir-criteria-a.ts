import type { StrandhootPack } from "../engine/types"

// A5 — Total Internal Reflection · Criterion A (Knowing & Understanding)
// Re-authors the legacy iframe tir-criteria-a SPA as a native engine pack.
export const tirCriteriaA: StrandhootPack = {
  slug: "tir-criteria-a",
  title: "Total Internal Reflection",
  subject: "MYP Physics",
  criterion: "A",
  topic: "Refraction & total internal reflection",
  accent: "#6b3fa0",
  icon: "🔬",
  statementOfInquiry:
    "The behaviour of light at boundaries — refraction and total internal reflection — underpins modern communications and medicine.",
  estMinutes: 30,
  intro:
    "Explore how light bends at boundaries: use Snell's law to predict refraction, find the critical angle, and discover how total internal reflection enables fibre optics and endoscopes.",
  badges: [
    { id: "snell-master", label: "Snell's Master", icon: "📐", description: "Reach Level 8 on Refraction & Snell's law", strandId: "refraction", atLevel: 8 },
    { id: "critical-thinker", label: "Critical Thinker", icon: "🎯", description: "Reach Level 8 on The critical angle", strandId: "critical", atLevel: 8 },
    { id: "tir-pioneer", label: "TIR Pioneer", icon: "💡", description: "Reach Level 8 on Total internal reflection", strandId: "tir", atLevel: 8 },
    { id: "optics-ace", label: "Optics Ace", icon: "🏆", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [
    { id: "angles", label: "Critical angles", blurb: "Snell's law and TIR experiments", icon: "📐" },
    { id: "fibres", label: "Fibre optics", blurb: "Communications and medical uses of TIR", icon: "🌐" },
  ],
  strands: [
    {
      id: "refraction",
      name: "Refraction & Snell's law",
      descriptor: "Explain refraction using wave speed; apply Snell's law to calculate angles and refractive index.",
      guided: [
        { level: 2, body: "Refraction is the bending of light as it passes from one medium into another. It happens because light changes speed at the boundary. Light slows down when entering a denser medium (e.g. glass) and bends toward the normal." },
        { level: 4, body: "Snell's law: n₁ sin θ₁ = n₂ sin θ₂, where n = refractive index (a measure of optical density), θ = angle measured from the normal. The refractive index of air ≈ 1.0; glass ≈ 1.5." },
        { level: 6, body: "Example: a ray passes from air (n=1.0) into glass (n=1.5) at angle θ₁=30°. sin θ₂ = (n₁ sin θ₁)/n₂ = (1.0 × 0.5)/1.5 = 0.333 → θ₂ ≈ 19.5°. The ray bends toward the normal (smaller angle)." },
        { level: 8, body: "The refractive index n = c/v, where c = speed of light in vacuum (3×10⁸ m/s) and v = speed in the medium. Glass with n=1.5 has v = 3×10⁸/1.5 = 2×10⁸ m/s. A denser medium means higher n, slower light, greater bending toward the normal." },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq", id: "ref-l2", level: 2,
            prompt: "When light travels from air into glass, what happens to its speed?",
            options: [
              { id: "a", text: "It speeds up" },
              { id: "b", text: "It stays the same" },
              { id: "c", text: "It slows down", correct: true },
              { id: "d", text: "It stops" },
            ],
            explanation: "Glass is denser than air — light slows down on entering glass and bends toward the normal.",
          },
          {
            type: "fill", id: "ref-l4", level: 4,
            prompt: "Snell's law states: n₁ sin θ₁ = ▁.",
            answers: ["n2 sin theta2", "n₂ sin θ₂", "n2sinθ2", "n₂sinθ₂"],
            explanation: "Snell's law relates the angles and refractive indices on each side of a boundary.",
          },
          {
            type: "short", id: "ref-l6", level: 6,
            prompt: "A ray of light enters water (n = 1.33) from air (n = 1.0) at an angle of incidence of 45°. Use Snell's law to find the angle of refraction. (sin 45° = 0.707)",
            keywords: ["sin", "0.707", "1.33", "0.532", "32", "snell", "angle of refraction"],
            minKeywords: 2,
            sample: "n₁ sin θ₁ = n₂ sin θ₂ → 1.0 × 0.707 = 1.33 × sin θ₂ → sin θ₂ = 0.707/1.33 ≈ 0.532 → θ₂ ≈ 32°. The ray bends toward the normal.",
          },
          {
            type: "short", id: "ref-l8", level: 8,
            prompt: "Calculate the speed of light in diamond (n = 2.42). What does a higher refractive index tell you about how light behaves at a diamond surface?",
            keywords: ["c/n", "3e8", "2.42", "1.24", "slower", "greater", "bending", "refraction", "speed"],
            minKeywords: 3,
            sample: "v = c/n = 3×10⁸/2.42 ≈ 1.24×10⁸ m/s. Diamond slows light considerably. A higher refractive index means light slows more and bends more toward the normal when entering the diamond — and the critical angle is smaller (more TIR), which is why diamonds sparkle so brilliantly.",
          },
        ],
      },
    },
    {
      id: "critical",
      name: "The critical angle",
      descriptor: "Define and calculate the critical angle; explain what happens at angles equal to and beyond the critical angle.",
      guided: [
        { level: 2, body: "When light travels from a dense medium (e.g. glass) to a less dense medium (e.g. air), it bends away from the normal. At a certain angle the refracted ray travels along the boundary — this is the critical angle (C)." },
        { level: 4, body: "The critical angle (C) is the angle of incidence (in the denser medium) that produces a refracted angle of exactly 90° — the refracted ray travels along the surface. Below C: refraction occurs. At C: refracted ray at 90°. Above C: total internal reflection (no refracted ray)." },
        { level: 6, body: "Formula for the critical angle: sin C = n₂/n₁ (going from denser n₁ to less dense n₂). For glass-to-air (n₁=1.5, n₂=1.0): sin C = 1/1.5 = 0.667 → C ≈ 41.8°. For a denser material (higher n), C is smaller." },
        { level: 8, body: "The critical angle only exists when going from a denser medium to a less dense medium (n₁ > n₂). When going from air to glass, there is no critical angle — light always refracts into the glass (it never reflects totally at the air-to-glass boundary)." },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq", id: "crit-l2", level: 2,
            prompt: "The critical angle is the angle of incidence at which the refracted ray travels…",
            options: [
              { id: "a", text: "back through the original medium" },
              { id: "b", text: "straight through without bending" },
              { id: "c", text: "along the boundary between the two media", correct: true },
              { id: "d", text: "at 45° to the normal" },
            ],
          },
          {
            type: "mcq", id: "crit-l4", level: 4,
            prompt: "In which direction must light travel for a critical angle to exist?",
            options: [
              { id: "a", text: "From air into glass" },
              { id: "b", text: "From a less dense medium into a denser medium" },
              { id: "c", text: "From a denser medium into a less dense medium", correct: true },
              { id: "d", text: "Along the normal" },
            ],
            explanation: "TIR and the critical angle only occur when going from a denser medium (higher n) into a less dense medium.",
          },
          {
            type: "fill", id: "crit-l6", level: 6,
            prompt: "For glass (n = 1.5) to air (n = 1.0), the critical angle C = sin⁻¹(1/1.5) = sin⁻¹(▁) ≈ 42°.",
            answers: ["0.667", "0.67", "2/3", "1/1.5"],
            explanation: "sin C = n₂/n₁ = 1.0/1.5 = 0.667, so C ≈ 41.8° ≈ 42°.",
          },
          {
            type: "short", id: "crit-l8", level: 8,
            prompt: "Diamond has a refractive index of 2.42. Calculate the critical angle for diamond-to-air and explain why diamond sparkles more than glass (n = 1.5).",
            keywords: ["sin C", "1/2.42", "0.413", "24", "smaller", "TIR", "glass", "sparkle", "reflect", "critical angle"],
            minKeywords: 3,
            sample: "sin C = 1/2.42 = 0.413 → C ≈ 24.4°. Diamond's critical angle (≈24°) is much smaller than glass's (≈42°). This means light inside diamond undergoes total internal reflection at far more angles — very little light escapes until it exits from the facets in exactly the right direction. This internal bouncing creates the sparkle (brilliance) that makes diamond so distinctive.",
          },
        ],
      },
    },
    {
      id: "tir",
      name: "Total internal reflection",
      descriptor: "Explain total internal reflection and the conditions required; describe examples including right-angle prisms.",
      guided: [
        { level: 2, body: "Total internal reflection (TIR) occurs when light hits a boundary from inside a dense medium and ALL of the light reflects back — none escapes into the less dense medium." },
        { level: 4, body: "Conditions for TIR: (1) Light must be travelling from a denser to a less dense medium. (2) The angle of incidence must be GREATER than the critical angle. Both conditions must be met." },
        { level: 6, body: "A right-angle (45°) glass prism can be used as a perfect mirror using TIR. Light enters the face at 0° (no refraction), hits the hypotenuse at 45° > critical angle (≈42° for glass), and totally internally reflects. Used in binoculars and periscopes." },
        { level: 8, body: "TIR gives 100% reflection — better than a silvered mirror (which absorbs some light). This makes it ideal for optical instruments where brightness matters. TIR is also the basis of optical fibres: light is 'trapped' inside a thin glass strand by repeated TIR along the length." },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq", id: "tir-l2", level: 2,
            prompt: "Total internal reflection occurs when…",
            options: [
              { id: "a", text: "light enters a denser medium at any angle" },
              { id: "b", text: "all light reflects back inside a denser medium", correct: true },
              { id: "c", text: "light slows down at a boundary" },
              { id: "d", text: "refraction causes a 90° bend" },
            ],
          },
          {
            type: "mcq", id: "tir-l4", level: 4,
            prompt: "Which TWO conditions must BOTH be met for total internal reflection?",
            options: [
              { id: "a", text: "Dense-to-less-dense medium AND angle < critical angle" },
              { id: "b", text: "Dense-to-less-dense medium AND angle > critical angle", correct: true },
              { id: "c", text: "Less-dense-to-dense medium AND angle > critical angle" },
              { id: "d", text: "Any angle of incidence in any medium" },
            ],
            explanation: "Both conditions (direction AND angle > C) are required. Miss either one and TIR will not occur.",
          },
          {
            type: "short", id: "tir-l6", level: 6,
            prompt: "Explain how a 45° glass prism can be used to turn a ray of light through 90°, and why TIR is preferable to using a mirror for this purpose.",
            keywords: ["TIR", "45°", "critical angle", "angle of incidence", "greater", "reflect", "100%", "mirror", "absorb"],
            minKeywords: 3,
            sample: "Light enters one face of the prism perpendicular (no refraction). It hits the hypotenuse at 45°, which is greater than the critical angle for glass (~42°), so TIR occurs and the light reflects at 90°. TIR reflects 100% of the light — a metal mirror absorbs some, so TIR gives a brighter image.",
          },
          {
            type: "short", id: "tir-l8", level: 8,
            prompt: "A glass prism (n = 1.5, critical angle ≈ 42°) is submerged in water (n = 1.33). Does TIR still occur at the glass-water boundary when light hits at 45°? Show your reasoning.",
            keywords: ["sin C", "1.33/1.5", "0.887", "62", "45", "less than", "no TIR", "refract", "critical angle changes"],
            minKeywords: 3,
            sample: "New critical angle: sin C = n_water/n_glass = 1.33/1.5 = 0.887 → C ≈ 62°. The angle of incidence (45°) is LESS than the new critical angle (62°), so TIR does NOT occur — light refracts into the water instead. Surrounding the glass with water (denser than air) raises the critical angle above 45°.",
          },
        ],
      },
    },
    {
      id: "applications",
      name: "Applications of TIR",
      descriptor: "Describe and explain how TIR is used in optical fibres, endoscopes and diamonds; evaluate advantages.",
      guided: [
        { level: 4, body: "Optical fibres are thin strands of glass surrounded by a cladding of lower refractive index. Light entering the end hits the fibre-cladding boundary at angles greater than the critical angle → TIR keeps light inside the fibre, even around bends." },
        { level: 6, body: "Uses of optical fibres: (1) Communications — carry telephone calls, internet data (total bandwidth >> copper cables; light pulses are faster and carry more data). (2) Medical endoscopes — bundles of fibres carry light into the body and images back out. (3) Decorative light displays." },
        { level: 8, body: "Advantages of fibre-optic cables over copper: less signal loss (TIR = no energy lost), immune to electromagnetic interference, thinner and lighter, greater bandwidth (higher frequency carrier). The cladding must have a lower refractive index than the core to maintain TIR; higher core n → smaller critical angle → better TIR around tight bends." },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq", id: "app-l4", level: 4,
            prompt: "Why does light stay inside an optical fibre as it travels along bends?",
            options: [
              { id: "a", text: "The fibre acts as a mirror and reflects light at every point" },
              { id: "b", text: "Light undergoes total internal reflection at the glass-cladding boundary", correct: true },
              { id: "c", text: "The fibre is made of a vacuum so light travels without slowing" },
              { id: "d", text: "Refraction bends light to stay parallel to the fibre" },
            ],
          },
          {
            type: "short", id: "app-l6", level: 6,
            prompt: "Describe how an endoscope uses optical fibres to allow a doctor to see inside a patient's body.",
            keywords: ["fibre", "light", "TIR", "bundle", "body", "image", "reflect", "transmit", "flexible"],
            minKeywords: 3,
            sample: "An endoscope contains two bundles of optical fibres: one bundle carries light from an external source into the body; the reflected light from the tissue travels back along the second bundle (or the same bundle) via repeated TIR to form an image outside the body. The flexible fibre bundle allows it to navigate curves inside the body.",
          },
          {
            type: "short", id: "app-l8", level: 8,
            prompt: "Give THREE advantages of using optical fibre cables instead of copper cables for long-distance internet data transmission. Use physics to justify each advantage.",
            keywords: ["TIR", "loss", "electromagnetic", "interference", "bandwidth", "speed", "frequency", "thinner", "copper", "signal"],
            minKeywords: 4,
            sample: "(1) Less signal loss — TIR reflects 100% of light; copper cables lose electrical energy as heat. (2) Higher bandwidth — light has a much higher frequency than electrical signals in copper, so more data can be encoded per second. (3) No electromagnetic interference — light signals are not affected by nearby electrical equipment or magnetic fields, unlike copper wires, so the signal is cleaner over long distances.",
          },
        ],
      },
    },
  ],
}
