<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserCartStore } from '@/stores/user/cart'
import UserLayout from '@/layouts/UserLayout.vue'

const formData = reactive({
  email: '',
  name: '',
  address: '',
  note: '',
})

const router = useRouter()
const userCartStore = useUserCartStore()

const payment = () => {
  userCartStore.placeOrder(formData)
  // router.push({ name: 'success' })
}
</script>

<template>
  <UserLayout>
    <div class="container mx-auto max-w-5xl my-10 px-4">
      <h1 class="text-3xl font-extrabold mb-8 text-base-content">Checkout</h1>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Billing Details Section -->
        <section class="flex-1">
          <div class="card bg-base-100 shadow-sm border border-base-200">
            <div class="card-body">
              <h2 class="card-title text-xl mb-4 border-b pb-4">Shipping Information</h2>

              <form @submit.prevent="payment">
                <div class="form-control w-full mb-4">
                  <label class="label">
                    <span class="label-text font-medium text-base-content/80">Email Address</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    class="input input-bordered w-full"
                    v-model="formData.email"
                    required
                  />
                </div>

                <div class="form-control w-full mb-4">
                  <label class="label">
                    <span class="label-text font-medium text-base-content/80">Full Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    class="input input-bordered w-full"
                    v-model="formData.name"
                    required
                  />
                </div>

                <div class="form-control w-full mb-6">
                  <label class="label">
                    <span class="label-text font-bold text-base-content/80">Address</span>
                  </label>
                  <textarea
                    class="textarea textarea-bordered w-full text-base transition-all shadow-sm"
                    rows="3"
                    placeholder="Address"
                    v-model="formData.address"
                    required
                  ></textarea>
                </div>

                <div class="form-control w-full mb-6">
                  <label class="label">
                    <span class="label-text font-bold text-base-content/80"
                      >Notes
                      <span class="font-normal text-base-content/50 ml-1">(Optional)</span></span
                    >
                  </label>
                  <textarea
                    class="textarea textarea-bordered w-full text-base transition-all shadow-sm bg-base-200/50 focus:bg-base-100"
                    rows="2"
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    v-model="formData.note"
                  ></textarea>
                </div>

                <!-- Hidden submit button to allow form validation, but triggered by 'Pay Now' button -->
                <button type="submit" id="checkout-submit" class="hidden"></button>
              </form>
            </div>
          </div>
        </section>

        <!-- Order Summary Section -->
        <section class="w-full lg:w-96 shrink-0 h-fit">
          <div class="card bg-base-100 shadow-sm border border-base-200 sticky top-24">
            <div class="card-body">
              <div class="flex justify-between items-center mb-4 border-b pb-4">
                <h2 class="card-title text-xl m-0">Order Summary</h2>
                <RouterLink
                  to="/cart"
                  class="text-sm font-medium text-base-content/60 hover:text-neutral hover:underline transition-colors"
                >
                  Edit Cart
                </RouterLink>
              </div>

              <ul
                class="divide-y divide-base-200 mb-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar"
              >
                <li
                  v-for="(item, index) in userCartStore.items"
                  :key="index"
                  class="py-4 flex gap-4"
                >
                  <div
                    class="w-16 h-16 bg-base-200 rounded shrink-0 overflow-hidden border border-base-200"
                  >
                    <img class="object-cover w-full h-full" :src="item.imageUrl" :alt="item.name" />
                  </div>
                  <div class="flex-1 flex flex-col justify-center">
                    <h3 class="text-sm font-bold text-base-content line-clamp-1">
                      {{ item.name }}
                    </h3>
                    <p class="text-sm text-base-content/70 mt-1">Qty: {{ item.quantity }}</p>
                  </div>
                  <div class="flex items-center text-sm font-bold text-base-content">
                    {{ item.price * item.quantity }} ฿
                  </div>
                </li>
              </ul>

              <div class="flex flex-col gap-3 text-base-content/80 mb-4">
                <div class="flex justify-between">
                  <span>Subtotal</span>
                  <span class="font-medium">{{ userCartStore.summaryPrice }} ฿</span>
                </div>
                <div class="flex justify-between">
                  <span>Shipping estimate</span>
                  <span class="font-medium text-success">Free</span>
                </div>
              </div>

              <div class="divider my-0"></div>

              <div class="flex justify-between items-center my-4">
                <span class="text-lg font-bold">Total</span>
                <span class="text-2xl font-bold text-neutral"
                  >{{ userCartStore.summaryPrice }} ฿</span
                >
              </div>

              <div class="card-actions">
                <button
                  onclick="document.getElementById('checkout-submit').click()"
                  class="btn btn-neutral w-full"
                  :class="{ 'btn-disabled': userCartStore.items.length === 0 }"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </UserLayout>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 20px;
}
</style>
