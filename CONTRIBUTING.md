# 🤝 Közreműködési Útmutató

Köszönjük, hogy szeretnél hozzájárulni a Ready2Tow projekthez! Ez az útmutató segít a közreműködés folyamatában.

## 📋 Tartalomjegyzék

- [Fejlesztői Környezet Beállítása](#fejlesztői-környezet-beállítása)
- [Kód Stílus](#kód-stílus)
- [Commit Üzenetek](#commit-üzenetek)
- [Pull Request Folyamat](#pull-request-folyamat)
- [Hibajelentés](#hibajelentés)
- [Funkció Javaslat](#funkció-javaslat)

## 🛠️ Fejlesztői Környezet Beállítása

### Előfeltételek
- Node.js 18 vagy újabb
- npm vagy yarn
- Git
- Kódszerkesztő (ajánlott: VS Code)

### Telepítés

1. **Fork-old a repository-t**
   - Kattints a "Fork" gombra a GitHub-on

2. **Clone-ozd a fork-ot**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ready2tow.git
   cd ready2tow
   ```

3. **Telepítsd a függőségeket**
   ```bash
   npm install
   ```

4. **Indítsd el a fejlesztői szervert**
   ```bash
   npm run dev
   ```

5. **Nyisd meg a böngészőben**
   - Navigálj a `http://localhost:5173` címre

### Hasznos Parancsok

```bash
# Fejlesztői szerver indítása
npm run dev

# Production build
npm run build

# Build előnézet
npm run preview

# Linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 🎨 Kód Stílus

### TypeScript/React

- Használj **TypeScript**-et minden új fájlhoz
- Használj **funkcionális komponenseket** és **hooks**-okat
- Használj **arrow function**-öket
- Használj **interface**-eket típusokhoz

**Példa:**
```typescript
interface ChecklistItemProps {
  id: string
  title: string
  checked: boolean
  onToggle: (id: string) => void
}

const ChecklistItem = ({ id, title, checked, onToggle }: ChecklistItemProps) => {
  return (
    <div onClick={() => onToggle(id)}>
      {checked ? '✓' : '○'} {title}
    </div>
  )
}
```

### CSS/Tailwind

- Használj **Tailwind CSS** utility osztályokat
- Kerüld az inline style-okat
- Használj a `card`, `btn-primary`, `btn-secondary` komponens osztályokat
- Használj reszponzív osztályokat (`md:`, `lg:`)

**Példa:**
```tsx
<div className="card hover:shadow-xl transition-all duration-300">
  <h3 className="text-xl font-bold text-gray-800 mb-2">
    Cím
  </h3>
  <button className="btn-primary">
    Kattints ide
  </button>
</div>
```

### Animációk

- Használj **Framer Motion**-t animációkhoz
- Tartsd az animációkat gyorsnak és simának (300ms körül)
- Használj `whileHover` és `whileTap` effekteket

**Példa:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
>
  Tartalom
</motion.div>
```

## 📝 Commit Üzenetek

Használj világos, leíró commit üzeneteket:

### Formátum
```
<típus>: <rövid leírás>

<opcionális részletes leírás>
```

### Típusok
- `feat`: Új funkció
- `fix`: Hibajavítás
- `docs`: Dokumentáció változás
- `style`: Formázás, whitespace
- `refactor`: Kód átszervezés
- `test`: Tesztek hozzáadása
- `chore`: Build, config változások

### Példák
```bash
feat: Sötét mód hozzáadása

fix: Ellenőrzőlista mentési hiba javítása

docs: README frissítése deployment útmutatóval

style: Tailwind osztályok rendezése

refactor: Checklist komponens átszervezése
```

## 🔄 Pull Request Folyamat

### 1. Branch Létrehozása

```bash
# Frissítsd a main branch-et
git checkout main
git pull origin main

# Hozz létre új branch-et
git checkout -b feature/amazing-feature
# vagy
git checkout -b fix/bug-description
```

### 2. Változtatások Készítése

- Írj tiszta, olvasható kódot
- Kövesd a kód stílus útmutatót
- Tesztelj minden változtatást
- Ellenőrizd mobilon és asztali gépen is

### 3. Commit és Push

```bash
git add .
git commit -m "feat: amazing feature hozzáadása"
git push origin feature/amazing-feature
```

### 4. Pull Request Nyitása

1. Menj a GitHub repository oldalára
2. Kattints a "Pull requests" fülre
3. Kattints a "New pull request" gombra
4. Válaszd ki a branch-edet
5. Töltsd ki a PR template-et:

```markdown
## Változtatások
- Rövid leírás a változtatásokról

## Típus
- [ ] Új funkció
- [ ] Hibajavítás
- [ ] Dokumentáció
- [ ] Egyéb

## Tesztelés
- Hogyan tesztelted a változtatásokat?

## Képernyőképek (ha releváns)
- Add hozzá a képernyőképeket
```

### 5. Code Review

- Várj a review-ra
- Válaszolj a kommentekre
- Végezd el a kért változtatásokat
- Push-old az új commit-okat

### 6. Merge

- A maintainer merge-eli a PR-t
- Törölheted a branch-et

## 🐛 Hibajelentés

Ha hibát találsz, nyiss egy issue-t:

### Issue Template

```markdown
## Hiba Leírása
Rövid, világos leírás a hibáról.

## Reprodukálás
Lépések a hiba reprodukálásához:
1. Menj a '...' oldalra
2. Kattints a '...' gombra
3. Görgess le a '...' részhez
4. Lásd a hibát

## Elvárt Viselkedés
Mi történjen helyesen?

## Tényleges Viselkedés
Mi történik valójában?

## Képernyőképek
Ha lehetséges, adj hozzá képernyőképeket.

## Környezet
- Eszköz: [pl. iPhone 12, Desktop]
- OS: [pl. iOS 15, Windows 11]
- Böngésző: [pl. Chrome 120, Safari 17]
- Verzió: [pl. 1.0.0]

## További Információk
Bármilyen más releváns információ.
```

## 💡 Funkció Javaslat

Ha új funkciót szeretnél javasolni:

### Feature Request Template

```markdown
## Funkció Leírása
Világos és tömör leírás a funkcióról.

## Probléma
Milyen problémát old meg ez a funkció?

## Javasolt Megoldás
Hogyan képzeled el a megvalósítást?

## Alternatívák
Milyen alternatív megoldásokat fontoltál meg?

## További Kontextus
Bármilyen más információ, képernyőkép, mockup.
```

## ✅ Checklist PR Előtt

Mielőtt PR-t nyitsz, ellenőrizd:

- [ ] A kód build-el hiba nélkül (`npm run build`)
- [ ] Nincs TypeScript hiba (`npx tsc --noEmit`)
- [ ] Nincs linting hiba (`npm run lint`)
- [ ] Tesztelted mobilon és asztali gépen
- [ ] Tesztelted különböző böngészőkben
- [ ] A commit üzenetek világosak
- [ ] A kód követi a stílus útmutatót
- [ ] Frissítetted a dokumentációt (ha szükséges)

## 🎯 Prioritások

### Magas Prioritás
- Biztonsági hibák
- Kritikus funkció hibák
- Teljesítmény problémák
- Accessibility problémák

### Közepes Prioritás
- Új funkciók
- UI/UX fejlesztések
- Dokumentáció frissítések

### Alacsony Prioritás
- Kód refaktorálás
- Apró vizuális változtatások
- Nice-to-have funkciók

## 📚 Hasznos Források

- [React Dokumentáció](https://react.dev/)
- [TypeScript Dokumentáció](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Dokumentáció](https://tailwindcss.com/docs)
- [Framer Motion Dokumentáció](https://www.framer.com/motion/)
- [Vite Dokumentáció](https://vitejs.dev/)

## 🙏 Köszönet

Köszönjük minden közreműködőnek, aki segít jobbá tenni a Ready2Tow-t!

---

**Boldog kódolást! 🚀**

