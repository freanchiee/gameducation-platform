import type { GameMeta, GameModule } from "./types"

// ── Full flippity.net parity: all 32 activities, fully playable ────────────
// Study & Review
import flashcards from "./flashcards"
import matching from "./matching"
import timeline from "./timeline"
import flexcards from "./flexcards"
import progress from "./progress"
// Quizzes & Assessment
import quizShow from "./quiz-show"
import videoGame from "./video-game"
import cloze from "./cloze"
import certificateQuiz from "./certificate-quiz"
import selfAssessment from "./self-assessment"
// Word Games
import wordSearch from "./word-search"
import wordScramble from "./word-scramble"
import snowman from "./snowman"
import wordmaster from "./wordmaster"
import spelling from "./spelling"
import typingTest from "./typing-test"
import crossword from "./crossword"
// Random & Pickers
import namePicker from "./name-picker"
import randomizer from "./randomizer"
import groupGame from "./group-game"
// Competition
import bingo from "./bingo"
import leaderboard from "./leaderboard"
import tournament from "./tournament"
import boardGame from "./board-game"
import connecto from "./connecto"
import virtualBreakout from "./virtual-breakout"
import badgeTracker from "./badge-tracker"
// Creative
import madlibs from "./madlibs"
import wordCloud from "./word-cloud"
import funWithFonts from "./fun-with-fonts"
import colorByNumber from "./color-by-number"
import manipulatives from "./manipulatives"

export const GAMES: GameModule[] = [
  // Study & Review
  flashcards,
  matching,
  timeline,
  flexcards,
  progress,
  // Quizzes & Assessment
  quizShow,
  videoGame,
  cloze,
  certificateQuiz,
  selfAssessment,
  // Word Games
  wordSearch,
  wordScramble,
  snowman,
  wordmaster,
  spelling,
  typingTest,
  crossword,
  // Random & Pickers
  namePicker,
  randomizer,
  groupGame,
  // Competition
  bingo,
  leaderboard,
  tournament,
  boardGame,
  connecto,
  virtualBreakout,
  badgeTracker,
  // Creative
  madlibs,
  wordCloud,
  funWithFonts,
  colorByNumber,
  manipulatives,
]

// All activities are now live. (Placeholders go here if any are removed later.)
export const SOON: GameMeta[] = []

export const CATALOG: GameMeta[] = [...GAMES, ...SOON]

export function getGame(id: string): GameModule | undefined {
  return GAMES.find((g) => g.id === id)
}

export function getMeta(id: string): GameMeta | undefined {
  return CATALOG.find((g) => g.id === id)
}
