export const ADVANCED_CONFIG = {
  // OpenAI API (Free tier)
  OPENAI_API_KEY: process.env.REACT_APP_OPENAI_API_KEY || '',
  OPENAI_API_URL: 'https://api.openai.com/v1',

  // Firebase Configuration
  FIREBASE_CONFIG: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.REACT_APP_FIREBASE_APP_ID || '',
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || ''
  },

  // Achievement System
  ACHIEVEMENTS: {
    WRITING_MASTER: {
      id: 'writing_master',
      name: 'Writing Master',
      description: 'Complete 10 writing tasks with high clarity scores',
      icon: '✍️',
      points: 100
    },
    TEAM_PLAYER: {
      id: 'team_player',
      name: 'Team Player',
      description: 'Share 5 templates with team members',
      icon: '👥',
      points: 50
    },
    DECISION_MAKER: {
      id: 'decision_maker',
      name: 'Decision Maker',
      description: 'Make 20 clear decisions with positive outcomes',
      icon: '🎯',
      points: 75
    }
  },

  // Tutorial System
  TUTORIAL_STEPS: [
    {
      id: 'welcome',
      title: 'Welcome to Communication Toolkit',
      content: 'Learn how to improve your communication and decision-making skills.',
      target: 'header',
      placement: 'bottom'
    },
    {
      id: 'writing_assistant',
      title: 'AI Writing Assistant',
      content: 'Get real-time suggestions to improve your writing clarity and tone.',
      target: '.writing-assistant',
      placement: 'right'
    },
    {
      id: 'templates',
      title: 'Template Management',
      content: 'Create, share, and collaborate on communication templates.',
      target: '.templates-section',
      placement: 'left'
    }
  ],

  // Search Configuration
  SEARCH_CONFIG: {
    minQueryLength: 2,
    maxResults: 20,
    searchableFields: [
      'title',
      'content',
      'tags',
      'author',
      'category'
    ],
    sortOptions: [
      { label: 'Relevance', value: 'relevance' },
      { label: 'Date', value: 'date' },
      { label: 'Popularity', value: 'popularity' }
    ]
  }
} 