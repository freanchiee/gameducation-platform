import type { StrandhootPack } from "../engine/types"

// D5 — Transport Safety & Momentum · Criterion D (Reflecting on the Impacts of Science)
// Sources: Hodder Ch.2 "Forces & motion"; Oxford Ch.3 "Forces"; Cambridge §1.5–1.6.
export const transportSafetyCritD: StrandhootPack = {
  slug: "transport-safety-crit-d",
  title: "Transport Safety & Momentum",
  subject: "MYP Physics",
  criterion: "D",
  topic: "Transport safety & momentum",
  accent: "#e07b39",
  icon: "🚗",
  statementOfInquiry:
    "Physics explains why car crashes are so dangerous — and how engineering, policy and human behaviour together make roads safer.",
  estMinutes: 30,
  intro:
    "Apply the physics of momentum and impulse to understand why crashes cause injury, and reflect on the engineering, policy and ethical dimensions of transport safety. Your reasoning levels up as you quantify the forces and weigh the evidence.",
  badges: [
    {
      id: "momentum-master",
      label: "Momentum Master",
      icon: "💥",
      description: "Reach Level 8 on Applications",
      strandId: "apply",
      atLevel: 8,
    },
    {
      id: "safety-analyst",
      label: "Safety Analyst",
      icon: "🦺",
      description: "Reach Level 8 on Implications & Impacts",
      strandId: "impacts",
      atLevel: 8,
    },
    {
      id: "policy-arbiter",
      label: "Policy Arbiter",
      icon: "⚖️",
      description: "Reach Level 8 on Balanced Judgement",
      strandId: "judge",
      atLevel: 8,
    },
    {
      id: "force-communicator",
      label: "Force Communicator",
      icon: "📐",
      description: "Reach Level 6+ on every strand",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Road safety",
      blurb: "Apply momentum physics to understand crash forces and safety design",
      icon: "🚗",
    },
  ],
  strands: [
    {
      id: "apply",
      name: "How the science is applied",
      descriptor:
        "Apply p = mv and impulse J = FΔt = Δp to explain how safety features (crumple zones, seatbelts, airbags) reduce injury in crashes.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: States that seatbelts and airbags make cars safer.",
        },
        {
          level: 4,
          body: "Level 3–4: Uses p = mv to calculate momentum and states that safety features reduce force in a crash.",
        },
        {
          level: 6,
          body: "Level 5–6: Applies p = mv and J = FΔt = Δp to explain that the change in momentum (Δp) in a crash is fixed by speed and mass; crumple zones and airbags increase the time Δt over which the force acts, reducing the peak force F = Δp/Δt on occupants and therefore reducing injury.",
        },
        {
          level: 8,
          body: "Level 7–8: Quantifies crash forces (e.g. a 1000 kg car at 20 m/s has p = 20000 kg⋅m/s; stopping in 0.1 s gives F = 200 000 N, but a crumple zone extending stop to 0.5 s gives F = 40 000 N); compares the effectiveness of different safety features (ABS, electronic stability control, road surface friction); explains how Newton's second law underpins impulse.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "ap1",
            prompt:
              "A 1000 kg car is travelling at 20 m/s. What is its momentum?",
            options: [
              { id: "a", text: "20 kg⋅m/s" },
              { id: "b", text: "2000 kg⋅m/s" },
              { id: "c", text: "20 000 kg⋅m/s", correct: true },
              { id: "d", text: "200 000 kg⋅m/s" },
            ],
            explanation:
              "p = mv = 1000 kg × 20 m/s = 20 000 kg⋅m/s. This is the momentum that must be reduced to zero in a crash — the longer it takes, the smaller the force on the occupants.",
          },
          {
            id: "ap2",
            prompt:
              "A car's momentum changes from 20 000 kg⋅m/s to zero in a crash. If the crumple zone extends the stopping time from 0.1 s to 0.5 s, by what factor is the average force on the car reduced?",
            options: [
              { id: "a", text: "2× less force" },
              { id: "b", text: "5× less force", correct: true },
              { id: "c", text: "10× less force" },
              { id: "d", text: "The force is the same regardless of stopping time" },
            ],
            explanation:
              "F = Δp/Δt. With Δt = 0.1 s: F = 20 000 / 0.1 = 200 000 N. With Δt = 0.5 s: F = 20 000 / 0.5 = 40 000 N. The force is 5 times smaller. This is why crumple zones save lives — they increase stopping time.",
          },
        ],
        prompt:
          "Explain, using p = mv and F = Δp/Δt, how safety features such as crumple zones, seatbelts and airbags reduce the force on car occupants in a crash. Include a worked example with numbers.",
        scaffolds: [
          "Momentum is calculated as p = mv. For a 1000 kg car at 20 m/s, p =",
          "In a crash, the momentum changes from … to zero. The impulse J = Δp =",
          "The average force is F = Δp/Δt. If Δt is larger,",
          "A crumple zone increases Δt by",
          "This reduces the force on occupants because",
        ],
        placeholder: "Explain how safety features reduce crash forces using p = mv and F = Δp/Δt…",
        rubric: [
          {
            level: 2,
            descriptor: "Names safety features (seatbelts, airbags).",
            keywords: ["seatbelt", "airbag", "crumple", "safe", "crash"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Uses p = mv; states safety features reduce force.",
            keywords: ["p=mv", "momentum", "force", "reduce", "mass", "velocity"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Applies J = FΔt = Δp; explains time-force trade-off in crumple zone/airbag.",
            keywords: [
              "impulse",
              "delta p",
              "delta t",
              "force",
              "time",
              "crumple zone",
              "increases",
              "reduces",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Quantifies forces with numbers; compares multiple safety features; links to Newton's 2nd law.",
            keywords: [
              "20000",
              "kg m/s",
              "newton",
              "second law",
              "abs",
              "quantify",
              "comparison",
              "f=delta p/delta t",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor:
        "Discuss the social, economic and ethical impacts of road accidents and transport safety policies.",
      guided: [
        {
          level: 2,
          body: 'Level 1–2: States one impact, e.g. "crashes kill people."',
        },
        {
          level: 4,
          body: "Level 3–4: Gives impacts in two categories, e.g. social (deaths and injuries) and economic (healthcare costs, lost productivity).",
        },
        {
          level: 6,
          body: "Level 5–6: Discusses social impacts (1.35 million deaths per year globally; disproportionate toll in low-income countries without enforced safety standards), economic impacts (cost of accidents to healthcare and productivity; cost of safety features on vehicle price), and ethical impacts (who is responsible for road safety — driver, manufacturer, government?).",
        },
        {
          level: 8,
          body: "Level 7–8: Weighs competing considerations — mandatory safety features increase car price, potentially excluding poorer buyers; speed limits restrict freedom but save lives; evidence shows higher speed = disproportionately greater impact force (KE = ½mv²); considers whose interests are prioritised in transport policy and who bears the cost of unsafe roads.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "im1",
            prompt:
              "Road fatalities are much higher (per capita) in low-income countries than in high-income countries. What is the most likely reason?",
            options: [
              {
                id: "a",
                text: "Drivers in low-income countries have worse reflexes",
              },
              {
                id: "b",
                text: "Low-income countries often have less stringent vehicle safety standards, fewer enforced speed limits, and lower rates of seatbelt use and road maintenance",
                correct: true,
              },
              { id: "c", text: "Cars travel faster in low-income countries" },
              { id: "d", text: "Low-income countries have more cars per person" },
            ],
            explanation:
              "WHO data show that 93% of road fatalities occur in low- and middle-income countries. The causes include weaker enforcement of speed limits and drink-driving laws, lower rates of helmet and seatbelt use, older vehicles without modern safety features, and poor road design — all policy and resource issues, not driver ability.",
          },
          {
            id: "im2",
            prompt:
              "Kinetic energy is given by KE = ½mv². How does doubling a car's speed from 30 km/h to 60 km/h affect kinetic energy and therefore crash force?",
            options: [
              { id: "a", text: "KE doubles, so crash force approximately doubles" },
              { id: "b", text: "KE stays the same; only momentum changes" },
              {
                id: "c",
                text: "KE quadruples (2² = 4), so crash energy is four times greater at 60 km/h",
                correct: true,
              },
              { id: "d", text: "KE halves because the driver has less time to react" },
            ],
            explanation:
              "KE = ½mv². Doubling v multiplies v² by 4, so KE is four times greater at 60 km/h than 30 km/h. This is why even small increases in speed cause disproportionately large increases in crash severity — the physics is a strong argument for speed limits.",
          },
        ],
        prompt:
          "Discuss the social, economic and ethical impacts of road accidents. Who is most affected, who is responsible, and what do the physics tell us about why speed limits matter?",
        scaffolds: [
          "Socially, road accidents cause",
          "Economically, the costs include",
          "Ethically, responsibility is shared between",
          "KE = ½mv² means that doubling speed",
          "Low-income countries are disproportionately affected because",
        ],
        placeholder: "Discuss social, economic and ethical impacts of road safety…",
        rubric: [
          {
            level: 2,
            descriptor: "States one impact.",
            keywords: ["death", "injury", "accident", "crash", "cost"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Impacts in two categories.",
            keywords: [
              "social",
              "economic",
              "healthcare",
              "deaths",
              "injuries",
              "cost",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Social, economic AND ethical impacts; links physics (speed/KE) to policy.",
            keywords: [
              "social",
              "economic",
              "ethical",
              "responsibility",
              "speed limit",
              "kinetic energy",
              "low-income",
              "disproportionate",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Weighs competing interests; KE = ½mv² applied; equity; who bears costs.",
            keywords: [
              "ke=½mv²",
              "quadruple",
              "equity",
              "mandatory",
              "freedom",
              "who pays",
              "trade-off",
              "disproportionate",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "judge",
      name: "Making a balanced judgement",
      descriptor:
        "Make a balanced judgement about the trade-off between speed, freedom and safety in transport policy.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: States a simple opinion (e.g. 'cars should go slower') with no reasoning.",
        },
        {
          level: 4,
          body: "Level 3–4: Argues for or against speed limits with one reason.",
        },
        {
          level: 6,
          body: "Level 5–6: Makes a balanced judgement: acknowledges both the personal freedom argument and the physics-based safety argument; recognises that the cost of mandatory safety features may exclude some buyers; reaches a reasoned conclusion about what the evidence supports.",
        },
        {
          level: 8,
          body: "Level 7–8: Evaluates multiple stakeholder perspectives (individual drivers, pedestrians, low-income road users in developing nations, insurance companies, vehicle manufacturers); uses quantitative physics (p = mv, KE = ½mv²) to support the case for policy; considers who should pay for safety improvements; acknowledges trade-offs and reaches a nuanced, evidence-informed conclusion.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "jd1",
            prompt:
              "A government proposes lowering the urban speed limit from 50 km/h to 30 km/h. A critic argues this 'restricts freedom.' Which response is best supported by physics?",
            options: [
              { id: "a", text: "The critic is right — physics shows speed limits have no effect on safety" },
              {
                id: "b",
                text: "Lowering speed reduces both momentum (p = mv) and kinetic energy (KE = ½mv²), greatly reducing crash severity and stopping distance — the evidence strongly supports the policy",
                correct: true,
              },
              { id: "c", text: "Speed limits only matter on motorways, not in urban areas" },
              { id: "d", text: "Physics cannot be used to justify policy decisions" },
            ],
            explanation:
              "At 30 km/h vs 50 km/h: momentum is 40% lower (p ∝ v) and KE is 64% lower (KE ∝ v²). Studies show pedestrian fatality risk drops from ~85% at 50 km/h to ~10% at 30 km/h. The physics provides strong evidence for the policy.",
          },
          {
            id: "jd2",
            prompt:
              "Who should pay for safety improvements in transport — individuals (through car prices), governments (through taxation and road design), or manufacturers (through mandatory standards)?",
            options: [
              { id: "a", text: "Individuals should pay — it is their choice to drive" },
              {
                id: "b",
                text: "Governments should bear all costs — safety is a public good" },
              {
                id: "c",
                text: "Responsibility is shared: manufacturers must meet minimum standards, governments fund road design and enforcement, and individuals make safer choices within that framework",
                correct: true,
              },
              { id: "d", text: "Insurance companies should pay for all safety improvements" },
            ],
            explanation:
              "Transport safety is a shared responsibility. Mandatory safety standards ensure a baseline without relying on individual choice or ability to pay. Government infrastructure and enforcement address road design and behaviour. Individual responsibility operates within this framework.",
          },
        ],
        prompt:
          "Make a balanced judgement: how should society balance the freedom to drive at higher speeds against the physics evidence that lower speeds save lives? Consider who benefits, who bears the costs, and what role physics plays in informing policy.",
        scaffolds: [
          "The physics clearly shows that higher speed increases risk because",
          "An argument for allowing higher speeds is",
          "However, the evidence from p = mv and KE = ½mv² shows",
          "Stakeholders who hold different views include",
          "A fair policy would",
        ],
        placeholder: "Make a balanced, evidence-based judgement about speed, safety and policy…",
        rubric: [
          {
            level: 2,
            descriptor: "States a simple position.",
            keywords: ["speed", "safe", "limit", "freedom"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Position with one supporting reason.",
            keywords: ["because", "momentum", "kinetic energy", "speed", "evidence"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Balanced view: physics evidence vs. freedom argument; reasoned conclusion.",
            keywords: [
              "momentum",
              "kinetic energy",
              "freedom",
              "evidence",
              "balance",
              "however",
              "policy",
              "conclude",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Quantitative physics, multiple stakeholders, who pays, equity, nuanced conclusion.",
            keywords: [
              "p=mv",
              "ke",
              "stakeholder",
              "equity",
              "who pays",
              "nuanced",
              "manufacturer",
              "government",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor:
        "Quantify crash forces using p = mv and F = Δp/Δt in your written explanation to communicate why transport safety measures matter.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Uses everyday language; no equations or numbers used.",
        },
        {
          level: 4,
          body: "Level 3–4: Includes p = mv in the explanation, at least naming momentum and force.",
        },
        {
          level: 6,
          body: "Level 5–6: Communicates clearly using p = mv and F = Δp/Δt with correct units (kg, m/s, kg⋅m/s, N, s) in a structured explanation accessible to a general audience; explains what the numbers mean physically.",
        },
        {
          level: 8,
          body: "Level 7–8: Communicates precisely — performs and explains a full numerical calculation (momentum, impulse, force comparison with and without a safety feature); uses correct SI units throughout; explains the significance of each result in everyday terms; distinguishes the scientific evidence from the policy value judgement.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "co1",
            prompt:
              "A 1000 kg car stops from 20 m/s in 0.1 s (rigid wall crash). What average force acts on it? Choose the correct calculation.",
            options: [
              { id: "a", text: "F = 1000 × 20 = 20 000 N" },
              {
                id: "b",
                text: "F = Δp/Δt = (1000 × 20) / 0.1 = 200 000 N",
                correct: true,
              },
              { id: "c", text: "F = 20 / 0.1 = 200 N" },
              { id: "d", text: "F = 1000 / 0.1 = 10 000 N" },
            ],
            explanation:
              "Δp = mv − 0 = 1000 × 20 = 20 000 kg⋅m/s. F = Δp/Δt = 20 000 / 0.1 = 200 000 N. This is equivalent to the weight of about 20 tonnes — illustrating why crashes at 20 m/s (72 km/h) can be fatal without safety features.",
          },
          {
            id: "co2",
            prompt:
              "Using the same car (p = 20 000 kg⋅m/s), a crumple zone extends the stopping time to 0.5 s. What is the average force now?",
            options: [
              { id: "a", text: "200 000 N — the force is the same" },
              { id: "b", text: "100 000 N — force halved" },
              { id: "c", text: "40 000 N — force reduced by factor of 5", correct: true },
              { id: "d", text: "4 000 N — force reduced by factor of 50" },
            ],
            explanation:
              "F = Δp/Δt = 20 000 / 0.5 = 40 000 N. This is 5 times less than the rigid wall crash (200 000 N). A force of 40 000 N is still very large but far more survivable — demonstrating quantitatively why crumple zones are life-saving.",
          },
        ],
        prompt:
          "Write a clear, quantitative explanation of why crumple zones save lives, suitable for a road safety leaflet. Include a worked calculation comparing stopping forces with and without a crumple zone, using correct units.",
        scaffolds: [
          "A 1000 kg car travelling at 20 m/s has momentum p = mv =",
          "In a crash, all this momentum must reduce to zero. The impulse is Δp =",
          "Without a crumple zone (Δt = 0.1 s), the force is F = Δp/Δt =",
          "With a crumple zone (Δt = 0.5 s), the force becomes F =",
          "This shows that crumple zones save lives because",
        ],
        placeholder:
          "Write a quantitative road-safety explanation using p = mv and F = Δp/Δt with worked numbers…",
        rubric: [
          {
            level: 2,
            descriptor: "No equations or numbers — everyday language only.",
            keywords: ["crash", "force", "slow", "safe", "car"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Includes p = mv; mentions force reduction.",
            keywords: ["p=mv", "momentum", "force", "reduce", "seatbelt", "crumple"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Uses p = mv and F = Δp/Δt with correct units in structured explanation.",
            keywords: [
              "kg m/s",
              "newton",
              "impulse",
              "delta t",
              "delta p",
              "units",
              "calculation",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Full numerical calculation; correct SI units; physical meaning explained; fact vs. policy distinguished.",
            keywords: [
              "20000",
              "200000",
              "40000",
              "0.1",
              "0.5",
              "si units",
              "evidence",
              "policy",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
