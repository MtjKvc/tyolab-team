<script setup>
import { computed, ref } from 'vue'
import Icon from '../components/Icon.vue'
import ProjectRequirements from '../components/ProjectRequirements.vue'
import { project, meetings } from '../data/project'
import { milestones } from '../data/milestones'
import { entries, repos } from '../data/content'

const filter = ref('Všetko')
const filteredEntries = computed(() => entries.filter(e => filter.value === 'Všetko' || e.kind === filter.value))
function safeUrl(value) { try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : '' } catch { return '' } }
</script>
<template>
  <div class="project-container">
    <section class="team-intro"><div><span class="eyebrow"><Icon name="NotebookPen" :size="16" /> TÍMOVÝ PROJEKT TYOLAB</span><h1>Čo sme spravili.<br>Kam smerujeme.</h1><p>Aktuálny stav projektu, zápisnice zo stretnutí a dokumentácia nášho tímu. Od prvého návrhu po výsledky riešenia.</p></div></section>
    <div class="team-summary"><div><span>Zverejnené zápisnice</span><strong>{{ meetings.length }}</strong></div><div><span>Posledná aktualizácia</span><strong>{{ project.updatedAt.split('-').reverse().join('. ') }}</strong></div><div><span>Aktuálna fáza</span><strong>{{ project.phase }}</strong></div></div>
    <div class="demo-banner"><Icon name="Info" :size="17" /><span>Harmonogram a označené zápisy sú ukážkové. Chýbajúce zápisnice a podklady sú označené na doplnenie.</span></div>
    <ProjectRequirements />
    <div class="team-layout">
      <section id="dennik" class="team-journal"><div class="section-heading"><div><span class="eyebrow muted">ZÁPISY A COMMITY</span><h2>Denník práce</h2></div><Icon name="NotebookText" :size="22" /></div><div class="team-filters" aria-label="Filtrovať záznamy"><button v-for="f in ['Všetko','Zápis','Commit']" :key="f" :class="{active:filter === f}" :aria-pressed="filter === f" @click="filter = f">{{ f === 'Zápis' ? 'Zápisy' : f === 'Commit' ? 'Commity' : f }}</button></div><article v-for="(entry,i) in filteredEntries" :key="i" class="journal-card"><div class="journal-meta"><span :class="['badge',entry.kind === 'Commit' ? 'blue' : 'neutral']">{{ entry.kind }}{{ entry.demo ? ' · ukážka' : '' }}</span><time>{{ entry.date }}</time></div><h3>{{ entry.title }}</h3><p class="whitespace-pre-wrap">{{ entry.body }}</p><a v-if="safeUrl(entry.url)" :href="safeUrl(entry.url)" target="_blank" rel="noopener noreferrer" class="text-button"><Icon name="ExternalLink" :size="16" />{{ entry.kind === 'Commit' ? 'Otvoriť commit' : 'Otvoriť súvisiaci odkaz' }}</a><span class="journal-author"><span class="tiny-avatar">TY</span><span class="entry-author">{{ entry.author }}</span></span></article><div v-if="!filteredEntries.length" class="team-empty"><h3>Zatiaľ tu nie sú žiadne záznamy.</h3><p>Pre vybraný filter ešte nebol zverejnený žiadny záznam.</p></div></section>
      <section id="milniky"><div class="section-heading"><div><span class="eyebrow muted">UKÁŽKOVÝ PLÁN</span><h2>Míľniky projektu</h2></div><Icon name="Flag" :size="22" /></div><div class="timeline"><article v-for="(m,i) in milestones" :key="m.title" :class="['milestone',{current:i === 1,complete:i === 0}]"><span class="timeline-icon"><Icon :name="m.icon" :size="18" /></span><div class="milestone-content"><div class="milestone-heading"><h3>{{ m.title }}</h3><span :class="['badge',i === 0 ? 'green' : i === 1 ? 'blue' : 'neutral']">{{ m.status }}</span></div><p>{{ m.description }}</p><span class="milestone-date"><Icon name="CalendarDays" :size="14" />{{ m.date }}</span></div></article></div><div class="team-about"><h3>Na čom pracujeme?</h3><p>TYOLab je platforma pre tvorbu a používanie AI modelov bez hlbokých znalostí strojového učenia. Tento web zachytáva vývoj projektu; samotné laboratórium je samostatná aplikácia.</p></div></section>
    </div>
    <section id="repozitare" class="team-repos"><div class="section-heading"><div><span class="eyebrow muted">ZDROJOVÝ KÓD A SPOLUPRÁCA</span><h2>Naše repozitáre</h2></div></div><div class="repo-grid"><article v-for="repo in repos" :key="repo.name" class="repo-card"><Icon name="FolderGit2" :size="25" /><h3>{{ repo.name }}</h3><p>{{ repo.description }}</p><a v-if="safeUrl(repo.url)" :href="safeUrl(repo.url)" target="_blank" rel="noopener noreferrer" class="text-button"><Icon name="ExternalLink" :size="16" />{{ repo.url }}</a><span v-else class="repo-disabled">Odkaz na repozitár zatiaľ nie je nastavený.</span></article></div></section>
    <footer class="project-footer"><span><strong>TYOLab tím</strong> Projektový denník</span><span>Tvoríme, skúmame, posúvame sa. © 2026</span></footer>
  </div>
</template>
