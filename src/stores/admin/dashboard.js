import { defineStore } from 'pinia'
import { realtimeDB } from '@/firebase'
import { ref, get } from 'firebase/database'

export const useAdminDashboardStore = defineStore('admin-dashboard', {
  state: () => ({
    stats: {
      order: 0,
      product: 0,
      user: 0,
      revenue: 0
    }
  }),
  actions: {
    async loadDashboard() {
      const statRef = ref(realtimeDB, 'stats')
      const statSnapshot = await get(statRef)
      this.stats = statSnapshot.val()
    }
  }
})
