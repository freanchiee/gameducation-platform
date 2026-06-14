export type StrandInfo = {
  strand: string;
  heading: string;
  description: string;
};

type StrandMap = Record<
  string, // subject
  Record<
    string, // criterion (A–D)
    StrandInfo[]
  >
>;

export const strandMap: StrandMap = {
  Mathematics: {
    A: [
      { strand: 'i', heading: 'Mathematics Selection', description: 'Select appropriate mathematics when solving problems in both familiar and unfamiliar situations.' },
      { strand: 'ii', heading: 'Mathematics Application', description: 'Apply the selected mathematics successfully when solving problems.' },
      { strand: 'iii', heading: 'Problem Solving', description: 'Solve problems correctly in a variety of contexts.' },
    ],
    B: [
      { strand: 'i', heading: 'Pattern Discovery', description: 'Select and apply mathematical problem-solving techniques to discover complex patterns.' },
      { strand: 'ii', heading: 'General Rules', description: 'Describe patterns as general rules consistent with findings.' },
      { strand: 'iii', heading: 'Rule Verification', description: 'Prove, or verify and justify, general rules.' },
    ],
    C: [
      { strand: 'i', heading: 'Mathematical Language', description: 'Use appropriate mathematical language (notation, symbols and terminology) in both oral and written explanations.' },
      { strand: 'ii', heading: 'Mathematical Representation', description: 'Use appropriate forms of mathematical representation to present information.' },
      { strand: 'iii', heading: 'Representation Flexibility', description: 'Move between different forms of mathematical representation.' },
      { strand: 'iv', heading: 'Mathematical Reasoning', description: 'Communicate complete, coherent and concise mathematical lines of reasoning.' },
      { strand: 'v', heading: 'Logical Organization', description: 'Organize information using a logical structure.' },
    ],
    D: [
      { strand: 'i', heading: 'Real-life Identification', description: 'Identify relevant elements of authentic real-life situations.' },
      { strand: 'ii', heading: 'Strategy Selection', description: 'Select appropriate mathematical strategies when solving authentic real-life situations.' },
      { strand: 'iii', heading: 'Strategy Application', description: 'Apply the selected mathematical strategies successfully to reach a solution.' },
      { strand: 'iv', heading: 'Accuracy Justification', description: 'Justify the degree of accuracy of a solution.' },
      { strand: 'v', heading: 'Contextual Validation', description: 'Justify whether a solution makes sense in the context of the authentic real-life situation.' },
    ],
  },

  Sciences: {
    A: [
      { strand: 'i', heading: 'Scientific Knowledge', description: 'Explain scientific facts, ideas, and concepts clearly.' },
      { strand: 'ii', heading: 'Knowledge Application', description: 'Use scientific understanding to solve real-world problems.' },
      { strand: 'iii', heading: 'Scientific Reasoning and Evaluation', description: 'Evaluate information to support conclusions.' },
    ],
    B: [
      { strand: 'i', heading: 'Research Question', description: 'Formulate a clear, testable scientific question (IV vs DV).' },
      { strand: 'ii', heading: 'Hypothesis', description: 'Frame an "If…then…because…" hypothesis with correct reasoning.' },
      { strand: 'iii', heading: 'Variables', description: 'Identify and control IV, DV, and CVs with method of measurement.' },
      { strand: 'iv', heading: 'Methodology', description: 'Design a clear, safe, logical procedure with appropriate equipment.' },
    ],
    C: [
      { strand: 'i', heading: 'Data Collection & Processing', description: 'Present well-organized data with correct units.' },
      { strand: 'ii', heading: 'Data Analysis', description: 'Interpret trends with supporting numerical evidence.' },
      { strand: 'iii', heading: 'Hypothesis Evaluation', description: 'Support or reject hypotheses using collected data.' },
      { strand: 'iv', heading: 'Method Evaluation', description: 'Discuss limitations and the method\'s reliability.' },
      { strand: 'v', heading: 'Improvement & Extension', description: 'Propose detailed improvements or new investigations.' },
    ],
    D: [
      { strand: 'i', heading: 'Real-world Relevance', description: 'Describe how science addresses real-life problems.' },
      { strand: 'ii', heading: 'Societal and Ethical Impact', description: 'Evaluate the effect of science on society and vice versa.' },
      { strand: 'iii', heading: 'Scientific Communication', description: 'Use accurate and relevant scientific terminology.' },
      { strand: 'iv', heading: 'Academic Integrity', description: 'Properly reference and acknowledge sources of information.' },
    ],
  },

  "Language and Literature": {
    A: [
      { strand: 'i', heading: 'Textual Analysis', description: 'Analyze content, context, language, structure, technique, and style.' },
      { strand: 'ii', heading: "Creator's Choices", description: 'Analyze the effects of the creator s choices on an audience.' },
      { strand: 'iii', heading: 'Justifying Opinions', description: 'Justify opinions and ideas using examples, explanations, and terminology.' },
      { strand: 'iv', heading: 'Comparative Evaluation', description: 'Evaluate similarities and differences across and within genres and texts.' },
    ],
    B: [
      { strand: 'i', heading: 'Structural Organization', description: 'Employ organizational structures that serve the context and intention.' },
      { strand: 'ii', heading: 'Logical Sequencing', description: 'Organize opinions and ideas in a sustained, coherent, and logical manner.' },
      { strand: 'iii', heading: 'Referencing', description: 'Use referencing and formatting tools to create a presentation style suitable to the context and intention.' },
    ],
    C: [
      { strand: 'i', heading: 'Creative Expression', description: 'Produce texts that demonstrate thought, imagination, and sensitivity.' },
      { strand: 'ii', heading: 'Stylistic Choices', description: 'Make stylistic choices in terms of linguistic, literary, and visual devices.' },
      { strand: 'iii', heading: 'Supporting Details', description: 'Select relevant details and examples to develop ideas.' },
    ],
    D: [
      { strand: 'i', heading: 'Language Use', description: 'Use appropriate and varied vocabulary, sentence structures, and forms of expression.' },
      { strand: 'ii', heading: 'Register and Style', description: 'Write and speak in a register and style that serve the context and intention.' },
      { strand: 'iii', heading: 'Grammar and Syntax', description: 'Use correct grammar, syntax, and punctuation.' },
      { strand: 'iv', heading: 'Spelling and Pronunciation', description: 'Spell (alphabetic languages), write (character languages), and pronounce with accuracy.' },
      { strand: 'v', heading: 'Non-verbal Communication', description: 'Use appropriate non-verbal communication techniques.' },
    ],
  },

  "Language Acquisition": {
    A: [
      { strand: 'i', heading: 'Understanding Main Ideas', description: 'Identify basic facts, messages, main ideas, and supporting details.' },
      { strand: 'ii', heading: 'Recognizing Conventions', description: 'Recognize basic conventions.' },
      { strand: 'iii', heading: 'Personal Response', description: 'Engage with spoken/visual text by identifying ideas, opinions, and attitudes.' },
    ],
    B: [
      { strand: 'i', heading: 'Understanding Written Content', description: 'Identify basic facts, messages, main ideas, and supporting details.' },
      { strand: 'ii', heading: 'Recognizing Format and Style', description: 'Recognize format, style, and author s purpose.' },
      { strand: 'iii', heading: 'Personal Response', description: 'Engage with written/visual text by identifying ideas, opinions, and attitudes.' },
    ],
    C: [
      { strand: 'i', heading: 'Appropriate Responses', description: 'Respond appropriately to simple short phrases.' },
      { strand: 'ii', heading: 'Interaction', description: 'Interact in simple and rehearsed exchanges.' },
      { strand: 'iii', heading: 'Expressing Ideas', description: 'Use basic phrases to communicate ideas, feelings, and information.' },
      { strand: 'iv', heading: 'Audience Awareness', description: 'Communicate with a sense of audience.' },
    ],
    D: [
      { strand: 'i', heading: 'Language Use', description: 'Use vocabulary and grammar; clear pronunciation.' },
      { strand: 'ii', heading: 'Organization', description: 'Organize ideas with basic cohesive devices.' },
      { strand: 'iii', heading: 'Contextual Appropriateness', description: 'Use language suited to the context.' },
    ],
  },

  "Individuals and Societies": {
    A: [
      { strand: 'i', heading: 'Terminology Use', description: 'Use a range of terminology in context.' },
      { strand: 'ii', heading: 'Knowledge Application', description: 'Demonstrate subject knowledge and understanding.' },
    ],
    B: [
      { strand: 'i', heading: 'Research Question', description: 'Formulate a clear and focused question.' },
      { strand: 'ii', heading: 'Action Plan', description: 'Follow an action plan to investigate the question.' },
      { strand: 'iii', heading: 'Information Collection', description: 'Collect and record relevant information.' },
      { strand: 'iv', heading: 'Evaluation', description: 'Evaluate the process and findings.' },
    ],
    C: [
      { strand: 'i', heading: 'Communication Style', description: 'Communicate ideas suitable to audience and purpose.' },
      { strand: 'ii', heading: 'Information Structure', description: 'Structure information per task instructions.' },
      { strand: 'iii', heading: 'Referencing', description: 'Cite sources correctly.' },
    ],
    D: [
      { strand: 'i', heading: 'Analysis', description: 'Discuss concepts and models.' },
      { strand: 'ii', heading: 'Evidence Evaluation', description: 'Evaluate source reliability and usefulness.' },
      { strand: 'iii', heading: 'Perspective Analysis', description: 'Analyze perspectives and implications.' },
      { strand: 'iv', heading: 'Synthesis', description: 'Make supported arguments.' },
    ],
  },

  Arts: {
    A: [
      { strand: 'i', heading: 'Art Form Awareness', description: 'Demonstrate understanding of the art form.' },
      { strand: 'ii', heading: 'Contextual Understanding', description: 'Understand art in original/displaced contexts.' },
      { strand: 'iii', heading: 'Artistic Connections', description: 'Connect knowledge to personal artwork.' },
    ],
    B: [
      { strand: 'i', heading: 'Skill Acquisition', description: 'Acquire skills and techniques of the art form.' },
      { strand: 'ii', heading: 'Application of Skills', description: 'Apply skills in creation/performance.' },
    ],
    C: [
      { strand: 'i', heading: 'Artistic Intention', description: 'Develop artistic intent.' },
      { strand: 'ii', heading: 'Creative Exploration', description: 'Explore ideas for artistic realization.' },
      { strand: 'iii', heading: 'Artistic Development', description: 'Show idea development.' },
    ],
    D: [
      { strand: 'i', heading: 'Artistic Connections', description: 'Connect and apply learning.' },
      { strand: 'ii', heading: 'Artistic Inspiration', description: 'Create a response inspired by the world.' },
      { strand: 'iii', heading: 'Evaluation', description: 'Evaluate artwork.' },
    ],
  },

  "Design & Technology": {
    A: [
      { strand: 'i', heading: 'Problem Identification', description: 'Justify need for a solution.' },
      { strand: 'ii', heading: 'Research Planning', description: 'Plan and prioritize research.' },
      { strand: 'iii', heading: 'Existing Product Analysis', description: 'Describe features of an inspirational product.' },
      { strand: 'iv', heading: 'Research Presentation', description: 'Present relevant research.' },
    ],
    B: [
      { strand: 'i', heading: 'Success Criteria', description: 'Develop design specification.' },
      { strand: 'ii', heading: 'Design Ideas', description: 'Develop and communicate feasible ideas.' },
      { strand: 'iii', heading: 'Chosen Design', description: 'Present and justify the selected design.' },
      { strand: 'iv', heading: 'Planning', description: 'Create detailed drawings/requirements.' },
    ],
    C: [
      { strand: 'i', heading: 'Plan Creation', description: 'Make an effective creation plan.' },
      { strand: 'ii', heading: 'Technical Skills', description: 'Use technical skills proficiently.' },
      { strand: 'iii', heading: 'Solution Functionality', description: 'Ensure the solution functions.' },
      { strand: 'iv', heading: 'Solution Presentation', description: 'Justify changes made.' },
      { strand: 'v', heading: 'Solution Evaluation', description: 'Present complete solution.' },
    ],
    D: [
      { strand: 'i', heading: 'Testing Methods', description: 'Design relevant testing methods.' },
      { strand: 'ii', heading: 'Success Evaluation', description: 'Evaluate against the specification.' },
      { strand: 'iii', heading: 'Improvement Suggestions', description: 'Suggest meaningful improvements.' },
      { strand: 'iv', heading: 'Impact Evaluation', description: 'Assess impact on audience/client.' },
    ],
  },
};

export function getStrandsFor(subject: string, criterion: string): StrandInfo[] {
  return strandMap[subject]?.[criterion] ?? [];
}