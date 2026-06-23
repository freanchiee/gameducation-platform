import type { StrandhootPack } from "../engine/types"

// A2 — Forces & Newton's Laws · Criterion A (Knowing & Understanding)
export const forcesCritA: StrandhootPack = {
  slug: "forces-crit-a",
  title: "Forces & Newton's Laws",
  subject: "MYP Physics",
  criterion: "A",
  topic: "Forces & Newton's laws",
  accent: "#e07b39",
  icon: "⚡",
  statementOfInquiry:
    "Forces cause changes in motion — understanding Newton's laws lets us predict and control the behaviour of objects.",
  estMinutes: 25,
  intro:
    "Explore how forces change motion — from identifying forces in diagrams to applying F=ma and Newton's third law to real situations. Each strand builds from basic definitions up to multi-step problems.",
  badges: [
    { id: "force-finder", label: "Force Finder", icon: "🔍", description: "Reach Level 8 on Types of forces", strandId: "forces", atLevel: 8 },
    { id: "inertia-ace", label: "Inertia Ace", icon: "🛸", description: "Reach Level 8 on Newton's first law", strandId: "newton1", atLevel: 8 },
    { id: "fma-hero", label: "F=ma Hero", icon: "🧮", description: "Reach Level 8 on Newton's second law", strandId: "newton2", atLevel: 8 },
    { id: "forces-master", label: "Forces Master", icon: "🏆", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Forces & motion", blurb: "Cars, rockets and everyday pushes and pulls", icon: "🚀" }],
  strands: [
    {
      id: "forces",
      name: "Types of forces",
      descriptor: "Identify and classify contact and non-contact forces; draw and interpret free-body diagrams.",
      guided: [
        { level: 2, body: "A force is a push or a pull. Forces can make objects speed up, slow down, change direction, or change shape. The unit of force is the Newton (N)." },
        { level: 4, body: "Contact forces act when objects touch — e.g. friction (opposes sliding), normal force (surface pushes back). Non-contact forces act at a distance — e.g. gravity, magnetism, electrostatic force." },
        { level: 6, body: "Free-body diagrams show all forces on one object as arrows from the centre of the object. Arrow length shows magnitude; arrow direction shows direction. The net (resultant) force determines the motion." },
        { level: 8, body: "When forces are balanced (net force = 0 N) the object is in equilibrium — either stationary or moving at constant velocity. Unbalanced forces cause acceleration. Weight (W = mg) acts downward; the normal force acts perpendicular to the surface." },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq", id: "f-l2", level: 2,
            prompt: "Which of these is a non-contact force?",
            options: [
              { id: "a", text: "Friction" },
              { id: "b", text: "Normal force" },
              { id: "c", text: "Gravity", correct: true },
              { id: "d", text: "Air resistance" },
            ],
            explanation: "Gravity acts at a distance without objects needing to touch.",
          },
          {
            type: "mcq", id: "f-l4", level: 4,
            prompt: "A box slides along a floor. Which force opposes its motion?",
            options: [
              { id: "a", text: "Weight" },
              { id: "b", text: "Normal force" },
              { id: "c", text: "Friction", correct: true },
              { id: "d", text: "Tension" },
            ],
            explanation: "Friction is a contact force that always opposes the direction of sliding.",
          },
          {
            type: "short", id: "f-l6", level: 6,
            prompt: "A book sits on a table. Draw (describe) the free-body diagram and name all forces acting on the book.",
            keywords: ["weight", "gravity", "downward", "normal", "upward", "balanced", "equilibrium"],
            minKeywords: 3,
            sample: "Weight acts downward (gravity pulling the book toward Earth). The normal force from the table acts upward. They are equal and opposite — the book is in equilibrium (net force = 0).",
          },
          {
            type: "short", id: "f-l8", level: 8,
            prompt: "A skydiver falls at terminal velocity. Explain why the velocity is constant using Newton's laws and the forces acting.",
            keywords: ["weight", "air resistance", "drag", "balanced", "net force", "zero", "constant", "equilibrium", "terminal"],
            minKeywords: 4,
            sample: "At terminal velocity, weight (downward) equals air resistance/drag (upward). The net force is zero, so by Newton's first law the velocity is constant — neither speeding up nor slowing down.",
          },
        ],
      },
    },
    {
      id: "newton1",
      name: "Newton's first law",
      descriptor: "Apply the concept of inertia and balanced forces to explain constant velocity and stationary objects.",
      guided: [
        { level: 2, body: "Newton's first law: an object stays still or keeps moving at the same speed in a straight line unless a force acts on it." },
        { level: 4, body: "Inertia is the tendency of an object to resist changes in its motion. A heavier (more massive) object has more inertia — it needs a bigger force to change its motion." },
        { level: 6, body: "When forces are balanced (net force = 0), velocity is constant. Constant velocity includes the special case of v = 0 (stationary). An object moving at 20 m/s in a straight line will continue at 20 m/s if forces are balanced." },
        { level: 8, body: "Real examples of Newton's first law: a passenger lurches forward when a car brakes (body 'wants' to keep moving), a tablecloth pulled quickly leaves dishes behind (dishes' inertia), objects in deep space move forever with no rocket engine." },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq", id: "n1-l2", level: 2,
            prompt: "According to Newton's first law, what happens to a moving object if no force acts on it?",
            options: [
              { id: "a", text: "It speeds up" },
              { id: "b", text: "It slows down and stops" },
              { id: "c", text: "It keeps moving at the same speed in a straight line", correct: true },
              { id: "d", text: "It changes direction" },
            ],
            explanation: "Without a net force, there is no change in motion — the object maintains constant velocity.",
          },
          {
            type: "fill", id: "n1-l4", level: 4,
            prompt: "The tendency of an object to resist changes in its motion is called ▁.",
            answers: ["inertia"],
            explanation: "Inertia is greater for more massive objects.",
          },
          {
            type: "mcq", id: "n1-l6", level: 6,
            prompt: "A car moves at 30 m/s on a motorway with engine force exactly balancing air resistance and friction. What is the net force?",
            options: [
              { id: "a", text: "30 N" },
              { id: "b", text: "Equal to the engine force" },
              { id: "c", text: "0 N", correct: true },
              { id: "d", text: "Cannot be determined" },
            ],
            explanation: "When all forces balance, net force = 0 — the car maintains constant velocity by Newton's first law.",
          },
          {
            type: "short", id: "n1-l8", level: 8,
            prompt: "A passenger in a braking bus slides forward in their seat. Explain this using Newton's first law and the concept of inertia.",
            keywords: ["inertia", "first law", "forward", "resist", "change", "force", "body", "continue", "moving"],
            minKeywords: 3,
            sample: "The passenger's body has inertia — it tends to continue moving forward at the bus's original speed. When the bus decelerates (braking), no forward force acts on the passenger, so their body keeps moving forward relative to the bus.",
          },
        ],
      },
    },
    {
      id: "newton2",
      name: "Newton's second law",
      descriptor: "Apply F = ma to calculate force, mass or acceleration in familiar and unfamiliar situations.",
      guided: [
        { level: 2, body: "Newton's second law: a bigger force causes a bigger acceleration. A heavier object needs a bigger force to get the same acceleration." },
        { level: 4, body: "Formula: F = ma, where F = net force (N), m = mass (kg), a = acceleration (m/s²). Rearranged: a = F/m and m = F/a." },
        { level: 6, body: "Example: a 1000 kg car with a net force of 3000 N accelerates at a = F/m = 3000/1000 = 3 m/s². Remember: F is the NET force (resultant of all forces)." },
        { level: 8, body: "Weight is a force: W = mg (g ≈ 9.8 m/s² on Earth). The net force on a falling object (ignoring air resistance) = W = mg, so a = mg/m = g. With air resistance, net F = mg − drag, giving a smaller acceleration." },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "fill", id: "n2-l2", level: 2,
            prompt: "Newton's second law: Force = mass × ▁.",
            answers: ["acceleration", "a"],
            explanation: "F = ma. Force is measured in Newtons (N = kg⋅m/s²).",
          },
          {
            type: "fill", id: "n2-l4", level: 4,
            prompt: "A 5 kg trolley has a net force of 20 N applied to it. Its acceleration = ▁ m/s².",
            answers: ["4", "4 m/s²", "4.0"],
            explanation: "a = F/m = 20/5 = 4 m/s².",
          },
          {
            type: "short", id: "n2-l6", level: 6,
            prompt: "A 1200 kg car accelerates from rest to 20 m/s in 8 s. Calculate the net force acting on it.",
            keywords: ["a", "acceleration", "2.5", "3000", "F", "ma", "1200"],
            minKeywords: 2,
            sample: "a = Δv/Δt = 20/8 = 2.5 m/s². F = ma = 1200 × 2.5 = 3000 N.",
          },
          {
            type: "short", id: "n2-l8", level: 8,
            prompt: "A 70 kg skydiver falls with air resistance of 400 N. Calculate the net force and acceleration. (g = 9.8 m/s²)",
            keywords: ["686", "weight", "400", "286", "net", "4.1", "4.09", "mg"],
            minKeywords: 3,
            sample: "Weight W = mg = 70 × 9.8 = 686 N (down). Air resistance = 400 N (up). Net force = 686 − 400 = 286 N (down). a = F/m = 286/70 ≈ 4.1 m/s².",
          },
        ],
      },
    },
    {
      id: "newton3",
      name: "Newton's third law",
      descriptor: "Identify action-reaction force pairs and apply Newton's third law to everyday situations.",
      guided: [
        { level: 2, body: "Newton's third law: for every action there is an equal and opposite reaction. Forces always come in pairs." },
        { level: 4, body: "The two forces in a Newton's third law pair: are equal in size, opposite in direction, act on DIFFERENT objects, and are the same type of force." },
        { level: 6, body: "Example: you push on a wall (action) → the wall pushes back on you (reaction). Rocket: hot gases are pushed backward (action) → gases push the rocket forward (reaction). The pairs act on different objects, so they don't cancel." },
        { level: 8, body: "Common misconception: a heavy lorry hits a small car — the forces on each are equal (Newton 3), but the accelerations differ (Newton 2: a = F/m — the lighter car has a much larger acceleration than the heavier lorry)." },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq", id: "n3-l2", level: 2,
            prompt: "Newton's third law states that for every action there is a…",
            options: [
              { id: "a", text: "larger reaction in the same direction" },
              { id: "b", text: "smaller reaction in the opposite direction" },
              { id: "c", text: "equal and opposite reaction", correct: true },
              { id: "d", text: "larger reaction in the opposite direction" },
            ],
          },
          {
            type: "mcq", id: "n3-l4", level: 4,
            prompt: "A swimmer pushes backward on the water. By Newton's third law, which of the following must be true?",
            options: [
              { id: "a", text: "The water pushes the swimmer backward" },
              { id: "b", text: "The water pushes the swimmer forward with equal force", correct: true },
              { id: "c", text: "The swimmer and water forces cancel out" },
              { id: "d", text: "No force acts on the water" },
            ],
            explanation: "The water pushes the swimmer forward with equal magnitude — Newton 3 pairs act on different objects.",
          },
          {
            type: "short", id: "n3-l6", level: 6,
            prompt: "A rocket in space fires its engines. Explain how Newton's third law makes the rocket accelerate.",
            keywords: ["gas", "backward", "action", "reaction", "rocket", "forward", "opposite", "equal"],
            minKeywords: 3,
            sample: "The rocket pushes hot exhaust gases backward (action). By Newton's third law, the gases push the rocket forward with an equal force (reaction). Since there is a net forward force on the rocket, it accelerates (Newton 2).",
          },
          {
            type: "short", id: "n3-l8", level: 8,
            prompt: "A lorry (mass 5000 kg) collides with a car (mass 1000 kg). Explain why the car accelerates more than the lorry, even though Newton's third law says the forces are equal.",
            keywords: ["equal", "force", "F=ma", "mass", "acceleration", "lorry", "car", "lighter", "greater", "newton 2", "different"],
            minKeywords: 3,
            sample: "Newton's third law: the lorry exerts a force on the car equal and opposite to the force the car exerts on the lorry. Newton's second law: a = F/m. The car has much less mass (1000 kg vs 5000 kg), so for the same force it has a much greater acceleration — a = F/1000 vs a = F/5000.",
          },
        ],
      },
    },
  ],
}
