import { connectToDatabase } from "./client"
import type { Question, QuizResult, QuizTopic, UserProfile } from "./models"

// Topic Services
export async function getTopics(): Promise<QuizTopic[]> {
  const { db } = await connectToDatabase()
  return await db.collection<QuizTopic>("topics").find({}).toArray()
}

export async function createTopic(topic: QuizTopic): Promise<QuizTopic> {
  const { db } = await connectToDatabase()
  const result = await db.collection<QuizTopic>("topics").insertOne(topic)
  return { ...topic, _id: result.insertedId.toString() }
}

// Question Services
export async function getQuestionsByTopic(topic: string, limit = 10): Promise<Question[]> {
  const { db } = await connectToDatabase()
  return await db.collection<Question>("questions").find({ topic }).limit(limit).toArray()
}

export async function saveQuestion(question: Question): Promise<Question> {
  const { db } = await connectToDatabase()
  const result = await db.collection<Question>("questions").insertOne(question)
  return { ...question, _id: result.insertedId.toString() }
}

export async function bulkSaveQuestions(questions: Question[]): Promise<void> {
  const { db } = await connectToDatabase()
  if (questions.length > 0) {
    await db.collection<Question>("questions").insertMany(questions)
  }
}

// Quiz Result Services
export async function saveQuizResult(result: QuizResult): Promise<string> {
  const { db } = await connectToDatabase()
  const res = await db.collection<QuizResult>("quiz_results").insertOne(result)
  return res.insertedId.toString()
}

export async function getUserQuizResults(userId: string): Promise<QuizResult[]> {
  const { db } = await connectToDatabase()
  return await db.collection<QuizResult>("quiz_results").find({ userId }).sort({ completedAt: -1 }).toArray()
}

export async function getTopicResults(userId: string, topic: string): Promise<QuizResult[]> {
  const { db } = await connectToDatabase()
  return await db.collection<QuizResult>("quiz_results").find({ userId, topic }).sort({ completedAt: -1 }).toArray()
}

export async function getUserStats(userId: string) {
  const { db } = await connectToDatabase()
  const results = await db.collection<QuizResult>("quiz_results").find({ userId }).toArray()

  if (results.length === 0) {
    return {
      totalTests: 0,
      averageScore: 0,
      totalQuestionsAnswered: 0,
      topicStats: {},
    }
  }

  const totalTests = results.length
  const averageScore = results.reduce((sum, r) => sum + (r.score / r.totalQuestions) * 100, 0) / totalTests
  const totalQuestionsAnswered = results.reduce((sum, r) => sum + r.totalQuestions, 0)

  const topicStats: Record<string, { attempts: number; averageScore: number }> = {}
  results.forEach((result) => {
    if (!topicStats[result.topic]) {
      topicStats[result.topic] = { attempts: 0, averageScore: 0 }
    }
    topicStats[result.topic].attempts += 1
    topicStats[result.topic].averageScore += (result.score / result.totalQuestions) * 100
  })

  Object.keys(topicStats).forEach((topic) => {
    topicStats[topic].averageScore /= topicStats[topic].attempts
  })

  return {
    totalTests,
    averageScore,
    totalQuestionsAnswered,
    topicStats,
  }
}

// User Profile Services
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { db } = await connectToDatabase()
  return await db.collection<UserProfile>("user_profiles").findOne({ userId })
}

export async function createUserProfile(profile: UserProfile): Promise<string> {
  const { db } = await connectToDatabase()
  const result = await db.collection<UserProfile>("user_profiles").insertOne(profile)
  return result.insertedId.toString()
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
  const { db } = await connectToDatabase()
  await db
    .collection<UserProfile>("user_profiles")
    .updateOne({ userId }, { $set: { ...updates, updatedAt: new Date() } })
}

export async function addFavoriteTopic(userId: string, topic: string): Promise<void> {
  const { db } = await connectToDatabase()
  await db
    .collection<UserProfile>("user_profiles")
    .updateOne({ userId }, { $addToSet: { favoriteTopics: topic }, $set: { updatedAt: new Date() } })
}
