<script setup>
defineProps({
  headers: Array,
})
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead class="bg-neutral text-neutral-content/80 text-sm">
        <tr>
          <th v-for="header in headers">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>
