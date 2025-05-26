import ReactGA from 'react-ga4'

export const initializeAnalytics = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID || '')
  }
}

export const trackPageView = (path: string) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.send({ hitType: 'pageview', page: path })
  }
}

export const trackEvent = (category: string, action: string, label?: string) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.event({
      category,
      action,
      label
    })
  }
} 