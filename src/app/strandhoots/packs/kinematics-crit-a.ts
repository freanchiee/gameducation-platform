import type { StrandhootPack } from "../engine/types"

// A1 — Kinematics & motion graphs · Criterion A (Knowing & Understanding)
// Sources: Oxford Ch.4 "Movement"; Cambridge §1.2 "Motion"; Hodder Ch.4.
export const kinematicsCritA: StrandhootPack = {
  slug: "kinematics-crit-a",
  title: "Motion in a Straight Line",
  subject: "MYP Physics",
  criterion: "A",
  topic: "Kinematics & motion graphs",
  accent: "#1b7888",
  icon: "🏃",
  statementOfInquiry:
    "Describing how objects move lets us model and predict change in the world around us.",
  estMinutes: 25,
  intro:
    "Show what you know about motion — from defining speed to reading graphs and applying the equations of motion to new situations. Each strand has worked examples and a quiz that levels up as you go.",
  badges: [
    { id: "vocab", label: "Word Perfect", icon: "📖", description: "Reach Level 8 on Key terms", strandId: "terms", atLevel: 8 },
    { id: "grapher", label: "Graph Reader", icon: "📈", description: "Reach Level 8 on Motion graphs", strandId: "graphs", atLevel: 8 },
    { id: "calculator", label: "Equation Ace", icon: "🧮", description: "Reach Level 8 on Equations of motion", strandId: "suvat", atLevel: 8 },
    { id: "master", label: "Motion Master", icon: "🚀", description: "Reach Level 6+ on every strand", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Everyday motion", blurb: "Cars, runners and falling objects", icon: "🚗" }],
  strands: [
    {
      id: "terms",
      name: "Key terms & quantities",
      descriptor: "Define and distinguish the quantities used to describe motion.",
      guided: [
        { level: 2, body: "Speed = how fast something moves. Average speed = distance ÷ time. Its unit is metres per second (m/s)." },
        { level: 4, body: "Distance is the total path length (a scalar). Displacement is the straight-line distance and direction from start to finish (a vector). They can differ — e.g. a 400 m lap track gives 400 m distance but 0 m displacement." },
        { level: 6, body: "Velocity is displacement ÷ time — it is speed with a direction (a vector). Acceleration is the rate of change of velocity, a = Δv ÷ Δt, measured in m/s²." },
        { level: 8, body: "Because velocity is a vector, an object can accelerate while moving at constant speed (e.g. a car turning a corner) because its direction — and therefore its velocity — changes. Deceleration is negative acceleration." },
      ],
      artifactKey: "motion-lab",
      response: {
        kind: "questions",
        questions: [
          { type: "mcq", id: "t-l2", level: 2, prompt: "What is the SI unit of speed?", options: [
            { id: "a", text: "m/s", correct: true }, { id: "b", text: "m/s²" }, { id: "c", text: "km" }, { id: "d", text: "N" },
          ], explanation: "Speed = distance/time = metres per second." },
          { type: "fill", id: "t-l4", level: 4, prompt: "The vector version of speed, which also has a direction, is called ▁.", answers: ["velocity"], explanation: "Velocity is speed with a direction." },
          { type: "short", id: "t-l6", level: 6, prompt: "Explain the difference between distance and displacement.", keywords: ["path", "scalar", "straight line", "direction", "displacement", "vector"], minKeywords: 2, sample: "Distance is total path length (scalar); displacement is the straight-line distance and direction from start to end (vector)." },
          { type: "short", id: "t-l8", level: 8, prompt: "A car drives at a steady 30 km/h around a roundabout. Is it accelerating? Justify your answer.", keywords: ["direction", "velocity", "vector", "changing", "accelerat"], minKeywords: 2, sample: "Yes — its direction changes, so its velocity (a vector) changes, which means it is accelerating even though its speed is constant." },
        ],
      },
    },
    {
      id: "graphs",
      name: "Reading motion graphs",
      descriptor: "Interpret distance–time and velocity–time graphs.",
      guided: [
        { level: 2, body: "On a distance–time graph, a horizontal (flat) line means the object is stationary." },
        { level: 4, body: "On a distance–time graph the gradient (slope) is the speed. A steeper line means a faster object." },
        { level: 6, body: "On a velocity–time graph the gradient is the acceleration; a flat line means constant velocity (zero acceleration)." },
        { level: 8, body: "The area under a velocity–time graph equals the displacement. For a triangle that is ½ × base × height; for a rectangle it is height × width." },
      ],
      artifactKey: "motion-lab",
      response: {
        kind: "questions",
        questions: [
          { type: "mcq", id: "g-l2", level: 2, prompt: "On a distance–time graph, a flat horizontal line shows the object is…", options: [
            { id: "a", text: "speeding up" }, { id: "b", text: "stationary", correct: true }, { id: "c", text: "slowing down" }, { id: "d", text: "moving backward" },
          ] },
          { type: "mcq", id: "g-l4", level: 4, prompt: "What does the gradient of a distance–time graph represent?", options: [
            { id: "a", text: "acceleration" }, { id: "b", text: "displacement" }, { id: "c", text: "speed", correct: true }, { id: "d", text: "time" },
          ], explanation: "Gradient = change in distance ÷ change in time = speed." },
          { type: "fill", id: "g-l6", level: 6, prompt: "On a velocity–time graph, the gradient of the line gives the ▁.", answers: ["acceleration"], explanation: "Δv/Δt = acceleration." },
          { type: "short", id: "g-l8", level: 8, prompt: "A velocity–time graph is a straight line from 0 to 20 m/s over 10 s. How do you find the distance travelled, and what is it?", keywords: ["area", "under", "triangle", "100", "half", "½"], minKeywords: 2, sample: "The distance is the area under the line — a triangle of ½ × 10 s × 20 m/s = 100 m." },
        ],
      },
    },
    {
      id: "suvat",
      name: "Equations of motion",
      descriptor: "Apply v = u + at and s = ut + ½at² to familiar problems.",
      guided: [
        { level: 2, body: "Average speed = total distance ÷ total time. Rearranged: distance = speed × time." },
        { level: 4, body: "For constant acceleration, v = u + at, where u = initial velocity, v = final velocity, a = acceleration, t = time." },
        { level: 6, body: "Distance under constant acceleration: s = ut + ½at². Substitute carefully and watch the units (m, s, m/s, m/s²)." },
        { level: 8, body: "Choose the equation that contains your three known quantities and the unknown. If time is missing, use v² = u² + 2as." },
      ],
      response: {
        kind: "questions",
        questions: [
          { type: "fill", id: "s-l2", level: 2, prompt: "A runner covers 100 m in 20 s. Average speed = ▁ m/s.", answers: ["5", "5 m/s", "5.0"], explanation: "100 ÷ 20 = 5 m/s." },
          { type: "fill", id: "s-l4", level: 4, prompt: "A car starts at 0 m/s and accelerates at 2 m/s² for 5 s. Final velocity v = u + at = ▁ m/s.", answers: ["10", "10 m/s"], explanation: "0 + 2×5 = 10 m/s." },
          { type: "short", id: "s-l6", level: 6, prompt: "A cyclist starting from rest accelerates at 1.5 m/s² for 4 s. Using s = ut + ½at², show the distance is 12 m.", keywords: ["ut", "½at²", "0", "12", "1.5", "16"], minKeywords: 2, sample: "s = 0×4 + ½×1.5×4² = ½×1.5×16 = 12 m." },
          { type: "mcq", id: "s-l8", level: 8, prompt: "You know u, v and a but NOT t, and want the distance s. Which equation is best?", options: [
            { id: "a", text: "v = u + at" }, { id: "b", text: "s = ut + ½at²" }, { id: "c", text: "v² = u² + 2as", correct: true }, { id: "d", text: "s = ½(u+v)t" },
          ], explanation: "v² = u² + 2as has no t, so it fits the known quantities." },
        ],
      },
    },
    {
      id: "analyse",
      name: "Analysing unfamiliar motion",
      descriptor: "Reason about real, multi-stage or unfamiliar motion situations.",
      guided: [
        { level: 4, body: "Break a journey into stages (e.g. speeding up, constant speed, slowing down) and describe each from the graph's shape." },
        { level: 6, body: "A curved (steepening) distance–time graph shows acceleration; a curve that flattens shows deceleration." },
        { level: 8, body: "Near Earth's surface, ignoring air resistance, a falling object accelerates at about g ≈ 9.8 m/s². With air resistance it eventually reaches terminal velocity, where the velocity–time graph levels off." },
      ],
      artifactKey: "motion-lab",
      response: {
        kind: "questions",
        questions: [
          { type: "mcq", id: "a-l4", level: 4, prompt: "A distance–time graph curves upward, getting steeper. The object is…", options: [
            { id: "a", text: "stationary" }, { id: "b", text: "moving at constant speed" }, { id: "c", text: "accelerating", correct: true }, { id: "d", text: "moving backward" },
          ] },
          { type: "fill", id: "a-l6", level: 6, prompt: "Ignoring air resistance, objects near Earth's surface fall with acceleration g ≈ ▁ m/s².", answers: ["9.8", "9.81", "10", "9.8 m/s²"], explanation: "g ≈ 9.8 m/s² (often rounded to 10)." },
          { type: "short", id: "a-l8", level: 8, prompt: "Describe how the velocity–time graph of a skydiver looks before the parachute opens, and explain why it eventually flattens.", keywords: ["increase", "air resistance", "terminal velocity", "balanced", "constant", "flatten", "drag"], minKeywords: 3, sample: "Velocity increases steeply at first, then the line curves and flattens as air resistance grows to balance weight, reaching terminal (constant) velocity." },
        ],
      },
    },
  ],
}
