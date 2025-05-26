import { useState } from 'react'
import { ADVANCED_CONFIG } from '../config/advanced'

interface Suggestion {
  type: 'grammar' | 'tone' | 'clarity'
  text: string
  suggestion: string
  confidence: number
}

interface WritingAnalysis {
  suggestions: Suggestion[]
  overallScore: number
  toneAnalysis: {
    formality: number
    positivity: number
    confidence: number
  }
}

export const AIWritingAssistant = () => {
  const [text, setText] = useState('')
  const [analysis, setAnalysis] = useState<WritingAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const analyzeText = async () => {
    if (!text.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch(`${ADVANCED_CONFIG.OPENAI_API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADVANCED_CONFIG.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a writing assistant that helps improve text clarity, grammar, and tone. Provide specific suggestions and analysis.'
            },
            {
              role: 'user',
              content: `Analyze this text and provide suggestions for improvement: ${text}`
            }
          ]
        })
      })

      const data = await response.json()
      const suggestions = parseOpenAIResponse(data.choices[0].message.content)
      setAnalysis(suggestions)
    } catch (error) {
      console.error('Error analyzing text:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const parseOpenAIResponse = (_response: string): WritingAnalysis => {
    // Implementation
    return {
      suggestions: [],
      overallScore: 0,
      toneAnalysis: {
        formality: 0,
        positivity: 0,
        confidence: 0
      }
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg writing-assistant">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        AI Writing Assistant
      </h2>

      <div className="mb-6">
        <textarea
          className="w-full p-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows={6}
          placeholder="Enter your text here for analysis..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={analyzeText}
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Text'}
        </button>
      </div>

      {analysis && (
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Overall Score: {analysis.overallScore}%
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Formality</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${analysis.toneAnalysis.formality * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Positivity</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${analysis.toneAnalysis.positivity * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Confidence</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: `${analysis.toneAnalysis.confidence * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Suggestions
            </h3>
            <div className="space-y-4">
              {analysis.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-start">
                    <span className="text-lg mr-2">
                      {suggestion.type === 'grammar' ? '📝' :
                       suggestion.type === 'tone' ? '🎯' : '💡'}
                    </span>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {suggestion.text}
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {suggestion.suggestion}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 