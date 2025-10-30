import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  Circle,
  RotateCcw,
  AlertTriangle,
  Lightbulb,
  Link2 as LinkIcon,
  Eye,
  Gauge,
  Shield,
  Package,
  Wrench,
  FileCheck,
  Droplet,
  LifeBuoy,
  Hammer,
  ClipboardCheck,
  Battery,
  Settings,
  Disc,
  Anchor,
  FlameKindling,
  Hash,
  Lock,
} from 'lucide-react'

interface ChecklistItem {
  id: string
  category: string
  iconName: string
  title: string
  description: string
  checked: boolean
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkIcon: LinkIcon,
  Shield: Shield,
  Lightbulb: Lightbulb,
  Gauge: Gauge,
  Wrench: Wrench,
  Eye: Eye,
  Package: Package,
  AlertTriangle: AlertTriangle,
  FileCheck: FileCheck,
  Droplet: Droplet,
  LifeBuoy: LifeBuoy,
  Hammer: Hammer,
  ClipboardCheck: ClipboardCheck,
  Battery: Battery,
  Settings: Settings,
  Disc: Disc,
  Anchor: Anchor,
  FlameKindling: FlameKindling,
  Hash: Hash,
  Lock: Lock,
}

// Memoized ChecklistItem component to prevent unnecessary re-renders
const ChecklistItemComponent = React.memo<{
  item: ChecklistItem
  index: number
  onToggle: (id: string) => void
}>(({ item, index, onToggle }) => {
  const IconComponent = iconMap[item.iconName] || Package

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onToggle(item.id)}
      className={`card cursor-pointer transition-all duration-300 p-3 md:p-4 ${
        item.checked
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300'
          : 'hover:shadow-xl'
      }`}
    >
      <div className="flex items-start gap-2 md:gap-4">
        <div className="flex-shrink-0">
          {item.checked ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
            </motion.div>
          ) : (
            <Circle className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 md:gap-2 mb-1">
            <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" />
            <h4 className={`text-sm md:text-base font-semibold ${
              item.checked ? 'text-green-800 line-through' : 'text-gray-800'
            }`}>
              {item.title}
            </h4>
          </div>
          <p className={`text-xs md:text-sm ${
            item.checked ? 'text-green-700' : 'text-gray-600'
          }`}>
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
})

