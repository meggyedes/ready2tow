# 🚗🔗🚛 Ready2Tow - BE Kategóriás Vontatási Segédeszköz

Egy modern, interaktív webalkalmazás, amely segít a BE kategóriás (pótkocsi/vontatás) jogosítvány szerzésében és a biztonságos vontatásban.

## 📋 Tartalom

- [Jellemzők](#jellemzők)
- [Telepítés](#telepítés)
- [Használat](#használat)
- [Projekt Szerkezete](#projekt-szerkezete)
- [Technológiák](#technológiák)
- [Oldalak](#oldalak)

## ✨ Jellemzők

### 🎯 Ellenőrzőlista (Checklist)
- **Interaktív ellenőrzőlista** az indulás előtti vizsgálatokhoz
- **Országválasztó** - válassz ki több országot, ahol vontatni fogsz
- **Dinamikus szabályok** - az ellenőrzőlista automatikusan frissül a kiválasztott országok alapján
- **Kategóriák szerinti csoportosítás**:
  - Csatlakozás és vonófej
  - Világítás és elektromos
  - Kerekek és futómű
  - Indulás előtti ellenőrzés
  - Nemzetközi szabályok (országonként)
- **Haladásjelzés** - vizuális feedback az elvégzett feladatokról
- **Automatikus mentés** - localStorage-ba menti az állapotot
- **Konfetti animáció** - ünneplés az összes feladat befejezésekor

### 📚 KRESZ Referencia
- **Magyar szabályok** - BE kategóriás közlekedési szabályok
- **Nemzetközi szabályok** - 9 ország közlekedési előírásai:
  - 🇳🇱 Hollandia
  - 🇩🇪 Németország
  - 🇦🇹 Ausztria
  - 🇨🇭 Svájc
  - 🇱🇺 Luxemburg
  - 🇮🇹 Olaszország
  - 🇨🇿 Csehország
  - 🇵🇱 Lengyelország
  - 🇸🇰 Szlovákia
- **Keresési funkció** - gyors szabálykereső
- **Kategóriák szerinti szűrés**
- **Zászló ikonok** - vizuális azonosítás

### 🏠 Kezdőoldal
- Projekt bemutatása
- Navigáció az oldalak között
- Rövid leírás az egyes funkciókról

## 🚀 Telepítés

### Előfeltételek
- Node.js 16+ verzió
- npm vagy yarn

### Lépések

1. **Klónozd a projektet**
``ash
git clone <repository-url>
cd BE_gyorstalpalo
``

2. **Telepítsd a függőségeket**
``ash
npm install
``

3. **Indítsd el a fejlesztői szervert**
``ash
npm run dev
``

Az alkalmazás a http://localhost:5173 címen lesz elérhető.

## 💻 Használat

### Ellenőrzőlista
1. Nyisd meg az **Ellenőrzőlista** oldalt
2. Az **Utazási Útvonal** szekciónál válassz ki országokat
3. Az ellenőrzőlista automatikusan frissül az adott ország szabályaival
4. Jelöld meg az elvégzett feladatokat
5. Kövesd a haladást a felső sávon

### KRESZ Referencia
1. Nyisd meg a **KRESZ Referencia** oldalt
2. Keress rá egy szabályra a keresőmezővel
3. Kattints egy szabályra a részletek megtekintéséhez
4. Böngéssz az országok között

## 📁 Projekt Szerkezete

``
src/
├── pages/
│   ├── Home.tsx           # Kezdőoldal
│   ├── Checklist.tsx      # Ellenőrzőlista oldal
│   └── Kresz.tsx          # KRESZ referencia oldal
├── components/
│   └── Layout.tsx         # Fő layout komponens
├── constants/
│   └── internationalRules.ts  # Nemzetközi szabályok adatai
├── App.tsx                # Fő alkalmazás komponens
├── main.tsx               # Belépési pont
└── index.css              # Globális stílusok
``

## 🛠️ Technológiák

- **React 18** - UI keretrendszer
- **TypeScript** - Típusbiztos JavaScript
- **Vite** - Gyors build eszköz
- **Tailwind CSS** - Utility-first CSS keretrendszer
- **Framer Motion** - Animációs könyvtár
- **React Router** - Oldal navigáció
- **Lucide React** - Ikon könyvtár
- **flag-icons** - Ország zászló ikonok

## 📄 Oldalak

### Home (/)
A projekt kezdőoldala, amely bemutatja az alkalmazás fő funkcióit és lehetőségeit.

### Checklist (/checklist)
Interaktív ellenőrzőlista az indulás előtti vizsgálatokhoz. Támogatja az országválasztást és dinamikus szabályok betöltését.

**Funkciók:**
- Országválasztó (Magyarország alapértelmezetten kiválasztva)
- Dinamikus checklist elemek
- Haladásjelzés
- Automatikus mentés
- Kategóriák szerinti csoportosítás

### Kresz (/kresz)
Részletes KRESZ referencia magyar és nemzetközi szabályokkal.

**Funkciók:**
- Keresési funkció
- Kategóriák szerinti szűrés
- Zászló ikonok
- Kiterjeszthető szabályok

## 🔧 Fejlesztés

### Build
``ash
npm run build
``

### Linting
``ash
npm run lint
``

### Preview
``ash
npm run preview
``

## 📝 Megjegyzések

- Az alkalmazás teljes mértékben reszponzív és mobilbarát
- Az összes adat a böngésző localStorage-ában tárolódik
- Az alkalmazás offline is működik (az adatok már betöltve vannak)

## 📞 Támogatás

Ha kérdéseid vagy javaslataid vannak, kérjük, nyiss egy issue-t a projektben.

---

**Verzió:** 1.0.0  
**Utolsó frissítés:** 2025. november
