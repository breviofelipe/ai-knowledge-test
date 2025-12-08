export interface QuizTopic {
  _id?: string
  name: string
  description: string
  icon: string
}

export interface Question {
  _id?: string
  topic: string
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  createdAt: Date
}

export interface QuizResult {
  _id?: string
  userId: string
  topic: string
  score: number
  totalQuestions: number
  answers: {
    questionId: string
    selectedAnswer: string
    isCorrect: boolean
  }[]
  startedAt: Date
  completedAt: Date
  timeSpent: number // in seconds
}

export interface UserProfile {
  _id?: string
  userId: string
  email: string
  displayName: string
  totalTests: number
  averageScore: number
  favoriteTopics: string[]
  createdAt: Date
  updatedAt: Date
}
