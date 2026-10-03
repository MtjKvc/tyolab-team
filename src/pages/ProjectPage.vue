<script setup>
import { computed, ref } from 'vue'
import Icon from '../components/Icon.vue'
import Modal from '../components/Modal.vue'
import { milestones } from '../data/milestones'

const seed = [
  { title: 'Prvé kontúry používateľského rozhrania', body: 'Pripravujeme vizuálny návrh laboratória a samostatného tímového webu.', date: '3. 10. 2026', kind: 'Zápis', author: 'Tím TYOLab', url: '', demo: true },
  { title: 'Analýza požiadaviek a návrh modulov', body: 'Rozdelili sme platformu na správu datasetov, analýzu dát, trénovanie a využívanie modelov.', date: '28. 9. 2026', kind: 'Zápis', author: 'Tím TYOLab', url: '', demo: true },
]
function safeUrl(value) { try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : '' } catch { return '' } }
function load(key, fallback, validate) { try { const value = JSON.parse(localStorage.getItem(key)); return validate(value) ? value : fallback } catch { return fallback } }
const entries = ref(load('tyolab-team-entries-v1', seed, value => Array.isArray(value) && value.every(e => e && typeof e.title === 'string' && typeof e.body === 'string' && ['Zápis','Commit'].includes(e.kind))))
const repos = ref(load('tyolab-team-repos-v1', [
  { name: 'TYOLab aplikácia', description: 'Zdrojový kód laboratória, práca s dátami a modelmi.', url: '' },
  { name: 'Tímový web', description: 'Projektový denník, dokumentácia a záznamy o postupe.', url: '' },
], value => Array.isArray(value) && value.length === 2 && value.every(r => r && typeof r.name === 'string' && typeof r.url === 'string')))
const filter = ref('Všetko'), modal = ref(''), error = ref(''), status = ref('')
const form = ref({ title: '', body: '', author: '', kind: 'Zápis', url: '' })
const repoDraft = ref([])
const filteredEntries = computed(() => entries.value.filter(e => filter.value === 'Všetko' || e.kind === filter.value))
const commits = computed(() => entries.value.filter(e => e.kind === 'Commit').length)
function openEntry() { error.value = ''; modal.value = 'entry' }
function save(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true } catch { error.value = 'Uloženie do prehliadača zlyhalo. Skontrolujte povolenie lokálneho úložiska.'; return false } }
function addEntry() {
  error.value = ''
  if (!form.value.title.trim() || !form.value.body.trim()) { error.value = 'Vyplňte názov aj popis.'; return }
  const url = form.value.url.trim()
  if ((url && !safeUrl(url)) || (form.value.kind === 'Commit' && !url)) { error.value = 'Zadajte platný HTTP alebo HTTPS odkaz na commit.'; return }
  const next = [{ ...form.value, title: form.value.title.trim(), body: form.value.body.trim(), author: form.value.author.trim() || 'Tím TYOLab', url: url ? safeUrl(url) : '', date: new Date().toLocaleDateString('sk-SK'), demo: false }, ...entries.value]
  if (!save('tyolab-team-entries-v1', next)) return
  entries.value = next; modal.value = ''; form.value = { title: '', body: '', author: '', kind: 'Zápis', url: '' }; status.value = 'Záznam bol uložený v tomto prehliadači.'
}
function editRepos() { error.value = ''; repoDraft.value = repos.value.map(r => ({ ...r })); modal.value = 'repos' }
function saveRepos() {
  error.value = ''
  if (repoDraft.value.some(r => r.url.trim() && !safeUrl(r.url.trim()))) { error.value = 'Odkazy musia byť platné HTTP alebo HTTPS adresy.'; return }
  const next = repoDraft.value.map(r => ({ ...r, url: r.url.trim() ? safeUrl(r.url.trim()) : '' }))
  if (!save('tyolab-team-repos-v1', next)) return
  repos.value = next; modal.value = ''; status.value = 'Odkazy boli uložené v tomto prehliadači.'
}
</script>
<template>
  <div class="project-container">
    <section class="team-intro"><div><span class="eyebrow"><Icon name="NotebookPen" :size="16" /> TÍMOVÝ PROJEKT TYOLAB</span><h1>Čo sme spravili.<br>Kam smerujeme.</h1><p>Náš spoločný denník vývoja. Zápisy z práce, dôležité rozhodnutia, commity a všetky repozitáre na jednom mieste.</p></div><button class="button primary" @click="openEntry"><Icon name="Plus" :size="18" />Pridať záznam</button></section>
    <div class="team-summary"><div><span>Záznamy v denníku</span><strong>{{ entries.length }}</strong></div><div><span>Odkazy na commity</span><strong>{{ commits }}</strong></div><div><span>Aktuálna fáza · ukážka</span><strong>Návrh & prototyp</strong></div></div>
    <div class="demo-banner"><Icon name="Info" :size="17" /><span>Prototyp tímového webu. Plán a pôvodné zápisy sú ukážkové. Vlastné záznamy a odkazy sa ukladajú len v tomto prehliadači.</span></div>
    <p v-if="status" class="team-status" role="status">{{ status }}</p>
    <div class="team-layout">
      <section id="dennik" class="team-journal"><div class="section-heading"><div><span class="eyebrow muted">ZÁPISY A COMMITY</span><h2>Denník práce</h2></div><Icon name="NotebookText" :size="22" /></div><div class="team-filters" aria-label="Filtrovať záznamy"><button v-for="f in ['Všetko','Zápis','Commit']" :key="f" :class="{active:filter === f}" :aria-pressed="filter === f" @click="filter = f">{{ f === 'Zápis' ? 'Zápisy' : f === 'Commit' ? 'Commity' : f }}</button></div><article v-for="(entry,i) in filteredEntries" :key="i" class="journal-card"><div class="journal-meta"><span :class="['badge',entry.kind === 'Commit' ? 'blue' : 'neutral']">{{ entry.kind }}{{ entry.demo ? ' · ukážka' : '' }}</span><time>{{ entry.date }}</time></div><h3>{{ entry.title }}</h3><p class="whitespace-pre-wrap">{{ entry.body }}</p><a v-if="safeUrl(entry.url)" :href="safeUrl(entry.url)" target="_blank" rel="noopener noreferrer" class="text-button"><Icon name="ExternalLink" :size="16" />{{ entry.kind === 'Commit' ? 'Otvoriť commit' : 'Otvoriť súvisiaci odkaz' }}</a><span class="journal-author"><span class="tiny-avatar">TY</span><span class="entry-author">{{ entry.author }}</span></span></article><div v-if="!filteredEntries.length" class="team-empty"><h3>Zatiaľ tu nie je žiadny commit.</h3><p>Pridajte záznam typu Commit a vložte odkaz z vášho repozitára.</p><button class="text-button mt-4" @click="form.kind = 'Commit'; openEntry()">Pridať prvý commit</button></div></section>
      <section id="milniky"><div class="section-heading"><div><span class="eyebrow muted">UKÁŽKOVÝ PLÁN</span><h2>Míľniky projektu</h2></div><Icon name="Flag" :size="22" /></div><div class="timeline"><article v-for="(m,i) in milestones" :key="m.title" :class="['milestone',{current:i === 1,complete:i === 0}]"><span class="timeline-icon"><Icon :name="m.icon" :size="18" /></span><div class="milestone-content"><div class="milestone-heading"><h3>{{ m.title }}</h3><span :class="['badge',i === 0 ? 'green' : i === 1 ? 'blue' : 'neutral']">{{ m.status }}</span></div><p>{{ m.description }}</p><span class="milestone-date"><Icon name="CalendarDays" :size="14" />{{ m.date }}</span></div></article></div><div class="team-about"><h3>Na čom pracujeme?</h3><p>TYOLab je platforma pre tvorbu a používanie AI modelov bez hlbokých znalostí strojového učenia. Tento web zachytáva vývoj projektu; samotné laboratórium je samostatná aplikácia.</p></div></section>
    </div>
    <section id="repozitare" class="team-repos"><div class="section-heading"><div><span class="eyebrow muted">ZDROJOVÝ KÓD A SPOLUPRÁCA</span><h2>Naše repozitáre</h2></div><button class="button secondary small" @click="editRepos"><Icon name="Settings2" :size="16" />Upraviť odkazy</button></div><div class="repo-grid"><article v-for="repo in repos" :key="repo.name" class="repo-card"><Icon name="FolderGit2" :size="25" /><h3>{{ repo.name }}</h3><p>{{ repo.description }}</p><a v-if="safeUrl(repo.url)" :href="safeUrl(repo.url)" target="_blank" rel="noopener noreferrer" class="text-button"><Icon name="ExternalLink" :size="16" />{{ repo.url }}</a><span v-else class="repo-disabled">Odkaz na repozitár zatiaľ nie je nastavený.</span></article></div></section>
    <footer class="project-footer"><span><strong>TYOLab tím</strong> Projektový denník</span><span>Tvoríme, skúmame, posúvame sa. © 2026</span></footer>
  </div>
  <Modal v-if="modal === 'entry'" title="Nový záznam" @close="modal = ''"><form class="form-stack" @submit.prevent="addEntry"><p class="subtle">Záznam sa uloží iba v tomto prehliadači. Automatické načítanie commitov zatiaľ nie je pripojené.</p><label>Typ záznamu<select v-model="form.kind"><option>Zápis</option><option>Commit</option></select></label><label>Názov<input v-model="form.title" required maxlength="140" placeholder="Čo sme spravili?" /></label><label>Popis<textarea v-model="form.body" required maxlength="4000" rows="4" placeholder="Zmeny, rozhodnutia alebo ďalšie kroky…"></textarea></label><label>Autor<input v-model="form.author" maxlength="80" placeholder="Tím TYOLab" /></label><label>{{ form.kind === 'Commit' ? 'Odkaz na commit' : 'Súvisiaci odkaz (voliteľné)' }}<input v-model="form.url" type="url" :required="form.kind === 'Commit'" maxlength="2000" placeholder="https://…" /></label><p v-if="error" class="form-error" role="alert">{{ error }}</p><button class="button primary" type="submit">Uložiť záznam</button></form></Modal>
  <Modal v-if="modal === 'repos'" title="Odkazy na repozitáre" @close="modal = ''"><form class="form-stack" @submit.prevent="saveRepos"><p class="subtle">Vložte adresy svojich repozitárov. Uložia sa len v tomto prehliadači.</p><label v-for="repo in repoDraft" :key="repo.name">{{ repo.name }}<input v-model="repo.url" type="url" maxlength="2000" placeholder="https://github.com/…" /></label><p v-if="error" class="form-error" role="alert">{{ error }}</p><button class="button primary" type="submit">Uložiť odkazy</button></form></Modal>
</template>
