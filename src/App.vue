<script setup>
import Icon from './components/Icon.vue'
import ProjectPage from './pages/ProjectPage.vue'
</script>
<template>
  <a class="skip-link" href="#main">Preskočiť na obsah</a>
  <header class="topbar team-topbar">
    <a href="#" class="brand" aria-label="TYOLab tím – domov"><span class="brand-icon"><Icon name="NotebookPen" :size="24" /></span><span>TYO<span class="brand-light">Lab</span><span class="team-brand-label">tím</span></span></a>
    <span class="topbar-divider"></span><span class="topbar-caption">Projektový denník</span>
    <nav class="team-header-nav" aria-label="Sekcie tímového webu"><a href="#projekt">Projekt a tím</a><a href="#stav">Stav projektu</a><a href="#zapisnice">Zápisnice</a><a href="#dokumentacia">Dokumentácia</a><a href="#repozitare">Repozitáre</a></nav>
    <span class="avatar" title="Tím TYOLab">TY</span>
  </header>
  <main id="main"><ProjectPage /></main>
</template>
