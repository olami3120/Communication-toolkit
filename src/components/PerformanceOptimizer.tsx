import { useState, useEffect } from 'react'

interface PerformanceMetrics {
  loadTime: number
  responseTime: number
  memoryUsage: number
  cpuUsage: number
}

interface OptimizationSettings {
  lazyLoading: boolean
  codeSplitting: boolean
  caching: boolean
  compression: boolean
  imageOptimization: boolean
}

export const PerformanceOptimizer = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    responseTime: 0,
    memoryUsage: 0,
    cpuUsage: 0
  })

  const [settings, setSettings] = useState<OptimizationSettings>({
    lazyLoading: true,
    codeSplitting: true,
    caching: true,
    compression: true,
    imageOptimization: true
  })

  useEffect(() => {
    // Simulate performance metrics collection
    const interval = setInterval(() => {
      setMetrics({
        loadTime: Math.random() * 1000,
        responseTime: Math.random() * 500,
        memoryUsage: Math.random() * 100,
        cpuUsage: Math.random() * 50
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSettingChange = (key: keyof OptimizationSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const getPerformanceStatus = (value: number, type: string) => {
    if (type === 'loadTime' || type === 'responseTime') {
      return value < 200 ? 'good' : value < 500 ? 'warning' : 'critical'
    }
    return value < 30 ? 'good' : value < 70 ? 'warning' : 'critical'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-500'
      case 'warning':
        return 'text-yellow-500'
      case 'critical':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Performance Optimization
      </h2>

      {/* Performance Metrics */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Performance Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Load Time
            </h4>
            <p className={`text-2xl font-bold ${getStatusColor(getPerformanceStatus(metrics.loadTime, 'loadTime'))}`}>
              {metrics.loadTime.toFixed(2)}ms
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Response Time
            </h4>
            <p className={`text-2xl font-bold ${getStatusColor(getPerformanceStatus(metrics.responseTime, 'responseTime'))}`}>
              {metrics.responseTime.toFixed(2)}ms
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Memory Usage
            </h4>
            <p className={`text-2xl font-bold ${getStatusColor(getPerformanceStatus(metrics.memoryUsage, 'memory'))}`}>
              {metrics.memoryUsage.toFixed(1)}%
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              CPU Usage
            </h4>
            <p className={`text-2xl font-bold ${getStatusColor(getPerformanceStatus(metrics.cpuUsage, 'cpu'))}`}>
              {metrics.cpuUsage.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Optimization Settings */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Optimization Settings
        </h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Lazy Loading
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Load components and resources only when needed
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.lazyLoading}
                onChange={() => handleSettingChange('lazyLoading')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Code Splitting
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Split code into smaller chunks for faster loading
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.codeSplitting}
                onChange={() => handleSettingChange('codeSplitting')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Caching
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Cache resources for faster subsequent loads
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.caching}
                onChange={() => handleSettingChange('caching')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Compression
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Compress assets for faster transfer
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.compression}
                onChange={() => handleSettingChange('compression')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Image Optimization
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Optimize images for faster loading
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.imageOptimization}
                onChange={() => handleSettingChange('imageOptimization')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </label>
        </div>
      </div>
    </div>
  )
} 