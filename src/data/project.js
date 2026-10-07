// Verejný obsah tímového webu. Neznáme údaje nechajte prázdne, nevkladajte ukážkové mená.
export const project = {
  title: 'TYOLab – Train Your Own Laboratory',
  courseUrl: 'https://uim.fei.stuba.sk/predmet/i-tp1-ai-2/',
  members: [], // { name: 'Meno Priezvisko', role: 'Zodpovednosť v tíme' }
  supervisor: '',
  phase: 'Vizuálny prototyp',
  updatedAt: '2026-10-07', // Dátum vecnej aktualizácie obsahu, nie dátum otvorenia stránky.
  annotation: 'Cieľom projektu je navrhnúť a implementovať webovú platformu, ktorá umožní používateľom vytvárať a využívať modely umelej inteligencie bez hlbokých znalostí strojového učenia alebo programovania. Platforma má pokryť správu a analýzu dát, ich prípravu, automatizované trénovanie, vyhodnotenie a porovnávanie modelov aj použitie modelov na nových dátach. Architektúra má byť modulárna a rozšíriteľná.',
}

// Najnovší týždeň na začiatku. Toto je prehľad overiteľného stavu prototypu, nie zápisnica zo stretnutia.
export const weeklyReports = [{
  id: '2026-10-05', from: '2026-10-05', to: '2026-10-11', updatedAt: '2026-10-07',
  title: 'Oddelenie aplikácie a tímového webu',
  completed: ['Vytvorené dva samostatné Vue + Tailwind projekty: tyolab a tyolab-team.', 'Tímový web má pripravený GitHub Actions workflow pre GitHub Pages.', 'Odstránené formuláre a lokálne ukladanie; spoločný obsah sa spravuje cez repozitár.'],
  ongoing: ['Príprava štruktúry zápisníc a dokumentácie podľa požiadaviek predmetu.'],
  next: ['Doplniť členov tímu, vedúceho a skutočné zápisnice.', 'Doplniť oficiálne zadanie, ponuku a potvrdiť harmonogram tímu.'],
  blockers: ['Backend, autentifikácia, spracovanie datasetov a tréning modelov zatiaľ nie sú implementované.'],
}]

// Sem patria len skutočné stretnutia. Kompletnú štruktúru nájdete v README.
export const meetings = []

// Každý dokument môže mať text priamo na webe a/alebo súbor v public/documents/.
// file: 'documents/subor.pdf' (bez úvodného lomítka), updatedAt: 'YYYY-MM-DD'.
export const documents = [
  { id: 'zadanie', title: 'Oficiálne zadanie', status: 'Na doplnenie', updatedAt: '', file: '', paragraphs: ['Anotácia projektu je uvedená vyššie. Schválené oficiálne zadanie zatiaľ nie je priložené.'] },
  { id: 'ponuka', title: 'Vypracovaná ponuka', status: 'Na doplnenie', updatedAt: '', file: '', paragraphs: ['Doplniť vypracovanú ponuku tímu vrátane rozsahu riešenia, rozdelenia práce a harmonogramu.'] },
  { id: 'ciele', title: 'Ciele riešenia', status: 'Pracovný návrh', updatedAt: '2026-10-07', file: '', paragraphs: ['Ciele vychádzajú z dodanej anotácie; ich implementácia zatiaľ nie je dokončená.'], items: ['Správa používateľských účtov a datasetov.', 'Exploratívna analýza, vizualizácie a príprava dát.', 'Automatizovaný návrh, tréning a optimalizácia viacerých modelov.', 'Vyhodnotenie, porovnanie a správa modelov.', 'Predikcie nad novými dátami a prehľadné reporty.', 'Modulárna architektúra umožňujúca pridávať algoritmy a typy úloh.'] },
  { id: 'analyza', title: 'Analýza problému', status: 'Pracovný návrh', updatedAt: '2026-10-07', file: '', paragraphs: ['Cieľovou skupinou sú používatelia bez hlbokých znalostí programovania a strojového učenia. Návrh rozhrania sleduje postup dataset → analýza → experiment → model → výsledok.', 'Doplniť analýzu existujúcich riešení, typov dát, požiadaviek, rizík a kritérií úspešnosti.'] },
  { id: 'metody', title: 'Algoritmy a metódy', status: 'Na doplnenie', updatedAt: '', file: '', paragraphs: ['Algoritmy zatiaľ neboli implementované. Názvy Random Forest, Logistic Regression a Gradient Boosting v laboratóriu predstavujú iba ukážkové dáta.', 'Po výbere metód zdokumentovať ich princíp, dôvod výberu, predspracovanie, ladenie parametrov a spôsob validácie.'] },
  { id: 'programy', title: 'Dokumentácia k programom', status: 'Pracovný návrh', updatedAt: '2026-10-07', file: '', paragraphs: ['Frontend: Vue 3, Vite a Tailwind CSS. Laboratórium a tímový web sú nezávislé projekty s vlastným package.json a buildom.', 'Lokálne spustenie v príslušnom priečinku: npm ci a npm run dev. Produkčné zostavenie: npm run build. Tímový web publikuje statický priečinok dist cez GitHub Actions.', 'Tímový web nemá backend ani REST API. Pre laboratórium je pripravený základ REST klienta; reálny backend ešte nie je pripojený. Podrobný návod tímového webu je v README jeho repozitára.'] },
  { id: 'vysledky', title: 'Výsledky a porovnania', status: 'Na doplnenie', updatedAt: '', file: '', paragraphs: ['K dispozícii je vizuálny prototyp. Neexistujú zatiaľ namerané výsledky tréningu ani porovnanie so známymi výsledkami. Metriky v laboratóriu sú ilustračné.', 'Doplniť datasety, experimentálne podmienky, referenčné riešenia, metriky, výsledky a ich interpretáciu.'] },
  { id: 'zdroje', title: 'Literatúra a zdroje textov', status: 'Na doplnenie', updatedAt: '', file: '', paragraphs: ['Požiadavky na tímový web vychádzajú z textu predmetu dodaného tímom; odkaz na predmet je uvedený na stránke.', 'Doplniť bibliografiu použitých publikácií, zdroje datasetov a spracovávaných textov vrátane autorov, odkazov a licencií, kde sú relevantné.'] },
]
