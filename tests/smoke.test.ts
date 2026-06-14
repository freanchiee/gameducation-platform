import { describe, expect, it } from "vitest"

import { cn } from "@/lib/utils"

describe("phase 0 smoke", () => {
  it("cn merges classes and resolves tailwind conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4")
    expect(cn("text-sm", false && "hidden", "font-medium")).toBe(
      "text-sm font-medium",
    )
  })
})
