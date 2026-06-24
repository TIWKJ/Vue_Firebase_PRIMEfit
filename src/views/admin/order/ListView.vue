<script setup>
import { RouterLink } from 'vue-router'
import { useAdminOrderStore } from '@/stores/admin/order'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Table from '@/components/Table.vue'
import { onMounted } from 'vue'

const orderStore = useAdminOrderStore()

onMounted(() => {
  orderStore.loadOrder()
})
</script>

<template>
  <AdminLayout>
    <!-- Page Header -->
    <div class="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-base-content">Orders</h1>
        <p class="text-base-content/60 mt-1">Manage and track customer orders.</p>
      </div>
    </div>

    <!-- Data Table Card -->
    <div class="card bg-base-100 shadow-sm border border-base-200 overflow-hidden">
      <Table :headers="['Customer Name', 'Total Price', 'Status', 'Created At', '']">
        <tr v-for="(order, index) in orderStore.list" :key="index" class="hover">
          <td>
            <div class="font-bold text-base-content">{{ order.customerName }}</div>
          </td>
          <td>
            <div class="font-medium">฿{{ order.totalPrice }}</div>
          </td>
          <td>
            <div
              class="badge"
              :class="{
                'badge-success badge-outline': order.status === 'completed',
                'badge-warning badge-outline': order.status === 'pending',
                'badge-error badge-outline': order.status === 'cancelled',
                'badge-info badge-outline': order.status === 'processing',
              }"
            >
              {{ order.status }}
            </div>
          </td>
          <td>
            <div class="text-sm text-base-content/70">
              {{ order.updatedAt.toLocaleString() }}
            </div>
          </td>
          <td class="text-right">
            <div class="join">
              <RouterLink
                :to="{ name: 'admin-order-detail', params: { id: index } }"
                class="btn btn-sm btn-square btn-ghost join-item text-info"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </RouterLink>
            </div>
          </td>
        </tr>

        <!-- Empty State -->
        <tr v-if="orderStore.list.length === 0">
          <td colspan="5" class="text-center py-12 text-base-content/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-12 h-12 mx-auto mb-3 opacity-20"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <p>No orders found.</p>
          </td>
        </tr>
      </Table>
    </div>
  </AdminLayout>
</template>

<style scoped></style>
