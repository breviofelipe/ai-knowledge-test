import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getTopics, getUserStats } from "@/lib/mongodb/services"
import DashboardClient from "@/components/dashboard-client"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // const topics = await getTopics()
  // topics={topics}
  const userStats = await getUserStats(user.id)

  return <DashboardClient user={user}  stats={userStats} />
}
