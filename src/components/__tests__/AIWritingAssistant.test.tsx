import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AIWritingAssistant } from '../AIWritingAssistant'

describe('AIWritingAssistant', () => {
  beforeEach(() => {
    // Mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            choices: [
              {
                message: {
                  content: JSON.stringify({
                    suggestions: [
                      {
                        type: 'grammar',
                        text: 'Example grammar issue',
                        suggestion: 'Consider using active voice',
                        confidence: 0.9
                      }
                    ],
                    overallScore: 85,
                    toneAnalysis: {
                      formality: 0.8,
                      positivity: 0.7,
                      confidence: 0.9
                    }
                  })
                }
              }
            ]
          })
      })
    ) as jest.Mock
  })

  it('renders the component', () => {
    render(<AIWritingAssistant />)
    expect(screen.getByText('AI Writing Assistant')).toBeInTheDocument()
  })

  it('allows text input', async () => {
    render(<AIWritingAssistant />)
    const textarea = screen.getByPlaceholderText('Enter your text here for analysis...')
    await userEvent.type(textarea, 'Test text')
    expect(textarea).toHaveValue('Test text')
  })

  it('analyzes text when button is clicked', async () => {
    render(<AIWritingAssistant />)
    const textarea = screen.getByPlaceholderText('Enter your text here for analysis...')
    const analyzeButton = screen.getByText('Analyze Text')

    await userEvent.type(textarea, 'Test text')
    fireEvent.click(analyzeButton)

    await waitFor(() => {
      expect(screen.getByText('Overall Score: 85%')).toBeInTheDocument()
    })
  })

  it('shows loading state during analysis', async () => {
    render(<AIWritingAssistant />)
    const textarea = screen.getByPlaceholderText('Enter your text here for analysis...')
    const analyzeButton = screen.getByText('Analyze Text')

    await userEvent.type(textarea, 'Test text')
    fireEvent.click(analyzeButton)

    expect(screen.getByText('Analyzing...')).toBeInTheDocument()
  })

  it('displays suggestions after analysis', async () => {
    render(<AIWritingAssistant />)
    const textarea = screen.getByPlaceholderText('Enter your text here for analysis...')
    const analyzeButton = screen.getByText('Analyze Text')

    await userEvent.type(textarea, 'Test text')
    fireEvent.click(analyzeButton)

    await waitFor(() => {
      expect(screen.getByText('Consider using active voice')).toBeInTheDocument()
    })
  })
}) 