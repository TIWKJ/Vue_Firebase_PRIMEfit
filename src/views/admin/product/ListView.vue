<script setup>
import { RouterLink } from 'vue-router'
import { useAdminProductStore } from '@/stores/admin/product'
import { useEventStore } from '@/stores/event'
import { onMounted, ref } from 'vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Table from '@/components/Table.vue'
import Pagination from '@/components/Pagination.vue'

const productStore = useAdminProductStore()
const eventStore = useEventStore()
const currentPage = ref(1)

onMounted(async () => {
  await productStore.loadProduct()
})

const removeProduct = async (index) => {
  try {
    await productStore.removeProduct(index)
    await productStore.loadProduct()
    eventStore.popupMessage('success', 'Product removed successfully')
  } catch (error) {
    console.error(error)
    eventStore.popupMessage('error', 'Failed to remove product')
  }
}

const searchProduct = async () => {
  await productStore.loadProduct()
}

const changeStatusFilter = async (status) => {
  productStore.filters.status = status
  await productStore.loadProduct()
}

const changeSortUpdatedAt = async (sort) => {
  productStore.filters.sort.updateAt = sort
  await productStore.loadProduct()
}

const changePage = async (page) => {
  if (page < currentPage.value) {
    await productStore.loadNextProduct('previous')
  } else if (page > currentPage.value) {
    await productStore.loadNextProduct('next')
  }
  currentPage.value = page
}
</script>

<template>
  <AdminLayout>
    <!-- Page Header -->
    <div class="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-base-content">Products</h1>
        <p class="text-base-content/60 mt-1">Manage your storefront inventory and catalogs.</p>
      </div>
      <div>
        <RouterLink
          :to="{ name: 'admin-product-create' }"
          class="btn btn-primary shadow-lg shadow-primary/30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New Product
        </RouterLink>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <div class="flex-1">
        <label class="input input-bordered flex items-center gap-2 w-full max-w-xs">
          <input
            v-model="productStore.filters.search"
            @keyup.enter="searchProduct()"
            type="text"
            class="grow"
            placeholder="Search products..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div class="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
        <select
          class="select select-bordered w-full sm:w-auto"
          @change="changeStatusFilter($event.target.value)"
        >
          <option value="">All</option>
          <option value="open">Open</option>
          <option value="close">Close</option>
        </select>
        <select
          class="select select-bordered w-full sm:w-auto"
          @change="changeSortUpdatedAt($event.target.value)"
        >
          <option disabled>Updated At</option>
          <option selected value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>
    </div>

    <!-- Data Table Card -->
    <div class="card bg-base-100 shadow-sm border border-base-200 overflow-hidden">
      <Table :headers="['Product', 'Price', 'Stock', 'Status', 'Updated At', '']">
        <tr v-for="(product, index) in productStore.list" :key="index" class="hover">
          <td>
            <div class="flex items-center gap-4">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12 bg-base-200">
                  <img :src="product.imageUrl" :alt="product.name" class="object-cover" />
                </div>
              </div>
              <div>
                <div class="font-bold text-base-content">{{ product.name }}</div>
                <div class="text-xs text-base-content/50 truncate max-w-[200px]">
                  {{ product.about }}
                </div>
              </div>
            </div>
          </td>
          <td class="font-medium">฿{{ product.price }}</td>
          <td>
            <span class="font-medium" :class="product.remainQuantity <= 0 ? 'text-error' : ''">
              {{ product.remainQuantity }} / {{ product.quantity }}
            </span>
            <span class="text-xs text-base-content/50 ml-1">pcs</span>
          </td>
          <td>
            <div
              class="badge"
              :class="
                product.status === 'open'
                  ? 'badge-success badge-outline'
                  : 'badge-error badge-outline'
              "
            >
              {{ product.status }}
            </div>
          </td>
          <td>
            {{ product.updateAt.toLocaleString() }}
          </td>
          <td class="text-right">
            <div class="join">
              <RouterLink
                :to="{ name: 'admin-product-update', params: { id: product.productId } }"
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
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </RouterLink>
              <button
                @click="removeProduct(product.productId)"
                class="btn btn-sm btn-square btn-ghost join-item text-error"
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
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </td>
        </tr>

        <!-- Empty State -->
        <tr v-if="productStore.list.length === 0">
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
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
            <p>No products found. Add a new product to get started.</p>
          </td>
        </tr>
      </Table>
    </div>
    <Pagination
      class="w-full pt-3 justify-center items-center"
      :activePage="currentPage"
      :maxPages="productStore.totalPage"
      :changePage="changePage"
    />
  </AdminLayout>
</template>

<style scoped></style>
