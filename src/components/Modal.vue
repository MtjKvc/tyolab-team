<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Icon from './Icon.vue'
defineProps({ title: String })
const emit = defineEmits(['close'])
const dialog = ref(null)
let previous
onMounted(() => { previous = document.activeElement; dialog.value.showModal() })
onBeforeUnmount(() => previous?.focus())
</script>
<template><Teleport to="body"><dialog ref="dialog" class="modal" aria-labelledby="modal-title" @cancel.prevent="emit('close')" @click="e => { if (e.target === dialog) emit('close') }"><div class="modal-head"><h2 id="modal-title">{{ title }}</h2><button class="icon-button" aria-label="Zavrieť" @click="emit('close')"><Icon name="X" /></button></div><slot /></dialog></Teleport></template>
