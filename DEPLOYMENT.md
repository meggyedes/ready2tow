# 🚀 Deployment Guide - Ready2Tow

Ez az útmutató lépésről lépésre bemutatja, hogyan kell a Ready2Tow alkalmazást GitHub-ra feltölteni és Netlify-on publikálni.

## 📋 Előfeltételek

- [Git](https://git-scm.com/) telepítve
- [GitHub](https://github.com/) fiók
- [Netlify](https://netlify.com/) fiók (ingyenes)

## 1️⃣ GitHub Repository Létrehozása és Feltöltés

### Lépések:

1. **GitHub Repository létrehozása:**
   - Menj a [GitHub](https://github.com/) oldalra és jelentkezz be
   - Kattints a jobb felső sarokban a `+` ikonra, majd válaszd a "New repository" opciót
   - Repository név: `ready2tow`
   - Leírás: "BE kategóriás jogosítvány segédlet - Vontatási ellenőrzőlista és KRESZ referencia"
   - Válaszd a "Public" vagy "Private" opciót (ajánlott: Public)
   - **NE** pipáld be a "Initialize this repository with a README" opciót
   - Kattints a "Create repository" gombra

2. **Helyi Git inicializálás és feltöltés:**

Nyisd meg a terminált a projekt mappájában és futtasd az alábbi parancsokat:

```bash
# Git inicializálás
git init

# Fájlok hozzáadása
git add .

# Első commit
git commit -m "Initial commit: Ready2Tow alkalmazás - BE kategória segédlet"

# Branch átnevezése main-re
git branch -M main

# Remote repository hozzáadása
git remote add origin https://github.com/meggyedes/ready2tow.git

# Feltöltés GitHub-ra
git push -u origin main
```

3. **Ellenőrzés:**
   - Menj vissza a GitHub repository oldalára
   - Frissítsd az oldalt (F5)
   - Látnod kell az összes fájlt

## 2️⃣ Netlify Deployment

### Automatikus Deployment GitHub-ról:

1. **Netlify bejelentkezés:**
   - Menj a [Netlify](https://netlify.com/) oldalra
   - Jelentkezz be (használhatod a GitHub fiókodat)

2. **Új site létrehozása:**
   - Kattints az "Add new site" gombra
   - Válaszd az "Import an existing project" opciót
   - Válaszd a "Deploy with GitHub" opciót
   - Engedélyezd a Netlify hozzáférését a GitHub fiókodhoz
   - Keresd meg és válaszd ki a `ready2tow` repository-t

3. **Build beállítások:**
   A Netlify automatikusan felismeri a beállításokat a `netlify.toml` fájl alapján:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Base directory:** (hagyd üresen)

4. **Deploy indítása:**
   - Kattints a "Deploy site" gombra
   - Várj, amíg a build befejeződik (1-3 perc)
   - A site élő lesz egy automatikusan generált URL-en (pl. `random-name-123456.netlify.app`)

5. **Egyedi domain beállítása (opcionális):**
   - A Netlify dashboard-on kattints a "Domain settings" gombra
   - Kattints a "Options" > "Edit site name" gombra
   - Adj meg egy egyedi nevet (pl. `ready2tow`)
   - Az új URL: `ready2tow.netlify.app`

### Manuális Deployment (alternatíva):

Ha nem szeretnéd GitHub-hoz kötni:

```bash
# Netlify CLI telepítése (csak egyszer kell)
npm install -g netlify-cli

# Bejelentkezés
netlify login

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

## 3️⃣ Automatikus Újra-Deployment

Ha GitHub-hoz kötötted a Netlify-t:
- Minden alkalommal, amikor push-olsz a `main` branch-re, a Netlify automatikusan újra-build-eli és deploy-olja az alkalmazást
- Nincs szükség manuális beavatkozásra

```bash
# Változtatások után:
git add .
git commit -m "Leírás a változtatásokról"
git push
```

## 4️⃣ Környezeti Változók (ha szükséges)

Ha később API kulcsokat vagy más környezeti változókat szeretnél használni:

1. Netlify dashboard > Site settings > Environment variables
2. Add hozzá a változókat
3. Rebuild the site

## 5️⃣ Egyedi Domain Hozzáadása (opcionális)

Ha saját domain-ed van:

1. Netlify dashboard > Domain settings
2. Add custom domain
3. Kövesd az utasításokat a DNS beállításokhoz
4. Várj a DNS propagációra (akár 24 óra is lehet)

## 🔧 Hibaelhárítás

### Build hiba:
- Ellenőrizd, hogy minden függőség telepítve van: `npm install`
- Próbáld meg lokálisan build-elni: `npm run build`
- Nézd meg a Netlify build log-okat

### Routing hiba (404 error):
- Ellenőrizd, hogy a `netlify.toml` fájl létezik és tartalmazza a redirect szabályokat

### Lassú betöltés:
- A Netlify CDN-t használ, az első betöltés lehet lassabb
- Ellenőrizd a képek és asset-ek méretét

## 📱 Tesztelés

Deployment után teszteld az alkalmazást:
- ✅ Főoldal betöltődik
- ✅ Navigáció működik (Főoldal, Ellenőrzőlista, KRESZ)
- ✅ Ellenőrzőlista elemek kipipálhatók
- ✅ Ellenőrzőlista állapot megmarad újratöltés után
- ✅ KRESZ keresés működik
- ✅ Mobilon is jól néz ki és működik

## 🎉 Kész!

Az alkalmazásod most élő és elérhető az interneten!

### Hasznos linkek:
- **GitHub Repository:** https://github.com/meggyedes/ready2tow
- **Netlify Dashboard:** https://app.netlify.com/
- **Élő alkalmazás:** (a Netlify által generált URL)

---

**Gratulálunk! 🚗🎉**

