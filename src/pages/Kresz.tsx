import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  ChevronDown,
  ChevronUp,
  Gauge,
  Weight,
  Ruler,
  AlertTriangle,
  Shield,
  Car,
  Truck,
  MapPin,
  Package,
} from 'lucide-react'

interface KreszRule {
  id: string
  category: string
  icon: any
  title: string
  content: string
  important?: boolean
}

const Kresz = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const rules: KreszRule[] = [
    {
      id: '1',
      category: 'Sebességkorlátozások',
      icon: Gauge,
      title: 'Maximális sebesség lakott területen',
      content: 'Pótkocsival vontatva lakott területen belül a megengedett legnagyobb sebesség 50 km/h. Ez alól nincs kivétel, még akkor sem, ha az úton magasabb sebesség lenne megengedett pótkocsi nélkül.',
      important: true,
    },
    {
      id: '2',
      category: 'Sebességkorlátozások',
      icon: Gauge,
      title: 'Maximális sebesség lakott területen kívül',
      content: 'Pótkocsival vontatva lakott területen kívül a megengedett legnagyobb sebesség 80 km/h. Ez vonatkozik az országutakra és a gyorsforgalmi utakra is.',
      important: true,
    },
    {
      id: '3',
      category: 'Sebességkorlátozások',
      icon: Gauge,
      title: 'Autópályán',
      content: 'Pótkocsival vontatva autópályán a megengedett legnagyobb sebesség 80 km/h. Fontos, hogy ez alacsonyabb, mint a pótkocsi nélküli személygépkocsik számára megengedett sebesség.',
      important: true,
    },
    {
      id: '4',
      category: 'Méretek és Tömegek',
      icon: Weight,
      title: 'Maximális össztömeg',
      content: 'BE kategóriás jogosítvánnyal 3500 kg-nál nem nehezebb vontatójárművel, 750 kg-nál nehezebb pótkocsit lehet vontatni, ha a szerelvény össztömege nem haladja meg a 4250 kg-ot. Ha a pótkocsi 750 kg-nál könnyebb, akkor a szerelvény össztömege akár 4250 kg is lehet.',
      important: true,
    },
    {
      id: '5',
      category: 'Méretek és Tömegek',
      icon: Ruler,
      title: 'Maximális hossz',
      content: 'A személygépkocsi és pótkocsi együttes hossza nem haladhatja meg a 18 métert. A pótkocsi önmagában maximum 12 méter hosszú lehet.',
    },
    {
      id: '6',
      category: 'Méretek és Tömegek',
      icon: Ruler,
      title: 'Maximális szélesség',
      content: 'A pótkocsi szélessége nem haladhatja meg a 2,55 métert. A rakomány nem lóghat ki a pótkocsi oldalából.',
    },
    {
      id: '7',
      category: 'Méretek és Tömegek',
      icon: Ruler,
      title: 'Maximális magasság',
      content: 'A szerelvény teljes magassága (vontatójármű + pótkocsi + rakomány) nem haladhatja meg a 4 métert.',
    },
    {
      id: '8',
      category: 'Előzés',
      icon: Car,
      title: 'Előzési szabályok',
      content: 'Pótkocsival vontatva autópályán és autóúton tilos a 3500 kg-nál nehezebb járműveket előzni. Lakott területen kívül kétirányú forgalmú úton csak akkor szabad előzni, ha az előzés biztonságosan befejezhető.',
      important: true,
    },
    {
      id: '9',
      category: 'Előzés',
      icon: AlertTriangle,
      title: 'Előzési tilalom',
      content: 'Tilos az előzés kanyarban, emelkedőn, gyalogátkelőhelyen és azok előtt 50 méteren belül, valamint vasúti átjáró előtt 100 méteren belül.',
    },
    {
      id: '10',
      category: 'Biztonsági Előírások',
      icon: Shield,
      title: 'Biztonsági lánc/kábel',
      content: 'A pótkocsit biztonsági lánccal vagy kábellel kell a vontatójárműhöz rögzíteni. Ez megakadályozza, hogy a pótkocsi teljesen leváljon, ha a fő csatlakozás meghibásodik.',
      important: true,
    },
    {
      id: '11',
      category: 'Biztonsági Előírások',
      icon: Shield,
      title: 'Tükrök',
      content: 'A vontatójárműnek olyan külső visszapillantó tükrökkel kell rendelkeznie, amelyek lehetővé teszik a pótkocsi mögötti és melletti terület megfigyelését. Ha szükséges, pótlólagos tükröket kell felszerelni.',
      important: true,
    },
    {
      id: '12',
      category: 'Biztonsági Előírások',
      icon: AlertTriangle,
      title: 'Világítás és jelzések',
      content: 'A pótkocsit megfelelő világítással kell ellátni: hátsó lámpák, féklámpák, irányjelzők, rendszámtábla-világítás. Minden lámpának működnie kell az indulás előtt.',
      important: true,
    },
    {
      id: '13',
      category: 'Rakodás',
      icon: Package,
      title: 'Rakomány rögzítése',
      content: 'A rakományt úgy kell elhelyezni és rögzíteni, hogy az ne mozdulhasson el, ne eshessen le, és ne veszélyeztesse a közlekedés biztonságát. A rakomány nem lóghat túl a pótkocsi végén 1 méternél többet.',
      important: true,
    },
    {
      id: '14',
      category: 'Rakodás',
      icon: Weight,
      title: 'Súlyelosztás',
      content: 'A rakomány súlyát úgy kell elosztani, hogy a pótkocsi tengelyterhelése megfelelő legyen. Általános szabály: a súly 60%-a legyen a pótkocsi elején, 40%-a hátul. A vonóhorogra eső terhelés 50-100 kg között legyen.',
    },
    {
      id: '15',
      category: 'Parkolás és Megállás',
      icon: MapPin,
      title: 'Parkolási szabályok',
      content: 'Pótkocsival vontatva tilos parkolni a járdán, gyalogúton, kerékpárúton. Lakott területen kívül a pótkocsi leválasztva csak kijelölt helyen hagyható.',
    },
    {
      id: '16',
      category: 'Parkolás és Megállás',
      icon: MapPin,
      title: 'Megállás lejtőn',
      content: 'Lejtőn vagy emelkedőn megállva a járművet rögzítőfékkel kell biztosítani, és a kerekek alá ékeket kell helyezni. A pótkocsit is rögzíteni kell.',
    },
    {
      id: '17',
      category: 'Tolatás és Kanyarodás',
      icon: Truck,
      title: 'Tolatás',
      content: 'Pótkocsival tolatni nehezebb, mert a pótkocsi ellenkező irányba fordul, mint a kormány. Lassan, óvatosan kell tolatni, és ha szükséges, segítőt kell kérni.',
    },
    {
      id: '18',
      category: 'Tolatás és Kanyarodás',
      icon: Truck,
      title: 'Kanyarodás',
      content: 'Kanyarodáskor figyelembe kell venni a pótkocsi nagyobb ívét. Éles kanyarban a pótkocsit szélesebb ívben kell vezetni, hogy ne menjen fel a járdára vagy ne ütközzön akadályba.',
    },
    {
      id: '19',
      category: 'Dokumentumok',
      icon: Shield,
      title: 'Szükséges dokumentumok',
      content: 'BE kategóriás jogosítvány, a vontatójármű és a pótkocsi forgalmi engedélye, érvényes kötelező biztosítás mindkét járműre. Ezeket mindig magaddal kell vinni.',
      important: true,
    },
    {
      id: '20',
      category: 'Különleges Helyzetek',
      icon: AlertTriangle,
      title: 'Vészhelyzet',
      content: 'Vészhelyzet esetén (pl. defekt, műszaki hiba) a szerelvényt biztonságos helyre kell állítani, figyelmeztető háromszöget kell kihelyezni (50 m-re lakott területen kívül, 100 m-re autópályán), és segítséget kell hívni.',
    },
  ]

  const filteredRules = rules.filter(
    rule =>
      rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const categories = Array.from(new Set(rules.map(rule => rule.category)))

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          KRESZ Referencia - BE Kategória
        </h2>
        <p className="text-gray-600">
          Fontos közlekedési szabályok pótkocsival való vontatáshoz
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card mb-6"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Keresés a szabályok között..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </motion.div>

      {/* Rules by Category */}
      {categories.map((category, categoryIndex) => {
        const categoryRules = filteredRules.filter(rule => rule.category === category)
        
        if (categoryRules.length === 0) return null

        return (
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
              {categoryRules.map((rule, index) => (
                <motion.div
                  key={rule.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`card cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    rule.important ? 'border-l-4 border-orange-500' : ''
                  }`}
                  onClick={() => toggleExpand(rule.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        rule.important
                          ? 'bg-gradient-to-br from-orange-500 to-red-500'
                          : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                      }`}>
                        <rule.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                          {rule.title}
                          {rule.important && (
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
                              Fontos!
                            </span>
                          )}
                        </h4>
                        <motion.div
                          animate={{ rotate: expandedId === rule.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {expandedId === rule.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </motion.div>
                      </div>
                      <AnimatePresence>
                        {expandedId === rule.id && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm text-gray-600 mt-2 leading-relaxed"
                          >
                            {rule.content}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      {expandedId !== rule.id && (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {rule.content}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      })}

      {filteredRules.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card text-center py-12"
        >
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            Nem található ilyen szabály
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Próbálj meg más keresési kifejezést használni
          </p>
        </motion.div>
      )}

      {/* Bottom Spacing for Navigation */}
      <div className="h-8"></div>
    </div>
  )
}

export default Kresz

