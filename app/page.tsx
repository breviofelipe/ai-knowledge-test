import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,136,0.1)_0%,rgba(0,0,0,0.5)_50%)] pointer-events-none" />

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="text-center mb-12">
          <div className="mb-2 text-sm font-mono text-emerald-400 tracking-wider">// Bem-vindo ao</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-emerald-400 font-mono">Teste de</span>
            <br />
            <span className="text-emerald-300 font-mono">Conhecimento Tech</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto font-mono">
            Desafie-se com questões de múltipla escolha geradas por IA sobre tecnologia. Teste seu conhecimento,
            acompanhe seu progresso e melhore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login">
              <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-black px-8 py-2 h-auto text-lg font-bold border-2 border-emerald-400">
                Entrar
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="w-full sm:w-auto px-8 py-2 h-auto text-lg bg-transparent border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400/10">
                Criar Conta
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="bg-slate-900/50 border-emerald-500/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-400">
                <span className="text-2xl">⚡</span>
                Escolha os Tópicos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Selecione entre as principais linguagens de programação, cibersegurança, cloud computing e muito mais.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-emerald-500/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-400">
                <span className="text-2xl">🤖</span>
                Gerado por IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                As questões são dinamicamente geradas por IA, garantindo conteúdo fresco e desafiador toda vez.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-emerald-500/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-400">
                <span className="text-2xl">📈</span>
                Acompanhe o Progresso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Monitore seu desempenho, veja resultados detalhados e acompanhe sua melhoria ao longo do tempo.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
