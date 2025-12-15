import { prisma } from '@/lib/prisma'
import { SurveyForm } from '@/components/survey-form'

export default async function SurveyPage() {
  try {
    const questions = await prisma.question.findMany({
      orderBy: {
        order: 'asc',
      },
    })
    console.log('********');
    console.log(questions);
    console.log('--------');

    if (questions.length === 0) {
      return (
        <div className="container mx-auto py-10">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">アンケート</h1>
            <p className="text-muted-foreground">
              現在、表示できるアンケートがありません。
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className="container mx-auto py-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">アンケート</h1>
          <p className="text-muted-foreground mb-8">
            以下の質問にお答えください。
          </p>
          <SurveyForm questions={questions} />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Failed to load questions:', error)
    return (
      <div className="container mx-auto py-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">エラー</h1>
          <p className="text-destructive">
            アンケートの読み込みに失敗しました。
          </p>
        </div>
      </div>
    )
  }
}
