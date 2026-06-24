<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UserLayout from '@/layouts/UserLayout.vue'
import { useProductStore } from '@/stores/user/product'
import Product from '@/components/Product.vue'
import { useUserCartStore } from '@/stores/user/cart'

const productStore = useProductStore()
const cartStore = useUserCartStore()
const route = useRoute()
const router = useRouter()
const searchText = ref('')

watch(
  () => route.query.q,
  (newSearchText) => {
    searchText.value = newSearchText
  },
  { immediate: true },
)

const filterProducts = computed(() => {
  return productStore.filterProduct(searchText.value)
})

const addToCart = (product) => {
  cartStore.addToCart(product)
  router.push({ name: 'cart' })
}
</script>

<template>
  <UserLayout>
    <Product :products="filterProducts" :addToCart="addToCart"></Product>
  </UserLayout>
</template>

<style scoped></style>
