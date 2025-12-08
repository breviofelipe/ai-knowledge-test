// Script para popular os tópicos no MongoDB
// Execute com: node scripts/seed-topics.js


const { MongoClient } = require("mongodb")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://dev:sZ5wFkrx7K9S1ETc@cluster0.i1ar1c6.mongodb.net/"
const DATABASE_NAME = process.env.MONGODB_DATABASE || "tech_knowledge_test"

const topics = [
  // 10 Principais Linguagens de Programação
  {
    name: "JavaScript",
    description: "Linguagem de programação web moderna",
    icon: "🚀",
  },
  {
    name: "Python",
    description: "Linguagem versátil e poderosa",
    icon: "🐍",
  },
  {
    name: "Java",
    description: "Linguagem de programação orientada a objetos",
    icon: "☕",
  },
  {
    name: "C++",
    description: "Linguagem de alto desempenho",
    icon: "⚙️",
  },
  {
    name: "Go",
    description: "Linguagem moderna para sistemas concorrentes",
    icon: "🔵",
  },
  {
    name: "Rust",
    description: "Linguagem segura e rápida",
    icon: "🦀",
  },
  {
    name: "C#",
    description: "Linguagem da plataforma .NET",
    icon: "#️⃣",
  },
  {
    name: "PHP",
    description: "Linguagem backend para web",
    icon: "🐘",
  },
  {
    name: "Ruby",
    description: "Linguagem elegante e expressiva",
    icon: "💎",
  },
  {
    name: "Kotlin",
    description: "Linguagem moderna para Android",
    icon: "📱",
  },
  // Tópicos Adicionais
  {
    name: "Cibersegurança",
    description: "Proteção de dados e sistemas",
    icon: "🔐",
  },
  {
    name: "Arquitetura de Projetos",
    description: "Padrões e design de software",
    icon: "🏗️",
  },
  {
    name: "Bancos de Dados",
    description: "SQL, NoSQL e sistemas de persistência",
    icon: "🗄️",
  },
  {
    name: "Cloud Computing",
    description: "AWS, Azure, Google Cloud e mais",
    icon: "☁️",
  },
  {
    name: "DevOps & Docker",
    description: "Containerização e CI/CD",
    icon: "🐳",
  },
  {
    name: "Inteligência Artificial",
    description: "Machine Learning, Deep Learning e LLMs",
    icon: "🤖",
  },
]

async function seedTopics() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("✅ Conectado ao MongoDB")

    const db = client.db(DATABASE_NAME)
    const topicsCollection = db.collection("topics")

    // Limpar tópicos existentes
    await topicsCollection.deleteMany({})
    console.log("🗑️  Tópicos antigos removidos")

    // Inserir novos tópicos
    const result = await topicsCollection.insertMany(topics)
    console.log(`✅ ${result.insertedCount} tópicos inseridos com sucesso!`)

    // Listar tópicos inseridos
    const insertedTopics = await topicsCollection.find({}).toArray()
    console.log("\n📚 Tópicos disponíveis:")
    insertedTopics.forEach((topic, index) => {
      console.log(`${index + 1}. ${topic.icon} ${topic.name}`)
    })

    console.log("\n✨ Seed concluído com sucesso!")
  } catch (error) {
    console.error("❌ Erro ao fazer seed:", error)
    process.exit(1)
  } finally {
    await client.close()
  }
}

seedTopics()
