import { useState } from 'react'

interface UserProgress {
  level: number
  experience: number
  totalPoints: number
  achievements: Achievement[]
}

interface Achievement {
  id: string
  title: string
  description: string
  points: number
  progress: number
  total: number
  unlocked: boolean
}

export const Gamification = () => {
  const [userProgress] = useState<UserProgress>({
    level: 1,
    experience: 0,
    totalPoints: 0,
    achievements: [
      {
        id: '1',
        title: 'First Message',
        description: 'Send your first message',
        points: 10,
        progress: 0,
        total: 1,
        unlocked: false
      },
      {
        id: '2',
        title: 'Decision Maker',
        description: 'Make your first decision',
        points: 20,
        progress: 0,
        total: 1,
        unlocked: false
      }
    ]
  })

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Gamification
      </h2>

      <div className="space-y-6">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Level {userProgress.level}
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${(userProgress.experience / 100) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Experience: {userProgress.experience}/100
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Achievements
          </h3>
          <div className="space-y-4">
            {userProgress.achievements.map(achievement => (
              <div
                key={achievement.id}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {achievement.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {achievement.description}
                </p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Progress: {achievement.progress}/{achievement.total}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 