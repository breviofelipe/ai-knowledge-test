import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import QuizClient from "@/components/quiz-client"

export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; difficulty?: string }>
}) {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  const params = await searchParams
  const topic = params.topic || ""
  const difficulty = (params.difficulty as "easy" | "medium" | "hard") || "medium"

  if (!topic) {
    redirect("/dashboard")
  }

  return <QuizClient user={user} topic={topic} difficulty={difficulty} />
}
