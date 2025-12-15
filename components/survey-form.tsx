'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Question, QuestionType } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface SurveyFormProps {
  questions: Question[]
}

type AnswerValue = string[] | string

export function SurveyForm({ questions }: SurveyFormProps) {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCheckboxChange = (questionId: number, option: string, checked: boolean) => {
    setAnswers((prev) => {
      const currentAnswers = (prev[questionId] as string[]) || []
      if (checked) {
        return { ...prev, [questionId]: [...currentAnswers, option] }
      } else {
        return {
          ...prev,
          [questionId]: currentAnswers.filter((item) => item !== option),
        }
      }
    })
  }

  const handleTextChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/survey/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit survey')
      }

      // 送信成功後、結果ページへリダイレクト
      router.push('/survey/results')
    } catch (error) {
      console.error('Error submitting survey:', error)
      alert('アンケートの送信に失敗しました。もう一度お試しください。')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {questions.map((question, index) => (
        <Card key={question.id}>
          <CardHeader>
            <CardTitle className="text-lg">
              質問 {index + 1}: {question.text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {question.type === QuestionType.MULTIPLE_CHOICE && question.options && (
              <div className="space-y-3">
                {(question.options as string[]).map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`q${question.id}-${option}`}
                      checked={(answers[question.id] as string[])?.includes(option) || false}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(question.id, option, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`q${question.id}-${option}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            )}

            {question.type === QuestionType.FREE_TEXT && (
              <Textarea
                placeholder="ご自由にお書きください"
                value={(answers[question.id] as string) || ''}
                onChange={(e) => handleTextChange(question.id, e.target.value)}
                rows={4}
              />
            )}
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? '送信中...' : '回答を送信'}
        </Button>
      </div>
    </form>
  )
}
