import type { StrandhootPack } from "../engine/types"

// A4 — Waves & the Wave Equation · Criterion A (Knowing & Understanding)
export const wavesCritA: StrandhootPack = {
  slug: "waves-crit-a",
  title: "Waves & the Wave Equation",
  subject: "MYP Physics",
  criterion: "A",
  topic: "Waves & wave equation v=fλ",
  accent: "#1b7888",
  icon: "〰️",
  statementOfInquiry:
    "Waves carry energy and information — their properties govern light, sound and communication technology.",
  estMinutes: 25,
  intro:
    "Explore wave behaviour — define amplitude, frequency, wavelength and period; apply v=fλ; and distinguish transverse from longitudinal waves. Build from basic properties to real-world applications.",
  badges: [
    { id: "wave-vocab", label: "Wave Words", icon: "📖", description: "Reach Level 8 on Wave properties", strandId: "properties", atLevel: 8 },
    { id: "equation-ace", label: "Equation Ace", icon: "🧮", description: "Reach Level 8 on The wave equation", strandId: "equation", atLevel: 8 },
    { id: "wave-classifier", label: "Wave Classifier", icon: "🔬", description: "Reach Level 8 on Wave types", strandId: "types", atLevel: 8 },
    { id: "waves-master", label: "Waves Master", icon: "🏆", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Waves in action", blurb: "Light, sound, ripples and signals", icon: "📡" }],
  strands: [
    {
      id: "properties",
      name: "Wave properties",
      descriptor: "Define and measure amplitude, wavelength, frequency and period; apply T = 1/f.",
      guided: [
        { level: 2, body: "A wave transfers energy without transferring matter. All waves have a repeating pattern. The distance from one peak to the next peak is called the wavelength (λ)." },
        { level: 4, body: "Amplitude (A): maximum displacement from the rest position (measured in metres). Wavelength (λ): distance of one complete cycle (m). Frequency (f): number of complete waves per second (Hz). Period (T): time for one complete wave (s)." },
        { level: 6, body: "Period and frequency are reciprocals: T = 1/f (and f = 1/T). Example: a wave with frequency 50 Hz has period T = 1/50 = 0.02 s. A higher frequency means more waves per second and a shorter period." },
        { level: 8, body: "Amplitude is linked to the energy a wave carries — a larger amplitude wave carries more energy. Frequency determines pitch in sound and colour in light. Changing the source (e.g. vibrating faster) changes the frequency, not the wave speed in a given medium." },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq", id: "prop-l2", level: 2,
            prompt: "What is the wavelength of a wave?",
            options: [
              { id: "a", text: "The height of the wave" },
              { id: "b", text: "The number of waves per second" },
              { id: "c", text: "The distance between one peak and the next", correct: true },
              { id: "d", text: "The time for one complete wave" },
            ],
          },
          {
            type: "fill", id: "prop-l4", level: 4,
            prompt: "A wave has a frequency of 200 Hz. Its period T = ▁ s.",
            answers: ["0.005", "0.005 s", "5e-3", "1/200"],
            explanation: "T = 1/f = 1/200 = 0.005 s.",
          },
          {
            type: "short", id: "prop-l6", level: 6,
            prompt: "Describe the difference between amplitude and wavelength, and state what each tells you about the wave.",
            keywords: ["amplitude", "displacement", "energy", "wavelength", "distance", "cycle", "peak"],
            minKeywords: 3,
            sample: "Amplitude is the maximum displacement from the rest position — it indicates how much energy the wave carries (larger amplitude = more energy). Wavelength is the distance for one complete cycle (peak to peak) — it determines the type of wave along with frequency.",
          },
          {
            type: "short", id: "prop-l8", level: 8,
            prompt: "A speaker vibrates more rapidly to produce a higher-pitched note. Explain what changes (and what stays the same) in the sound waves, assuming the temperature of the room stays constant.",
            keywords: ["frequency", "increase", "wavelength", "decrease", "speed", "constant", "same", "pitch", "period"],
            minKeywords: 3,
            sample: "Increasing the vibration rate increases the frequency (higher pitch) and decreases the period (T = 1/f). The speed of sound in air at constant temperature does not change (v = fλ), so the wavelength must decrease to compensate: λ = v/f. Higher f → shorter λ, same v.",
          },
        ],
      },
    },
    {
      id: "equation",
      name: "The wave equation",
      descriptor: "Apply v = fλ to calculate wave speed, frequency or wavelength in familiar contexts.",
      guided: [
        { level: 2, body: "The wave equation links wave speed, frequency and wavelength: v = f × λ, where v = wave speed (m/s), f = frequency (Hz), λ = wavelength (m)." },
        { level: 4, body: "Rearranged: f = v/λ and λ = v/f. Example: a sound wave in air (v = 340 m/s) has frequency 170 Hz. Wavelength λ = v/f = 340/170 = 2 m." },
        { level: 6, body: "Radio waves travel at the speed of light (v = 3 × 10⁸ m/s). A radio station broadcasts at 100 MHz (1 × 10⁸ Hz). Wavelength λ = v/f = 3×10⁸ / 1×10⁸ = 3 m." },
        { level: 8, body: "When a wave passes from one medium to another, its speed changes. Frequency stays constant (set by the source). Wavelength changes proportionally: λ = v/f. This is why light refracts at boundaries — its speed changes, so its wavelength (and direction) change." },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "fill", id: "eq-l2", level: 2,
            prompt: "The wave equation is: wave speed v = frequency × ▁.",
            answers: ["wavelength", "λ", "lambda"],
            explanation: "v = fλ. If you know two of the three quantities, you can find the third.",
          },
          {
            type: "fill", id: "eq-l4", level: 4,
            prompt: "A wave has frequency 5 Hz and wavelength 4 m. Its speed = ▁ m/s.",
            answers: ["20", "20 m/s"],
            explanation: "v = fλ = 5 × 4 = 20 m/s.",
          },
          {
            type: "short", id: "eq-l6", level: 6,
            prompt: "A microwave oven uses waves of speed 3 × 10⁸ m/s and frequency 2.45 × 10⁹ Hz. Calculate the wavelength.",
            keywords: ["λ=v/f", "3e8", "2.45e9", "0.12", "12 cm", "wavelength"],
            minKeywords: 2,
            sample: "λ = v/f = (3 × 10⁸) / (2.45 × 10⁹) ≈ 0.122 m ≈ 12.2 cm.",
          },
          {
            type: "short", id: "eq-l8", level: 8,
            prompt: "Light travels at 3×10⁸ m/s in air and slows to 2×10⁸ m/s in glass. If the frequency of red light is 4.6×10¹⁴ Hz, calculate its wavelength in air and in glass. What changes and what stays the same?",
            keywords: ["frequency", "constant", "same", "wavelength", "changes", "650", "434", "λ=v/f", "slower"],
            minKeywords: 3,
            sample: "In air: λ = 3×10⁸ / 4.6×10¹⁴ ≈ 652 nm. In glass: λ = 2×10⁸ / 4.6×10¹⁴ ≈ 435 nm. Frequency stays constant (set by the source). Speed decreases in glass, so wavelength decreases proportionally (λ = v/f).",
          },
        ],
      },
    },
    {
      id: "types",
      name: "Transverse vs longitudinal waves",
      descriptor: "Distinguish transverse and longitudinal waves by the direction of vibration relative to energy transfer.",
      guided: [
        { level: 2, body: "In a transverse wave, the particles vibrate up and down (perpendicular to the direction the wave travels). Light waves and water ripples are transverse waves." },
        { level: 4, body: "In a longitudinal wave, the particles vibrate back and forth (parallel to the direction the wave travels), creating compressions and rarefactions. Sound is a longitudinal wave." },
        { level: 6, body: "Compressions are regions where particles are pushed close together (high pressure); rarefactions are regions where particles are spread out (low pressure). The wavelength of a longitudinal wave is the distance between two compressions (or two rarefactions)." },
        { level: 8, body: "Sound cannot travel through a vacuum — it needs particles to compress and rarefy. Light (an electromagnetic transverse wave) can travel through a vacuum. Earthquakes produce both types: P-waves (longitudinal) and S-waves (transverse) — S-waves cannot travel through liquid rock." },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq", id: "type-l2", level: 2,
            prompt: "In a transverse wave, how do particles vibrate relative to the direction of energy transfer?",
            options: [
              { id: "a", text: "Parallel (in the same direction)" },
              { id: "b", text: "Perpendicular (at right angles)", correct: true },
              { id: "c", text: "They do not vibrate" },
              { id: "d", text: "In random directions" },
            ],
          },
          {
            type: "mcq", id: "type-l4", level: 4,
            prompt: "Which of the following is a longitudinal wave?",
            options: [
              { id: "a", text: "Light" },
              { id: "b", text: "Water ripples on a pond" },
              { id: "c", text: "Sound", correct: true },
              { id: "d", text: "Microwaves" },
            ],
            explanation: "Sound is the only longitudinal wave in this list — its compressions and rarefactions travel in the same direction as energy transfer.",
          },
          {
            type: "fill", id: "type-l6", level: 6,
            prompt: "In a longitudinal sound wave, regions where particles are bunched close together are called ▁.",
            answers: ["compressions", "compression"],
            explanation: "Compressions (high pressure) and rarefactions (low pressure) alternate in a longitudinal wave.",
          },
          {
            type: "short", id: "type-l8", level: 8,
            prompt: "Explain why sound cannot travel through space (a vacuum), but light can.",
            keywords: ["particles", "longitudinal", "vacuum", "vibrate", "compress", "electromagnetic", "medium", "light", "transverse"],
            minKeywords: 3,
            sample: "Sound is a longitudinal wave that requires particles to compress and rarefy as it travels. A vacuum has no particles, so sound cannot propagate. Light is a transverse electromagnetic wave — it is oscillations of electric and magnetic fields, which do not need a medium and can travel through a vacuum.",
          },
        ],
      },
    },
    {
      id: "behaviour",
      name: "Wave behaviour",
      descriptor: "Describe and explain reflection, refraction and diffraction of waves with examples.",
      guided: [
        { level: 4, body: "Reflection: waves bounce off a surface at the same angle they arrived. The angle of incidence equals the angle of reflection (measured from the normal). Example: light reflecting in a mirror; sound echoes." },
        { level: 6, body: "Refraction: waves change speed when entering a different medium, which can cause them to change direction. Light refracts when entering glass (bends toward the normal because it slows down). This makes a straw look bent in water." },
        { level: 8, body: "Diffraction: waves bend around obstacles or spread out after passing through a gap. Diffraction is most noticeable when the gap size ≈ wavelength. Radio waves diffract around hills (long wavelength); light barely diffracts around everyday objects (very short wavelength, ~500 nm)." },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq", id: "beh-l4", level: 4,
            prompt: "An echo is an example of which wave behaviour?",
            options: [
              { id: "a", text: "Refraction" },
              { id: "b", text: "Diffraction" },
              { id: "c", text: "Reflection", correct: true },
              { id: "d", text: "Absorption" },
            ],
          },
          {
            type: "mcq", id: "beh-l6", level: 6,
            prompt: "A ray of light passes from air into glass and bends TOWARD the normal. This is because the light…",
            options: [
              { id: "a", text: "speeds up in glass" },
              { id: "b", text: "slows down in glass", correct: true },
              { id: "c", text: "has a longer wavelength in glass" },
              { id: "d", text: "reflects off the glass surface" },
            ],
            explanation: "Light slows down in glass (denser medium) and bends toward the normal — this is refraction.",
          },
          {
            type: "short", id: "beh-l8", level: 8,
            prompt: "Explain why radio waves can be heard clearly behind a hill, but light cannot be seen around the same hill. Use the concept of diffraction.",
            keywords: ["diffraction", "wavelength", "gap", "radio", "long", "light", "short", "comparable", "bend", "spread"],
            minKeywords: 4,
            sample: "Diffraction is greatest when the wavelength is comparable to the size of the obstacle or gap. Radio waves have wavelengths of metres to kilometres — comparable to a hillside — so they diffract (bend) significantly around the hill. Light has a wavelength of ~500 nm, far smaller than any hill, so diffraction is negligible and light travels in straight lines, leaving a sharp shadow.",
          },
        ],
      },
    },
  ],
}
