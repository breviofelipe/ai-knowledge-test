# Tech Knowledge Test - Setup Guide

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (for authentication)
- MongoDB Atlas account or local MongoDB (for data persistence)
- OpenAI API key (for question generation)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Supabase Configuration
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

### MongoDB Configuration
\`\`\`
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DATABASE=tech_knowledge_test
\`\`\`

### AI/OpenAI Configuration
\`\`\`
OPENAI_API_KEY=your_openai_api_key
\`\`\`

## Database Setup

### MongoDB Collections

The app automatically creates the following collections:

1. **topics** - Available quiz topics
   \`\`\`typescript
   {
     name: string;
     description: string;
     icon: string;
   }
   \`\`\`

2. **questions** - Quiz questions
   \`\`\`typescript
   {
     topic: string;
     question: string;
     options: string[];
     correctAnswer: string;
     explanation: string;
     difficulty: 'easy' | 'medium' | 'hard';
     createdAt: Date;
   }
   \`\`\`

3. **quiz_results** - User quiz results
   \`\`\`typescript
   {
     userId: string;
     topic: string;
     score: number;
     totalQuestions: number;
     answers: { questionId, selectedAnswer, isCorrect }[];
     startedAt: Date;
     completedAt: Date;
     timeSpent: number; // in seconds
   }
   \`\`\`

4. **user_profiles** - User account information
   \`\`\`typescript
   {
     userId: string;
     email: string;
     displayName: string;
     totalTests: number;
     averageScore: number;
     favoriteTopics: string[];
     createdAt: Date;
     updatedAt: Date;
   }
   \`\`\`

## Installation Steps

1. **Clone and install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Set up environment variables**
   - Copy the environment variables listed above to `.env.local`

3. **Seed default topics** (optional)
   \`\`\`bash
   npm run seed-topics
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Access the application**
   - Open http://localhost:3000 in your browser

## API Routes

- **POST /api/generate-quiz** - Generate AI-powered quiz questions
  - Body: `{ topic: string, difficulty: 'easy' | 'medium' | 'hard', numberOfQuestions: number }`
  - Returns: Array of quiz questions

- **POST /api/save-quiz-result** - Save quiz completion result
  - Body: Quiz result data with user answers
  - Returns: Result ID

## Supabase Setup (Authentication)

1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Enable email/password authentication
4. Copy your project URL and anon key to .env.local
5. Optionally, set `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` for development email redirects

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create a database user
4. Copy the connection string to `MONGODB_URI` in .env.local
5. Create a new database named `tech_knowledge_test`

## OpenAI Setup

1. Get an API key from https://platform.openai.com/api-keys
2. Add it to `OPENAI_API_KEY` in .env.local

## Features

✅ User Authentication (Supabase)
✅ AI-Generated Quiz Questions (OpenAI)
✅ Multiple Difficulty Levels
✅ Progress Tracking
✅ Topic Selection
✅ Detailed Results
✅ User Statistics
✅ Data Persistence (MongoDB)

## Architecture

- **Frontend**: Next.js 16 with React 19
- **Authentication**: Supabase Auth
- **Database**: MongoDB for quiz data and results
- **AI Integration**: Vercel AI SDK with OpenAI
- **Styling**: Tailwind CSS with shadcn/ui components

## Support

For issues or questions, refer to:
- Supabase Docs: https://supabase.com/docs
- MongoDB Docs: https://docs.mongodb.com
- OpenAI Docs: https://platform.openai.com/docs
- Next.js Docs: https://nextjs.org/docs
`
