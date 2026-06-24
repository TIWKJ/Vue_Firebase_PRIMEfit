<script setup>
defineProps({
  products: Array,
  addToCart: Function,
})
</script>

<template>
  <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-10">
    <div v-for="product in products" class="card w-full bg-base-100 shadow-xl">
      <figure class="h-56 w-full">
        <img class="w-full h-full object-cover" :src="product.imageUrl" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ product.name }}</h2>
        <p>{{ product.about }}</p>
        <div class="card-actions justify-end">
          <button class="btn btn-neutral" @click="addToCart(product)">Buy Now</button>
        </div>
      </div>
    </div>
  </section>
</template>
