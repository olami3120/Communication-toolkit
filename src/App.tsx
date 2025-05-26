import { useEffect } from 'react'
import { useStore } from './store'
import { MessageClarityMatrix } from './components/MessageClarityMatrix'
import { MessageList } from './components/MessageList'
import { DecisionNavigation } from './components/DecisionNavigation'
import { DecisionList } from './components/DecisionList'
import { ConflictResolution } from './components/ConflictResolution'
import { ConflictList } from './components/ConflictList'
import { FeedbackLoop } from './components/FeedbackLoop'
import { FeedbackList } from './components/FeedbackList'
import { TaskPrioritization } from './components/TaskPrioritization'
import { TaskList } from './components/TaskList'
import { ProgressDashboard } from './components/ProgressDashboard'
import { ResourceOptimizer } from './components/ResourceOptimizer'
import { TimelineVisualization } from './components/TimelineVisualization'
import { PerformanceAnalytics } from './components/PerformanceAnalytics'
import { TeamCollaboration } from './components/TeamCollaboration'
import { KnowledgeBase } from './components/KnowledgeBase'
import { AnalyticsDashboard } from './components/AnalyticsDashboard'
import { ReportGenerator } from './components/ReportGenerator'
import { IntegrationHub } from './components/IntegrationHub'
import { WorkflowAutomation } from './components/WorkflowAutomation'
import { SecuritySettings } from './components/SecuritySettings'
import { SubscriptionPlans } from './components/SubscriptionPlans'
import { UserExperience } from './components/UserExperience'
import { PerformanceOptimizer } from './components/PerformanceOptimizer'
import { UserInterface } from './components/UserInterface'
import { APIIntegration } from './components/APIIntegration'
import { TestSuite } from './components/TestSuite'
import { QualityAssurance } from './components/QualityAssurance'
import { AIWritingAssistant } from './components/AIWritingAssistant'
import { CollaborativeFeatures } from './components/CollaborativeFeatures'
import { Gamification } from './components/Gamification'

function App() {
  const { isDarkMode, toggleDarkMode } = useStore()

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <header className="p-4 bg-blue-600 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Communication Toolkit</h1>
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-800 transition-colors"
          >
            Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-8">
          {/* API Integration */}
          <APIIntegration />

          {/* Performance Optimizer */}
          <PerformanceOptimizer />

          {/* User Interface */}
          <UserInterface />

          {/* Subscription Plans */}
          <SubscriptionPlans />

          {/* User Experience */}
          <UserExperience />

          {/* Security Settings */}
          <SecuritySettings />

          {/* Integration Hub */}
          <IntegrationHub />

          {/* Workflow Automation */}
          <WorkflowAutomation />

          {/* Analytics Dashboard */}
          <AnalyticsDashboard />

          {/* Report Generator */}
          <ReportGenerator />

          {/* Performance Analytics */}
          <PerformanceAnalytics />

          {/* Team Collaboration */}
          <TeamCollaboration />

          {/* Knowledge Base */}
          <KnowledgeBase />

          {/* Progress Dashboard */}
          <ProgressDashboard />

          {/* Timeline Visualization */}
          <TimelineVisualization />

          {/* Resource Optimizer */}
          <ResourceOptimizer />

          {/* Message Clarity Matrix Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <MessageClarityMatrix />
            </div>
            <div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Your Messages
                </h2>
                <MessageList />
              </div>
            </div>
          </div>

          {/* Decision Navigation Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <DecisionNavigation />
            </div>
            <div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Your Decisions
                </h2>
                <DecisionList />
              </div>
            </div>
          </div>

          {/* Conflict Resolution Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ConflictResolution />
            </div>
            <div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Your Conflicts
                </h2>
                <ConflictList />
              </div>
            </div>
          </div>

          {/* Feedback Loop Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <FeedbackLoop />
            </div>
            <div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Your Feedback
                </h2>
                <FeedbackList />
              </div>
            </div>
          </div>

          {/* Task Prioritization Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <TaskPrioritization />
            </div>
            <div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Your Tasks
                </h2>
                <TaskList />
              </div>
            </div>
          </div>

          {/* Test Suite */}
          <TestSuite />

          {/* Quality Assurance */}
          <QualityAssurance />

          {/* AI Writing Assistant */}
          <AIWritingAssistant />

          {/* Collaborative Features */}
          <CollaborativeFeatures />

          {/* Gamification */}
          <Gamification />
        </div>
      </main>
    </div>
  )
}

export default App 