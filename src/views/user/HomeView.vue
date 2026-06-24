<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import UserLayout from '@/layouts/UserLayout.vue'
import Product from '@/components/Product.vue'
import { useProductStore } from '@/stores/user/product'
import { useUserCartStore } from '@/stores/user/cart'

const productStore = useProductStore()
const userCartStore = useUserCartStore()
const router = useRouter()

onMounted(() => {
  productStore.loadProduct()
})

const addToCart = (product) => {
  userCartStore.addToCart(product)
  router.push({ name: 'cart' })
}
</script>

<template>
  <UserLayout>
    <div class="hero h-96 bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">STRONGER TOGETHER</h1>
          <p class="py-6">find equipment you need to reach your fitness goals</p>
        </div>
      </div>
    </div>

    <Product :products="productStore.list" :addToCart="addToCart"> </Product>
  </UserLayout>
</template>

<style scoped></style>
