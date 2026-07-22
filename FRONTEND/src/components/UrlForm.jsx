import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api'
import { useSelector } from 'react-redux'
import { queryClient } from '../main'
import { useNavigate } from '@tanstack/react-router'

const UrlForm = () => {
  const [url, setUrl] = useState('https://www.google.com')
  const [shortUrl, setShortUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)
  const [customSlug, setCustomSlug] = useState('')
  const [showCustomize, setShowCustomize] = useState(false)
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const handleShorten = async () => {
    setLoading(true)
    setError(null)
    try {
      const shortUrl = await createShortUrl(url, '')
      setShortUrl(shortUrl)
      setShowCustomize(true)
      queryClient.invalidateQueries({ queryKey: ['userUrls'] })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCustomize = async () => {
    if (!customSlug.trim()) {
      setError('Please enter a custom slug before saving.')
      return
    }
    if (!isAuthenticated) {
      navigate({ to: '/auth' })
      return
    }

    setLoading(true)
    setError(null)
    try {
      const customUrl = await createShortUrl(url, customSlug.trim())
      setShortUrl(customUrl)
      queryClient.invalidateQueries({ queryKey: ['userUrls'] })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
          Enter your URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onInput={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <button
          onClick={handleShorten}
          type="button"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Shortening…' : 'Shorten URL'}
        </button>
        <button
          type="button"
          onClick={() => {
            if (!isAuthenticated) {
              navigate({ to: '/auth' })
              return
            }
            setShowCustomize(true)
          }}
          className="w-full bg-white border border-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isAuthenticated ? 'Customize after shorten' : 'Login to customize'}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {shortUrl && (
        <div className="mt-4 space-y-4">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h2 className="text-lg font-semibold mb-2">Your shortened URL</h2>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shortUrl}
                className="flex-1 p-2 border border-gray-300 rounded-md bg-white"
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                  copied ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {showCustomize && (
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="text-base font-semibold mb-3">Customize this short URL</h3>
              <p className="text-sm text-gray-500 mb-3">
                Create a custom URL slug for the same original link. You must be logged in to save it.
              </p>
              <div className="space-y-3">
                <input
                  type="text"
                  id="customSlug"
                  value={customSlug}
                  onChange={(event) => setCustomSlug(event.target.value)}
                  placeholder="custom-slug-here"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleCustomize}
                  type="button"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {loading ? 'Saving custom URL…' : 'Save custom URL'}
                </button>
              </div>
              {!isAuthenticated && (
                <p className="mt-3 text-sm text-gray-500">
                  Not signed in yet? Click the button above to login and enable custom URLs.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default UrlForm