<script setup>
import UserLayout from '@/layouts/UserLayout.vue'

import CloseIcon from '@/components/icons/Close.vue'
import RightIcon from '@/components/icons/Right.vue'

import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUserCartStore } from '@/stores/user/cart'

const userCartStore = useUserCartStore()
const router = useRouter()

const changeQuantity = (event, index) => {
  userCartStore.updateQuantity(index, event.target.value)
}

const removeItemInCart = (index) => {
  userCartStore.removeItemInCart(index)
}
</script>

<template>
  <UserLayout>
    <div class="container mx-auto max-w-5xl my-10 px-4">
      <h1 class="text-3xl font-extrabold mb-8 text-base-content">Shopping Cart</h1>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Cart Items Section -->
        <section class="flex-1">
          <div
            v-if="userCartStore.items.length === 0"
            class="card bg-base-100 shadow-sm border border-base-200"
          >
            <div class="card-body items-center text-center py-16">
              <h2 class="card-title text-2xl mb-2">Your cart is empty</h2>
              <p class="text-base-content/70 mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <RouterLink to="/" class="btn btn-primary">Start Shopping</RouterLink>
            </div>
          </div>

          <div v-else class="card bg-base-100 shadow-sm border border-base-200">
            <div class="card-body p-0">
              <ul class="divide-y divide-base-200">
                <li
                  v-for="(item, index) in userCartStore.items"
                  :key="index"
                  class="flex flex-col sm:flex-row p-6 gap-6"
                >
                  <!-- Product Image -->
                  <div
                    class="w-full sm:w-32 h-32 shrink-0 bg-base-200 rounded-lg overflow-hidden flex items-center justify-center"
                  >
                    <img class="object-cover w-full h-full" :src="item.imageUrl" :alt="item.name" />
                  </div>

                  <!-- Product Details -->
                  <div class="flex flex-1 flex-col justify-between">
                    <div class="flex justify-between items-start gap-4">
                      <div>
                        <h3 class="text-lg font-bold text-base-content">{{ item.name }}</h3>
                        <p class="text-sm text-base-content/70 mt-1 line-clamp-2">
                          {{ item.about }}
                        </p>
                      </div>
                      <div class="text-lg font-bold whitespace-nowrap">{{ item.price }} ฿</div>
                    </div>

                    <div class="flex justify-between items-end mt-4">
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-medium text-base-content/70">Qty</span>
                        <select
                          class="select select-bordered select-sm w-20"
                          v-model="item.quantity"
                          @change="changeQuantity($event, index)"
                        >
                          <option
                            v-for="quantity in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                            :value="quantity"
                            :key="quantity"
                          >
                            {{ quantity }}
                          </option>
                        </select>
                      </div>

                      <div class="flex items-center gap-4">
                        <p class="hidden sm:flex items-center text-success text-sm font-medium">
                          <RightIcon class="w-4 h-4 mr-1"></RightIcon>
                          <span>In stock</span>
                        </p>
                        <button
                          @click="removeItemInCart(index)"
                          class="btn btn-ghost btn-sm text-error hover:bg-error/10"
                        >
                          <CloseIcon class="w-4 h-4 mr-1"></CloseIcon>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Order Summary Section -->
        <section class="w-full lg:w-96 shrink-0">
          <div class="card bg-base-100 shadow-sm border border-base-200 sticky top-24">
            <div class="card-body">
              <h2 class="card-title text-xl mb-4">Order Summary</h2>

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
                <RouterLink
                  to="/checkout"
                  class="btn btn-neutral w-full"
                  :class="{ 'btn-disabled': userCartStore.items.length === 0 }"
                >
                  Proceed to Checkout
                </RouterLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </UserLayout>
</template>
