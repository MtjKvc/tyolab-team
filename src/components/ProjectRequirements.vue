<script setup>
import { project, weeklyReports, meetings, documents } from '../data/project'
const date = value => value ? value.split('-').reverse().join('. ') : 'Na doplnenie'
const asset = path => `${import.meta.env.BASE_URL}${path}`
</script>
<template>
  <section id="projekt" class="course-section">
    <div class="section-heading"><div><span class="eyebrow muted">ZADANIE A ĽUDIA</span><h2>O projekte a tíme</h2></div><a :href="project.courseUrl" class="text-button" target="_blank" rel="noopener noreferrer">Požiadavky predmetu</a></div>
    <h3>{{ project.title }}</h3><p class="course-prose">{{ project.annotation }}</p>
    <div class="course-team"><div><h3>Členovia tímu</h3><ul v-if="project.members.length"><li v-for="member in project.members" :key="member.name"><strong>{{ member.name }}</strong> — {{ member.role }}</li></ul><p v-else>Mená a zodpovednosti členov tímu treba doplniť.</p></div><div><h3>Vedúci projektu</h3><p>{{ project.supervisor || 'Meno vedúceho treba doplniť.' }}</p></div></div>
  </section>
  <section id="stav" class="course-section">
    <div class="section-heading"><div><span class="eyebrow muted">AKTUALIZÁCIA KAŽDÝ TÝŽDEŇ</span><h2>Stav projektu</h2></div><span class="subtle">Obsah aktualizovaný: <time :datetime="project.updatedAt">{{ date(project.updatedAt) }}</time></span></div>
    <article v-for="report in weeklyReports" :key="report.id" class="weekly-report"><div class="section-heading"><h3>{{ report.title }}</h3><span class="badge neutral">{{ date(report.from) }} – {{ date(report.to) }}</span></div><div class="weekly-grid"><div v-for="[key,label] in [['completed','Dokončené'],['ongoing','Rozpracované'],['next','Nasledujúce kroky'],['blockers','Otvorené body a obmedzenia']]" :key="key"><h4>{{ label }}</h4><ul v-if="report[key].length"><li v-for="item in report[key]" :key="item">{{ item }}</li></ul><p v-else class="subtle">Bez záznamu.</p></div></div><p class="subtle">Stav k {{ date(report.updatedAt) }} · priebežný prehľad, nie zápisnica zo stretnutia.</p></article>
    <p v-if="!weeklyReports.length" class="team-empty">Týždenný prehľad zatiaľ nie je zverejnený.</p>
  </section>
  <section id="zapisnice" class="course-section">
    <div class="section-heading"><div><span class="eyebrow muted">Z KAŽDÉHO STRETNUTIA</span><h2>Zápisnice zo stretnutí</h2></div><a class="button secondary small" :href="asset('templates/zapisnica.md')" download>Stiahnuť šablónu (.md)</a></div>
    <div v-if="!meetings.length" class="team-empty"><h3>Zápisnice zatiaľ nie sú zverejnené.</h3><p>Čakáme na údaje zo skutočných stretnutí tímu. Denník práce ani odkazy na commity nenahrádzajú zápisnice.</p></div>
    <details v-for="meeting in meetings" :key="meeting.id" class="meeting-document" :id="`stretnutie-${meeting.id}`"><summary><span>{{ meeting.title }}</span><time :datetime="meeting.date">{{ date(meeting.date) }}</time></summary><div class="meeting-body">
      <dl class="meeting-meta"><div><dt>Dátum a čas</dt><dd>{{ date(meeting.date) }} · {{ meeting.time || 'Čas neuvedený' }}</dd></div><div><dt>Miesto / forma</dt><dd>{{ meeting.location || 'Neuvedené' }}</dd></div><div><dt>Účastníci</dt><dd>{{ meeting.attendees.join(', ') }}</dd></div><div><dt>Zápis vypracoval</dt><dd>{{ meeting.author }}</dd></div></dl>
      <h3>Program a priebeh stretnutia</h3><article v-for="(topic,i) in meeting.discussion" :key="i" class="meeting-topic"><h4>{{ topic.title }}</h4><p>{{ topic.notes }}</p></article>
      <h3>Prijaté rozhodnutia</h3><ul v-if="meeting.decisions.length"><li v-for="decision in meeting.decisions" :key="decision">{{ decision }}</li></ul><p v-else>Neboli zaznamenané samostatné rozhodnutia.</p>
      <h3>Zhodnotenie predchádzajúcich úloh</h3><p v-if="meeting.isFirst">Prvé stretnutie – bez predchádzajúcich úloh.</p><div v-else-if="meeting.previousTasks.length" class="table-scroll"><table><thead><tr><th>Úloha</th><th>Zodpovednosť</th><th>Stav</th><th>Zhodnotenie</th></tr></thead><tbody><tr v-for="(task,i) in meeting.previousTasks" :key="i"><td>{{ task.title }}</td><td>{{ task.owner }}</td><td>{{ task.status }}</td><td>{{ task.review }}</td></tr></tbody></table></div><p v-else class="missing-content">Zhodnotenie predchádzajúcich úloh treba doplniť.</p>
      <h3>Nové úlohy</h3><div v-if="meeting.tasks.length" class="table-scroll"><table><thead><tr><th>Úloha</th><th>Zodpovednosť</th><th>Termín</th><th>Očakávaný výstup</th></tr></thead><tbody><tr v-for="(task,i) in meeting.tasks" :key="i"><td>{{ task.title }}</td><td>{{ task.owner }}</td><td>{{ date(task.due) }}</td><td>{{ task.deliverable }}</td></tr></tbody></table></div><p v-else class="missing-content">Úlohy zo stretnutia treba doplniť.</p>
      <p v-if="meeting.nextMeeting" class="course-prose"><strong>Ďalšie stretnutie:</strong> {{ meeting.nextMeeting }}</p>
    </div></details>
  </section>
  <section id="dokumentacia" class="course-section">
    <div class="section-heading"><div><span class="eyebrow muted">PODKLADY A VÝSTUPY</span><h2>Projektová dokumentácia</h2></div><span class="subtle">8 požadovaných oblastí</span></div>
    <p class="course-prose">Pracovné podklady a ich stav. Finálne dokumenty a prílohy budú dopĺňané počas riešenia.</p>
    <details v-for="(document,i) in documents" :key="document.id" :id="`dokument-${document.id}`" class="meeting-document"><summary><span>{{ i + 1 }}. {{ document.title }}</span><span :class="['badge',document.status === 'Na doplnenie' ? 'neutral' : 'blue']">{{ document.status }}</span></summary><div class="meeting-body"><p v-for="paragraph in document.paragraphs" :key="paragraph" class="course-prose">{{ paragraph }}</p><ul v-if="document.items?.length"><li v-for="item in document.items" :key="item">{{ item }}</li></ul><a v-if="document.file" :href="asset(document.file)" class="button secondary small" download>Stiahnuť dokument</a><p v-else class="subtle">Samostatný súbor zatiaľ nie je priložený.</p><p v-if="document.updatedAt" class="subtle">Aktualizované {{ date(document.updatedAt) }}</p></div></details>
    <div class="team-about"><h3>Odovzdanie do AIS</h3><p>Za tím odovzdáva dokumentáciu jeden študent. Súčasťou odovzdania sú aj prílohy, napríklad zdrojové kódy a technická dokumentácia. Zverejnenie na tomto webe nenahrádza odovzdanie do AIS.</p></div>
  </section>
</template>
