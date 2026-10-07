# TYOLab tím — samostatný projektový web

Vue 3 + Tailwind CSS 4 + Vite. Samostatný web pre zápisy o postupe, commity, míľniky a odkazy na repozitáre. AI aplikácia je v inom projekte `../tyolab`. Žiadny kód ani závislosti sa medzi priečinkami neimportujú.

## Spustenie

Vyžaduje Node.js 22 LTS alebo kompatibilnú novšiu verziu.

```bash
npm ci
npm run dev
```

Lokálna adresa: http://localhost:5174. Port je pevný, takže oba projekty môžu bežať naraz.

```bash
npm run build
npm run preview
```

Produkčný výstup: vlastný `dist/`. Produkčný lokálny náhľad: http://localhost:4174. Nasadzujte na vlastnú URL oddelene od laboratória.

## Statický hosting na GitHub Pages

Tímový web nepotrebuje backend, databázu ani REST API. Vue a Tailwind sa pri `npm run build` zostavia do statických HTML, CSS a JavaScript súborov v `dist/`. Na GitHub Pages sa publikuje obsah tohto priečinka. Node.js slúži iba pri vývoji a zostavení, nie pri návšteve webu.

Vite má nastavené `base: './'`, takže odkazy na produkčné súbory fungujú aj na `https://pouzivatel.github.io/nazov-repozitara/`. Workflow `.github/workflows/deploy.yml` web zostaví a publikuje po pushnutí na `main`, prípadne ručne cez GitHub Actions.

### Prvé nasadenie

1. Na https://github.com/new vytvorte prázdny repozitár `tyolab-team`. Pre GitHub Free zvoľte **Public**. Nepridávajte README, `.gitignore` ani licenciu; projekt už má vlastné súbory.
2. Do koreňa tohto repozitára patrí obsah priečinka `tyolab-team`, nie celý nadradený `tymovy_projekt`. Lokálny Git už je inicializovaný na vetve `main`.
3. V termináli spustite nasledujúce príkazy; `TVOJ_LOGIN` nahraďte svojím GitHub loginom. Pri tímovej organizácii použite jej názov.

```bash
cd /home/matejkovac/Documents/tymovy_projekt/tyolab-team
git add .
git commit -m "Prepare team website for GitHub Pages"
git remote add origin https://github.com/TVOJ_LOGIN/tyolab-team.git
git push -u origin main
```

4. V repozitári otvorte **Settings → Pages → Build and deployment → Source** a vyberte **GitHub Actions**.
5. Otvorte **Actions → Deploy GitHub Pages → Run workflow**, vyberte `main` a potvrďte. Prvý automatický beh po pushnutí môže zlyhať, ak ešte neboli Pages zapnuté; po ich zapnutí spustite workflow znova.
6. Po úspešnom nasadení nájdete adresu v **Settings → Pages** alebo pri nasadení v Actions. Pri osobnom repozitári `tyolab-team` bude štandardne `https://TVOJ_LOGIN.github.io/tyolab-team/`.

Do GitHubu sa posiela zdrojový kód vrátane `package-lock.json` a `.github/workflows/deploy.yml`. `node_modules` a `dist` sú správne ignorované; GitHub si ich vytvorí počas buildu. Pri HTTPS autentifikácii použite podporované prihlásenie GitHub CLI/správcu prihlasovacích údajov alebo osobný prístupový token, nie heslo k účtu.

### Ďalšie aktualizácie

```bash
git add .
git commit -m "Update project journal"
git push
```

Každý push na `main` automaticky zostaví a aktualizuje statický web. GitHub Actions slúži iba na zostavenie a publikovanie; stránke nepridáva REST API ani backend.

## Úprava obsahu

Stránka je iba na čítanie. Nemá formuláre, administráciu, REST API ani ukladanie do prehliadača. Filtrovanie denníka mení len zobrazenie.

- `src/data/content.js`: záznamy v poli `entries` a odkazy na repozitáre v poli `repos`.
- `src/data/milestones.js`: míľniky a ich stav.

Nový záznam pridajte na začiatok poľa `entries`, napríklad:

```js
{
  title: 'Dokončenie návrhu rozhrania',
  body: 'Popis vykonanej práce a rozhodnutí tímu.',
  date: '7. 10. 2026',
  kind: 'Zápis',
  author: 'Tím TYOLab',
  url: '',
  demo: false,
},
```

Pre commit použite `kind: 'Commit'` a do `url` vložte jeho skutočnú HTTPS adresu. Pre bežný zápis je odkaz voliteľný. Ukážkové zápisy a míľniky nahraďte reálnymi údajmi. Odkaz na repozitár laboratória zostáva prázdny, kým nebude známa jeho adresa.

Po úprave vykonajte `npm run build`, commit a push podľa návodu vyššie. GitHub Actions publikuje spoločný obsah pre všetkých návštevníkov. Commity sa automaticky nenačítavajú z GitHub API.

Staré lokálne poznámky sa už nečítajú ani nezobrazujú. Dáta uložené predchádzajúcim prototypom v úložisku prehliadača táto zmena nemaže; nie sú súčasťou publikovaného obsahu.
