"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface Topic {
  _id?: string
  name: string
  description: string
  icon: string
}

interface Stats {
  totalTests: number
  averageScore: number
  totalQuestionsAnswered: number
  topicStats: Record<string, { attempts: number; averageScore: number }>
}

export default function DashboardClient({
  user,
  stats,
}: {
  user: any
  stats: Stats
}) {
  const [topics, setTopics] = useState<Topic[]>([])
  const [selectedTopic, setSelectedTopic] = useState<string>("")
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/api/topics")
        if (!response.ok) throw new Error("Falha ao buscar tópicos")
        const data = await response.json()
        setTopics(data.topics)
        console.log("[v0] Topics loaded:", data.topics)
      } catch (error) {
        console.error("[v0] Error fetching topics:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTopics()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  const handleStartQuiz = () => {
    if (selectedTopic) {
      router.push(`/quiz?topic=${encodeURIComponent(selectedTopic)}&difficulty=${difficulty}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black">
      <nav className="border-b border-emerald-500/30 bg-slate-900/80 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-emerald-400 font-mono">$ Teste de Conhecimento</h1>
          <div className="flex items-center gap-4">
            <span className="text-emerald-300 text-sm font-mono">{user?.email}</span>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-red-400 border-red-500/30 hover:bg-red-500/10 bg-transparent"
            >
              Sair
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-slate-900/50 border-emerald-500/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-400">Total de Testes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-400">{stats.totalTests}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-emerald-500/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-400">Pontuação Média</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-400">
                {stats.averageScore > 0 ? stats.averageScore.toFixed(1) : 0}%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-emerald-500/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-400">Questões Respondidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-400">{stats.totalQuestionsAnswered}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-900/50 border-emerald-500/30 backdrop-blur mb-12">
          <CardHeader>
            <CardTitle className="text-emerald-400">Iniciar um Novo Teste</CardTitle>
            <CardDescription className="text-slate-400">Escolha um tópico e nível de dificuldade</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-emerald-300 block mb-3">Selecione o Tópico</label>
              {loading ? (
                <div className="text-slate-400 text-center py-8">Carregando tópicos...</div>
              ) : topics.length === 0 ? (
                <div className="text-yellow-400 text-center py-8">
                  Nenhum tópico disponível. Execute o seed primeiro.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {topics.map((topic) => (
                    <button
                      key={topic._id}
                      onClick={() => setSelectedTopic(topic.name)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedTopic === topic.name
                          ? "border-emerald-400 bg-emerald-400/10"
                          : "border-slate-600 hover:border-emerald-400/50"
                      }`}
                    >
                      <div className="text-2xl mb-2">{topic.icon}</div>
                      <div className="font-medium text-sm text-emerald-100">{topic.name}</div>
                      <div className="text-xs text-slate-400 mt-1">{topic.description}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-emerald-300 block mb-3">Nível de Dificuldade</label>
              <div className="flex gap-3">
                {(["easy", "medium", "hard"] as const).map((level) => {
                  const levelNames: Record<string, string> = {
                    easy: "Fácil",
                    medium: "Médio",
                    hard: "Difícil",
                  }
                  return (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        difficulty === level
                          ? "border-emerald-400 bg-emerald-400/10 text-emerald-400"
                          : "border-slate-600 text-slate-300 hover:border-emerald-400/50"
                      }`}
                    >
                      {levelNames[level]}
                    </button>
                  )
                })}
              </div>
            </div>

            <Button
              onClick={handleStartQuiz}
              disabled={!selectedTopic}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-black py-2 h-auto text-lg font-bold"
            >
              Iniciar Teste
            </Button>
          </CardContent>
        </Card>

        {Object.keys(stats.topicStats).length > 0 && (
          <Card className="bg-slate-900/50 border-emerald-500/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-emerald-400">Seu Desempenho por Tópico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(stats.topicStats).map(([topic, data]) => (
                  <div
                    key={topic}
                    className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-emerald-500/20"
                  >
                    <div>
                      <div className="font-medium text-emerald-300">{topic}</div>
                      <div className="text-sm text-slate-400">
                        {data.attempts} teste{data.attempts !== 1 ? "s" : ""} concluído{data.attempts !== 1 ? "s" : ""}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-400">{data.averageScore.toFixed(1)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
