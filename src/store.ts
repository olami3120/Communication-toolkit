import { create } from 'zustand'
import { Message, Decision, Conflict, Feedback, Task } from './types'

interface Store {
  // Dark mode
  isDarkMode: boolean
  toggleDarkMode: () => void

  // Messages
  messages: Message[]
  addMessage: (message: Message) => void
  deleteMessage: (id: string) => void

  // Decisions
  decisions: Decision[]
  addDecision: (decision: Decision) => void
  deleteDecision: (id: string) => void

  // Conflicts
  conflicts: Conflict[]
  addConflict: (conflict: Conflict) => void
  deleteConflict: (id: string) => void
  updateConflictStatus: (id: string, status: Conflict['status']) => void

  // Feedback
  feedbacks: Feedback[]
  addFeedback: (feedback: Feedback) => void
  deleteFeedback: (id: string) => void
  updateFeedbackStatus: (id: string, status: Feedback['status']) => void

  // Tasks
  tasks: Task[]
  addTask: (task: Task) => void
  deleteTask: (id: string) => void
  updateTaskStatus: (id: string, status: Task['status']) => void
}

export const useStore = create<Store>((set) => ({
  // Dark mode
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  // Messages
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  deleteMessage: (id) => set((state) => ({ messages: state.messages.filter((m) => m.id !== id) })),

  // Decisions
  decisions: [],
  addDecision: (decision) => set((state) => ({ decisions: [...state.decisions, decision] })),
  deleteDecision: (id) => set((state) => ({ decisions: state.decisions.filter((d) => d.id !== id) })),

  // Conflicts
  conflicts: [],
  addConflict: (conflict) => set((state) => ({ conflicts: [...state.conflicts, conflict] })),
  deleteConflict: (id) => set((state) => ({ conflicts: state.conflicts.filter((c) => c.id !== id) })),
  updateConflictStatus: (id, status) =>
    set((state) => ({
      conflicts: state.conflicts.map((c) =>
        c.id === id ? { ...c, status, updatedAt: new Date() } : c
      ),
    })),

  // Feedback
  feedbacks: [],
  addFeedback: (feedback) => set((state) => ({ feedbacks: [...state.feedbacks, feedback] })),
  deleteFeedback: (id) => set((state) => ({ feedbacks: state.feedbacks.filter((f) => f.id !== id) })),
  updateFeedbackStatus: (id, status) =>
    set((state) => ({
      feedbacks: state.feedbacks.map((f) =>
        f.id === id ? { ...f, status, updatedAt: new Date() } : f
      ),
    })),

  // Tasks
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
  updateTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, status, updatedAt: new Date() } : t
      ),
    })),
})) 