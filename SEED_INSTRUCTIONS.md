# Como Popular os Tópicos no MongoDB

## Opção 1: Usando Node.js (Recomendado)

### Pré-requisitos:
- Node.js 16+ instalado
- Variáveis de ambiente configuradas

### Passos:

1. **Configure o arquivo `.env.local`** com:
\`\`\`
MONGODB_URI=sua_uri_mongodb
MONGODB_DATABASE=tech_quiz
\`\`\`

2. **Execute o script:**
\`\`\`bash
node scripts/seed-topics.js
\`\`\`

O script irá:
- ✅ Conectar ao MongoDB
- 🗑️ Remover tópicos antigos (se existirem)
- ✅ Inserir 16 novos tópicos com emojis e descrições
- 📚 Listar todos os tópicos inseridos

### Output esperado:
\`\`\`
✅ Conectado ao MongoDB
🗑️  Tópicos antigos removidos
✅ 16 tópicos inseridos com sucesso!

📚 Tópicos disponíveis:
1. 🚀 JavaScript
2. 🐍 Python
3. ☕ Java
...
\`\`\`

## Opção 2: Usando MongoDB Compass ou Atlas

1. Abra MongoDB Compass ou o painel Atlas
2. Acesse o banco de dados `tech_quiz`
3. Crie a coleção `topics`
4. Importe o JSON abaixo:

\`\`\`json
[
  { "name": "JavaScript", "description": "Linguagem de programação web moderna", "icon": "🚀" },
  { "name": "Python", "description": "Linguagem versátil e poderosa", "icon": "🐍" },
  { "name": "Java", "description": "Linguagem de programação orientada a objetos", "icon": "☕" },
  { "name": "C++", "description": "Linguagem de alto desempenho", "icon": "⚙️" },
  { "name": "Go", "description": "Linguagem moderna para sistemas concorrentes", "icon": "🔵" },
  { "name": "Rust", "description": "Linguagem segura e rápida", "icon": "🦀" },
  { "name": "C#", "description": "Linguagem da plataforma .NET", "icon": "#️⃣" },
  { "name": "PHP", "description": "Linguagem backend para web", "icon": "🐘" },
  { "name": "Ruby", "description": "Linguagem elegante e expressiva", "icon": "💎" },
  { "name": "Kotlin", "description": "Linguagem moderna para Android", "icon": "📱" },
  { "name": "Cibersegurança", "description": "Proteção de dados e sistemas", "icon": "🔐" },
  { "name": "Arquitetura de Projetos", "description": "Padrões e design de software", "icon": "🏗️" },
  { "name": "Bancos de Dados", "description": "SQL, NoSQL e sistemas de persistência", "icon": "🗄️" },
  { "name": "Cloud Computing", "description": "AWS, Azure, Google Cloud e mais", "icon": "☁️" },
  { "name": "DevOps & Docker", "description": "Containerização e CI/CD", "icon": "🐳" },
  { "name": "Inteligência Artificial", "description": "Machine Learning, Deep Learning e LLMs", "icon": "🤖" }
]
\`\`\`

## Verificação

Após o seed, teste a funcionalidade:

1. Acesse a página de Dashboard
2. Você deve ver os 16 tópicos disponíveis
3. Selecione um tópico e clique em "Iniciar Teste"
4. O sistema gerará perguntas sobre o tema escolhido

Se não aparecer nenhum tópico, verifique:
- ✅ MongoDB está rodando
- ✅ `MONGODB_URI` está correto
- ✅ Banco de dados `tech_quiz` existe
- ✅ Coleção `topics` foi criada
