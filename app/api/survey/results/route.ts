import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { QuestionType } from '@prisma/client'

export async function GET() {
  try {
    // すべての質問を取得
    const questions = await prisma.question.findMany({
      orderBy: {
        order: 'asc',
      },
      include: {
        answers: true,
      },
    })

    // 各質問の結果を集計
    const results = questions.map((question) => {
      if (question.type === QuestionType.MULTIPLE_CHOICE) {
        // 複数選択の場合：各選択肢の集計
        const options = question.options as string[]
        const counts: Record<string, number> = {}

        // 初期化
        options.forEach((option) => {
          counts[option] = 0
        })

        // 集計
        question.answers.forEach((answer) => {
          const selectedOptions = answer.value as string[]
          selectedOptions.forEach((option) => {
            if (counts[option] !== undefined) {
              counts[option]++
            }
          })
        })

        return {
          id: question.id,
          text: question.text,
          type: question.type,
          totalResponses: question.answers.length,
          data: Object.entries(counts).map(([option, count]) => ({
            option,
            count,
            percentage: question.answers.length > 0
              ? Math.round((count / question.answers.length) * 100)
              : 0,
          })),
        }
      } else {
        // 自由記述の場合：すべての回答をリスト化
        const responses = question.answers.map((answer) => answer.value as string)

        return {
          id: question.id,
          text: question.text,
          type: question.type,
          totalResponses: question.answers.length,
          data: responses,
        }
      }
    })

    return NextResponse.json({ results }, { status: 200 })
  } catch (error) {
    console.error('Error fetching survey results:', error)
    return NextResponse.json(
      { error: 'Failed to fetch results' },
      { status: 500 }
    )
  }
}
