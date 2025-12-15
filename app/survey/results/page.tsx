import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SurveyResults } from '@/components/survey-results'

export default function ResultsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <SurveyResults />

        <div className="mt-8 flex justify-center">
          <Link href="/">
            <Button variant="outline">トップページに戻る</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
