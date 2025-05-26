export interface Message {
  id: string
  title: string
  content: string
  impact: number
  urgency: number
  clarity: number
  status?: 'sent' | 'read' | 'responded'
  createdAt: Date
  updatedAt: Date
}

export interface Decision {
  id: string
  title: string
  description: string
  options: DecisionOption[]
  criteria: DecisionCriteria[]
  selectedOption?: string
  status: 'pending' | 'in_progress' | 'completed' | 'approved' | 'rejected'
  version: number
  lastModified: string
  collaborators: string[]
  createdAt: Date
  updatedAt: Date
}

export interface DecisionOption {
  id: string
  title?: string
  description?: string
  scores: Record<string, number>
}

export interface DecisionCriteria {
  id: string
  title?: string
  weight?: number
}

export interface Conflict {
  id: string
  title: string
  description: string
  parties: string[]
  rootCauses: string[]
  resolutionSteps: string[]
  resolution?: string
  status: 'pending' | 'in_progress' | 'completed' | 'active' | 'resolved'
  createdAt: Date
  updatedAt: Date
}

export interface Feedback {
  id: string
  title: string
  description: string
  type: 'praise' | 'suggestion' | 'concern' | 'improvement'
  priority: 'low' | 'medium' | 'high'
  content: string
  actionItems: string[]
  status: 'pending' | 'in_progress' | 'completed'
  createdAt: Date
  updatedAt: Date
}

export interface Task {
  id: string
  title: string
  description: string
  impact: number
  effort: number
  status: 'pending' | 'in_progress' | 'completed'
  createdAt: Date
  updatedAt: Date
}

export interface Resource {
  id: string
  name: string
  capacity: number
  assignedTasks: string[]
}

export interface Integration {
  id: string
  name: string
  type: string
  status: 'active' | 'inactive'
  config: Record<string, any>
}

export interface Automation {
  id: string
  name: string
  trigger: string
  action: string
  status: 'active' | 'inactive'
  config: Record<string, any>
}

export interface QualityCheck {
  id: string
  name: string
  description: string
  status: 'pass' | 'fail' | 'pending'
  details: string
}

export interface TestCase {
  id: string
  name: string
  description: string
  status: 'pass' | 'fail' | 'pending'
  details: string
}

export interface QualityMetric {
  id: string
  name: string
  value: number
  target: number
  status: 'pass' | 'fail' | 'warning'
}

export interface Store {
  isDarkMode: boolean
  messages: Message[]
  decisions: Decision[]
  conflicts: Conflict[]
  feedbacks: Feedback[]
  tasks: Task[]
  toggleDarkMode: () => void
  addMessage: (message: Message) => void
  deleteMessage: (id: string) => void
  addDecision: (decision: Decision) => void
  deleteDecision: (id: string) => void
  addConflict: (conflict: Conflict) => void
  deleteConflict: (id: string) => void
  updateConflictStatus: (id: string, status: Conflict['status']) => void
  addFeedback: (feedback: Feedback) => void
  deleteFeedback: (id: string) => void
  updateFeedbackStatus: (id: string, status: Feedback['status']) => void
  addTask: (task: Task) => void
  deleteTask: (id: string) => void
  updateTaskStatus: (id: string, status: Task['status']) => void
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'manager'
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

export interface Template {
  id: string
  title: string
  content: string
  author: string
  version: number
  lastModified: string
  sharedWith: string[]
} 