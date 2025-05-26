import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

export const initializeSentry = () => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      integrations: [new BrowserTracing()],
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV,
      beforeSend(event) {
        // Don't send events in development
        if (process.env.NODE_ENV === 'development') {
          return null
        }
        return event
      }
    })
  }
} 