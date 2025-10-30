# 🚗 Ready2Tow - BE Kategória Segédlet

Modern, felhasználóbarát webalkalmazás BE kategóriás (pótkocsis/vontatós) jogosítvány megszerzéséhez és biztonságos vontatáshoz.

## ✨ Funkciók

### 📋 Indulás Előtti Ellenőrzőlista
- Interaktív ellenőrzőlista minden indulás előtt
- Kategóriákba rendezett ellenőrzési pontok
- Automatikus mentés (localStorage)
- Haladásjelző sáv
- Újrakezdés funkció
- Vizuális visszajelzés minden befejezett ellenőrzéshez

### 📚 KRESZ Referencia
- Átfogó BE kategóriás közlekedési szabályok
- Kategóriákba rendezett szabályok
- Keresési funkció
- Kinyitható/összecsukható szabálykártyák
- Fontos szabályok kiemelése
- Vizuális ikonok minden kategóriához

## 🛠️ Technológiák

- **React 18** - Modern UI könyvtár
- **TypeScript** - Típusbiztos fejlesztés
- **Vite** - Gyors build eszköz
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Sima animációk és átmenetek
- **React Router** - Kliens oldali routing
- **Lucide React** - Gyönyörű ikonok

## 🚀 Telepítés és Futtatás

### Előfeltételek
- Node.js 18+ és npm

### Helyi Fejlesztés

1. **Függőségek telepítése:**
```bash
npm install
```

2. **Fejlesztői szerver indítása:**
```bash
npm run dev
```

3. **Böngészőben megnyitás:**
Nyisd meg a böngészőt és navigálj a `http://localhost:5173` címre

### Production Build

```bash
npm run build
```

A build kimenet a `dist` mappába kerül.

### Build előnézet

```bash
npm run preview
```

## 🌐 Netlify Deployment

### Automatikus Deployment

1. **GitHub Repository létrehozása:**
   - Hozz létre egy új repository-t a GitHub-on: `https://github.com/meggyedes/ready2tow`
   - Push-old fel a kódot:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Ready2Tow app"
   git branch -M main
   git remote add origin https://github.com/meggyedes/ready2tow.git
   git push -u origin main
   ```

2. **Netlify-hoz csatlakoztatás:**
   - Jelentkezz be a [Netlify](https://netlify.com)-ba
   - Kattints a "Add new site" > "Import an existing project" gombra
   - Válaszd ki a GitHub repository-t
   - A build beállítások automatikusan felismerésre kerülnek a `netlify.toml` alapján
   - Kattints a "Deploy site" gombra

3. **Egyedi domain (opcionális):**
   - A Netlify dashboard-on navigálj a "Domain settings"-hez
   - Add hozzá az egyedi domain-t vagy használd a Netlify által generált URL-t

### Manuális Deployment

```bash
npm run build
npx netlify-cli deploy --prod --dir=dist
```

## 📱 Mobilbarát Design

Az alkalmazás mobile-first megközelítéssel készült:
- Reszponzív layout minden képernyőmérethez
- Touch-friendly interakciók
- Alsó navigációs sáv könnyű eléréshez
- Optimalizált teljesítmény mobilon

## 🎨 Testreszabás

### Színek módosítása

A színeket a `tailwind.config.js` fájlban lehet testreszabni:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Színek módosítása itt
      },
    },
  },
}
```

### Ellenőrzőlista elemek módosítása

Az ellenőrzőlista elemeket a `src/pages/Checklist.tsx` fájlban lehet szerkeszteni az `initialItems` tömbben.

### KRESZ szabályok módosítása

A KRESZ szabályokat a `src/pages/Kresz.tsx` fájlban lehet szerkeszteni a `rules` tömbben.

## 📂 Projekt Struktúra

```
ready2tow/
├── public/              # Statikus fájlok
├── src/
│   ├── components/      # React komponensek
│   │   └── Layout.tsx   # Fő layout navigációval
│   ├── pages/           # Oldal komponensek
│   │   ├── Home.tsx     # Főoldal
│   │   ├── Checklist.tsx # Ellenőrzőlista oldal
│   │   └── Kresz.tsx    # KRESZ referencia oldal
│   ├── App.tsx          # Fő App komponens
│   ├── main.tsx         # Belépési pont
│   └── index.css        # Globális stílusok
├── index.html           # HTML template
├── package.json         # Függőségek
├── vite.config.ts       # Vite konfiguráció
├── tailwind.config.js   # Tailwind konfiguráció
├── netlify.toml         # Netlify konfiguráció
└── README.md            # Ez a fájl
```

## 🔧 Fejlesztés

### Új oldal hozzáadása

1. Hozz létre egy új komponenst a `src/pages/` mappában
2. Add hozzá a route-ot az `src/App.tsx`-ben
3. Add hozzá a navigációs elemet a `src/components/Layout.tsx`-ben

### Új funkció hozzáadása

1. Hozz létre új komponenst vagy módosítsd a meglévőt
2. Használd a Framer Motion-t animációkhoz
3. Használj Tailwind CSS osztályokat a stílusozáshoz
4. Teszteld mobilon és asztali gépen is

## 📄 Licensz

Ez a projekt személyes használatra készült.

## 🤝 Közreműködés

Javaslatokat és hibajelentéseket szívesen fogadunk!

## 📞 Kapcsolat

Ha kérdésed van, nyiss egy issue-t a GitHub repository-ban.

---

**Készítve ❤️-tel a biztonságos vontatásért**

