import { useState } from 'react'

interface KnowledgeArticle {
  id: string
  title: string
  content: string
  category: 'process' | 'guideline' | 'best-practice' | 'template'
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export const KnowledgeBase = () => {
  const [articles, setArticles] = useState<KnowledgeArticle[]>([])
  const [newArticle, setNewArticle] = useState<Partial<KnowledgeArticle>>({
    title: '',
    content: '',
    category: 'process',
    tags: [],
  })
  const [currentTag, setCurrentTag] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeArticle['category'] | 'all'>('all')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateArticle = () => {
    const newErrors: Record<string, string> = {}
    
    if (!newArticle.title?.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!newArticle.content?.trim()) {
      newErrors.content = 'Content is required'
    }
    if (!newArticle.category) {
      newErrors.category = 'Category is required'
    }
    if (newArticle.tags?.length === 0) {
      newErrors.tags = 'At least one tag is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddTag = () => {
    if (currentTag.trim() && !newArticle.tags?.includes(currentTag)) {
      setNewArticle(prev => ({
        ...prev,
        tags: [...(prev.tags || []), currentTag.trim()],
      }))
      setCurrentTag('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setNewArticle(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || [],
    }))
  }

  const handleAddArticle = () => {
    if (validateArticle()) {
      const article: KnowledgeArticle = {
        id: crypto.randomUUID(),
        title: newArticle.title!,
        content: newArticle.content!,
        category: newArticle.category!,
        tags: newArticle.tags || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setArticles(prev => [...prev, article])
      setNewArticle({
        title: '',
        content: '',
        category: 'process',
        tags: [],
      })
    }
  }

  const handleDeleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id))
  }

  const getFilteredArticles = () => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }

  const getCategoryColor = (category: KnowledgeArticle['category']) => {
    switch (category) {
      case 'process':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
      case 'guideline':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
      case 'best-practice':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
      case 'template':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Knowledge Base
      </h2>

      {/* Add New Article Form */}
      <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Add New Article
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              value={newArticle.title}
              onChange={(e) => setNewArticle(prev => ({ ...prev, title: e.target.value }))}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : ''
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Content
            </label>
            <textarea
              value={newArticle.content}
              onChange={(e) => setNewArticle(prev => ({ ...prev, content: e.target.value }))}
              rows={4}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.content ? 'border-red-500' : ''
              }`}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              value={newArticle.category}
              onChange={(e) => setNewArticle(prev => ({ ...prev, category: e.target.value as KnowledgeArticle['category'] }))}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.category ? 'border-red-500' : ''
              }`}
            >
              <option value="process">Process</option>
              <option value="guideline">Guideline</option>
              <option value="best-practice">Best Practice</option>
              <option value="template">Template</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tags
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Add a tag"
              />
              <button
                onClick={handleAddTag}
                className="mt-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>
            {errors.tags && (
              <p className="mt-1 text-sm text-red-600">{errors.tags}</p>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {newArticle.tags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddArticle}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add Article
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="w-full md:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as KnowledgeArticle['category'] | 'all')}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="process">Process</option>
            <option value="guideline">Guideline</option>
            <option value="best-practice">Best Practice</option>
            <option value="template">Template</option>
          </select>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {getFilteredArticles().length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No articles found. Add your first article using the form above.
          </p>
        ) : (
          getFilteredArticles().map((article) => (
            <div
              key={article.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                    {article.title}
                  </h4>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    {article.content}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteArticle(article.id)}
                  className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                >
                  Delete
                </button>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                  {article.category.replace('-', ' ')}
                </span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Created: {article.createdAt.toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
} 