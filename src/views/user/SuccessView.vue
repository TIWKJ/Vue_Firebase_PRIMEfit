<script setup>
import UserLayout from '@/layouts/UserLayout.vue'
import { useUserCartStore } from '@/stores/user/cart'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userCartStore = useUserCartStore()
const orderData = ref({})

onMounted(async () => {
  const orderId = route.query.order_id
  if (orderId) {
    try {
      orderData.value = await userCartStore.loadCheckout(orderId)
    } catch (error) {
      alert('order unsuccessful')
      location.href = '/'
    }
  }
})
</script>

<template>
  <UserLayout>
    <div class="container mx-auto max-w-3xl my-16 px-4">
      <div class="card bg-base-100 shadow-lg border border-base-200">
        <div class="card-body items-center text-center py-12">
          <!-- Success Icon -->
          <div
            class="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="3"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 class="text-3xl font-extrabold mb-2 text-base-content">Thank You!</h1>
          <p class="text-base-content/70 mb-8">Your order has been placed successfully.</p>

          <div
            v-if="orderData.orderNumber"
            class="w-full text-left bg-base-200/50 rounded-xl p-6 mb-8 border border-base-200"
          >
            <h2 class="text-xl font-bold mb-4 border-b border-base-300 pb-3">Order Details</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <p class="text-sm font-medium text-base-content/60">Order Number</p>
                <p class="font-bold text-lg">{{ orderData.orderNumber }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-base-content/60">Date</p>
                <p class="font-medium">{{ orderData.createdAt }}</p>
              </div>

              <!-- Products List -->
              <div class="sm:col-span-2 pt-6 mt-2 border-t border-base-300">
                <p class="text-sm font-medium text-base-content/60 mb-4">Items Ordered</p>
                <div class="space-y-4">
                  <div
                    v-for="(product, index) in orderData.products"
                    :key="index"
                    class="flex items-center gap-4 bg-base-100 p-3 rounded-xl border border-base-200"
                  >
                    <div class="avatar">
                      <div class="w-16 rounded-lg bg-base-200">
                        <img :src="product.imageUrl" :alt="product.name" class="object-cover" />
                      </div>
                    </div>
                    <div class="flex-1">
                      <h3 class="font-bold text-sm">{{ product.name }}</h3>
                      <p class="text-xs text-base-content/60 mt-1">Qty: {{ product.quantity }}</p>
                    </div>
                    <div class="text-right">
                      <p class="font-bold text-neutral">{{ product.totalPrice }} ฿</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p class="text-sm font-medium text-base-content/60">Payment Method</p>
                <p class="font-medium">{{ orderData.paymentMethod }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-base-content/60">Total Amount</p>
                <p class="font-bold text-xl text-primary">{{ orderData.totalPrice }} ฿</p>
              </div>

              <div class="sm:col-span-2 pt-4 border-t border-base-300">
                <p class="text-sm font-medium text-base-content/60 mb-1">Shipping Information</p>
                <p class="font-bold">{{ orderData.name }}</p>
                <p class="text-sm mt-1 whitespace-pre-line text-base-content/80">
                  {{ orderData.address }}
                </p>
                <div
                  v-if="orderData.note"
                  class="mt-3 bg-base-100 p-3 rounded-lg border border-base-200"
                >
                  <p class="text-xs font-bold text-base-content/60 mb-1">Note:</p>
                  <p class="text-sm italic text-base-content/80">{{ orderData.note }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="card-actions justify-center w-full mt-2">
            <RouterLink to="/" class="btn btn-neutral w-full sm:w-auto px-10"
              >Back to Home</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>

<style scoped></style>
