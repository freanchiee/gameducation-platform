// Game-Based Learning framework — flippity.net-style activities.
//
// Every activity is a self-contained "module": metadata + a sample dataset + a
// parser (tabular rows -> typed data) + a React component. The registry lists
// them; the gallery renders the catalog; /your-games/play/[type] renders one.
//
// Activities run entirely on inline data (the built-in sample or data the user
// pastes), so they work with no Google account. A Google Sheet is an optional
// data source via /api/sheets.
import type { ComponentType } from "react"

/** Raw tabular data: rows of string cells (header row first, like a sheet). */
export type Rows = string[][]

export type GameCategory =
  | "Study & Review"
  | "Quizzes & Assessment"
  | "Word Games"
  | "Random & Pickers"
  | "Competition"
  | "Creative"

/** Catalog metadata shown in the gallery (shared by ready + upcoming games). */
export interface GameMeta {
  /** URL slug, e.g. "quiz-show". */
  id: string
  name: string
  /** One-line description for the gallery card. */
  blurb: string
  /** Emoji icon. */
  icon: string
  category: GameCategory
  /** Hex accent colour. */
  accent: string
  status: "ready" | "soon"
  /** Human description of the expected sheet/paste columns. */
  schemaHint?: string
}

/** A fully-playable activity. `T` is the activity's parsed data shape.
 *  The boundary generic defaults to `any` so heterogeneous modules can live in
 *  one `GameModule[]` registry (component props are contravariant); each module
 *  file still defines and uses its own concrete `T` internally. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface GameModule<T = any> extends GameMeta {
  status: "ready"
  schemaHint: string
  /** Ready-to-render demo data (used by default and the "Use sample" button). */
  sample: T
  /** Build the activity's data from pasted/sheet rows (row 0 is the header). */
  parse: (rows: Rows) => T
  Component: ComponentType<{ data: T }>
}

/** Identity helper so a module file keeps its own strong typing. */
export function defineGame<T>(mod: GameModule<T>): GameModule<T> {
  return mod
}
