import { generateText } from "ai"
import type { Question } from "../mongodb/models"

import { sendMessageToDeepSeek } from "./deepseek";

interface GenerateQuizOptions {
  topic: string
  difficulty?: "easy" | "medium" | "hard"
  numberOfQuestions?: number
  languege?: string
}

export async function generateQuizQuestions(options: GenerateQuizOptions): Promise<Question[]> {
  const { topic, difficulty = "medium", numberOfQuestions = 5, languege = "Português do Brasil" } = options

  const prompt = `Gere ${numberOfQuestions} questões de múltipla escolha sobre "${topic}" no nível de dificuldade ${difficulty}.

Formate sua resposta como um array JSON com esta estrutura para cada questão:
[
  {
    "question": "Texto da questão aqui?",
    "options": ["Opção A", "Opção B", "Opção C", "Opção D"],
    "correctAnswer": "O texto da opção correta",
    "explanation": "Por que esta é a resposta correta"
  }
]

Requisitos:
- Cada questão deve ter exatamente 4 opções
- A correctAnswer deve ser uma das opções
- As explicações devem ser educativas e concisas
- As questões devem ser relevantes e desafiadoras para o nível "${difficulty}"
- Retorne APENAS um array JSON válido, sem texto adicional
Responda em ${languege}.`

  try {
    const { message } = await sendMessageToDeepSeek(prompt);
    //  generateText({
    //   model: "openai/gpt-4-mini",
    //   prompt,
    //   temperature: 0.7,
    // })

    // console.log("text",message);
    // const jsonMatch = text.match(/\[[\s\S]*\]/)
    // if (!jsonMatch) {
    //   console.error("[v0] Failed to extract JSON from AI response:", text)
    //   throw new Error("Invalid response format from AI")
    // }

    const parsedQuestions = JSON.parse(message.content)

    return parsedQuestions.map((q: any) => ({
      topic,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      difficulty,
      createdAt: new Date(),
    }))
  } catch (error) {
    console.error("[v0] Error generating quiz questions:", error)
    throw error
  }
}
