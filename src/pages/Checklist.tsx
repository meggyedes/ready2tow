import React, { useState, useEffect } from 'react'
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

const Checklist = () => {
  const initialItems: ChecklistItem[] = [
    {
      id: '1',
      category: 'Csatlakozás',
      iconName: 'LinkIcon',
      title: 'Vonóhorog ellenőrzése',
      description: 'Ellenőrizd, hogy nincs-e repedés, rozsdásodás vagy deformáció. Rázd meg, hogy biztosan rögzítve legyen. A vonóhorog a legfontosabb kapcsolat, ezért kritikus állapotban legyen.',
      checked: false,
    },
    {
      id: '2',
      category: 'Csatlakozás',
      iconName: 'Shield',
      title: 'Biztonsági lánc/kábel',
      description: 'A lánc legyen keresztbe kötve (X alakban) a vonóhorog alatt. Ne érjen a földhöz, de legyen elég laza a kanyarodáshoz. Ellenőrizd, hogy nincsenek-e sérült vagy kopott részek.',
      checked: false,
    },
    {
      id: '3',
      category: 'Csatlakozás',
      iconName: 'LinkIcon',
      title: 'Csatlakozó golyó',
      description: 'A golyó legyen tiszta és enyhén kenve. Ellenőrizd, hogy a csatlakozó teljesen rácsukódott-e, és a retesz be van-e kapcsolva. Próbáld meg felemelni a pótkocsi rúdját - nem szabad leválnia.',
      checked: false,
    },
    {
      id: '4',
      category: 'Világítás',
      iconName: 'Lightbulb',
      title: 'Hátsó lámpák',
      description: 'Teszteld az összes lámpát: féklámpák, helyzetjelzők, irányjelzők, tolatólámpa és rendszámtábla világítás. Minden lámpának működnie kell, mert ezekből tudják meg a szándékaidat.',
      checked: false,
    },
    {
      id: '5',
      category: 'Világítás',
      iconName: 'Lightbulb',
      title: 'Elektromos csatlakozás',
      description: 'A csatlakozó legyen tiszta, száraz és korróziómentes. Ellenőrizd, hogy szorosan illeszkedik-e. Ha piszkos, tisztítsd meg száraz ruhával vagy kontakt spray-vel.',
      checked: false,
    },
    {
      id: '6',
      category: 'Kerekek',
      iconName: 'Gauge',
      title: 'Gumiabroncs nyomás',
      description: 'Mérj nyomást minden keréken (a megfelelő érték a pótkocsi oldalfalán van). Túl alacsony nyomás defekthez vezethet, túl magas csökkenti a tapadást. Hideg gumikon mérj.',
      checked: false,
    },
    {
      id: '7',
      category: 'Kerekek',
      iconName: 'Gauge',
      title: 'Gumiabroncs állapot',
      description: 'Keress repedéseket, vágásokat, dudorokat vagy egyenetlen kopást. A futófelület legalább 1,6 mm mély legyen (3 mm ajánlott). Ha a gumi 6 évnél öregebb, fontold meg a cseréjét.',
      checked: false,
    },
    {
      id: '8',
      category: 'Kerekek',
      iconName: 'Wrench',
      title: 'Kerékanyák',
      description: 'Ellenőrizd, hogy minden kerékanya a helyén van és nincs laza. Új pótkocsinál használj nyomatékkulcsot (100-120 Nm). Az első 50-100 km után ellenőrizd újra.',
      checked: false,
    },
    {
      id: '9',
      category: 'Tükrök',
      iconName: 'Eye',
      title: 'Külső tükrök beállítása',
      description: 'Állítsd be a tükröket úgy, hogy lásd a pótkocsi teljes hosszát mindkét oldalon és a mögötted lévő forgalmat. Szélesebb pótkocsinál póttükrökre lehet szükség.',
      checked: false,
    },
    {
      id: '10',
      category: 'Rakomány',
      iconName: 'Package',
      title: 'Rakomány rögzítése',
      description: 'Rögzítsd a rakományt hevederekkel, kötelekkel vagy hálóval. Próbáld meg megrázni - nem szabad mozognia. Használj több rögzítési pontot és keresztbe húzott hevedereket.',
      checked: false,
    },
    {
      id: '11',
      category: 'Rakomány',
      iconName: 'Package',
      title: 'Súlyelosztás',
      description: 'A rakomány 60%-a legyen elöl, 40%-a hátul. Ez biztosítja a megfelelő terhelést a vonóhorogra (50-100 kg). Túl sok súly hátul instabilitást okoz.',
      checked: false,
    },
    {
      id: '12',
      category: 'Rakomány',
      iconName: 'AlertTriangle',
      title: 'Maximális terhelés',
      description: 'Ne lépd túl a megengedett össztömeget (pótkocsi adattáblája). BE kategóriával a teljes szerelvény max. 4250 kg. Ha bizonytalan vagy, menj mérlegre.',
      checked: false,
    },
    {
      id: '13',
      category: 'Fékek',
      iconName: 'Shield',
      title: 'Pótkocsi fékek',
      description: 'Ha van saját fékrendszer (750 kg felett kötelező), próbáld ki alacsony sebességnél. Ellenőrizd a fékfolyadék szintjét vagy a bowden kábelek állapotát.',
      checked: false,
    },
    {
      id: '14',
      category: 'Fékek',
      iconName: 'Shield',
      title: 'Rögzítőfék',
      description: 'Húzd be a kéziféket teljesen, majd próbáld meg eltolni a pótkocsit - nem szabad mozdulnia. Indulás előtt győződj meg róla, hogy kioldottad!',
      checked: false,
    },
    {
      id: '15',
      category: 'Dokumentumok',
      iconName: 'FileCheck',
      title: 'Pótkocsi papírok',
      description: 'Ellenőrizd, hogy a forgalmi engedély és a kötelező biztosítás érvényes-e. Ezeknek mindig nálad kell lenniük. Bérelt pótkocsinál a bérleti szerződés is kell.',
      checked: false,
    },
    {
      id: '16',
      category: 'Dokumentumok',
      iconName: 'FileCheck',
      title: 'Jogosítvány',
      description: 'A BE kategóriás jogosítványod legyen érvényes és nálad. 750 kg-nál nehezebb pótkocsihoz szükséges. 2013 előtti B kategória automatikusan jogosít BE-re.',
      checked: false,
    },
    {
      id: '17',
      category: 'Kenés és karbantartás',
      iconName: 'Droplet',
      title: 'Vonófej és csatlakozások kenése',
      description: 'Kend meg a vonóhorog gömbfejét, a csatlakozó golyót és a csuklós csatlakozásokat. Használj réz- vagy grafit alapú kenőzsírt. Ellenőrizd, hogy nincs-e túlzott kopás.',
      checked: false,
    },
    {
      id: '18',
      category: 'Kenés és karbantartás',
      iconName: 'Wrench',
      title: 'Támasztó kerék (jockey wheel)',
      description: 'Ellenőrizd, hogy könnyen fel-le mozgatható-e, és a rögzítő csap biztonságosan tart-e. Kend meg, ha nyikorog vagy nehezen mozog. Ellenőrizd a kerék állapotát.',
      checked: false,
    },
    {
      id: '19',
      category: 'Tartalék felszerelés',
      iconName: 'LifeBuoy',
      title: 'Tartalék kerék és szerszámok',
      description: 'Ellenőrizd, hogy van-e tartalék kerék jó állapotban (megfelelő nyomás, nem túl öreg). Legyen emelő (jack) és kerékkulcs, ami passzol a pótkocsi kerékanyáihoz.',
      checked: false,
    },
    {
      id: '20',
      category: 'Tartalék felszerelés',
      iconName: 'Hammer',
      title: 'Rögzítő eszközök állapota',
      description: 'Vizsgáld meg a spanifer/hevederek, kötelek és láncok állapotát. Keress kopott, szálas részeket. Ellenőrizd a horgokat és csatokat - ne legyenek meghajolva vagy rozsdásak.',
      checked: false,
    },
    {
      id: '21',
      category: 'Tartalék felszerelés',
      iconName: 'Package',
      title: 'Biztonsági felszerelés',
      description: 'Ajánlott: munkakesztyű, fényvisszaverő mellény, elsősegély doboz, figyelmeztető háromszög. Gyakori használatnál kis szerszámkészlet is hasznos.',
      checked: false,
    },
    {
      id: '22',
      category: 'Utolsó ellenőrzés',
      iconName: 'ClipboardCheck',
      title: 'Körbesétálás (Walk-around)',
      description: 'Indulás előtt sétálj körbe a szerelvény körül. Ellenőrizd: vonófej csatlakozik, lánc keresztbe kötve, csatlakozó bedugva, lámpák működnek, rakomány rögzítve, semmi nem lóg le.',
      checked: false,
    },
    {
      id: '23',
      category: 'Utolsó ellenőrzés',
      iconName: 'AlertTriangle',
      title: 'Terhelés és stabilitás végső ellenőrzése',
      description: 'Gondold át a teljes terhelést. A pótkocsi + rakomány ne haladja meg a megengedett értéket. Vonóhorog terhelés: 50-100 kg. Súlyelosztás: 60% elöl, 40% hátul.',
      checked: false,
    },
    {
      id: '24',
      category: 'Elektromos rendszer',
      iconName: 'Battery',
      title: 'Akkumulátor (ha van)',
      description: 'Ha a pótkocsinak van saját akkumulátora (pl. lakókocsi, fékrendszeres utánfutó), ellenőrizd a töltöttségét és a saruk tisztaságát. Korrodált sarukat tisztítsd meg.',
      checked: false,
    },
    {
      id: '25',
      category: 'Futómű és tengely',
      iconName: 'Settings',
      title: 'Futómű / tengelycsatlakozás',
      description: 'Ellenőrizd, hogy nincs-e olajfolyás, hajlás, repedés vagy laza alkatrész. A laprugók és csapágyak ne legyenek túlzottan kopottak.',
      checked: false,
    },
    {
      id: '26',
      category: 'Futómű és tengely',
      iconName: 'Disc',
      title: 'Kerékcsapágy hang / játék',
      description: 'Forgasd meg a kereket, és figyelj, nem zúg-e. Ellenőrizd, nincs-e oldalirányú mozgás (játék). A csapágyak legyenek megfelelően zsírozva.',
      checked: false,
    },
    {
      id: '27',
      category: 'Vonófej részletesen',
      iconName: 'Anchor',
      title: 'Vonófej rögzítése a pótkocsihoz',
      description: 'Ellenőrizd a vonófej alatti csavarokat és hegesztéseket. Nem csak a golyókapcsolat, hanem az egész rögzítés legyen ép és stabil.',
      checked: false,
    },
    {
      id: '28',
      category: 'Vonófej részletesen',
      iconName: 'Settings',
      title: 'Stabilizátor kar / súrlódó betétek',
      description: 'Ha van stabilizátor kar a vonófejen, ellenőrizd, hogy működik-e, és a súrlódó betétek nem kopottak-e el túlzottan.',
      checked: false,
    },
    {
      id: '29',
      category: 'Biztonság és kötelező felszerelés',
      iconName: 'Package',
      title: 'Elsősegély csomag érvényessége',
      description: 'Ellenőrizd az elsősegély doboz szavatosságát. Jogilag is számít ellenőrzéskor, hogy érvényes-e.',
      checked: false,
    },
    {
      id: '30',
      category: 'Biztonság és kötelező felszerelés',
      iconName: 'FlameKindling',
      title: 'Tűzoltó készülék',
      description: 'Lakókocsinál vagy nagy pótkocsinál legyen kéznél tűzoltó készülék, megfelelően töltött és hitelesített.',
      checked: false,
    },
    {
      id: '31',
      category: 'Egyéb gyakorlati pontok',
      iconName: 'Hash',
      title: 'Rendszámtábla és tartó',
      description: 'A rendszámtábla legyen jól olvasható, megvilágított, és a csavarok/tartó biztonságosan rögzítve.',
      checked: false,
    },
    {
      id: '32',
      category: 'Egyéb gyakorlati pontok',
      iconName: 'Lock',
      title: 'Ponyva / fedél / ajtózárak',
      description: 'Ellenőrizd, hogy a ponyva, fedél vagy ajtók biztonságosan záródnak, és nem csapódnak menet közben.',
      checked: false,
    },
    {
      id: '33',
      category: 'Egyéb gyakorlati pontok',
      iconName: 'Shield',
      title: 'Kézifék kioldása indulás előtt',
      description: 'Indulás előtt győződj meg róla, hogy a pótkocsi kéziféke teljesen ki van oldva. Behúzott fékkel való vezetés károsítja a fékeket.',
      checked: false,
    },
  ]

  const [items, setItems] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('checklistItems')
      if (saved) {
        const parsed = JSON.parse(saved)
        // Validate that parsed data has the correct structure
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch (error) {
      console.error('Error loading checklist from localStorage:', error)
      localStorage.removeItem('checklistItems')
    }
    return initialItems
  })

  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem('checklistItems', JSON.stringify(items))
    } catch (error) {
      console.error('Error saving checklist to localStorage:', error)
    }

    // Check if all items are checked
    const allChecked = items.every(item => item.checked)
    if (allChecked && items.length > 0) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [items])

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  const resetChecklist = () => {
    setItems(items.map(item => ({ ...item, checked: false })))
  }

  const categories = Array.from(new Set(items.map(item => item.category)))
  const checkedCount = items.filter(item => item.checked).length
  const progress = (checkedCount / items.length) * 100

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Indulás Előtti Ellenőrzőlista
        </h2>
        <p className="text-gray-600">
          Menj végig minden ponton az indulás előtt a biztonságos vontatásért
        </p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card mb-6"
      >
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-semibold text-gray-800">
            Haladás: {checkedCount}/{items.length}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetChecklist}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <RotateCcw size={18} />
            <span className="text-sm font-medium">Újrakezdés</span>
          </motion.button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
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
          className="mb-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            {category}
          </h3>
          <div className="space-y-3">
            {items
              .filter(item => item.category === category)
              .map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleItem(item.id)}
                  className={`card cursor-pointer transition-all duration-300 ${
                    item.checked
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300'
                      : 'hover:shadow-xl'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {item.checked ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                        >
                          <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </motion.div>
                      ) : (
                        <Circle className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {React.createElement(iconMap[item.iconName] || Package, { className: "w-5 h-5 text-blue-600" })}
                        <h4 className={`font-semibold ${
                          item.checked ? 'text-green-800 line-through' : 'text-gray-800'
                        }`}>
                          {item.title}
                        </h4>
                      </div>
                      <p className={`text-sm ${
                        item.checked ? 'text-green-700' : 'text-gray-600'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
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

