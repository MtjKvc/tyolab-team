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

## Funkcie prototypu

- Pridanie zápisu alebo záznamu typu Commit s názvom, popisom, autorom a odkazom.
- Filtrovanie zápisov a commitov.
- Samostatná sekcia míľnikov s ukážkovým plánom.
- Nastavenie skutočných odkazov na repozitár aplikácie a tímového webu.
- Záznamy a odkazy sa ukladajú do `localStorage` len v danom prehliadači a na danej doméne.

Repozitáre nie sú automaticky pripojené ku GitHubu/GitLabu. Skutočné adresy nastavíte cez „Upraviť odkazy“. Pôvodné záznamy a termíny sú označené ako ukážkové. Zdieľanie s tímom, autentifikácia a načítanie commitov budú potrebovať backend alebo samostatnú integráciu.

Poznámky uložené na pôvodnom kombinovanom webe zostávajú v úložisku jeho domény pod `tyolab-demo-journal`; nová doména ich nemôže automaticky čítať. Toto rozdelenie ich nemaže.
