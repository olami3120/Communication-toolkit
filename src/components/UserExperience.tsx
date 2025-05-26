import { useState } from 'react'

interface UserPreference {
  theme: 'light' | 'dark' | 'system'
  fontSize: 'small' | 'medium' | 'large'
  notifications: boolean
  soundEffects: boolean
  animations: boolean
}

interface AccessibilitySettings {
  highContrast: boolean
  screenReader: boolean
  reducedMotion: boolean
  keyboardNavigation: boolean
}

export const UserExperience = () => {
  const [preferences, setPreferences] = useState<UserPreference>({
    theme: 'system',
    fontSize: 'medium',
    notifications: true,
    soundEffects: true,
    animations: true
  })

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    highContrast: false,
    screenReader: false,
    reducedMotion: false,
    keyboardNavigation: true
  })

  const handlePreferenceChange = (key: keyof UserPreference, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const handleAccessibilityChange = (key: keyof AccessibilitySettings, value: boolean) => {
    setAccessibility(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        User Experience Settings
      </h2>

      {/* Visual Preferences */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Visual Preferences
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Theme
            </label>
            <select
              value={preferences.theme}
              onChange={(e) => handlePreferenceChange('theme', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Font Size
            </label>
            <select
              value={preferences.fontSize}
              onChange={(e) => handlePreferenceChange('fontSize', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                Enable Notifications
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.soundEffects}
                onChange={(e) => handlePreferenceChange('soundEffects', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                Enable Sound Effects
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.animations}
                onChange={(e) => handlePreferenceChange('animations', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                Enable Animations
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Accessibility Settings */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Accessibility Settings
        </h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={accessibility.highContrast}
              onChange={(e) => handleAccessibilityChange('highContrast', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">
              High Contrast Mode
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={accessibility.screenReader}
              onChange={(e) => handleAccessibilityChange('screenReader', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">
              Screen Reader Support
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={accessibility.reducedMotion}
              onChange={(e) => handleAccessibilityChange('reducedMotion', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">
              Reduced Motion
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={accessibility.keyboardNavigation}
              onChange={(e) => handleAccessibilityChange('keyboardNavigation', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">
              Enhanced Keyboard Navigation
            </span>
          </label>
        </div>
      </div>
    </div>
  )
} 