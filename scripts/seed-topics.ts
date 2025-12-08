import { connectToDatabase } from "@/lib/mongodb/client"
import { createTopic } from "@/lib/mongodb/services"

const defaultTopics = [
  {
    name: "JavaScript & TypeScript",
    description: "Linguagens fundamentais para desenvolvimento web",
    icon: "⚡",
  },
  {
    name: "Python",
    description: "Linguagem versátil para IA e backend",
    icon: "🐍",
  },
  {
    name: "Java",
    description: "Linguagem robusta para aplicações enterprise",
    icon: "☕",
  },
  {
    name: "C++",
    description: "Programação de sistemas e performance",
    icon: "⚙️",
  },
  {
    name: "Go",
    description: "Linguagem moderna para sistemas distribuídos",
    icon: "🐹",
  },
  {
    name: "Rust",
    description: "Segurança de memória e performance",
    icon: "🦀",
  },
  {
    name: "C#",
    description: "Linguagem para .NET e desenvolvimento Windows",
    icon: "🎯",
  },
  {
    name: "PHP",
    description: "Linguagem popular para desenvolvimento web",
    icon: "🐘",
  },
  {
    name: "Ruby",
    description: "Linguagem elegante para desenvolvimento rápido",
    icon: "💎",
  },
  {
    name: "Kotlin",
    description: "Linguagem moderna para Android",
    icon: "📱",
  },
  {
    name: "Cibersegurança",
    description: "Segurança de informação e proteção de dados",
    icon: "🔐",
  },
  {
    name: "Arquitetura de Projetos",
    description: "Padrões e design de arquitetura de software",
    icon: "🏗️",
  },
  {
    name: "Bancos de Dados",
    description: "SQL, NoSQL e modelagem de dados",
    icon: "🗄️",
  },
  {
    name: "Cloud Computing",
    description: "AWS, Azure, Google Cloud e serverless",
    icon: "☁️",
  },
  {
    name: "Inteligência Artificial",
    description: "Machine Learning, Deep Learning e LLMs",
    icon: "🤖",
  },
  {
    name: "DevOps & Docker",
    description: "Containerização, CI/CD e orquestração",
    icon: "🐳",
  },
]

async function seed() {
  try {
    const { db } = await connectToDatabase()

    // Clear existing topics
    await db.collection("topics").deleteMany({})

    // Insert default topics
    for (const topic of defaultTopics) {
      await createTopic(topic)
    }

    console.log("✅ Inicializadas 16 tópicos padrão com sucesso")
  } catch (error) {
    console.error("❌ Erro ao inicializar tópicos:", error)
    process.exit(1)
  }
}

seed()
