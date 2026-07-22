
import React from 'react'
import UrlForm from '../components/UrlForm'
import { useNavigate } from '@tanstack/react-router'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl space-y-10">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-3">URL Shortener</h1>
            <p className="text-gray-600">
              Paste your link, shorten it instantly, and create custom slugs when you log in.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <UrlForm />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Dashboard preview</h2>
              <p className="mt-1 text-gray-500">
                Scroll down to see the locked dashboard preview and log in to access it.
              </p>
            </div>
            <div
              onClick={() => navigate({ to: '/auth' })}
              className="relative overflow-hidden rounded-3xl border border-gray-200 bg-slate-50 p-6 blur-sm cursor-pointer"
            >
              <div className="space-y-4 pointer-events-none">
                <div className="h-8 w-1/2 bg-gray-300 rounded" />
                <div className="h-6 w-1/3 bg-gray-300 rounded" />
                <div className="grid gap-3">
                  <div className="h-16 bg-gray-200 rounded" />
                  <div className="h-16 bg-gray-200 rounded" />
                  <div className="h-16 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="absolute inset-0 bg-white/70" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-blue-600 shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 20h14a2 2 0 002-2v-3a5 5 0 00-5-5H8a5 5 0 00-5 5v3a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-gray-800">Dashboard is locked</p>
                <p className="text-sm text-gray-600 max-w-md">
                  Login to view your shortened URLs, custom slugs, and click statistics.
                </p>
                <span className="mt-5 inline-flex items-center justify-center rounded-md bg-blue-500 px-5 py-3 text-sm font-medium text-white shadow-sm">
                  {isAuthenticated ? 'Go to Dashboard' : 'Login to unlock dashboard'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Why login?</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>• Create custom short URL slugs</li>
            <li>• Track clicks for every shortened URL</li>
            <li>• Access your dashboard from anywhere</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HomePage