import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="min-h-screen p-8 flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Survey System</h1>
        <p className="text-xl text-muted-foreground">アンケートシステム</p>
        <div className="pt-4">
          <Link href="/survey">
            <Button size="lg">アンケートに回答する</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
