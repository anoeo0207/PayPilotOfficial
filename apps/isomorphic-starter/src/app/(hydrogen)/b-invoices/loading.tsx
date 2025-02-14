"use client"

import { useState, useEffect } from 'react'
import { PiSpinner } from 'react-icons/pi'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isLoading ? (
        <div className="flex flex-col items-center">
          <PiSpinner size={60} color="#4a90e2" className="animate-spin"/>
          <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      ) : (
        <div>
          </div>
      )}
    </div>
  )
}

