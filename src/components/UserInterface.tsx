import { useState } from 'react'

interface UISettings {
  layout: 'default' | 'compact' | 'spacious'
  density: 'comfortable' | 'cozy' | 'compact'
  animations: 'none' | 'subtle' | 'full'
  colorScheme: 'default' | 'high-contrast' | 'custom'
  customColors: {
    primary: string
    secondary: string
    accent: string
  }
}

export const UserInterface = () => {
  const [settings, setSettings] = useState<UISettings>({
    layout: 'default',
    density: 'comfortable',
    animations: 'subtle',
    colorScheme: 'default',
    customColors: {
      primary: '#3B82F6',
      secondary: '#6B7280',
      accent: '#10B981'
    }
  })

  const handleSettingChange = (key: keyof UISettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleColorChange = (key: keyof UISettings['customColors'], value: string) => {
    setSettings(prev => ({
      ...prev,
      customColors: { ...prev.customColors, [key]: value }
    }))
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        User Interface Settings
      </h2>

      {/* Layout Settings */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Layout Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Layout Style
            </label>
            <select
              value={settings.layout}
              onChange={(e) => handleSettingChange('layout', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="default">Default</option>
              <option value="compact">Compact</option>
              <option value="spacious">Spacious</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Content Density
            </label>
            <select
              value={settings.density}
              onChange={(e) => handleSettingChange('density', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="comfortable">Comfortable</option>
              <option value="cozy">Cozy</option>
              <option value="compact">Compact</option>
            </select>
          </div>
        </div>
      </div>

      {/* Animation Settings */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Animation Settings
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Animation Level
          </label>
          <select
            value={settings.animations}
            onChange={(e) => handleSettingChange('animations', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="none">None</option>
            <option value="subtle">Subtle</option>
            <option value="full">Full</option>
          </select>
        </div>
      </div>

      {/* Color Settings */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Color Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Color Scheme
            </label>
            <select
              value={settings.colorScheme}
              onChange={(e) => handleSettingChange('colorScheme', e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="default">Default</option>
              <option value="high-contrast">High Contrast</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {settings.colorScheme === 'custom' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Primary Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={settings.customColors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.customColors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Secondary Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={settings.customColors.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.customColors.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Accent Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={settings.customColors.accent}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.customColors.accent}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 