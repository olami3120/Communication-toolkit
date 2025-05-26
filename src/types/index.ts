export interface Message {
  id: string
  title: string
  content: string
  clarity: number
  impact: number
  urgency: number
  createdAt: Date
  updatedAt: Date
}

export interface Decision {
  id: string
  title: string
  description: string
  options: DecisionOption[]
  criteria: DecisionCriteria[]
  status: 'pending' | 'in-progress' | 'completed'
  createdAt: Date
  updatedAt: Date
}

export interface DecisionOption {
  id: string
  title: string
  description: string
  scores: Record<string, number>
}

export interface DecisionCriteria {
  id: string
  title: string
  weight: number
}

export interface Conflict {
  id: string
  title: string
  description: string
  parties: string[]
  status: 'active' | 'resolved'
  resolution: string
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  preferences: UserPreferences
}

export interface UserPreferences {
  theme: 'light' | 'dark'
  notifications: boolean
  language: string
} 