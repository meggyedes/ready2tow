import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop component
 * Automatically scrolls to the top of the page when the route changes
 * This ensures a better user experience when navigating between pages
 */
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top instantly when route changes
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop

