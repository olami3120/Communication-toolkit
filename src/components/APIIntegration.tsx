import { useState, useEffect } from 'react'
import { API_CONFIG } from '../config/api'

interface WeatherData {
  temperature: number
  condition: string
  suggestion: string
}

interface QuoteData {
  text: string
  author: string
  category: string
}

interface CalendarEvent {
  id: string
  title: string
  startTime: string
  endTime: string
  hasConflict: boolean
}

interface EmailTemplate {
  id: string
  subject: string
  content: string
  scheduledTime: string
}

interface TimeZoneInfo {
  timezone: string
  currentTime: string
  offset: string
}

export const APIIntegration = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 22,
    condition: 'Sunny',
    suggestion: 'Great weather for focused work! Consider taking breaks outside.'
  })

  const [quoteData, setQuoteData] = useState<QuoteData>({
    text: 'The single biggest problem in communication is the illusion that it has taken place.',
    author: 'George Bernard Shaw',
    category: 'Communication'
  })

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      startTime: '2024-03-20 10:00',
      endTime: '2024-03-20 11:00',
      hasConflict: false
    },
    {
      id: '2',
      title: 'Project Deadline',
      startTime: '2024-03-20 14:00',
      endTime: '2024-03-20 15:00',
      hasConflict: true
    }
  ])

  const [emailTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      subject: 'Weekly Progress Report',
      content: 'Here is your weekly progress report...',
      scheduledTime: '2024-03-20 17:00'
    }
  ])

  const [timeZoneInfo, setTimeZoneInfo] = useState<TimeZoneInfo>({
    timezone: 'UTC',
    currentTime: '10:00 AM',
    offset: '+00:00'
  })

  // Weather API integration
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `${API_CONFIG.WEATHER_API_URL}?q=London&units=metric&appid=${API_CONFIG.WEATHER_API_KEY}`
      )
      const data = await response.json()
      
      // Generate productivity suggestion based on weather
      const suggestion = generateWeatherSuggestion(data.weather[0].main, data.main.temp)
      
      setWeatherData({
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        suggestion
      })
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }

  const generateWeatherSuggestion = (condition: string, temp: number): string => {
    if (temp > 25) {
      return 'Warm weather! Consider working in a well-ventilated space and staying hydrated.'
    } else if (temp < 10) {
      return 'Cold weather! Make sure to stay warm and take regular breaks to move around.'
    } else if (condition === 'Rain') {
      return 'Rainy day! Perfect for focused indoor work and deep thinking tasks.'
    } else if (condition === 'Clear') {
      return 'Clear skies! Great for taking short outdoor breaks to refresh your mind.'
    }
    return 'Good conditions for productive work!'
  }

  // Quote API integration
  const fetchQuote = async () => {
    try {
      const response = await fetch(`${API_CONFIG.QUOTE_API_URL}?tags=communication,productivity`)
      const data = await response.json()
      
      setQuoteData({
        text: data.content,
        author: data.author,
        category: data.tags[0]
      })
    } catch (error) {
      console.error('Error fetching quote:', error)
    }
  }

  // Calendar API integration
  const fetchCalendarEvents = async () => {
    try {
      const response = await fetch(
        `${API_CONFIG.GOOGLE_CALENDAR_API_URL}/calendars/primary/events?key=${API_CONFIG.GOOGLE_CALENDAR_API_KEY}`
      )
      const data = await response.json()
      
      const events = data.items.map((event: any) => ({
        id: event.id,
        title: event.summary,
        startTime: new Date(event.start.dateTime).toLocaleString(),
        endTime: new Date(event.end.dateTime).toLocaleString(),
        hasConflict: checkForConflicts(event, data.items)
      }))
      
      setCalendarEvents(events)
    } catch (error) {
      console.error('Error fetching calendar events:', error)
    }
  }

  const checkForConflicts = (event: any, allEvents: any[]): boolean => {
    const eventStart = new Date(event.start.dateTime)
    const eventEnd = new Date(event.end.dateTime)
    
    return allEvents.some((otherEvent) => {
      if (otherEvent.id === event.id) return false
      
      const otherStart = new Date(otherEvent.start.dateTime)
      const otherEnd = new Date(otherEvent.end.dateTime)
      
      return (
        (eventStart >= otherStart && eventStart < otherEnd) ||
        (eventEnd > otherStart && eventEnd <= otherEnd)
      )
    })
  }

  // Timezone API integration
  const fetchTimeZoneInfo = async () => {
    try {
      const response = await fetch(
        `${API_CONFIG.TIMEZONE_API_URL}?key=${API_CONFIG.TIMEZONE_API_KEY}&format=json&by=zone&zone=UTC`
      )
      const data = await response.json()
      
      setTimeZoneInfo({
        timezone: data.zoneName,
        currentTime: new Date(data.timestamp * 1000).toLocaleTimeString(),
        offset: data.gmtOffset
      })
    } catch (error) {
      console.error('Error fetching timezone info:', error)
    }
  }

  useEffect(() => {
    fetchWeatherData()
    fetchQuote()
    fetchCalendarEvents()
    fetchTimeZoneInfo()

    // Set up periodic updates
    const weatherInterval = setInterval(fetchWeatherData, 1800000) // 30 minutes
    const quoteInterval = setInterval(fetchQuote, 3600000) // 1 hour
    const calendarInterval = setInterval(fetchCalendarEvents, 300000) // 5 minutes
    const timezoneInterval = setInterval(fetchTimeZoneInfo, 60000) // 1 minute

    return () => {
      clearInterval(weatherInterval)
      clearInterval(quoteInterval)
      clearInterval(calendarInterval)
      clearInterval(timezoneInterval)
    }
  }, [])

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        API Integrations
      </h2>

      {/* Weather Integration */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Weather & Productivity
        </h3>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {weatherData.temperature}°C
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {weatherData.condition}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Productivity Suggestion:
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {weatherData.suggestion}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Integration */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Motivational Quote
        </h3>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-lg italic text-gray-900 dark:text-white mb-2">
            "{quoteData.text}"
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            - {quoteData.author}
          </p>
        </div>
      </div>

      {/* Calendar Integration */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Calendar Events
        </h3>
        <div className="space-y-4">
          {calendarEvents.map((event) => (
            <div
              key={event.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {event.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {event.startTime} - {event.endTime}
                  </p>
                </div>
                {event.hasConflict && (
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                    Conflict Detected
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Integration */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Email Templates
        </h3>
        <div className="space-y-4">
          {emailTemplates.map((template) => (
            <div
              key={template.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                {template.subject}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {template.content}
              </p>
              <p className="text-xs text-gray-400">
                Scheduled: {template.scheduledTime}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Time Zone Integration */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Time Zone Information
        </h3>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Current Timezone
              </p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {timeZoneInfo.timezone}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Current Time
              </p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {timeZoneInfo.currentTime}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                UTC Offset: {timeZoneInfo.offset}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 