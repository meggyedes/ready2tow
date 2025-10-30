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
}

const Checklist = () => {
  const initialItems: ChecklistItem[] = [
    {
      id: '1',
      category: 'Csatlakozás',
      iconName: 'LinkIcon',
      title: 'Vonóhorog ellenőrzése',
      description: 'Vizuálisan ellenőrizd a vonóhorog teljes állapotát. Nézd meg alaposan, hogy nincs-e rajta repedés, rozsdásodás, deformáció vagy kopás. Próbáld meg megrázni, hogy biztosan rögzítve van-e a járműhöz. A vonóhorog a legfontosabb kapcsolat a jármű és a pótkocsi között, ezért kritikus, hogy tökéletes állapotban legyen. Bármilyen sérülés vagy gyengeség katasztrofális következményekkel járhat vezetés közben.',
      checked: false,
    },
    {
      id: '2',
      category: 'Csatlakozás',
      iconName: 'Shield',
      title: 'Biztonsági lánc/kábel',
      description: 'Ellenőrizd, hogy a biztonsági lánc vagy kábel megfelelően keresztbe van-e kötve a vonóhorog alatt (X alakban). Ez megakadályozza, hogy a pótkocsi teljesen leváljon, ha a fő csatlakozás meghibásodik. A lánc ne érjen a földhöz, de legyen elég laza, hogy a kanyarodás ne legyen akadályozott. Nézd meg, hogy nincsenek-e sérült szemek vagy kopott részek a láncon.',
      checked: false,
    },
    {
      id: '3',
      category: 'Csatlakozás',
      iconName: 'LinkIcon',
      title: 'Csatlakozó golyó',
      description: 'A csatlakozó golyónak tisztának és enyhén kenve kell lennie a súrlódás csökkentése érdekében. Ellenőrizd, hogy a pótkocsi csatlakozója teljesen rácsukódott-e a golyóra, és a biztosító retesz be van-e kapcsolva. Próbáld meg felemelni a pótkocsi rúdját - nem szabad könnyen leválnia. A golyó méretének meg kell felelnie a pótkocsi csatlakozójának (általában 50mm).',
      checked: false,
    },
    {
      id: '4',
      category: 'Világítás',
      iconName: 'Lightbulb',
      title: 'Hátsó lámpák',
      description: 'Kérj meg valakit, hogy segítsen tesztelni az összes lámpát. Ellenőrizd a féklámpákat (fékezéskor), hátsó helyzetjelző lámpákat, mindkét irányjelzőt, tolatólámpát és a rendszámtábla világítást. Minden lámpának tisztának és működőképesnek kell lennie. A többi járművezető csak ezekből tudja meg a szándékaidat, ezért életbevágóan fontos, hogy minden lámpa működjön. Cseréld ki az égett izzókat azonnal.',
      checked: false,
    },
    {
      id: '5',
      category: 'Világítás',
      iconName: 'Lightbulb',
      title: 'Elektromos csatlakozás',
      description: 'Az elektromos csatlakozónak tisztának, száraznak és korróziómentesnek kell lennie. Ellenőrizd, hogy szorosan illeszkedik-e, és nincs-e laza kapcsolat. Ha piszkos, tisztítsd meg egy száraz ruhával vagy kontakt spray-vel. A rossz elektromos kapcsolat miatt a lámpák villoghatnak vagy egyáltalán nem működnek, ami balesetveszélyes. Használj vízálló csatlakozót, ha eső várható.',
      checked: false,
    },
    {
      id: '6',
      category: 'Kerekek',
      iconName: 'Gauge',
      title: 'Gumiabroncs nyomás',
      description: 'Használj gumiabroncs nyomásmérőt minden keréken, beleértve a pótkereket is. A megfelelő nyomás a pótkocsi oldalfalán vagy a gyártó útmutatójában található. A túl alacsony nyomás megnöveli a gördülési ellenállást, növeli az üzemanyag-fogyasztást és túlmelegedést okozhat, ami defekthez vezethet. A túl magas nyomás csökkenti a tapadást és egyenetlen kopást okoz. Hideg gumikon mérj, mert a meleg gumi magasabb nyomást mutat.',
      checked: false,
    },
    {
      id: '7',
      category: 'Kerekek',
      iconName: 'Gauge',
      title: 'Gumiabroncs állapot',
      description: 'Vizuálisan ellenőrizd minden gumiabroncsot. Keress repedéseket, vágásokat, dudorokat vagy egyenetlen kopást. A futófelület mintázatának legalább 1,6 mm mélynek kell lennie (törvényi minimum), de 3 mm ajánlott a biztonságos vontatáshoz. Ellenőrizd az oldalfalakat is - bármilyen sérülés veszélyes lehet. Ha a gumi 6 évnél öregebb (gyártási dátum az oldalfalon), fontold meg a cseréjét, még ha jól is néz ki.',
      checked: false,
    },
    {
      id: '8',
      category: 'Kerekek',
      iconName: 'Wrench',
      title: 'Kerékanyák',
      description: 'Ellenőrizd vizuálisan, hogy minden kerékanya a helyén van-e, és nincs-e laza. Ha nemrég cseréltél kereket vagy új pótkocsid van, használj nyomatékkulcsot a megfelelő meghúzáshoz (a gyártó által megadott nyomaték szerint, általában 100-120 Nm). Az első 50-100 km után újra ellenőrizd őket. A laza kerékanyák miatt a kerék leválhat vezetés közben, ami súlyos balesetet okozhat.',
      checked: false,
    },
    {
      id: '9',
      category: 'Tükrök',
      iconName: 'Eye',
      title: 'Külső tükrök beállítása',
      description: 'Ülj be a vezetőülésbe és állítsd be mindkét külső tükröt úgy, hogy lásd a pótkocsi teljes hosszát mindkét oldalon. A tükörben látni kell a pótkocsi oldalát és a mögötted lévő forgalmat is. Ha a pótkocsi szélesebb, mint az autó, lehet, hogy póttükrökre lesz szükséged. A holttér minimalizálása érdekében a tükröket kissé kifelé kell állítani. Jó tükör beállítás nélkül nem tudsz biztonságosan sávot váltani vagy tolatni.',
      checked: false,
    },
    {
      id: '10',
      category: 'Rakomány',
      iconName: 'Package',
      title: 'Rakomány rögzítése',
      description: 'Minden rakományt erősen rögzíteni kell hevederekkel, kötelekkel vagy hálóval. Próbáld meg megrázni a rakományt - nem szabad mozognia. Használj több rögzítési pontot és keresztbe húzott hevedereket a stabilitás érdekében. A laza rakomány elmozdulhat fékezéskor vagy kanyarodáskor, ami instabilitást okoz és balesetveszélyes. Éles tárgyakat csomagolj be, hogy ne sértsék meg a hevedereket. Hosszú tárgyakat (pl. létrák) több ponton rögzítsd.',
      checked: false,
    },
    {
      id: '11',
      category: 'Rakomány',
      iconName: 'Package',
      title: 'Súlyelosztás',
      description: 'A rakomány súlyának kb. 60%-a legyen a pótkocsi elején (a tengely előtt), 40%-a hátul. Ez biztosítja a megfelelő terhelést a vonóhorogra (50-100 kg között). Ha túl sok súly van hátul, a pótkocsi instabil lesz és "kígyózhat". Ha túl sok van elöl, túlterheli a vonóhorgot és az autó hátsó tengelyét. Használj mérleget a pontos súlyellenőrzéshez, ha lehetséges.',
      checked: false,
    },
    {
      id: '12',
      category: 'Rakomány',
      iconName: 'AlertTriangle',
      title: 'Maximális terhelés',
      description: 'Ellenőrizd a pótkocsi adattábláján a megengedett össztömeget és a terhelhetőséget. Soha ne lépd túl ezeket az értékeket! A túlterhelés megnöveli a fékutat, túlterheli a gumiabroncsokat és a felfüggesztést, és törvénytelen. BE kategóriával a teljes szerelvény (autó + pótkocsi + rakomány) nem haladhatja meg a 4250 kg-ot. Ha bizonytalan vagy, menj egy mérlegre (sok benzinkútnál van).',
      checked: false,
    },
    {
      id: '13',
      category: 'Fékek',
      iconName: 'Shield',
      title: 'Pótkocsi fékek',
      description: 'Ha a pótkocsidnak van saját fékrendszere (750 kg felett kötelező), ellenőrizd, hogy működik-e. Próbáld ki alacsony sebességnél egy biztonságos helyen - a pótkocsi fékjeinek érezhetően lassítaniuk kell. Ellenőrizd a fékfolyadék szintjét (ha hidraulikus) vagy a fékbowden kábelek állapotát (ha mechanikus). A működő pótkocsi fékek jelentősen csökkentik a fékutat és megakadályozzák, hogy a pótkocsi "tolja" az autót lejtőn vagy fékezéskor.',
      checked: false,
    },
    {
      id: '14',
      category: 'Fékek',
      iconName: 'Shield',
      title: 'Rögzítőfék',
      description: 'Ellenőrizd, hogy a pótkocsi rögzítőfékje (kézifék) megfelelően működik-e. Húzd be teljesen, majd próbáld meg eltolni a pótkocsit - nem szabad mozdulnia. Indulás előtt győződj meg róla, hogy teljesen kioldottad! A behúzott rögzítőfékkel való vezetés túlmelegíti és tönkreteszi a fékeket, és tüzet is okozhat. Lejtőn parkoláskor mindig használd a rögzítőféket és tegyél ékeket a kerekek alá is.',
      checked: false,
    },
    {
      id: '15',
      category: 'Dokumentumok',
      iconName: 'FileCheck',
      title: 'Pótkocsi papírok',
      description: 'Ellenőrizd, hogy a pótkocsi forgalmi engedélye és kötelező gépjármű-felelősségbiztosítása érvényes-e. Ezeknek az okmányoknak mindig nálad kell lenniük vezetés közben. Ellenőrizd a biztosítás lejárati dátumát - a lejárt biztosítással való közlekedés súlyos szabálysértés és büntetés jár érte. Ha bérelt pótkocsit használsz, győződj meg róla, hogy a bérleti szerződés is nálad van. Rendőri ellenőrzéskor ezeket kell felmutatnod.',
      checked: false,
    },
    {
      id: '16',
      category: 'Dokumentumok',
      iconName: 'FileCheck',
      title: 'Jogosítvány',
      description: 'Győződj meg róla, hogy a BE kategóriás jogosítványod érvényes és nálad van. A BE kategória 750 kg-nál nehezebb pótkocsi vontatásához szükséges. Ellenőrizd a jogosítvány érvényességi idejét - ha lejárt, nem vezethetsz pótkocsival. Ha 2013 előtt szerezted a B kategóriát, automatikusan jogosult vagy BE kategóriára is. Ha utána, külön vizsgát kellett tenned. Külföldi útnál ellenőrizd, hogy a jogosítványod érvényes-e az adott országban.',
      checked: false,
    },
    {
      id: '17',
      category: 'Kenés és karbantartás',
      iconName: 'Droplet',
      title: 'Vonófej és csatlakozások kenése',
      description: 'A vonóhorog gömbfejét, a csatlakozó golyót és az összes csuklós csatlakozást rendszeresen kenni kell. Használj megfelelő kenőanyagot (pl. réz- vagy grafit alapú kenőzsírt), ami csökkenti a súrlódást és megakadályozza a rozsdásodást. Ellenőrizd, hogy nincs-e túlzott kopás a mozgó részeken - a kopott alkatrészek rázkódást, zajt és instabilitást okoznak. A száraz, rozsdás csatlakozások gyorsabban kopnak és meghibásodhatnak. Sok kapcsolódási probléma innen ered, ezért ne hagyd figyelmen kívül!',
      checked: false,
    },
    {
      id: '18',
      category: 'Kenés és karbantartás',
      iconName: 'Wrench',
      title: 'Támasztó kerék (jockey wheel)',
      description: 'A pótkocsi támasztó kerekének (jockey wheel) simán kell működnie - ellenőrizd, hogy könnyen fel-le mozgatható-e, és a rögzítő csap biztonságosan tartja-e. Kend meg a csúszó részeket és a forgó kereket, ha nyikorog vagy nehezen mozog. Ellenőrizd a kerék állapotát - nem defekt-e, jól forog-e. A támasztó kerék fontos a pótkocsi biztonságos leválasztásához és csatlakoztatásához. Ha leragad vagy nem működik megfelelően, nehéz lesz manőverezni a pótkocsit.',
      checked: false,
    },
    {
      id: '19',
      category: 'Tartalék felszerelés',
      iconName: 'LifeBuoy',
      title: 'Tartalék kerék és szerszámok',
      description: 'Ellenőrizd, hogy a pótkocsihoz tartozik-e tartalék kerék, és az jó állapotban van-e (nem defekt, megfelelő nyomás, nincs túl öreg). Meglepően sokan elfelejtik, hogy az utánfutónak is kell tartalék! Győződj meg róla, hogy van emelő (jack) és kerékkulcs, ami passzol a pótkocsi kerékanyáihoz. Teszteld, hogy a kerékkulcs tényleg illeszkedik-e - sok pótkocsi más méretű anyákat használ, mint az autó. Tárold ezeket könnyen elérhető helyen, lehetőleg a pótkocsin vagy az autóban.',
      checked: false,
    },
    {
      id: '20',
      category: 'Tartalék felszerelés',
      iconName: 'Hammer',
      title: 'Rögzítő eszközök állapota',
      description: 'Vizsgáld meg alaposan az összes spanifer/heveder, rögzítő kötél és lánc állapotát. Keress kopott, szálas, szakadozó részeket a hevedereken - ezek veszélyesek és cserélni kell őket. Ellenőrizd a fém horgokat és csatokat - nincsenek-e meghajolva, repedve vagy rozsdásodva. A rozsdás vagy sérült horgok hirtelen elszakadhatnak terhelés alatt. Soha ne használj sérült rögzítő eszközöket! Mindig legyen tartalék heveder vagy kötél az autóban/pótkocsin. Jó minőségű rögzítő eszközök életet menthetnek.',
      checked: false,
    },
    {
      id: '21',
      category: 'Tartalék felszerelés',
      iconName: 'Package',
      title: 'Biztonsági felszerelés',
      description: 'Opcionális, de erősen ajánlott: tarts az autóban/pótkocsin munkakesztyűt (a kezed védelméhez hevederezéskor, kerékcsere során), fényvisszaverő mellényt (ha az út szélén kell dolgoznod), elsősegély dobozt és figyelmeztető háromszöget. Ha gyakran használod a pótkocsit, érdemes beszerezni egy kis szerszámkészletet is (csavarhúzó, fogó, szigetelőszalag, kábelkötegelő). Ezek apróságok, de kritikus helyzetben sokat segíthetnek.',
      checked: false,
    },
    {
      id: '22',
      category: 'Utolsó ellenőrzés',
      iconName: 'ClipboardCheck',
      title: 'Körbesétálás (Walk-around)',
      description: 'Mielőtt elindulsz, végezz el egy utolsó körbesétálást a teljes szerelvény körül. Nézd meg újra: vonófej biztonságosan csatlakozik, biztonsági lánc keresztbe van kötve, elektromos csatlakozó be van dugva, minden lámpa működik, kerekek jó állapotban, rakomány biztonságosan rögzítve, semmi nem lóg le vagy érint a földet. Ez az utolsó "sanity check" - sok balesetet meg lehet előzni egy gyors körbesétálással. Szokj rá, hogy ezt minden indulás előtt megteszed!',
      checked: false,
    },
    {
      id: '23',
      category: 'Utolsó ellenőrzés',
      iconName: 'AlertTriangle',
      title: 'Terhelés és stabilitás végső ellenőrzése',
      description: 'Az indulás előtt még egyszer gondold át a teljes terhelést. A pótkocsi + rakomány összsúlya nem haladhatja meg a megengedett értéket. A vonóhorogra eső terhelés (50-100 kg) megfelelő-e? A súlyelosztás helyes (60% elöl, 40% hátul)? Ha bizonytalan vagy, jobb egy mérlegre menni. Túlterhelés esetén a fékút megnő, a stabilitás csökken, és törvénysértést követsz el. Ha minden rendben, indulás után az első néhány kilométeren figyelj a pótkocsi viselkedésére - ha instabilitást, rázkódást vagy szokatlan zajt észlelsz, állj meg és ellenőrizd újra!',
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

