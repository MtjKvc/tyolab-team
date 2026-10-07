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

Vite má nastavené `base: './'`, takže odkazy na produkčné súbory fungujú aj na `https://pouzivatel.github.io/nazov-repozitara/`. Workflow `.github/workflows/deploy.yml` web zostaví a publikuje po pushnutí na `main`, prípadne ručne cez GitHub Actions. GitHub repozitár ešte nebol pripojený a Pages na ňom ešte nie sú aktivované.

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

Spoločný obsah možno udržiavať priamo v súboroch repozitára a po zmene znovu zostaviť a publikovať web. To nevyžaduje REST API. Aktuálne ukážkové zápisy a repozitáre sú v `src/pages/ProjectPage.vue`, míľniky v `src/data/milestones.js`.

## Funkcie prototypu

- Pridanie zápisu alebo záznamu typu Commit s názvom, popisom, autorom a odkazom.
- Filtrovanie zápisov a commitov.
- Samostatná sekcia míľnikov s ukážkovým plánom.
- Nastavenie skutočných odkazov na repozitár aplikácie a tímového webu.
- Záznamy a odkazy sa ukladajú do `localStorage` len v danom prehliadači a na danej doméne.

Repozitáre nie sú automaticky pripojené ku GitHubu/GitLabu. Skutočné adresy nastavíte cez „Upraviť odkazy“ iba lokálne; aby ich videli všetci, upravte obsah v zdrojových súboroch a publikujte nový build. To isté platí pre zápisy. Pôvodné záznamy a termíny sú označené ako ukážkové. Prihlasovanie ani automatické načítanie commitov nie sú súčasťou statického webu.

Poznámky uložené na pôvodnom kombinovanom webe zostávajú v úložisku jeho domény pod `tyolab-demo-journal`; nová doména ich nemôže automaticky čítať. Toto rozdelenie ich nemaže.
