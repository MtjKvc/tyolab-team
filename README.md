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

## Požiadavky predmetu: stav, zápisnice a dokumentácia

Obsah sekcií sa upravuje v `src/data/project.js`. Stránka zostáva statická, bez formulárov a API.

- `project`: anotácia, členovia a ich zodpovednosti, vedúci, aktuálna fáza a `updatedAt` (skutočný dátum aktualizácie obsahu).
- `weeklyReports`: týždenné prehľady dokončených a rozpracovaných činností, ďalšie kroky a otvorené body. Najnovší týždeň patrí na začiatok. Aspoň raz týždenne doplňte vecný stav, aj keď nedošlo k výraznému pokroku; dátum sa automaticky neposúva.
- `meetings`: zápisnice zo skutočných stretnutí. Zápisy denníka ani commity ich nenahrádzajú.
- `documents`: všetkých osem povinných oblastí dokumentácie. Stav „Pracovný návrh“ neznamená finálny ani schválený dokument.

### Zverejnenie zápisnice

Do poľa `meetings` vložte objekt podľa nasledujúcej štruktúry a nahraďte všetky označenia skutočnými údajmi. Toto je iba príklad formátu, nie reálne stretnutie:

```js
{
  id: '01',
  title: 'Zápisnica č. 1 – názov stretnutia',
  date: 'YYYY-MM-DD',
  time: 'HH:MM – HH:MM',
  location: 'Miesto alebo forma stretnutia',
  attendees: ['Meno účastníka'],
  author: 'Meno zapisovateľa',
  isFirst: true,
  discussion: [
    { title: 'Téma programu', notes: 'Podrobný priebeh diskusie, argumenty a závery.' },
  ],
  decisions: ['Prijaté rozhodnutie a jeho zdôvodnenie.'],
  previousTasks: [],
  tasks: [
    { title: 'Konkrétna úloha', owner: 'Zodpovedná osoba', due: 'YYYY-MM-DD', deliverable: 'Očakávaný výstup' },
  ],
  nextMeeting: 'Dátum a program ďalšieho stretnutia, ak boli dohodnuté.',
},
```

Pri každom ďalšom stretnutí nastavte `isFirst: false` a doplňte zhodnotenie minulých úloh:

```js
previousTasks: [
  { title: 'Úloha z minulého stretnutia', owner: 'Zodpovedná osoba', status: 'Splnená / čiastočne splnená / nesplnená', review: 'Výsledok, dôvod odkladu alebo ďalší postup.' },
],
```

Plný obsah zápisnice sa zobrazí po rozbalení priamo na webovej stránke. Šablóna na prípravu zápisu je dostupná aj cez `public/templates/zapisnica.md`. Šablónu nepočítame medzi zverejnené zápisnice.

### Dokumenty a prílohy

Oficiálne zadanie, ponuku a ďalšie finálne dokumenty uložte napríklad do `public/documents/`. V príslušnej položke `documents` nastavte `file: 'documents/nazov.pdf'`, pravdivý stav a dátum aktualizácie. Cesta je relatívna, bez úvodného `/`, aby fungovala na GitHub Pages. Súbor v `public/` bude verejne dostupný po nasadení. Pracovný text možno priebežne dopĺňať v `paragraphs` a `items`.

Finálna dokumentácia musí obsahovať oficiálne zadanie, ponuku, ciele, analýzu problému, algoritmy a metódy, dokumentáciu programov, výsledky a porovnania, literatúru a zdroje spracovávaných textov. Súčasná stránka obsahuje ich štruktúru a označené pracovné podklady; nenahrádza chýbajúce finálne dokumenty.

Jeden člen tímu odovzdáva dokumentáciu a prílohy do AIS. Publikovanie na webe nie je odovzdanie do AIS. Členov, vedúceho, skutočné zápisnice, schválené dokumenty a výskumné výsledky treba doplniť podľa reality; nevymýšľajú sa automaticky.