const Checklist = () => {
  const initialItems: ChecklistItem[] = [
    {
      id: '1',
      category: 'Csatlakozás és vonófej',
      iconName: 'LinkIcon',
      title: 'Vonóhorog ellenőrzése',
      description: 'Nincs repedés, rozsdásodás vagy deformáció. Rázd meg, hogy rögzítve legyen.',
      checked: false,
    },
    {
      id: '2',
      category: 'Csatlakozás és vonófej',
      iconName: 'Shield',
      title: 'Biztonsági lánc/kábel',
      description: 'Keresztbe kötve (X alakban), ne érjen a földhöz. Nincs sérült vagy kopott rész.',
      checked: false,
    },
    {
      id: '3',
      category: 'Csatlakozás és vonófej',
      iconName: 'LinkIcon',
      title: 'Csatlakozó golyó',
      description: 'Tiszta, enyhén kenve. Csatlakozó rácsukódott, retesz bekapcsolva.',
      checked: false,
    },
    {
      id: '4',
      category: 'Világítás és elektromos',
      iconName: 'Lightbulb',
      title: 'Hátsó lámpák',
      description: 'Féklámpák, helyzetjelzők, irányjelzők, tolatólámpa működik.',
      checked: false,
    },
    {
      id: '5',
      category: 'Világítás és elektromos',
      iconName: 'Lightbulb',
      title: 'Elektromos csatlakozás',
      description: 'Tiszta, száraz, korróziómentes. Szorosan illeszkedik.',
      checked: false,
    },
    {
      id: '6',
      category: 'Kerekek és futómű',
      iconName: 'Gauge',
      title: 'Gumiabroncs nyomás',
      description: 'Megfelelő nyomás minden keréken (érték a pótkocsi oldalfalán).',
      checked: false,
    },
    {
      id: '7',
      category: 'Kerekek és futómű',
      iconName: 'Gauge',
      title: 'Gumiabroncs állapot',
      description: 'Nincs repedés, vágás, dudor. Futófelület min. 1,6 mm (3 mm ajánlott).',
      checked: false,
    },
    {
      id: '8',
      category: 'Kerekek és futómű',
      iconName: 'Wrench',
      title: 'Kerékanyák',
      description: 'Minden anya a helyén, nincs laza. Új pótkocsinál: 100-120 Nm.',
      checked: false,
    },
    {
      id: '9',
      category: 'Indulás előtti ellenőrzés',
      iconName: 'Eye',
      title: 'Külső tükrök beállítása',
      description: 'Látható a pótkocsi teljes hossza mindkét oldalon.',
      checked: false,
    },
    {
      id: '10',
      category: 'Rakomány és terhelés',
      iconName: 'Package',
      title: 'Rakomány rögzítése',
      description: 'Hevederekkel/kötelekkel rögzítve. Nem mozog, ha megrázod.',
      checked: false,
    },
    {
      id: '11',
      category: 'Rakomány és terhelés',
      iconName: 'Package',
      title: 'Súlyelosztás',
      description: '60% elöl, 40% hátul. Vonóhorog terhelés: 50-100 kg.',
      checked: false,
    },
    {
      id: '12',
      category: 'Rakomány és terhelés',
      iconName: 'AlertTriangle',
      title: 'Maximális terhelés',
      description: 'Max. 4250 kg (teljes szerelvény). Lásd pótkocsi adattábla.',
      checked: false,
    },
    {
      id: '13',
      category: 'Fékek',
      iconName: 'Shield',
      title: 'Pótkocsi fékek',
      description: 'Próbáld ki alacsony sebességnél. Ellenőrizd a fékfolyadékot vagy bowden kábelt.',
      checked: false,
    },
    {
      id: '14',
      category: 'Fékek',
      iconName: 'Shield',
      title: 'Rögzítőfék',
      description: 'Kézifék behúzva a pótkocsi nem mozdul. Indulás előtt kioldva!',
      checked: false,
    },
    {
      id: '15',
      category: 'Dokumentumok',
      iconName: 'FileCheck',
      title: 'Pótkocsi papírok',
      description: 'Forgalmi engedély és biztosítás érvényes. Bérelt pótkocsinál bérleti szerződés.',
      checked: false,
    },
    {
      id: '16',
      category: 'Dokumentumok',
      iconName: 'FileCheck',
      title: 'Jogosítvány',
      description: 'BE kategória érvényes és nálad (750 kg+ pótkocsihoz).',
      checked: false,
    },
    {
      id: '17',
      category: 'Karbantartás és felszerelés',
      iconName: 'Droplet',
      title: 'Vonófej és csatlakozások kenése',
      description: 'Gömbfej, golyó, csatlakozások kenve. Nincs túlzott kopás.',
      checked: false,
    },
    {
      id: '18',
      category: 'Karbantartás és felszerelés',
      iconName: 'Wrench',
      title: 'Támasztó kerék (jockey wheel)',
      description: 'Könnyen mozgatható, rögzítő csap tart. Kend meg, ha nyikorog.',
      checked: false,
    },
    {
      id: '19',
      category: 'Karbantartás és felszerelés',
      iconName: 'LifeBuoy',
      title: 'Tartalék kerék és szerszámok',
      description: 'Tartalék kerék jó állapotban. Jack és kerékkulcs megvan.',
      checked: false,
    },
    {
      id: '20',
      category: 'Karbantartás és felszerelés',
      iconName: 'Hammer',
      title: 'Rögzítő eszközök állapota',
      description: 'Hevederek, kötelek, láncok épek. Horgok nem rozsdásak/hajlottak.',
      checked: false,
    },
    {
      id: '21',
      category: 'Karbantartás és felszerelés',
      iconName: 'Package',
      title: 'Biztonsági felszerelés',
      description: 'Kesztyű, mellény, elsősegély doboz, háromszög.',
      checked: false,
    },
    {
      id: '22',
      category: 'Indulás előtti ellenőrzés',
      iconName: 'ClipboardCheck',
      title: 'Körbesétálás (Walk-around)',
      description: 'Vonófej OK, lánc OK, csatlakozó OK, lámpák OK, rakomány OK.',
      checked: false,
    },
    {
      id: '23',
      category: 'Indulás előtti ellenőrzés',
      iconName: 'AlertTriangle',
      title: 'Terhelés és stabilitás végső ellenőrzése',
      description: 'Max. terhelés OK. Vonóhorog: 50-100 kg. Súlyelosztás: 60/40%.',
      checked: false,
    },
    {
      id: '24',
      category: 'Világítás és elektromos',
      iconName: 'Battery',
      title: 'Akkumulátor (ha van)',
      description: 'Töltöttség OK, saruk tiszták (lakókocsi/fékrendszeres utánfutó).',
      checked: false,
    },
    {
      id: '25',
      category: 'Kerekek és futómű',
      iconName: 'Settings',
      title: 'Futómű / tengelycsatlakozás',
      description: 'Nincs olajfolyás, hajlás, repedés. Laprugók és csapágyak jók.',
      checked: false,
    },
    {
      id: '26',
      category: 'Kerekek és futómű',
      iconName: 'Disc',
      title: 'Kerékcsapágy hang / játék',
      description: 'Kerék nem zúg, nincs oldalirányú játék. Csapágyak zsírozva.',
      checked: false,
    },
    {
      id: '27',
      category: 'Csatlakozás és vonófej',
      iconName: 'Anchor',
      title: 'Vonófej rögzítése a pótkocsihoz',
      description: 'Csavarok és hegesztések épek. Teljes rögzítés stabil.',
      checked: false,
    },
    {
      id: '28',
      category: 'Csatlakozás és vonófej',
      iconName: 'Settings',
      title: 'Stabilizátor kar / súrlódó betétek',
      description: 'Stabilizátor működik, betétek nem kopottak (ha van).',
      checked: false,
    },
    {
      id: '29',
      category: 'Karbantartás és felszerelés',
      iconName: 'Package',
      title: 'Elsősegély csomag érvényessége',
      description: 'Elsősegély doboz szavatossága érvényes.',
      checked: false,
    },
    {
      id: '30',
      category: 'Karbantartás és felszerelés',
      iconName: 'FlameKindling',
      title: 'Tűzoltó készülék',
      description: 'Tűzoltó készülék töltött és hitelesített (lakókocsi/nagy pótkocsi).',
      checked: false,
    },
    {
      id: '31',
      category: 'Indulás előtti ellenőrzés',
      iconName: 'Hash',
      title: 'Rendszámtábla és tartó',
      description: 'Rendszámtábla olvasható, megvilágított, tartó rögzítve.',
      checked: false,
    },
    {
      id: '32',
      category: 'Indulás előtti ellenőrzés',
      iconName: 'Lock',
      title: 'Ponyva / fedél / ajtózárak',
      description: 'Ponyva, fedél, ajtók biztonságosan záródnak.',
      checked: false,
    },
    {
      id: '33',
      category: 'Indulás előtti ellenőrzés',
      iconName: 'Shield',
      title: 'Kézifék kioldása indulás előtt',
      description: 'Kézifék teljesen kioldva indulás előtt.',
      checked: false,
    },
  ]

  const [items, setItems] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('checklistItems')
      if (saved) {
        const parsed = JSON.parse(saved)
        // Validate that parsed data has the correct structure AND correct length
        if (Array.isArray(parsed) && parsed.length === initialItems.length) {
          return parsed
        } else {
          // localStorage has wrong number of items, clear it
          localStorage.removeItem('checklistItems')
        }
      }
    } catch (error) {
      console.error('Error loading checklist from localStorage:', error)
      localStorage.removeItem('checklistItems')
    }
    return initialItems
  })

  const [showConfetti, setShowConfetti] = useState(false)

  // Debounced localStorage save - only save after user stops clicking
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem('checklistItems', JSON.stringify(items))
      } catch (error) {
        console.error('Error saving checklist to localStorage:', error)
      }
    }, 300) // Wait 300ms after last change before saving

    return () => clearTimeout(timeoutId)
  }, [items])

  // Check for completion and show confetti
  useEffect(() => {
    const allChecked = items.every(item => item.checked)
    if (allChecked && items.length > 0) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [items])

  // Memoized toggle function to prevent unnecessary re-renders
  const toggleItem = useCallback((id: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    )
  }, [])

  // Memoized reset function
  const resetChecklist = useCallback(() => {
    setItems(prevItems => prevItems.map(item => ({ ...item, checked: false })))
  }, [])

  // Memoize expensive calculations
  const categories = useMemo(
    () => Array.from(new Set(items.map(item => item.category))),
    [items]
  )

  const checkedCount = useMemo(
    () => items.filter(item => item.checked).length,
    [items]
  )

  const progress = useMemo(
    () => (checkedCount / items.length) * 100,
    [checkedCount, items.length]
  )

  return (
    <div className="max-w-4xl mx-auto px-3 md:px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 md:mb-6"
      >
        <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">
          Indulás Előtti Ellenőrzőlista
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Menj végig minden ponton az indulás előtt a biztonságos vontatásért
        </p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card mb-4 md:mb-6 p-3 md:p-4"
      >
        <div className="flex justify-between items-center mb-2 md:mb-3">
          <span className="text-sm md:text-lg font-semibold text-gray-800">
            {checkedCount}/{items.length}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetChecklist}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-xs md:text-sm"
          >
            <RotateCcw size={16} className="md:w-[18px] md:h-[18px]" />
            <span className="font-medium">Újra</span>
          </motion.button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 md:h-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
          />
        </div>
      </motion.div>

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="text-6xl"
            >
              🎉
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checklist Items by Category */}
      {categories.map((category, categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
          className="mb-4 md:mb-6"
        >
          <h3 className="text-base md:text-xl font-bold text-gray-800 mb-2 md:mb-3 flex items-center">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full mr-2"></span>
            {category}
          </h3>
          <div className="space-y-2 md:space-y-3">
            {items
              .filter(item => item.category === category)
              .map((item, index) => (
                <ChecklistItemComponent
                  key={item.id}
                  item={item}
                  index={index}
                  onToggle={toggleItem}
                />
              ))}
          </div>
        </motion.div>
      ))}

      {/* Bottom Spacing for Navigation */}
      <div className="h-8"></div>
    </div>
  )
}

export default Checklist

