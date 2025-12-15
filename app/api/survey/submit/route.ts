import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers } = body

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    // Submissionを作成
    const submission = await prisma.submission.create({
      data: {},
    })

    // 各回答をAnswerとして保存
    const answerPromises = Object.entries(answers).map(([questionId, value]) => {
      return prisma.answer.create({
        data: {
          submissionId: submission.id,
          questionId: parseInt(questionId, 10),
          value: value as string,
        },
      })
    })

    await Promise.all(answerPromises)

    return NextResponse.json(
      { success: true, submissionId: submission.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error saving survey submission:', error)
    return NextResponse.json(
      { error: 'Failed to save submission' },
      { status: 500 }
    )
  }
}
