<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useProductStore } from '@/stores/user/product'
import { useEventStore } from '@/stores/event'

const productStore = useProductStore()
const eventStore = useEventStore()

onMounted(() => {
  productStore.loadProduct()
})
</script>

<template>
  <Transition name="toast-pop">
    <div v-if="eventStore.alert" class="toast toast-end z-[9999] mb-4 mr-4">
      <div
        class="alert shadow-2xl font-medium border-0 text-white"
        :class="{
          'bg-success/90 backdrop-blur-sm': eventStore.data.status === 'success',
          'bg-error/90 backdrop-blur-sm': eventStore.data.status === 'error',
          'bg-info/90 backdrop-blur-sm': eventStore.data.status === 'info',
          'bg-warning/90 backdrop-blur-sm text-base-content': eventStore.data.status === 'warning',
        }"
      >
        <svg
          v-if="eventStore.data.status === 'success'"
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          v-else-if="eventStore.data.status === 'error'"
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-current shrink-0 w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>

        <span>{{ eventStore.data.message }}</span>
      </div>
    </div>
  </Transition>
  <RouterView />
</template>

<style>
.toast-pop-enter-active,
.toast-pop-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-pop-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.toast-pop-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>
