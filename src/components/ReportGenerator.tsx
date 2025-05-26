import { useState } from 'react'
import { useStore } from '../store'

type ReportType = 'summary' | 'detailed' | 'custom'
type ReportFormat = 'pdf' | 'csv' | 'json'
type TimeRange = 'day' | 'week' | 'month' | 'year' | 'custom'

interface ReportConfig {
  type: ReportType
  format: ReportFormat
  timeRange: TimeRange
  startDate?: Date
  endDate?: Date
  includeTasks: boolean
  includeMessages: boolean
  includeDecisions: boolean
  includeConflicts: boolean
  includeFeedback: boolean
}

export const ReportGenerator = () => {
  const { tasks, messages, decisions, conflicts, feedbacks } = useStore()
  const [config, setConfig] = useState<ReportConfig>({
    type: 'summary',
    format: 'pdf',
    timeRange: 'week',
    includeTasks: true,
    includeMessages: true,
    includeDecisions: true,
    includeConflicts: true,
    includeFeedback: true,
  })
  const [isGenerating, setIsGenerating] = useState(false)

  const getDateRange = () => {
    const now = new Date()
    const start = new Date()
    
    switch (config.timeRange) {
      case 'day':
        start.setDate(now.getDate() - 1)
        break
      case 'week':
        start.setDate(now.getDate() - 7)
        break
      case 'month':
        start.setMonth(now.getMonth() - 1)
        break
      case 'year':
        start.setFullYear(now.getFullYear() - 1)
        break
      case 'custom':
        return {
          start: config.startDate || start,
          end: config.endDate || now,
        }
    }
    
    return { start, end: now }
  }

  const filterItemsByDateRange = <T extends { createdAt: Date }>(items: T[]) => {
    const { start, end } = getDateRange()
    return items.filter(item => item.createdAt >= start && item.createdAt <= end)
  }

  const generateReport = async () => {
    setIsGenerating(true)
    try {
      const reportData = {
        generatedAt: new Date(),
        timeRange: getDateRange(),
        summary: {
          tasks: config.includeTasks ? {
            total: filterItemsByDateRange(tasks).length,
            completed: filterItemsByDateRange(tasks).filter(t => t.status === 'completed').length,
            inProgress: filterItemsByDateRange(tasks).filter(t => t.status === 'in_progress').length,
            pending: filterItemsByDateRange(tasks).filter(t => t.status === 'pending').length,
          } : null,
          messages: config.includeMessages ? {
            total: filterItemsByDateRange(messages).length,
            responded: filterItemsByDateRange(messages).filter(m => m.status === 'responded').length,
            read: filterItemsByDateRange(messages).filter(m => m.status === 'read').length,
            sent: filterItemsByDateRange(messages).filter(m => m.status === 'sent').length,
          } : null,
          decisions: config.includeDecisions ? {
            total: filterItemsByDateRange(decisions).length,
            completed: filterItemsByDateRange(decisions).filter(d => d.status === 'completed').length,
            inProgress: filterItemsByDateRange(decisions).filter(d => d.status === 'in_progress').length,
            pending: filterItemsByDateRange(decisions).filter(d => d.status === 'pending').length,
          } : null,
          conflicts: config.includeConflicts ? {
            total: filterItemsByDateRange(conflicts).length,
            completed: filterItemsByDateRange(conflicts).filter(c => c.status === 'completed').length,
            inProgress: filterItemsByDateRange(conflicts).filter(c => c.status === 'in_progress').length,
            pending: filterItemsByDateRange(conflicts).filter(c => c.status === 'pending').length,
          } : null,
          feedback: config.includeFeedback ? {
            total: filterItemsByDateRange(feedbacks).length,
            completed: filterItemsByDateRange(feedbacks).filter(f => f.status === 'completed').length,
            inProgress: filterItemsByDateRange(feedbacks).filter(f => f.status === 'in_progress').length,
            pending: filterItemsByDateRange(feedbacks).filter(f => f.status === 'pending').length,
          } : null,
        },
        details: config.type === 'detailed' ? {
          tasks: config.includeTasks ? filterItemsByDateRange(tasks) : [],
          messages: config.includeMessages ? filterItemsByDateRange(messages) : [],
          decisions: config.includeDecisions ? filterItemsByDateRange(decisions) : [],
          conflicts: config.includeConflicts ? filterItemsByDateRange(conflicts) : [],
          feedback: config.includeFeedback ? filterItemsByDateRange(feedbacks) : [],
        } : null,
      }

      // Convert report data to the selected format
      let reportContent: string
      let mimeType: string
      let fileExtension: string

      switch (config.format) {
        case 'json':
          reportContent = JSON.stringify(reportData, null, 2)
          mimeType = 'application/json'
          fileExtension = 'json'
          break
        case 'csv':
          // Convert to CSV format
          const csvRows = [
            ['Report Type', config.type],
            ['Generated At', reportData.generatedAt.toISOString()],
            ['Time Range', `${reportData.timeRange.start.toISOString()} to ${reportData.timeRange.end.toISOString()}`],
            [],
            ['Summary'],
          ]

          if (reportData.summary.tasks) {
            csvRows.push(['Tasks', 'Total', 'Completed', 'In Progress', 'Pending'])
            csvRows.push([
              '',
              String(reportData.summary.tasks.total),
              String(reportData.summary.tasks.completed),
              String(reportData.summary.tasks.inProgress),
              String(reportData.summary.tasks.pending),
            ])
          }

          // Add similar rows for other types
          reportContent = csvRows.map(row => row.join(',')).join('\n')
          mimeType = 'text/csv'
          fileExtension = 'csv'
          break
        case 'pdf':
          // For PDF, we'll create a simple HTML representation
          // In a real application, you would use a PDF generation library
          reportContent = `
            <html>
              <head>
                <title>Communication Toolkit Report</title>
                <style>
                  body { font-family: Arial, sans-serif; }
                  .section { margin: 20px 0; }
                  table { border-collapse: collapse; width: 100%; }
                  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                  th { background-color: #f5f5f5; }
                </style>
              </head>
              <body>
                <h1>Communication Toolkit Report</h1>
                <div class="section">
                  <h2>Report Information</h2>
                  <p>Type: ${config.type}</p>
                  <p>Generated At: ${reportData.generatedAt.toLocaleString()}</p>
                  <p>Time Range: ${reportData.timeRange.start.toLocaleString()} to ${reportData.timeRange.end.toLocaleString()}</p>
                </div>
                <div class="section">
                  <h2>Summary</h2>
                  ${reportData.summary.tasks ? `
                    <h3>Tasks</h3>
                    <table>
                      <tr>
                        <th>Total</th>
                        <th>Completed</th>
                        <th>In Progress</th>
                        <th>Pending</th>
                      </tr>
                      <tr>
                        <td>${String(reportData.summary.tasks.total)}</td>
                        <td>${String(reportData.summary.tasks.completed)}</td>
                        <td>${String(reportData.summary.tasks.inProgress)}</td>
                        <td>${String(reportData.summary.tasks.pending)}</td>
                      </tr>
                    </table>
                  ` : ''}
                  <!-- Add similar tables for other types -->
                </div>
              </body>
            </html>
          `
          mimeType = 'application/pdf'
          fileExtension = 'pdf'
          break
      }

      // Create and download the file
      const blob = new Blob([reportContent], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `communication-toolkit-report-${new Date().toISOString()}.${fileExtension}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating report:', error)
      alert('Failed to generate report. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Report Generator
      </h2>

      <div className="space-y-6">
        {/* Report Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Report Type
          </label>
          <select
            value={config.type}
            onChange={(e) => setConfig(prev => ({ ...prev, type: e.target.value as ReportType }))}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="summary">Summary Report</option>
            <option value="detailed">Detailed Report</option>
            <option value="custom">Custom Report</option>
          </select>
        </div>

        {/* Report Format Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Report Format
          </label>
          <select
            value={config.format}
            onChange={(e) => setConfig(prev => ({ ...prev, format: e.target.value as ReportFormat }))}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="pdf">PDF</option>
            <option value="csv">CSV</option>
            <option value="json">JSON</option>
          </select>
        </div>

        {/* Time Range Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Time Range
          </label>
          <select
            value={config.timeRange}
            onChange={(e) => setConfig(prev => ({ ...prev, timeRange: e.target.value as TimeRange }))}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="day">Last 24 Hours</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="year">Last 12 Months</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {/* Custom Date Range */}
        {config.timeRange === 'custom' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={config.startDate?.toISOString().split('T')[0] || ''}
                onChange={(e) => setConfig(prev => ({ ...prev, startDate: new Date(e.target.value) }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={config.endDate?.toISOString().split('T')[0] || ''}
                onChange={(e) => setConfig(prev => ({ ...prev, endDate: new Date(e.target.value) }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Content Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Include in Report
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.includeTasks}
                onChange={(e) => setConfig(prev => ({ ...prev, includeTasks: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Tasks</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.includeMessages}
                onChange={(e) => setConfig(prev => ({ ...prev, includeMessages: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Messages</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.includeDecisions}
                onChange={(e) => setConfig(prev => ({ ...prev, includeDecisions: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Decisions</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.includeConflicts}
                onChange={(e) => setConfig(prev => ({ ...prev, includeConflicts: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Conflicts</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.includeFeedback}
                onChange={(e) => setConfig(prev => ({ ...prev, includeFeedback: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Feedback</span>
            </label>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateReport}
          disabled={isGenerating}
          className={`w-full px-4 py-2 rounded-md text-white font-medium ${
            isGenerating
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          }`}
        >
          {isGenerating ? 'Generating Report...' : 'Generate Report'}
        </button>
      </div>
    </div>
  )
} 