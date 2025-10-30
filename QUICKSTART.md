# ⚡ Gyors Kezdés - Ready2Tow

Ez az útmutató 5 perc alatt elindítja a Ready2Tow alkalmazást a gépeden.

## 📦 1. Előfeltételek Ellenőrzése

Ellenőrizd, hogy telepítve van-e a Node.js:

```bash
node --version
```

Ha nincs telepítve, töltsd le innen: https://nodejs.org/ (LTS verzió ajánlott)

## 🚀 2. Projekt Indítása (3 lépés)

### Lépés 1: Függőségek telepítése
```bash
npm install
```
⏱️ Ez kb. 30-60 másodpercet vesz igénybe.

### Lépés 2: Fejlesztői szerver indítása
```bash
npm run dev
```
⏱️ Ez kb. 2-3 másodpercet vesz igénybe.

### Lépés 3: Böngésző megnyitása
Nyisd meg a böngészőt és menj a következő címre:
```
http://localhost:5173
```

## 🎉 Kész!

Az alkalmazás most fut a gépeden. Látni fogod:
- 🏠 **Főoldal** - Üdvözlő képernyő
- ✅ **Ellenőrzőlista** - Interaktív checklist
- 📚 **KRESZ** - Közlekedési szabályok

## 🔧 Hasznos Parancsok

### Fejlesztés
```bash
# Szerver indítása (hot reload-dal)
npm run dev

# Szerver leállítása
Ctrl + C (vagy Cmd + C Mac-en)
```

### Build
```bash
# Production build készítése
npm run build

# Build előnézet
npm run preview
```

### Kód Minőség
```bash
# Linting
npm run lint

# TypeScript ellenőrzés
npx tsc --noEmit
```

## 📱 Mobilon Tesztelés

### Ugyanazon a hálózaton:

1. **Találd meg a gép IP címét:**

   **Windows:**
   ```bash
   ipconfig
   ```
   Keresd az "IPv4 Address" sort (pl. 192.168.1.100)

   **Mac/Linux:**
   ```bash
   ifconfig
   ```
   Keresd az "inet" sort (pl. 192.168.1.100)

2. **Indítsd el a szervert host móddal:**
   ```bash
   npm run dev -- --host
   ```

3. **Nyisd meg mobilon:**
   ```
   http://[IP_CÍM]:5173
   ```
   Például: `http://192.168.1.100:5173`

## 🐛 Gyakori Problémák

### Port már használatban
Ha a 5173-as port foglalt:
```bash
# Használj másik portot
npm run dev -- --port 3000
```

### Node verzió hiba
Ha régi Node verziód van:
```bash
# Ellenőrizd a verziót
node --version

# Frissítsd a Node.js-t a nodejs.org oldalról
```

### npm install hiba
Ha a telepítés sikertelen:
```bash
# Töröld a node_modules mappát és próbáld újra
rm -rf node_modules package-lock.json
npm install
```

### Böngésző nem tölt be
1. Ellenőrizd, hogy a szerver fut-e
2. Próbáld meg újratölteni (Ctrl+R vagy Cmd+R)
3. Töröld a böngésző cache-t
4. Próbálj inkognitó módot

## 📂 Projekt Struktúra

```
ready2tow/
├── src/
│   ├── components/     # React komponensek
│   ├── pages/          # Oldal komponensek
│   ├── App.tsx         # Fő app
│   └── main.tsx        # Belépési pont
├── public/             # Statikus fájlok
├── index.html          # HTML template
└── package.json        # Függőségek
```

## 🎨 Testreszabás

### Színek módosítása
Szerkeszd a `tailwind.config.js` fájlt:
```javascript
colors: {
  primary: {
    500: '#0ea5e9', // Változtasd meg ezt
  },
}
```

### Ellenőrzőlista módosítása
Szerkeszd a `src/pages/Checklist.tsx` fájlt:
```typescript
const initialItems = [
  {
    id: '1',
    category: 'Új Kategória',
    title: 'Új Elem',
    description: 'Leírás',
    // ...
  },
]
```

### KRESZ szabályok módosítása
Szerkeszd a `src/pages/Kresz.tsx` fájlt:
```typescript
const rules = [
  {
    id: '1',
    category: 'Új Kategória',
    title: 'Új Szabály',
    content: 'Tartalom',
    // ...
  },
]
```

## 🚀 Következő Lépések

1. **Nézd meg a kódot** - Fedezd fel a `src/` mappát
2. **Próbálj ki változtatásokat** - A hot reload automatikusan frissít
3. **Olvasd el a dokumentációt** - Nézd meg a `README.md` fájlt
4. **Deploy-old** - Kövesd a `DEPLOYMENT.md` útmutatót

## 📚 További Dokumentáció

- [README.md](README.md) - Teljes dokumentáció
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment útmutató
- [FEATURES.md](FEATURES.md) - Funkciók részletesen
- [CONTRIBUTING.md](CONTRIBUTING.md) - Közreműködési útmutató

## 💬 Segítség

Ha elakadtál:
1. Nézd meg a dokumentációt
2. Ellenőrizd a konzol hibákat
3. Nyiss egy issue-t a GitHub-on

## 🎓 Tanulási Források

- [React Tutorial](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

---

**Boldog kódolást! 🚗💨**

