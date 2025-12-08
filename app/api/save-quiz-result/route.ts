import { saveQuizResult } from "@/lib/mongodb/services"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userId, topic, score, totalQuestions, answers, timeSpent } = await request.json()

    if (!userId || !topic || typeof score !== "number") {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
    }

    // Save quiz result
    const resultId = await saveQuizResult({
      userId,
      topic,
      score,
      totalQuestions,
      answers,
      startedAt: new Date(Date.now() - timeSpent * 1000),
      completedAt: new Date(),
      timeSpent,
    })

    return NextResponse.json({
      success: true,
      resultId,
    })
  } catch (error) {
    console.error("[v0] Error saving quiz result:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save quiz result" },
      { status: 500 },
    )
  }
}
