import { getTopics } from "@/lib/mongodb/services"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(_request: NextRequest) {
  try {
    const topics = await getTopics()
    return NextResponse.json({ topics })
  } catch (error) {
    console.error("[v0] Error fetching topics:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch topics" },
      { status: 500 },
    )
  }
}
