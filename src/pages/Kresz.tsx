import { useState, useMemo } from 'react'
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
import 'flag-icons/css/flag-icons.min.css'

interface KreszRule {
  id: string
  category: string
  country?: string
  icon: React.ComponentType<any>
  title: string
  content: string
  important?: boolean
}

// Helper function to get country flag code for flag-icons
const getCountryFlagCode = (country: string): string => {
  const flagCodes: { [key: string]: string } = {
    'Hollandia': 'nl',
    'Németország': 'de',
    'Ausztria': 'at',
    'Svájc': 'ch',
    'Luxemburg': 'lu',
    'Olaszország': 'it',
    'Csehország': 'cz',
    'Lengyelország': 'pl',
    'Szlovákia': 'sk',
  }
  return flagCodes[country] || 'un'
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

    // ===== NEMZETKÖZI KÖZLEKEDÉSI SZABÁLYOK =====

    // HOLLANDIA
    {
      id: '21',
      country: 'Hollandia',
      category: 'Sebességkorlátozások',
      icon: Gauge,
      title: 'Maximális sebesség lakott területen',
      content: 'Hollandiában pótkocsival vontatva lakott területen (30 km/h vagy 50 km/h zónában) a megengedett sebesség 50 km/h. Az autópályákon (snelwegen) a maximális sebesség 100 km/h pótkocsival.',
      important: true,
    },
    {
      id: '22',
      country: 'Hollandia',
      category: 'Sebességkorlátozások',
      icon: Gauge,
      title: 'Autópálya sebességkorlátozás',
      content: 'Hollandiában az autópályákon pótkocsival a maximális sebesség 100 km/h. Éjszaka (22:00-06:00) és rossz időben a sebesség még alacsonyabb lehet.',
      important: true,
    },
    {
      id: '23',
      country: 'Hollandia',
      category: 'Kötelező Felszerelések',
      icon: Shield,
      title: 'Kötelező felszerelések',
      content: 'Hollandiában kötelező: sárga mellény (minden utasnak), figyelmeztető háromszög, tartalék izzók, biztosítékok, első és hátsó ködlámpa, valamint nemzetközi útlevél vagy személyi igazolvány.',
      important: true,
    },
    {
      id: '24',
      country: 'Hollandia',
      category: 'Díjak és Úthasználat',
      icon: MapPin,
      title: 'Úthasználati díjak',
      content: 'Hollandiában nincs úthasználati díj az autópályákon. Az ország díjmentes közlekedésre. Azonban a parkolás városokban drága lehet.',
    },
    {
      id: '25',
      country: 'Hollandia',
      category: 'Különleges Szabályok',
      icon: AlertTriangle,
      title: 'Kerékpáros sávok',
      content: 'Hollandiában nagyon fontos a kerékpáros sávok tiszteletben tartása. Tilos a kerékpáros sávba parkolni vagy abban közlekedni. A kerékpárosok jogai nagyon erősek.',
    },

    // NÉMETORSZÁG
    {
      id: '26',
      country: 'Németország',
      category: 'Sebességkorlátozások',
      icon: Gauge,
      title: 'Autópálya sebességkorlátozás',
      content: 'Németországban az autópályákon (Autobahn) pótkocsival a megengedett sebesség 100 km/h. Lakott területen kívül 80 km/h, lakott területen 50 km/h.',
      important: true,
    },
    {
      id: '27',
      country: 'Németország',
      category: 'Kötelező Felszerelések',
      icon: Shield,
      title: 'Kötelező felszerelések',
      content: 'Németországban kötelező: sárga mellény (minden utasnak), figyelmeztető háromszög (2 db), tartalék izzók, biztosítékok, első és hátsó ködlámpa, valamint nemzetközi útlevél.',
      important: true,
    },
    {
      id: '28',
      country: 'Németország',
      category: 'Díjak és Úthasználat',
      icon: MapPin,
      title: 'Úthasználati díjak',
      content: 'Németországban az autópályákon (Autobahn) nincs úthasználati díj személygépkocsiknak. Azonban nagyobb járműveknek (3,5 t felett) Maut díjat kell fizetni elektronikus rendszeren keresztül.',
    },
    {
      id: '29',
      country: 'Németország',
      category: 'Különleges Szabályok',
      icon: AlertTriangle,
      title: 'Jobboldali közlekedés és előzés',
      content: 'Németországban szigorú az előzési szabály: csak balról szabad előzni. Az autópályákon a jobb sáv a normál közlekedésé, a bal sáv az előzésé. Az előzés után vissza kell térni a jobb sávra.',
      important: true,
    },

    // AUSZTRIA
    {
      id: '30',
      country: 'Ausztria',
      category: 'Sebességkorlátozások',
      icon: Gauge,
      title: 'Autópálya sebességkorlátozás',
      content: 'Ausztriában az autópályákon (Autobahn) pótkocsival a megengedett sebesség 100 km/h. Lakott területen kívül 80 km/h, lakott területen 50 km/h.',
      important: true,
    },
    {
      id: '31',
      country: 'Ausztria',
      category: 'Díjak és Úthasználat',
      icon: MapPin,
      title: 'Úthasználati díjak - Vignetta',
      content: 'Ausztriában kötelező a vignetta (matrica) az autópályákon. 10 napos, 2 hónapos vagy éves vignetta érhető el. A vignetta nélküli közlekedés magas bírságot von maga után. Pótkocsival is szükséges!',
      important: true,
    },
    {
      id: '32',
      country: 'Ausztria',
      category: 'Kötelező Felszerelések',
      icon: Shield,
      title: 'Kötelező felszerelések',
      content: 'Ausztriában kötelező: sárga mellény (minden utasnak), figyelmeztető háromszög, tartalék izzók, biztosítékok, első és hátsó ködlámpa, valamint nemzetközi útlevél.',
      important: true,
    },
    {
      id: '33',
      country: 'Ausztria',
      category: 'Különleges Szabályok',
      icon: AlertTriangle,
      title: 'Téli felszerelés',
      content: 'Ausztriában november 1-től április 15-ig kötelező a téli gumi vagy lánc, ha hó vagy jég van az úton. A pótkocsit is fel kell szerelni téli gumikkal vagy lánccal.',
    },

    // SVÁJC
    {
      id: '34',
      country: 'Svájc',
      category: 'Sebességkorlátozások',
      icon: Gauge,
      title: 'Autópálya sebességkorlátozás',
      content: 'Svájcban az autópályákon (Autobahn) pótkocsival a megengedett sebesség 100 km/h. Lakott területen kívül 80 km/h, lakott területen 50 km/h.',
      important: true,
    },
    {
      id: '35',
      country: 'Svájc',
      category: 'Díjak és Úthasználat',
      icon: MapPin,
      title: 'Úthasználati díjak - Vignetta',
      content: 'Svájcban kötelező a vignetta (matrica) az autópályákon. Éves vignetta szükséges, amely december 31-ig érvényes. A vignetta nélküli közlekedés magas bírságot von maga után. Pótkocsival is szükséges!',
      important: true,
    },
    {
      id: '36',
      country: 'Svájc',
      category: 'Kötelező Felszerelések',
      icon: Shield,
      title: 'Kötelező felszerelések',
      content: 'Svájcban kötelező: sárga mellény (minden utasnak), figyelmeztető háromszög, tartalék izzók, biztosítékok, valamint nemzetközi útlevél. Téli időszakban téli gumi vagy lánc kötelező.',
      important: true,
    },
    {
      id: '37',
      country: 'Svájc',
      category: 'Különleges Szabályok',
      icon: AlertTriangle,
      title: 'Hegyi utak és alagút díjak',
      content: 'Svájcban egyes hegyi utak és alagutak (pl. San Gotthard) díjasak. A díjat előre vagy az alagút előtt kell megfizetni. Pótkocsival is fizetni kell.',
    },

    // LUXEMBURG
    {
      id: '38',
      country: 'Luxemburg',
      category: 'Sebességkorlátozások',
      icon: Gauge,
      title: 'Autópálya sebességkorlátozás',
      content: 'Luxemburgban az autópályákon pótkocsival a megengedett sebesség 90 km/h. Lakott területen kívül 90 km/h, lakott területen 50 km/h.',
      important: true,
    },
    {
      id: '39',
      country: 'Luxemburg',
      category: 'Díjak és Úthasználat',
      icon: MapPin,
      title: 'Úthasználati díjak',
      content: 'Luxemburgban nincs úthasználati díj az autópályákon. Az ország díjmentes közlekedésre. Azonban a parkolás városokban drága lehet.',
    },
    {
      id: '40',
      country: 'Luxemburg',
      category: 'Kötelező Felszerelések',
      icon: Shield,
      title: 'Kötelező felszerelések',
      content: 'Luxemburgban kötelező: sárga mellény (minden utasnak), figyelmeztető háromszög, tartalék izzók, biztosítékok, valamint nemzetközi útlevél.',
    },

    // OLASZORSZÁG
    {
      id: '41',
      country: 'Olaszország',
      category: 'Sebességkorlátozások',
      icon: Gauge,
      title: 'Autópálya sebességkorlátozás',
      content: 'Olaszországban az autópályákon (Autostrada) pótkocsival a megengedett sebesség 100 km/h. Lakott területen kívül 90 km/h, lakott területen 50 km/h.',
      important: true,
    },
    {
      id: '42',
      country: 'Olaszország',
      category: 'Díjak és Úthasználat',
      icon: MapPin,
      title: 'Úthasználati díjak - Autostrada',
      content: 'Olaszországban az autópályákon (Autostrada) úthasználati díjat kell fizetni. A díj a távolság és a jármű kategóriája alapján számítódik. Pótkocsival magasabb díj. Elektronikus vagy készpénz fizetés lehetséges.',
      important: true,
    },
    {
      id: '43',
      country: 'Olaszország',
      category: 'Kötelező Felszerelések',
      icon: Shield,
      title: 'Kötelező felszerelések',
      content: 'Olaszországban kötelező: sárga mellény (minden utasnak), figyelmeztető háromszög, tartalék izzók, biztosítékok, valamint nemzetközi útlevél. Nappali világítás is kötelező.',
      important: true,
    },
    {
      id: '44',
      country: 'Olaszország',
      category: 'Különleges Szabályok',
      icon: AlertTriangle,
      title: 'Nappali világítás és sebességmérés',
      content: 'Olaszországban kötelező a nappali világítás (dipped headlights). Szigorú sebességmérés van, különösen az autópályákon. A sebességtúllépés magas bírságot von maga után.',
    },

    // CSEHORSZÁG
    {
      id: '45',
      country: 'Csehország',
      category: 'Sebességkorlátozások',
      icon: Gauge,
      title: 'Autópálya sebességkorlátozás',
      content: 'Csehországban az autópályákon (Dálnice) pótkocsival a megengedett sebesség 100 km/h. Lakott területen kívül 90 km/h, lakott területen 50 km/h.',
      important: true,
    },
    {
      id: '46',
      country: 'Csehország',
      category: 'Díjak és Úthasználat',
      icon: MapPin,
      title: 'Úthasználati díjak - Matrica',
      content: 'Csehországban kötelező a matrica (dálniční známka) az autópályákon. 10 napos, 30 napos vagy éves matrica érhető el. A matrica nélküli közlekedés magas bírságot von maga után. Pótkocsival is szükséges!',
      important: true,
    },
    {
      id: '47',
      country: 'Csehország',
      category: 'Kötelező Felszerelések',
      icon: Shield,
      title: 'Kötelező felszerelések',
      content: 'Csehországban kötelező: sárga mellény (minden utasnak), figyelmeztető háromszög, tartalék izzók, biztosítékok, valamint nemzetközi útlevél. Téli időszakban téli gumi kötelező.',
      important: true,
    },
    {
      id: '48',
      country: 'Csehország',
      category: 'Különleges Szabályok',
      icon: AlertTriangle,
      title: 'Téli felszerelés és fényszóró',
      content: 'Csehországban november 1-től március 31-ig kötelező a téli gumi. Nappali világítás (dipped headlights) is kötelező. Az autópályákon szigorú sebességmérés van.',
    },

    // LENGYELORSZÁG
    {
      id: '49',
      country: 'Lengyelország',
      category: 'Sebességkorlátozások',
      icon: Gauge,
      title: 'Autópálya sebességkorlátozás',
      content: 'Lengyelországban az autópályákon (Autostrada) pótkocsival a megengedett sebesség 100 km/h. Lakott területen kívül 90 km/h, lakott területen 50 km/h.',
      important: true,
    },
    {
      id: '50',
      country: 'Lengyelország',
      category: 'Díjak és Úthasználat',
      icon: MapPin,
      title: 'Úthasználati díjak - Matrica',
      content: 'Lengyelországban kötelező a matrica (nalepka) az autópályákon. 10 napos, 30 napos vagy éves matrica érhető el. A matrica nélküli közlekedés magas bírságot von maga után. Pótkocsival is szükséges!',
      important: true,
    },
    {
      id: '51',
      country: 'Lengyelország',
      category: 'Kötelező Felszerelések',
      icon: Shield,
      title: 'Kötelező felszerelések',
      content: 'Lengyelországban kötelező: sárga mellény (minden utasnak), figyelmeztető háromszög, tartalék izzók, biztosítékok, valamint nemzetközi útlevél. Nappali világítás is kötelező.',
      important: true,
    },
    {
      id: '52',
      country: 'Lengyelország',
      category: 'Különleges Szabályok',
      icon: AlertTriangle,
      title: 'Nappali világítás és sebességmérés',
      content: 'Lengyelországban kötelező a nappali világítás (dipped headlights). Szigorú sebességmérés van, különösen az autópályákon. A sebességtúllépés magas bírságot von maga után.',
    },

    // SZLOVÁKIA
    {
      id: '53',
      country: 'Szlovákia',
      category: 'Sebességkorlátozások',
      icon: Gauge,
      title: 'Autópálya sebességkorlátozás',
      content: 'Szlovákiában az autópályákon (Diaľnica) pótkocsival a megengedett sebesség 100 km/h. Lakott területen kívül 90 km/h, lakott területen 50 km/h.',
      important: true,
    },
    {
      id: '54',
      country: 'Szlovákia',
      category: 'Díjak és Úthasználat',
      icon: MapPin,
      title: 'Úthasználati díjak - Matrica',
      content: 'Szlovákiában kötelező a matrica (známka) az autópályákon. 10 napos, 30 napos vagy éves matrica érhető el. A matrica nélküli közlekedés magas bírságot von maga után. Pótkocsival is szükséges!',
      important: true,
    },
    {
      id: '55',
      country: 'Szlovákia',
      category: 'Kötelező Felszerelések',
      icon: Shield,
      title: 'Kötelező felszerelések',
      content: 'Szlovákiában kötelező: sárga mellény (minden utasnak), figyelmeztető háromszög, tartalék izzók, biztosítékok, valamint nemzetközi útlevél. Téli időszakban téli gumi kötelező.',
      important: true,
    },
    {
      id: '56',
      country: 'Szlovákia',
      category: 'Különleges Szabályok',
      icon: AlertTriangle,
      title: 'Téli felszerelés és fényszóró',
      content: 'Szlovákiában november 15-től március 15-ig kötelező a téli gumi. Nappali világítás (dipped headlights) is kötelező. Az autópályákon szigorú sebességmérés van.',
    },
  ]

  // Memoize filtered rules to avoid recalculating on every render
  const filteredRules = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase()
    return rules.filter(
      rule =>
        rule.title.toLowerCase().includes(lowerSearch) ||
        rule.content.toLowerCase().includes(lowerSearch) ||
        rule.category.toLowerCase().includes(lowerSearch) ||
        (rule.country && rule.country.toLowerCase().includes(lowerSearch))
    )
  }, [searchTerm, rules])

  // Separate Hungarian and International rules
  const hungarianRules = useMemo(
    () => filteredRules.filter(rule => !rule.country),
    [filteredRules]
  )

  const internationalRules = useMemo(
    () => filteredRules.filter(rule => rule.country),
    [filteredRules]
  )

  // Get unique countries from international rules
  const countries = useMemo(
    () => Array.from(new Set(internationalRules.map(rule => rule.country).filter((c): c is string => Boolean(c)))).sort(),
    [internationalRules]
  )

  // Memoize categories extraction for Hungarian rules
  const hungarianCategories = useMemo(
    () => Array.from(new Set(hungarianRules.map(rule => rule.category))),
    [hungarianRules]
  )

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

      {/* Hungarian Rules Section */}
      {hungarianRules.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <div className="fib fi-hu" style={{ width: '32px', height: '24px' }}></div>
            Magyarország
          </h2>

          {hungarianCategories.map((category, categoryIndex) => {
            const categoryRules = hungarianRules.filter(rule => rule.category === category)

            if (categoryRules.length === 0) return null

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.05 }}
                className="mb-4"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-2 pt-2 flex items-center">

                  {category}
                </h3>
                <div className="space-y-2">
                  {categoryRules.map((rule, index) => (
                <motion.div
                  key={rule.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`card cursor-pointer transition-all duration-300 hover:shadow-xl border-l-4 ${
                    rule.important ? 'border-orange-500' : 'border-blue-500'
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
        </motion.div>
      )}

      {/* International Rules Section */}
      {countries.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">Nemzetközi Szabályok
          </h2>

          {countries.map((country, countryIndex) => {
            const countryRules = internationalRules.filter(rule => rule.country === country)

            if (countryRules.length === 0) return null

            return (
              <motion.div
                key={country}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + countryIndex * 0.1 }}
                className="mb-6"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3 pt-4 flex items-center gap-3">
                  <div className={`fib fi-${getCountryFlagCode(country)}`} style={{ width: '32px', height: '24px' }}></div>
                  {country}
                </h3>
                <div className="space-y-2">
                  {countryRules.map((rule, index) => (
                    <motion.div
                      key={rule.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + countryIndex * 0.1 + index * 0.05 }}
                      className={`card cursor-pointer transition-all duration-300 hover:shadow-xl border-l-4 ${
                        rule.important ? 'border-orange-500' : 'border-green-500'
                      }`}
                      onClick={() => toggleExpand(rule.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            rule.important
                              ? 'bg-gradient-to-br from-orange-500 to-red-500'
                              : 'bg-gradient-to-br from-green-500 to-emerald-500'
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
        </motion.div>
      )}

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

