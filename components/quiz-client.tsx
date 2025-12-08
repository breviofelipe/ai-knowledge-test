"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

interface Answer {
  questionId: string
  selectedAnswer: string
  isCorrect: boolean
}

export default function QuizClient({
  user,
  topic,
  difficulty,
}: {
  user: any
  topic: string
  difficulty: "easy" | "medium" | "hard"
}) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [startTime] = useState(Date.now())
  const router = useRouter()

  useEffect(() => {
    const generateQuiz = async () => {
      try {
        const response = await fetch("/api/generate-quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, difficulty, numberOfQuestions: 10 }),
        })

        if (!response.ok) {
          throw new Error("Falha ao gerar o teste")
        }

        const data = await response.json()
        setQuestions(data.questions)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ocorreu um erro")
      } finally {
        setIsLoading(false)
      }
    }

    generateQuiz()
  }, [topic, difficulty])

  const handleAnswerSelect = (option: string) => {
    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = option === currentQuestion.correctAnswer

    const newAnswers = selectedAnswers.filter((a) => a.questionId !== currentQuestion.id)
    newAnswers.push({
      questionId: currentQuestion.id,
      selectedAnswer: option,
      isCorrect,
    })
    setSelectedAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true)
    try {
      const score = selectedAnswers.filter((a) => a.isCorrect).length

      const response = await fetch("/api/save-quiz-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          topic,
          score,
          totalQuestions: questions.length,
          answers: selectedAnswers,
          timeSpent: Math.floor((Date.now() - startTime) / 1000),
        }),
      })

      if (!response.ok) {
        throw new Error("Falha ao salvar o resultado do teste")
      }

      setShowResults(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao enviar o teste")
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentQuestion = questions[currentQuestionIndex]
  const currentAnswer = selectedAnswers.find((a) => a.questionId === currentQuestion?.id)
  const score = selectedAnswers.filter((a) => a.isCorrect).length

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
          <p className="text-slate-300 font-mono">Gerando questões do teste...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black flex items-center justify-center">
        <Card className="max-w-md bg-slate-900 border-emerald-500/30">
          <CardHeader>
            <CardTitle className="text-red-400">Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-4">{error}</p>
            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-black font-bold"
            >
              Voltar ao Painel
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100)
    const feedbackMessage =
      percentage >= 80
        ? "Excelente! Você tem um forte conhecimento deste tópico."
        : percentage >= 60
          ? "Bom esforço! Continue praticando para melhorar."
          : "Continue estudando este tópico para fortalecer seu conhecimento."

    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-slate-900 border-emerald-500/30">
          <CardHeader>
            <CardTitle className="text-center text-emerald-400">Teste Concluído</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <div className="text-5xl font-bold text-emerald-400 mb-2">{percentage}%</div>
              <p className="text-slate-300 text-lg">
                Você acertou {score} de {questions.length}
              </p>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border border-emerald-500/20">
              <p className="text-sm text-slate-300">{feedbackMessage}</p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => router.push("/dashboard")}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-black font-bold"
              >
                Voltar ao Painel
              </Button>
              <Button
                onClick={() => router.push("/dashboard")}
                variant="outline"
                className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-400/10"
              >
                Fazer Outro Teste
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!currentQuestion) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black">
      <nav className="border-b border-emerald-500/30 bg-slate-900/80 backdrop-blur p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-emerald-400 font-mono">{topic}</h1>
          <span className="text-sm text-emerald-300 font-mono">
            Questão {currentQuestionIndex + 1} de {questions.length}
          </span>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto bg-slate-900/50 border-emerald-500/30 backdrop-blur">
          <CardHeader>
            <div className="w-full bg-slate-700 rounded-full h-2 mb-6">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
            <CardTitle className="text-xl text-emerald-100">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    currentAnswer?.selectedAnswer === option
                      ? "border-emerald-400 bg-emerald-400/10"
                      : "border-slate-600 hover:border-emerald-400/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        currentAnswer?.selectedAnswer === option
                          ? "border-emerald-400 bg-emerald-400"
                          : "border-slate-500"
                      }`}
                    >
                      {currentAnswer?.selectedAnswer === option && <div className="w-2 h-2 bg-black rounded-full" />}
                    </div>
                    <span className="text-slate-100">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3 pt-6 border-t border-slate-700">
              <Button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                className="flex-1 bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                Anterior
              </Button>

              {currentQuestionIndex < questions.length - 1 ? (
                <Button
                  onClick={handleNextQuestion}
                  disabled={!currentAnswer}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-black font-bold"
                >
                  Próxima
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitQuiz}
                  disabled={isSubmitting || selectedAnswers.length < questions.length}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Teste"}
                </Button>
              )}
            </div>

            <div className="text-center text-sm text-slate-400 font-mono">
              Respondidas: {selectedAnswers.length} de {questions.length}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
