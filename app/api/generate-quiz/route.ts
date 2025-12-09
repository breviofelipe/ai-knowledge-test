import { generateQuizQuestions } from "@/lib/ai/quiz-generator"
import { getQuestionsByTopic, bulkSaveQuestions } from "@/lib/mongodb/services"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { topic, difficulty, numberOfQuestions } = await request.json()

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 })
    }

    // Always generate new questions
    const generatedQuestions = await generateQuizQuestions({
      topic,
      difficulty: difficulty || "medium",
      numberOfQuestions,
    })

    // Save generated questions to MongoDB
    if (generatedQuestions.length > 0) {
      await bulkSaveQuestions(generatedQuestions)
    }

    // Format questions for client
    const formattedQuestions = generatedQuestions.map((q, index) => ({
      id: `${index}`,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
    }))

    return NextResponse.json({ questions: formattedQuestions })
  } catch (error) {
    console.error("[v0] Error in generate-quiz:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate quiz" },
      { status: 500 },
    )
  }
}
