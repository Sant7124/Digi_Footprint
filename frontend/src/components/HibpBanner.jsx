import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function HibpBanner() {
  const [visible, setVisible] = useState(() => {
    try {
      return localStorage.getItem('hibp-banner-hidden') !== '1'
    } catch (e) {
      return true
    }
  })
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    let cancelled = false
    const check = async () => {
      try {
        const res = await fetch('/api/admin/config')
        if (!res.ok) throw new Error('no-config')
        const j = await res.json()
        const key = j?.data?.HIBP_API_KEY || ''
        if (!cancelled) setShouldShow(!key)
      } catch (err) {
        if (!cancelled) setShouldShow(true)
      }
    }
    check()
    return () => { cancelled = true }
  }, [])

  if (!visible || !shouldShow) return null

  return (
    <div className="bg-indigo-800 text-white p-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <p className="font-semibold">HIBP Notice</p>
          <p className="text-sm mt-1">The site is running without an official HaveIBeenPwned (HIBP) API key. Results may use a local breach dataset and are not real-time.
            <span className="ml-2 underline"><Link to="/admin">Configure HIBP key</Link></span>
          </p>
        </div>
        <div className="ml-4">
          <button
            onClick={() => {
              try { localStorage.setItem('hibp-banner-hidden', '1') } catch (e) {}
              setVisible(false)
            }}
            className="px-3 py-1 bg-indigo-200 text-indigo-900 rounded font-medium hover:bg-indigo-100"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}
