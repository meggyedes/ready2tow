import { ReactNode, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, ClipboardCheck, BookOpen } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

// Navigation items defined outside component to avoid recreation
const NAV_ITEMS = [
  { path: '/', icon: Home, label: 'Főoldal' },
  { path: '/checklist', icon: ClipboardCheck, label: 'Ellenőrzőlista' },
  { path: '/kresz', icon: BookOpen, label: 'KRESZ' },
] as const

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    // Use requestAnimationFrame to ensure scroll happens after render
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    })
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            🚗 Ready2Tow
          </h1>
          <p className="text-center text-sm md:text-base text-blue-100 mt-1">
            BE Kategória Segédlet
          </p>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.15,
              ease: 'easeInOut'
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t-2 border-gray-100 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-around items-center py-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex-1"
                  onClick={(e) => {
                    // Prevent navigation if already on this page
                    if (isActive) {
                      e.preventDefault()
                    }
                  }}
                >
                  <motion.div
                    whileTap={!isActive ? { scale: 0.95 } : {}}
                    className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'text-blue-600'
                        : 'text-gray-500 hover:text-blue-500'
                    }`}
                  >
                    <motion.div
                      animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon
                        size={24}
                        className={isActive ? 'stroke-[2.5]' : 'stroke-2'}
                      />
                    </motion.div>
                    <span className={`text-xs mt-1 font-medium ${
                      isActive ? 'font-bold' : ''
                    }`}>
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-full"
                      />
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Layout

