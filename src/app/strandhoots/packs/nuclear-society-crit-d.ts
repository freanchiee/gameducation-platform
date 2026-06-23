import type { StrandhootPack } from "../engine/types"

// D2 — Nuclear Power & Society · Criterion D (Reflecting on the Impacts of Science)
// Sources: Hodder Ch.12 "Radioactivity"; Oxford Ch.15 "Nuclear"; Cambridge §5.1–5.3.
export const nuclearSocietyCritD: StrandhootPack = {
  slug: "nuclear-society-crit-d",
  title: "Nuclear Power & Society",
  subject: "MYP Physics",
  criterion: "D",
  topic: "Nuclear power & radioactive waste",
  accent: "#c0392b",
  icon: "☢️",
  statementOfInquiry:
    "Nuclear technology offers low-carbon energy but raises profound questions about safety, waste and responsibility — questions that science alone cannot answer.",
  estMinutes: 30,
  intro:
    "Explore how nuclear fission is harnessed for electricity, examine its environmental and social impacts, and reflect on the ethical dilemmas of radioactive waste and nuclear risk. Your reasoning levels up as you weigh the evidence.",
  badges: [
    {
      id: "fission-expert",
      label: "Fission Expert",
      icon: "⚛️",
      description: "Reach Level 8 on Applications",
      strandId: "apply",
      atLevel: 8,
    },
    {
      id: "risk-analyst",
      label: "Risk Analyst",
      icon: "⚠️",
      description: "Reach Level 8 on Implications & Impacts",
      strandId: "impacts",
      atLevel: 8,
    },
    {
      id: "ethics-champion",
      label: "Ethics Champion",
      icon: "⚖️",
      description: "Reach Level 8 on Balanced Judgement",
      strandId: "judge",
      atLevel: 8,
    },
    {
      id: "nuclear-communicator",
      label: "Nuclear Communicator",
      icon: "📢",
      description: "Reach Level 6+ on every strand",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Nuclear debate",
      blurb: "Weigh the risks and benefits of nuclear power",
      icon: "☢️",
    },
  ],
  strands: [
    {
      id: "apply",
      name: "How the science is applied",
      descriptor:
        "Explain how nuclear fission is used to generate electricity in a nuclear power station.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: States that nuclear power stations use uranium to make electricity.",
        },
        {
          level: 4,
          body: "Level 3–4: Describes that uranium nuclei split (fission) releasing heat, and that this heat is used to generate electricity via a turbine.",
        },
        {
          level: 6,
          body: "Level 5–6: Explains the chain reaction — U-235 absorbs a neutron, splits into two smaller nuclei and releases more neutrons, which trigger further fissions; heat produced converts water to steam, spinning a turbine and generator. No CO₂ is emitted during operation.",
        },
        {
          level: 8,
          body: "Level 7–8: Explains fission in terms of nuclear energy (mass–energy equivalence, E = mc²), the role of control rods and moderators in regulating the chain reaction, and how the energy transfer chain (nuclear → thermal → kinetic → electrical) compares in efficiency and energy density to fossil fuels.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "ap1",
            prompt:
              "In a nuclear power station, uranium-235 is bombarded with neutrons. What happens to the nucleus?",
            options: [
              { id: "a", text: "It fuses with another nucleus" },
              {
                id: "b",
                text: "It splits into two smaller nuclei, releasing energy and more neutrons",
                correct: true,
              },
              { id: "c", text: "It emits only gamma radiation and remains intact" },
              { id: "d", text: "It absorbs the neutron and becomes stable" },
            ],
            explanation:
              "Nuclear fission occurs when U-235 absorbs a neutron and splits, releasing a large amount of energy and additional neutrons that can trigger a chain reaction.",
          },
          {
            id: "ap2",
            prompt:
              "Which statement correctly compares nuclear power to coal power in terms of CO₂ emissions?",
            options: [
              { id: "a", text: "Nuclear produces more CO₂ per kWh than coal" },
              { id: "b", text: "Both produce the same amount of CO₂" },
              {
                id: "c",
                text: "Nuclear produces negligible CO₂ during operation; coal releases large amounts",
                correct: true,
              },
              { id: "d", text: "Nuclear produces CO₂ only during start-up" },
            ],
            explanation:
              "Nuclear power stations do not burn fuel, so no CO₂ is released during electricity generation. Coal combustion releases large amounts of CO₂ (~820 g/kWh).",
          },
        ],
        prompt:
          "Explain how nuclear fission is used to generate electricity in a power station, including the energy transfers involved.",
        scaffolds: [
          "Uranium-235 undergoes fission when",
          "The chain reaction is controlled by",
          "Heat produced is used to",
          "The energy is transferred from nuclear energy to",
          "Unlike fossil fuels, nuclear power does not emit",
        ],
        placeholder: "Explain how nuclear fission generates electricity…",
        rubric: [
          {
            level: 2,
            descriptor: "Names nuclear power and uranium.",
            keywords: ["nuclear", "uranium", "electricity", "atom"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Describes fission releasing heat used to drive a turbine.",
            keywords: ["fission", "split", "heat", "turbine", "neutron"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Explains the chain reaction, steam cycle, and lack of CO₂.",
            keywords: [
              "chain reaction",
              "steam",
              "generator",
              "control rod",
              "co2",
              "carbon",
              "nuclear energy",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Discusses energy density, E=mc², efficiency, and control mechanisms.",
            keywords: [
              "e=mc2",
              "mass",
              "moderator",
              "energy density",
              "efficiency",
              "thermal",
              "kinetic",
              "electrical",
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
        "Discuss the environmental, social and economic impacts of nuclear power, including radioactive waste and accident risk.",
      guided: [
        {
          level: 2,
          body: 'Level 1–2: States one impact, e.g. "nuclear waste is dangerous."',
        },
        {
          level: 4,
          body: "Level 3–4: Gives impacts in two categories, e.g. environmental (radioactive waste) and social (public fear of accidents).",
        },
        {
          level: 6,
          body: "Level 5–6: Discusses environmental (low CO₂ but long-lived radioactive waste needing isolation for thousands of years), economic (high build cost, low running cost), and social impacts (public perception shaped by Chernobyl and Fukushima; local community concerns about siting).",
        },
        {
          level: 8,
          body: "Level 7–8: Weighs competing impacts, recognises uncertainty, and considers multiple stakeholders — e.g. governments valuing low-carbon baseload vs. local communities fearing waste storage; scientists' probabilistic risk assessment vs. public perception; intergenerational responsibility for waste that remains hazardous for millennia.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "im1",
            prompt:
              "Spent nuclear fuel is described as 'highly radioactive for thousands of years.' Why does it stay dangerous for so long?",
            options: [
              { id: "a", text: "Because uranium has a very short half-life" },
              {
                id: "b",
                text: "Because the waste contains isotopes with very long half-lives, staying active for thousands of years",
                correct: true,
              },
              { id: "c", text: "Because radioactivity increases after fission" },
              { id: "d", text: "Because the waste is kept at high temperature" },
            ],
            explanation:
              "Some fission products and actinides in spent fuel have half-lives of thousands to millions of years, meaning they remain dangerously radioactive for extremely long periods.",
          },
          {
            id: "im2",
            prompt:
              "Which of the following was the primary reason that public opposition to nuclear power increased after the Chernobyl (1986) and Fukushima (2011) disasters?",
            options: [
              { id: "a", text: "Nuclear power became more expensive after both events" },
              {
                id: "b",
                text: "Both events showed that nuclear reactors produce more CO₂ than coal",
              },
              {
                id: "c",
                text: "Both events demonstrated that major accidents, though rare, can cause widespread radioactive contamination and forced evacuation",
                correct: true,
              },
              { id: "d", text: "The accidents proved that uranium is non-renewable" },
            ],
            explanation:
              "Chernobyl and Fukushima showed that while the probability of accidents is low, the consequences can be catastrophic — widespread contamination, long-term health risks, and displacement of large populations.",
          },
        ],
        prompt:
          "Discuss the environmental, economic and social impacts of nuclear power, including the challenge of radioactive waste.",
        scaffolds: [
          "Environmentally, nuclear power produces",
          "Economically, nuclear stations are",
          "Socially, public perception has been shaped by",
          "Radioactive waste remains dangerous because",
          "A trade-off that is difficult to resolve is",
        ],
        placeholder: "Discuss impacts across environment, economy and society…",
        rubric: [
          {
            level: 2,
            descriptor: "States one impact.",
            keywords: ["waste", "dangerous", "accident", "radiation", "expensive"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Impacts in two categories.",
            keywords: [
              "radioactive",
              "waste",
              "public",
              "cost",
              "chernobyl",
              "fukushima",
              "environment",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Environmental, economic AND social impacts with reasoning.",
            keywords: [
              "long half-life",
              "storage",
              "low co2",
              "build cost",
              "running cost",
              "public perception",
              "social",
              "community",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Weighs trade-offs, uncertainty, multiple stakeholders, intergenerational ethics.",
            keywords: [
              "stakeholder",
              "intergenerational",
              "responsibility",
              "risk assessment",
              "uncertainty",
              "perspective",
              "trade-off",
              "millennia",
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
        "Make a balanced judgement about whether nuclear power should be part of a country's energy mix.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: States a simple yes or no with no reasoning.",
        },
        {
          level: 4,
          body: "Level 3–4: Recommends or rejects nuclear power with one reason.",
        },
        {
          level: 6,
          body: "Level 5–6: Makes a balanced judgement acknowledging both advantages (reliable, low CO₂, high energy density) and disadvantages (waste, accident risk, cost), reaching a reasoned conclusion.",
        },
        {
          level: 8,
          body: "Level 7–8: Evaluates multiple perspectives (government energy security vs. local community safety vs. environmental campaigners vs. future generations bearing waste responsibility), acknowledges scientific uncertainty and the limits of risk assessment, and reaches a nuanced conclusion that distinguishes scientific evidence from value judgements.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "jd1",
            prompt:
              "A government is deciding whether to build a new nuclear plant. Which argument BEST supports including nuclear in the energy mix?",
            options: [
              { id: "a", text: "Nuclear waste is easy to dispose of safely" },
              {
                id: "b",
                text: "Nuclear provides reliable, low-carbon electricity regardless of weather, unlike solar and wind",
                correct: true,
              },
              { id: "c", text: "Nuclear is the cheapest way to generate electricity" },
              { id: "d", text: "Nuclear eliminates the need for any other energy source" },
            ],
            explanation:
              "Nuclear power is 'dispatchable' — it can generate electricity on demand, unlike intermittent renewables. It also has very low lifecycle CO₂ emissions, making it attractive as a low-carbon baseload source.",
          },
          {
            id: "jd2",
            prompt:
              "Which of the following is the strongest argument AGAINST building new nuclear power stations?",
            options: [
              { id: "a", text: "Nuclear power produces large amounts of CO₂" },
              {
                id: "b",
                text: "High construction cost, long build time, and the unresolved problem of safe, long-term radioactive waste storage",
                correct: true,
              },
              { id: "c", text: "Nuclear power cannot generate enough electricity" },
              { id: "d", text: "Nuclear power requires burning coal" },
            ],
            explanation:
              "The main concerns are practical and ethical: new nuclear plants cost billions and take a decade to build, and no country has yet opened a permanent deep geological repository for high-level waste.",
          },
        ],
        prompt:
          "Make a balanced judgement: should nuclear power be part of a country's energy mix? Consider evidence for and against, and the perspectives of different stakeholders.",
        scaffolds: [
          "On one hand, nuclear power offers",
          "On the other hand, concerns include",
          "Different stakeholders such as … would argue",
          "Weighing the evidence, I conclude that",
          "A question science cannot answer alone is",
        ],
        placeholder: "Make a balanced, evidence-based judgement about nuclear power…",
        rubric: [
          {
            level: 2,
            descriptor: "States a yes/no position.",
            keywords: ["yes", "no", "should", "nuclear"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Position with one supporting reason.",
            keywords: ["because", "low carbon", "dangerous", "reliable", "waste", "cost"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Balanced view with advantages and disadvantages.",
            keywords: [
              "advantage",
              "disadvantage",
              "reliable",
              "low co2",
              "waste",
              "risk",
              "balance",
              "however",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Nuanced judgement with multiple perspectives, ethical considerations, and distinction between science and values.",
            keywords: [
              "stakeholder",
              "perspective",
              "ethical",
              "future generations",
              "evidence",
              "value judgement",
              "uncertainty",
              "nuanced",
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
        "Use accurate scientific terminology — fission, isotope, half-life, radioactive waste — to communicate the nuclear debate clearly.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Uses everyday language; scientific terms are absent or misused.",
        },
        {
          level: 4,
          body: "Level 3–4: Uses some correct scientific terms (e.g. radiation, fission, waste) in context.",
        },
        {
          level: 6,
          body: "Level 5–6: Communicates clearly using accurate terminology (fission, isotope, half-life, radioactive decay, chain reaction) in a logical structure appropriate for a general audience.",
        },
        {
          level: 8,
          body: "Level 7–8: Communicates precisely and concisely, correctly uses quantitative concepts (half-life timescales, energy density), distinguishes facts from value judgements, and cites scientific evidence or reports to support claims.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "co1",
            prompt:
              "A newspaper headline reads: 'Nuclear waste will be dangerous FOREVER.' Is this scientifically accurate?",
            options: [
              { id: "a", text: "Yes — radioactive waste never decays" },
              {
                id: "b",
                text: "No — all radioactive isotopes eventually decay, though some take thousands to millions of years due to long half-lives",
                correct: true,
              },
              { id: "c", text: "Yes — isotopes gain more neutrons over time, increasing radioactivity" },
              { id: "d", text: "No — nuclear waste becomes inert within a few decades" },
            ],
            explanation:
              "Every radioactive isotope has a finite half-life. While some waste isotopes have half-lives of millions of years, they do not remain radioactive forever. The headline is misleading — precision matters when communicating nuclear science.",
          },
          {
            id: "co2",
            prompt:
              "Which term correctly describes the process in which a heavy nucleus splits into two lighter nuclei?",
            options: [
              { id: "a", text: "Nuclear fusion" },
              { id: "b", text: "Radioactive decay" },
              { id: "c", text: "Nuclear fission", correct: true },
              { id: "d", text: "Beta emission" },
            ],
            explanation:
              "Fission is the splitting of a heavy nucleus (like U-235) into two smaller nuclei. Fusion is the joining of nuclei. Confusing these terms is a common but important error.",
          },
        ],
        prompt:
          "Write a clear, accurate summary of how nuclear power works and its main impacts, using correct scientific terminology. Identify at least one statement in public debates about nuclear power that lacks scientific precision.",
        scaffolds: [
          "Nuclear power works by",
          "Key terms to use accurately include fission, isotope, half-life, and",
          "A common misconception is",
          "Scientifically, the evidence shows",
          "It is important to distinguish the scientific fact that … from the value judgement that",
        ],
        placeholder:
          "Summarise nuclear power clearly and accurately, noting any imprecise public claims…",
        rubric: [
          {
            level: 2,
            descriptor: "Basic everyday language only.",
            keywords: ["nuclear", "electricity", "dangerous"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Some correct scientific terms used.",
            keywords: ["fission", "radiation", "waste", "isotope", "decay"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Clear, accurate terminology in logical structure.",
            keywords: [
              "half-life",
              "chain reaction",
              "fission",
              "isotope",
              "radioactive",
              "misconception",
              "accurate",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Precise, quantitative, evidence-based; distinguishes fact from value judgement.",
            keywords: [
              "half-life",
              "energy density",
              "evidence",
              "fact",
              "value judgement",
              "imprecise",
              "scientific",
              "data",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
