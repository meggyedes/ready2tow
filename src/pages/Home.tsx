import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ClipboardCheck, BookOpen, Truck, Shield } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: ClipboardCheck,
      title: 'Ellenőrzőlista',
      description: 'Interaktív lista az indulás előtti ellenőrzéshez',
      color: 'from-blue-500 to-cyan-500',
      link: '/checklist',
    },
    {
      icon: BookOpen,
      title: 'KRESZ Referencia',
      description: 'BE kategóriás közlekedési szabályok',
      color: 'from-purple-500 to-pink-500',
      link: '/kresz',
    },
  ]


  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="text-6xl mb-4"
        >
          🚗🔗🚛
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Üdvözöllek a Ready2Tow-ban!
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A tökéletes segédeszköz BE kategóriás jogosítvány megszerzéséhez és
          biztonságos vontatáshoz.
        </p>
      </motion.div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 + 0.4 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to={feature.link} className="block">
              <div className="card h-full hover:shadow-2xl">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 mx-auto`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="card bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-blue-600" />
          Fontos tudnivalók
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>Mindig ellenőrizd a pótkocsi és a vonóhorog állapotát</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>Győződj meg a megfelelő terhelésről és rögzítésről</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>Tartsd be a sebességkorlátozásokat vontatás közben</span>
          </li>
        </ul>
      </motion.div>
    </div>
  )
}

export default Home

