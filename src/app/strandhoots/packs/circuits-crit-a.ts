import type { StrandhootPack } from "../engine/types"

// A3 — Electric Circuits & Ohm's Law · Criterion A (Knowing & Understanding)
export const circuitsCritA: StrandhootPack = {
  slug: "circuits-crit-a",
  title: "Electric Circuits & Ohm's Law",
  subject: "MYP Physics",
  criterion: "A",
  topic: "Electric circuits & Ohm's law",
  accent: "#f0a500",
  icon: "⚡",
  statementOfInquiry:
    "Electric circuits transfer energy — the relationships between voltage, current and resistance govern every device we use.",
  estMinutes: 25,
  intro:
    "Show what you know about circuits — from reading and drawing circuit diagrams to applying Ohm's law and comparing series with parallel arrangements. Each strand steps up in challenge.",
  badges: [
    { id: "symbol-reader", label: "Symbol Reader", icon: "📐", description: "Reach Level 8 on Circuit symbols", strandId: "symbols", atLevel: 8 },
    { id: "ohm-ace", label: "Ohm's Ace", icon: "🔢", description: "Reach Level 8 on Ohm's law", strandId: "ohms", atLevel: 8 },
    { id: "series-expert", label: "Series Expert", icon: "🔗", description: "Reach Level 8 on Series circuits", strandId: "series", atLevel: 8 },
    { id: "circuits-master", label: "Circuits Master", icon: "🏆", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Circuits & electricity", blurb: "Batteries, bulbs, switches and more", icon: "💡" }],
  strands: [
    {
      id: "symbols",
      name: "Circuit symbols & diagrams",
      descriptor: "Recognise and draw standard circuit symbols; read and describe simple circuit diagrams.",
      guided: [
        { level: 2, body: "Electric circuits use standard symbols to show components. A battery is shown as long and short parallel lines. A bulb is a circle with a cross. A switch is an open gap in the line." },
        { level: 4, body: "Key symbols: battery (cell), bulb (lamp), switch, ammeter (A in a circle, connected in series), voltmeter (V in a circle, connected in parallel), resistor (rectangle), wire (straight line)." },
        { level: 6, body: "In a circuit diagram, ammeters are connected in series (in line with the component) so all current flows through them. Voltmeters are connected in parallel (across the component) to measure the potential difference across it." },
        { level: 8, body: "A complete circuit must have no gaps. Current flows from the negative terminal through the external circuit to the positive terminal (conventional current flows positive → negative). Circuit diagrams are 'maps' of the electrical pathway, not drawings of the physical layout." },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq", id: "sym-l2", level: 2,
            prompt: "Which component is represented by a circle with a cross inside it in a circuit diagram?",
            options: [
              { id: "a", text: "Battery" },
              { id: "b", text: "Switch" },
              { id: "c", text: "Bulb (lamp)", correct: true },
              { id: "d", text: "Ammeter" },
            ],
            explanation: "A lamp/bulb is drawn as a circle with an X (cross) inside.",
          },
          {
            type: "mcq", id: "sym-l4", level: 4,
            prompt: "How should a voltmeter be connected in a circuit to measure the voltage across a bulb?",
            options: [
              { id: "a", text: "In series with the bulb" },
              { id: "b", text: "In parallel with the bulb", correct: true },
              { id: "c", text: "Between the bulb and the battery" },
              { id: "d", text: "After the switch" },
            ],
            explanation: "Voltmeters measure potential difference across a component — they connect in parallel.",
          },
          {
            type: "fill", id: "sym-l6", level: 6,
            prompt: "An ammeter must be connected in ▁ with the component whose current you want to measure.",
            answers: ["series"],
            explanation: "In series, all the current in the branch flows through the ammeter.",
          },
          {
            type: "short", id: "sym-l8", level: 8,
            prompt: "Explain why a voltmeter must have very high resistance and an ammeter must have very low resistance.",
            keywords: ["voltmeter", "high", "current", "ammeter", "low", "resistance", "affect", "divert", "circuit", "accurately"],
            minKeywords: 4,
            sample: "A voltmeter is connected in parallel — if its resistance were low, it would divert significant current and change the reading. A voltmeter's high resistance keeps its own current tiny. An ammeter is in series — if its resistance were high, it would change the total resistance and reduce the current it's supposed to measure. Its low resistance has minimal effect on the circuit.",
          },
        ],
      },
    },
    {
      id: "ohms",
      name: "Ohm's law",
      descriptor: "Apply V = IR to calculate voltage, current and resistance; interpret V-I graphs.",
      guided: [
        { level: 2, body: "Resistance (R) is how much a component opposes the flow of electric current. It is measured in Ohms (Ω). A higher resistance means less current for the same voltage." },
        { level: 4, body: "Ohm's law: V = IR, where V = voltage/potential difference (V), I = current (A), R = resistance (Ω). Rearranged: I = V/R and R = V/I." },
        { level: 6, body: "Example: a 12 V battery drives current through a 4 Ω resistor. Current I = V/R = 12/4 = 3 A. An Ohmic conductor has constant resistance — its V-I graph is a straight line through the origin." },
        { level: 8, body: "Non-Ohmic components (e.g. filament bulbs, diodes) have resistance that changes with temperature or direction of current. A filament bulb's V-I graph curves upward as resistance increases with temperature. A diode only allows current in one direction." },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "fill", id: "ohm-l2", level: 2,
            prompt: "Ohm's law states V = I × ▁.",
            answers: ["R", "resistance"],
            explanation: "V = IR — voltage equals current multiplied by resistance.",
          },
          {
            type: "fill", id: "ohm-l4", level: 4,
            prompt: "A 6 V battery is connected to a 3 Ω resistor. The current = ▁ A.",
            answers: ["2", "2 A", "2.0"],
            explanation: "I = V/R = 6/3 = 2 A.",
          },
          {
            type: "short", id: "ohm-l6", level: 6,
            prompt: "A current of 0.5 A flows through a resistor when the voltage across it is 4 V. Calculate the resistance and state whether this is an Ohmic conductor at this point.",
            keywords: ["8", "ohm", "R=V/I", "4/0.5", "ohmic", "constant", "resistance"],
            minKeywords: 2,
            sample: "R = V/I = 4/0.5 = 8 Ω. At this single point we cannot confirm Ohmic behaviour — we would need to check whether R stays constant at different voltages. If R is constant (V-I graph is a straight line through the origin), it is Ohmic.",
          },
          {
            type: "mcq", id: "ohm-l8", level: 8,
            prompt: "A V-I graph for a filament bulb curves upward (gets less steep) as voltage increases. What does this show?",
            options: [
              { id: "a", text: "Resistance decreases as current increases" },
              { id: "b", text: "Resistance increases as current increases", correct: true },
              { id: "c", text: "The bulb obeys Ohm's law" },
              { id: "d", text: "Current is proportional to voltage" },
            ],
            explanation: "A less steep slope means R = V/I is increasing — the filament heats up, raising its resistance. This is a non-Ohmic conductor.",
          },
        ],
      },
    },
    {
      id: "series",
      name: "Series circuits",
      descriptor: "Describe current, voltage and resistance behaviour in series circuits and apply the rules to calculations.",
      guided: [
        { level: 2, body: "In a series circuit, all components are connected in a single loop. The same current flows through every component." },
        { level: 4, body: "Series circuit rules: (1) Current is the same everywhere: I₁ = I₂ = I₃. (2) Voltages add up to supply voltage: V_supply = V₁ + V₂ + V₃. (3) Total resistance adds up: R_total = R₁ + R₂ + R₃." },
        { level: 6, body: "Example: two resistors of 3 Ω and 5 Ω in series with a 16 V battery. R_total = 8 Ω. I = V/R = 16/8 = 2 A. V across 3 Ω = IR = 2×3 = 6 V. V across 5 Ω = 2×5 = 10 V. Check: 6+10 = 16 V ✓." },
        { level: 8, body: "If one component in a series circuit breaks (open-circuit), the whole circuit stops working — there is no complete path for current. Adding more series components increases total resistance and reduces current (dimmer bulbs)." },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq", id: "ser-l2", level: 2,
            prompt: "In a series circuit with two bulbs, how does the current compare at different points?",
            options: [
              { id: "a", text: "It is larger before the first bulb" },
              { id: "b", text: "It is the same everywhere in the circuit", correct: true },
              { id: "c", text: "It splits equally between the bulbs" },
              { id: "d", text: "It is zero after the second bulb" },
            ],
          },
          {
            type: "fill", id: "ser-l4", level: 4,
            prompt: "Two resistors of 4 Ω and 6 Ω are connected in series. The total resistance = ▁ Ω.",
            answers: ["10", "10 Ω"],
            explanation: "R_total = R₁ + R₂ = 4 + 6 = 10 Ω.",
          },
          {
            type: "short", id: "ser-l6", level: 6,
            prompt: "A 12 V battery is connected to two series resistors: 2 Ω and 4 Ω. Calculate the current and the voltage across each resistor.",
            keywords: ["6", "2 a", "2a", "total", "6 Ω", "6ohm", "i=v/r", "4v", "8v", "v=ir"],
            minKeywords: 2,
            sample: "R_total = 2+4 = 6 Ω. I = V/R = 12/6 = 2 A. V across 2 Ω = 2×2 = 4 V. V across 4 Ω = 2×4 = 8 V. Check: 4+8 = 12 V ✓.",
          },
          {
            type: "short", id: "ser-l8", level: 8,
            prompt: "Two identical bulbs are connected in series. A third identical bulb is then added in series. Describe and explain what happens to the brightness of the original bulbs.",
            keywords: ["resistance", "increase", "current", "decrease", "dimmer", "total", "R_total", "I=V/R"],
            minKeywords: 3,
            sample: "Adding a third bulb increases the total resistance (R_total = 3R instead of 2R). By I = V/R with the same supply voltage, the current decreases. Since brightness depends on power (P = I²R), the lower current makes all three bulbs dimmer than the original two were.",
          },
        ],
      },
    },
    {
      id: "parallel",
      name: "Parallel circuits",
      descriptor: "Describe current, voltage and resistance behaviour in parallel circuits; compare with series.",
      guided: [
        { level: 2, body: "In a parallel circuit, components are connected in separate branches. Each branch has the same voltage as the supply." },
        { level: 4, body: "Parallel circuit rules: (1) Voltage is the same across each branch: V₁ = V₂ = V_supply. (2) Currents from branches add up: I_total = I₁ + I₂. (3) Adding parallel branches decreases total resistance." },
        { level: 6, body: "Formula for total resistance of two parallel resistors: 1/R_total = 1/R₁ + 1/R₂. Example: R₁ = 6 Ω, R₂ = 3 Ω → 1/R = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 → R_total = 2 Ω. (Lower than either resistor alone.)" },
        { level: 8, body: "Advantages of parallel circuits: (1) Each branch operates independently — if one breaks, others continue (used in home wiring, Christmas lights). (2) All branches get the full supply voltage. (3) Total resistance is lower, so more current can be drawn from the supply." },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq", id: "par-l2", level: 2,
            prompt: "In a parallel circuit, the voltage across each branch is…",
            options: [
              { id: "a", text: "Split equally between branches" },
              { id: "b", text: "Zero in all branches" },
              { id: "c", text: "The same as the supply voltage in each branch", correct: true },
              { id: "d", text: "Larger in branches with more resistance" },
            ],
          },
          {
            type: "fill", id: "par-l4", level: 4,
            prompt: "In a parallel circuit, if branch 1 carries 2 A and branch 2 carries 3 A, the total current from the supply = ▁ A.",
            answers: ["5", "5 A", "5.0"],
            explanation: "I_total = I₁ + I₂ = 2 + 3 = 5 A.",
          },
          {
            type: "short", id: "par-l6", level: 6,
            prompt: "Calculate the total resistance when a 6 Ω and a 12 Ω resistor are connected in parallel.",
            keywords: ["1/6", "1/12", "1/R", "4", "4 Ω", "3/12", "parallel"],
            minKeywords: 2,
            sample: "1/R_total = 1/6 + 1/12 = 2/12 + 1/12 = 3/12. R_total = 12/3 = 4 Ω. The total resistance (4 Ω) is less than either individual resistor.",
          },
          {
            type: "short", id: "par-l8", level: 8,
            prompt: "Explain two advantages of wiring the lights in a house in parallel rather than in series.",
            keywords: ["independent", "voltage", "full", "supply", "one breaks", "continues", "switch", "separately", "parallel"],
            minKeywords: 3,
            sample: "(1) Each light gets the full supply voltage, so they all shine at their intended brightness. (2) Lights work independently — if one bulb blows (breaks), the others continue to work because each has its own complete branch. In a series circuit, one break stops all lights.",
          },
        ],
      },
    },
  ],
}
