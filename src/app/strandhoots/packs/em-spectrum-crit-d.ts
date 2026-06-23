import type { StrandhootPack } from "../engine/types"

// D4 — Communication & the EM Spectrum · Criterion D (Reflecting on the Impacts of Science)
// Sources: Hodder Ch.11 "Waves"; Oxford Ch.13 "Waves"; Cambridge §4.1–4.3.
export const emSpectrumCritD: StrandhootPack = {
  slug: "em-spectrum-crit-d",
  title: "Communication & the EM Spectrum",
  subject: "MYP Physics",
  criterion: "D",
  topic: "Communication & the EM spectrum",
  accent: "#1b7888",
  icon: "📡",
  statementOfInquiry:
    "The electromagnetic spectrum carries information across the modern world — the same waves that enable communication also raise questions about health, access and privacy.",
  estMinutes: 30,
  intro:
    "Explore how different parts of the EM spectrum are used for communication, and reflect on the social, health and ethical implications of our connected world. Your reasoning levels up as you weigh the evidence.",
  badges: [
    {
      id: "wave-master",
      label: "Wave Master",
      icon: "〰️",
      description: "Reach Level 8 on Applications",
      strandId: "apply",
      atLevel: 8,
    },
    {
      id: "signal-impact",
      label: "Signal Impact",
      icon: "📶",
      description: "Reach Level 8 on Implications & Impacts",
      strandId: "impacts",
      atLevel: 8,
    },
    {
      id: "digital-arbiter",
      label: "Digital Arbiter",
      icon: "⚖️",
      description: "Reach Level 8 on Balanced Judgement",
      strandId: "judge",
      atLevel: 8,
    },
    {
      id: "spectrum-expert",
      label: "Spectrum Expert",
      icon: "🌈",
      description: "Reach Level 6+ on every strand",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Connected world",
      blurb: "Explore the spectrum powering modern communication",
      icon: "📡",
    },
  ],
  strands: [
    {
      id: "apply",
      name: "How the science is applied",
      descriptor:
        "Explain how different parts of the EM spectrum (radio, microwave, IR, visible light) are used for communication, relating wavelength, frequency and energy.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Names some uses of electromagnetic waves (e.g. radio for music, microwaves for phones).",
        },
        {
          level: 4,
          body: "Level 3–4: Identifies which region of the EM spectrum is used for each type of communication and states that waves travel at the speed of light.",
        },
        {
          level: 6,
          body: "Level 5–6: Uses v = fλ to relate wave speed, frequency and wavelength; explains that higher frequency means shorter wavelength and greater energy; describes specific uses (radio for broadcasting, microwave for mobile and satellite, IR for fibre optics, visible light for laser communication).",
        },
        {
          level: 8,
          body: "Level 7–8: Explains why specific parts of the spectrum are chosen for specific uses (e.g. radio waves diffract around buildings; microwaves penetrate clouds; IR in fibre optic cables allows very high bandwidth due to high frequency); discusses trade-offs between bandwidth, range and penetration; applies v = fλ quantitatively.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "ap1",
            prompt:
              "A radio wave has a wavelength of 300 m. Using v = fλ (where v = 3 × 10⁸ m/s), what is its frequency?",
            options: [
              { id: "a", text: "100 Hz" },
              { id: "b", text: "1 MHz (1 × 10⁶ Hz)", correct: true },
              { id: "c", text: "1 GHz (1 × 10⁹ Hz)" },
              { id: "d", text: "300 MHz" },
            ],
            explanation:
              "f = v/λ = (3 × 10⁸) / 300 = 1 × 10⁶ Hz = 1 MHz. Radio waves have low frequency and long wavelength, which is why they can carry AM radio signals over large distances.",
          },
          {
            id: "ap2",
            prompt:
              "Why are microwaves used for mobile phone communication rather than radio waves?",
            options: [
              { id: "a", text: "Microwaves travel faster than radio waves" },
              {
                id: "b",
                text: "Microwaves have higher frequency, allowing more data to be transmitted per second (greater bandwidth)",
                correct: true,
              },
              { id: "c", text: "Microwaves can travel through walls more easily" },
              { id: "d", text: "Microwaves are cheaper to produce than radio waves" },
            ],
            explanation:
              "Higher frequency waves can carry more information per second (higher bandwidth). Microwaves (GHz range) allow the data rates needed for mobile internet. Radio waves are better for long-range broadcasting where bandwidth demands are lower.",
          },
        ],
        prompt:
          "Explain how the EM spectrum is used for modern communication. Include at least two different regions of the spectrum and use v = fλ in your explanation.",
        scaffolds: [
          "The electromagnetic spectrum, in order from longest to shortest wavelength, is",
          "Radio waves are used for … because",
          "Microwaves are used for … because",
          "Using v = fλ, a wave with frequency … has wavelength",
          "Higher frequency waves carry more data because",
        ],
        placeholder: "Explain EM spectrum applications in communication, using v = fλ…",
        rubric: [
          {
            level: 2,
            descriptor: "Names some EM wave uses.",
            keywords: ["radio", "microwave", "infrared", "light", "wave"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Identifies spectrum regions for communication and mentions wave speed.",
            keywords: [
              "frequency",
              "wavelength",
              "speed of light",
              "spectrum",
              "bandwidth",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Uses v = fλ and explains frequency-energy-wavelength relationships.",
            keywords: [
              "v=fλ",
              "higher frequency",
              "shorter wavelength",
              "infrared",
              "fibre optic",
              "satellite",
              "bandwidth",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Explains spectrum choice trade-offs (diffraction, penetration, bandwidth); applies v = fλ quantitatively.",
            keywords: [
              "diffraction",
              "penetration",
              "bandwidth",
              "trade-off",
              "quantitative",
              "ghz",
              "data rate",
              "fibre",
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
        "Discuss the health concerns, digital divide, and environmental impact of our reliance on EM spectrum communications.",
      guided: [
        {
          level: 2,
          body: 'Level 1–2: States one impact, e.g. "microwaves can be harmful."',
        },
        {
          level: 4,
          body: "Level 3–4: Gives impacts in two categories, e.g. health concerns (microwave exposure) and social inequality (digital divide).",
        },
        {
          level: 6,
          body: "Level 5–6: Discusses health impacts (distinguishes non-ionising — radio, microwave, IR — from ionising radiation — UV, X-ray, gamma — which can damage DNA; scientific evidence on non-ionising safety); social impacts (digital divide: unequal access to communication technology affects education and economic opportunity); environmental impacts (energy consumption of data centres, e-waste).",
        },
        {
          level: 8,
          body: "Level 7–8: Weighs competing considerations — scientific evidence on non-ionising radiation vs. public concern; economic benefits of connectivity vs. the digital divide; carbon footprint of global internet infrastructure vs. digital substitution reducing physical travel; privacy implications of pervasive wireless networks. Recognises where scientific evidence is limited or uncertain.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "im1",
            prompt:
              "Which electromagnetic waves are classified as IONISING radiation and can damage DNA?",
            options: [
              { id: "a", text: "Radio waves and microwaves" },
              { id: "b", text: "Infrared and visible light" },
              {
                id: "c",
                text: "Ultraviolet radiation, X-rays and gamma rays",
                correct: true,
              },
              { id: "d", text: "All electromagnetic waves are equally ionising" },
            ],
            explanation:
              "Ionising radiation has enough energy to remove electrons from atoms and damage DNA, causing mutations or cancer. Only UV (at higher frequencies), X-rays and gamma rays are ionising. Radio, microwave and IR used in communication are non-ionising — current evidence does not show they damage DNA at normal exposure levels.",
          },
          {
            id: "im2",
            prompt:
              "The 'digital divide' refers to which of the following?",
            options: [
              { id: "a", text: "The physical gap between a transmitter and receiver" },
              {
                id: "b",
                text: "Inequality in access to digital technologies and internet connectivity between different populations or regions",
                correct: true,
              },
              { id: "c", text: "The difference in frequency between digital and analogue signals" },
              { id: "d", text: "The divide between Wi-Fi and mobile data networks" },
            ],
            explanation:
              "The digital divide describes how access to communication technology is unevenly distributed — between wealthy and low-income countries, urban and rural areas, and different age or socioeconomic groups — creating inequality in educational and economic opportunity.",
          },
        ],
        prompt:
          "Discuss the health, social and environmental impacts of our reliance on EM spectrum communications. Distinguish clearly between ionising and non-ionising radiation in your answer.",
        scaffolds: [
          "Ionising radiation (such as UV, X-rays and gamma rays) is dangerous because",
          "Non-ionising radiation (such as radio and microwaves) is",
          "The digital divide refers to",
          "Environmentally, global internet infrastructure",
          "A health concern that lacks strong scientific evidence is",
        ],
        placeholder: "Discuss health, social and environmental impacts; distinguish ionising radiation…",
        rubric: [
          {
            level: 2,
            descriptor: "States one impact.",
            keywords: ["health", "harmful", "radiation", "access", "environment"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Impacts in two categories.",
            keywords: [
              "ionising",
              "non-ionising",
              "digital divide",
              "health",
              "social",
              "access",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Distinguishes ionising vs. non-ionising; discusses health, social and environmental impacts.",
            keywords: [
              "ionising",
              "dna",
              "uv",
              "non-ionising",
              "digital divide",
              "data centre",
              "e-waste",
              "evidence",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Weighs evidence vs. concern, digital divide equity, environmental trade-offs, privacy, uncertainty.",
            keywords: [
              "evidence",
              "uncertainty",
              "equity",
              "trade-off",
              "privacy",
              "carbon footprint",
              "connectivity",
              "limitation",
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
        "Make a balanced judgement about whether the benefits of our wirelessly connected world outweigh the risks.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: States a simple opinion (e.g. 'phones are good' or 'radiation is bad') with no reasoning.",
        },
        {
          level: 4,
          body: "Level 3–4: Argues for or against wireless connectivity with one reason.",
        },
        {
          level: 6,
          body: "Level 5–6: Makes a balanced judgement: acknowledges benefits (global communication, education, economic development) and risks (health concerns, privacy, digital divide, environmental cost) and reaches a reasoned conclusion that distinguishes evidence from public concern.",
        },
        {
          level: 8,
          body: "Level 7–8: Evaluates multiple stakeholder perspectives (individuals, governments, corporations, marginalised communities, scientists); considers where scientific evidence is strong vs. where public perception diverges from evidence; discusses what regulation might look like; reaches a nuanced, contextualised conclusion.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "jd1",
            prompt:
              "Residents near a new 5G tower petition to have it removed, citing health fears. How should a scientist respond to this concern?",
            options: [
              {
                id: "a",
                text: "Dismiss the concern entirely — 5G waves are non-ionising so they are completely harmless",
              },
              {
                id: "b",
                text: "Acknowledge the concern, explain the distinction between ionising and non-ionising radiation, present current evidence showing no demonstrated harm at regulatory exposure levels, and acknowledge where uncertainty remains",
                correct: true,
              },
              { id: "c", text: "Remove the tower immediately to avoid all risk" },
              {
                id: "d",
                text: "Refuse to discuss it as public health concerns are not a scientific question",
              },
            ],
            explanation:
              "Good science communication acknowledges public concern, explains the evidence clearly (5G microwaves are non-ionising; current evidence shows no harm at regulated levels), but also honestly acknowledges the limits of current knowledge. Dismissing concerns damages trust.",
          },
          {
            id: "jd2",
            prompt:
              "Which argument BEST supports the view that the digital world requires better governance?",
            options: [
              {
                id: "a",
                text: "The internet should be shut down to prevent health risks",
              },
              {
                id: "b",
                text: "Pervasive wireless communication creates risks of mass data surveillance, privacy violations and digital inequality that markets alone will not resolve — requiring policy intervention",
                correct: true,
              },
              { id: "c", text: "Only scientists should be allowed to use wireless communication" },
              {
                id: "d",
                text: "All radiation, including radio waves, should be banned from residential areas",
              },
            ],
            explanation:
              "Benefits of connectivity are unequally distributed while risks (privacy, surveillance, e-waste) are often borne by those with least power. This market failure is a recognised argument for evidence-based regulation.",
          },
        ],
        prompt:
          "Make a balanced judgement: do the benefits of wireless communication technology outweigh the risks? Consider evidence, stakeholders and what good governance of the EM spectrum might look like.",
        scaffolds: [
          "The clear benefits of wireless communication include",
          "Risks that are supported by scientific evidence include",
          "Risks based more on public concern than strong evidence include",
          "Stakeholders who have different views include",
          "A balanced conclusion, supported by evidence, is that",
        ],
        placeholder: "Make a balanced, evidence-based judgement about wireless communication risks…",
        rubric: [
          {
            level: 2,
            descriptor: "States a simple position.",
            keywords: ["benefit", "risk", "good", "bad", "wireless"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Position with one supporting reason.",
            keywords: ["because", "evidence", "health", "communication", "access"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Balanced view with evidence-based risks vs. public concern; reasoned conclusion.",
            keywords: [
              "benefit",
              "risk",
              "evidence",
              "ionising",
              "non-ionising",
              "balance",
              "however",
              "conclude",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Stakeholder perspectives, limits of evidence, governance, nuanced conclusion.",
            keywords: [
              "stakeholder",
              "governance",
              "regulation",
              "privacy",
              "equity",
              "nuanced",
              "uncertainty",
              "evidence-based",
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
        "Use accurate EM spectrum terminology and distinguish ionising from non-ionising radiation to communicate clearly about the connected world.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Uses everyday language; confuses radiation types or uses terms inaccurately.",
        },
        {
          level: 4,
          body: "Level 3–4: Uses some correct terms (frequency, wavelength, microwave, radio) in context.",
        },
        {
          level: 6,
          body: "Level 5–6: Communicates clearly using accurate terminology (v = fλ, ionising vs. non-ionising, bandwidth, frequency in GHz/MHz), correctly orders the EM spectrum, and structures explanation logically for a non-specialist audience.",
        },
        {
          level: 8,
          body: "Level 7–8: Communicates precisely — quantifies with v = fλ, gives frequency ranges, distinguishes fact from concern, acknowledges complexity while remaining accessible; identifies and corrects a specific inaccuracy commonly found in media coverage of electromagnetic radiation.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "co1",
            prompt:
              "A tabloid headline reads: 'Mobile phone radiation PROVEN to cause brain cancer.' Which scientific principle should you apply when evaluating this claim?",
            options: [
              { id: "a", text: "Correlation implies causation" },
              {
                id: "b",
                text: "Distinguish ionising from non-ionising radiation; check whether large peer-reviewed studies support or refute the claim before accepting it",
                correct: true,
              },
              { id: "c", text: "Any risk of radiation is proof of harm" },
              { id: "d", text: "Headlines from newspapers are as reliable as peer-reviewed research" },
            ],
            explanation:
              "Mobile phones use non-ionising microwaves, which do not have enough energy to damage DNA. Large studies (e.g. the INTERPHONE study, Million Women Study) have not found consistent evidence of increased brain cancer risk. Critically evaluating sources and understanding radiation type is essential to responsible science communication.",
          },
          {
            id: "co2",
            prompt:
              "Arrange the following in order from LOWEST to HIGHEST frequency: gamma rays, radio waves, visible light, microwaves.",
            options: [
              { id: "a", text: "Gamma → visible → microwaves → radio" },
              { id: "b", text: "Radio → microwaves → visible light → gamma rays", correct: true },
              { id: "c", text: "Visible light → radio → gamma → microwaves" },
              { id: "d", text: "Microwaves → radio → gamma → visible light" },
            ],
            explanation:
              "In order of increasing frequency (and decreasing wavelength): radio < microwaves < infrared < visible light < ultraviolet < X-rays < gamma rays. Higher frequency = more energy per photon.",
          },
        ],
        prompt:
          "Write a clear, accurate explanation of how the EM spectrum is used in communication and why health claims in the media about phone radiation should be evaluated carefully. Use correct scientific terminology throughout.",
        scaffolds: [
          "The electromagnetic spectrum, in order of increasing frequency, is",
          "v = fλ means that a wave of frequency … m has wavelength",
          "Ionising radiation differs from non-ionising radiation because",
          "A claim often made in the media that lacks scientific support is",
          "The evidence from peer-reviewed studies shows that",
        ],
        placeholder: "Explain the spectrum, evaluate health claims accurately, use correct terms…",
        rubric: [
          {
            level: 2,
            descriptor: "Basic language; spectrum order or terms inaccurate.",
            keywords: ["radio", "microwave", "wave", "spectrum"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Some correct terms; basic spectrum understanding.",
            keywords: ["frequency", "wavelength", "ionising", "spectrum", "microwave"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Accurate spectrum order, v = fλ applied, ionising vs. non-ionising correctly distinguished.",
            keywords: [
              "v=fλ",
              "ionising",
              "non-ionising",
              "bandwidth",
              "frequency",
              "dna",
              "peer-reviewed",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Precise, quantitative, corrects media inaccuracy, distinguishes fact from concern.",
            keywords: [
              "ghz",
              "mhz",
              "ionising",
              "evidence",
              "peer-reviewed",
              "fact",
              "concern",
              "inaccuracy",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
