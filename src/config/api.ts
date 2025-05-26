export const API_CONFIG = {
  // OpenWeatherMap API (Free tier)
  WEATHER_API_KEY: process.env.REACT_APP_WEATHER_API_KEY || '',
  WEATHER_API_URL: 'https://api.openweathermap.org/data/2.5/weather',

  // Quotable API (Free, no key required)
  QUOTE_API_URL: 'https://api.quotable.io/random',

  // Google Calendar API
  GOOGLE_CALENDAR_API_KEY: process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY || '',
  GOOGLE_CALENDAR_API_URL: 'https://www.googleapis.com/calendar/v3',

  // EmailJS (to be configured later)
  EMAILJS_USER_ID: process.env.REACT_APP_EMAILJS_USER_ID || '',
  EMAILJS_TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '',
  EMAILJS_SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID || '',

  // TimeZoneDB API (Free tier)
  TIMEZONE_API_KEY: process.env.REACT_APP_TIMEZONE_API_KEY || '',
  TIMEZONE_API_URL: 'https://api.timezonedb.com/v2.1/get-time-zone'
} 