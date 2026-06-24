<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useAdminOrderStore } from '@/stores/admin/order'
import AdminLayout from '@/layouts/AdminLayout.vue'

const orderStore = useAdminOrderStore()
const route = useRoute()
const router = useRouter()

const orderIndex = ref(-1)
const orderData = ref(null)

onMounted(() => {
  if (route.params.id) {
    orderIndex.value = route.params.id
    const order = orderStore.getOrder(orderIndex.value)
    if (order) {
      orderData.value = order
    }
  }
})

const updateStatus = () => {
  if (orderData.value) {
    orderStore.updateOrder(orderIndex.value, orderData.value)
    // Optional: show toast
  }
}
</script>

<template>
  <AdminLayout>
    <div class="mb-8 flex items-center gap-4">
      <RouterLink :to="{ name: 'admin-order-list' }" class="btn btn-circle btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </RouterLink>
      <div>
        <h1 class="text-3xl font-extrabold text-base-content">
          Order Detail {{ orderData ? `#${orderData.no}` : '' }}
        </h1>
        <p class="text-base-content/60 mt-1">
          Review order information and manage status.
        </p>
      </div>
    </div>

    <div v-if="orderData" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column: Order Products & Main Info -->
      <div class="lg:col-span-2 space-y-8">
        <div class="card bg-base-100 shadow-sm border border-base-200">
          <div class="card-body">
            <h2 class="card-title text-xl mb-4">Products</h2>
            <div class="space-y-4">
              <div
                v-for="(product, idx) in orderData.products"
                :key="idx"
                class="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border border-base-200 bg-base-50"
              >
                <div class="avatar">
                  <div class="w-20 rounded-xl bg-base-200">
                    <img :src="product.imageUrl" :alt="product.name" />
                  </div>
                </div>
                <div class="flex-1 text-center sm:text-left">
                  <h3 class="font-bold text-lg">{{ product.name }}</h3>
                  <p class="text-sm text-base-content/60 mt-1">{{ product.description }}</p>
                </div>
                <div class="text-center sm:text-right">
                  <div class="font-semibold text-base-content">฿{{ product.price }}</div>
                  <div class="text-sm text-base-content/60 mt-1">Qty: {{ product.quantity }}</div>
                </div>
              </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="flex justify-between items-center text-lg font-bold">
              <span>Total Amount</span>
              <span class="text-primary text-2xl">฿{{ orderData.totalPrice }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Customer Info & Status -->
      <div class="space-y-8">
        <div class="card bg-base-100 shadow-sm border border-base-200">
          <div class="card-body">
            <h2 class="card-title text-xl mb-4">Customer Info</h2>
            <div class="space-y-3">
              <div>
                <span class="text-xs font-semibold text-base-content/50 uppercase tracking-wider">Name</span>
                <div class="font-medium text-base-content mt-1">{{ orderData.customerName }}</div>
              </div>
              <div class="divider my-1"></div>
              <div>
                <span class="text-xs font-semibold text-base-content/50 uppercase tracking-wider">Shipping Address</span>
                <div class="text-sm text-base-content mt-1">{{ orderData.address }}</div>
              </div>
              <div class="divider my-1"></div>
              <div>
                <span class="text-xs font-semibold text-base-content/50 uppercase tracking-wider">Payment Method</span>
                <div class="text-sm text-base-content mt-1">{{ orderData.paymentMethod }}</div>
              </div>
              <div class="divider my-1"></div>
              <div>
                <span class="text-xs font-semibold text-base-content/50 uppercase tracking-wider">Order Date</span>
                <div class="text-sm text-base-content mt-1">{{ orderData.updatedAt }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card bg-base-100 shadow-sm border border-base-200">
          <div class="card-body">
            <h2 class="card-title text-xl mb-4">Order Status</h2>
            <form @submit.prevent="updateStatus">
              <div class="form-control w-full">
                <select class="select select-bordered w-full" v-model="orderData.status">
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary w-full mt-4">
                Update Status
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-20 text-base-content/50">
      <p class="text-xl">Loading order data...</p>
    </div>
  </AdminLayout>
</template>

<style scoped></style>
