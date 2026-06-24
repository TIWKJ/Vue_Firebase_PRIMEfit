<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  activePage: Number,
  maxPages: Number,
  changePage: Function,
})
</script>

<template>
  <div class="join">
    <button class="join-item btn" :disabled="activePage === 1" @click="changePage(activePage - 1)">
      «
    </button>
    <button class="join-item btn">Page {{ activePage }} / {{ maxPages }}</button>
    <button
      class="join-item btn"
      :disabled="activePage === maxPages"
      @click="changePage(activePage + 1)"
    >
      »
    </button>
  </div>
</template>
