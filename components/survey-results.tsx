'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { QuestionType } from '@prisma/client'

interface MultipleChoiceData {
  option: string
  count: number
  percentage: number
}

interface QuestionResult {
  id: number
  text: string
  type: QuestionType
  totalResponses: number
  data: MultipleChoiceData[] | string[]
}

interface ResultsData {
  results: QuestionResult[]
}

export function SurveyResults() {
  const [results, setResults] = useState<ResultsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await fetch('/api/survey/results')
        if (!response.ok) {
          throw new Error('Failed to fetch results')
        }
        const data = await response.json()
        setResults(data)
      } catch (err) {
        console.error('Error fetching results:', err)
        setError('結果の読み込みに失敗しました')
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">結果を読み込んでいます...</p>
      </div>
    )
  }

  if (error || !results) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">{error || '結果の読み込みに失敗しました'}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">アンケート集計結果</h2>
        <p className="text-muted-foreground">
          回答いただきありがとうございました。以下が全体の集計結果です。
        </p>
      </div>

      {results.results.map((question, index) => (
        <Card key={question.id}>
          <CardHeader>
            <CardTitle className="text-lg">
              質問 {index + 1}: {question.text}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              回答数: {question.totalResponses}件
            </p>
          </CardHeader>
          <CardContent>
            {question.type === QuestionType.MULTIPLE_CHOICE || question.type === QuestionType.SINGLE_CHOICE ? (
              <div className="space-y-4">
                {(question.data as MultipleChoiceData[]).map((item) => (
                  <div key={item.option} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">{item.option}</span>
                      <span className="text-muted-foreground">
                        {item.count}件 ({item.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-6 overflow-hidden">
                      <div
                        className="bg-primary h-full flex items-center justify-end px-2 transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      >
                        {item.percentage > 10 && (
                          <span className="text-xs text-primary-foreground font-medium">
                            {item.percentage}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {question.totalResponses === 0 ? (
                  <p className="text-sm text-muted-foreground">回答がありません</p>
                ) : (
                  <ul className="space-y-2">
                    {(question.data as string[]).map((response, idx) => (
                      <li
                        key={idx}
                        className="text-sm p-3 bg-secondary rounded-md border-l-4 border-primary"
                      >
                        {response || '（未記入）'}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
