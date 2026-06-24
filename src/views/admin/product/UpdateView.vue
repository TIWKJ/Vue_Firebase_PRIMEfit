<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useAdminProductStore } from '@/stores/admin/product'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useEventStore } from '@/stores/event'
import { storage } from '@/firebase'
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'

const eventStore = useEventStore()
const productStore = useAdminProductStore()
const route = useRoute()
const router = useRouter()

const productIndex = ref(-1)
const mode = ref('CREATE')

const formData = reactive({
  name: '',
  imageUrl: '',
  price: 0,
  quantity: 0,
  about: '',
  status: 'open',
})

const handleFileUpload = async (event) => {
  const file = event.target.files[0]

  let mainPath = ''
  if (productIndex.value !== -1) {
    mainPath = productIndex.value + '-'
  }

  if (file) {
    const uploadRef = storageRef(storage, `products/${mainPath}${file.name}`)
    const snapshot = await uploadBytes(uploadRef, file)
    const downloadUrl = await getDownloadURL(snapshot.ref)
    formData.imageUrl = downloadUrl
  }
}

onMounted(async () => {
  if (route.params.id) {
    productIndex.value = route.params.id
    mode.value = 'UPDATE'

    const selectProduct = await productStore.getProduct(productIndex.value)
    formData.name = selectProduct.name
    formData.imageUrl = selectProduct.imageUrl
    formData.price = selectProduct.price
    formData.quantity = selectProduct.quantity
    formData.about = selectProduct.about || ''
    formData.status = selectProduct.status
  }
})

const updateProduct = async () => {
  try {
    if (mode.value === 'UPDATE') {
      await productStore.updateProduct(productIndex.value, formData)
      eventStore.popupMessage('success', 'Product updated successfully')
    } else {
      await productStore.addProduct(formData)
      eventStore.popupMessage('success', 'Product created successfully')
    }
    router.push({ name: 'admin-product-list' })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <AdminLayout>
    <div class="mb-8">
      <div class="flex items-center gap-4">
        <RouterLink :to="{ name: 'admin-product-list' }" class="btn btn-circle btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </RouterLink>
        <div>
          <h1 class="text-3xl font-extrabold text-base-content">
            {{ mode === 'UPDATE' ? 'Update Product' : 'Create New Product' }}
          </h1>
          <p class="text-base-content/60 mt-1">
            {{
              mode === 'UPDATE'
                ? 'Modify existing product details.'
                : 'Add a new product to your inventory.'
            }}
          </p>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-sm border border-base-200">
      <div class="card-body">
        <form @submit.prevent="updateProduct">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-semibold">Product Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                class="input input-bordered w-full"
                v-model="formData.name"
                required
              />
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-semibold">Image</span>
              </label>
              <div class="flex items-center gap-6">
                <div class="avatar">
                  <div
                    class="w-24 rounded-xl ring ring-neutral/20 ring-offset-base-100 ring-offset-2 overflow-hidden bg-base-200"
                  >
                    <img v-if="formData.imageUrl" :src="formData.imageUrl" class="object-cover" />
                    <div
                      v-else
                      class="flex items-center justify-center w-full h-full bg-base-300 text-base-content/30"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-8 h-8"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="flex-1">
                  <input
                    type="file"
                    id="product-image-upload"
                    class="hidden"
                    accept="image/*"
                    @change="handleFileUpload"
                  />
                  <button
                    type="button"
                    onclick="document.getElementById('product-image-upload').click()"
                    class="btn btn-outline btn-sm"
                  >
                    Upload Image
                  </button>
                  <p class="text-xs text-base-content/50 mt-2">
                    Recommended: 800x800px. Max size: 2MB.
                  </p>
                </div>
              </div>
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-semibold">Price (฿)</span>
              </label>
              <input
                type="number"
                placeholder="0"
                class="input input-bordered w-full"
                v-model="formData.price"
                min="0"
                required
              />
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-semibold">Quantity</span>
              </label>
              <input
                type="number"
                placeholder="0"
                class="input input-bordered w-full"
                v-model="formData.quantity"
                min="0"
                required
              />
            </div>

            <div class="form-control w-full md:col-span-2">
              <label class="label">
                <span class="label-text font-semibold">About / Description</span>
              </label>
              <textarea
                placeholder="Describe your product..."
                class="textarea textarea-bordered w-full h-24"
                v-model="formData.about"
              ></textarea>
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-semibold">Status</span>
              </label>
              <select class="select select-bordered w-full" v-model="formData.status">
                <option value="open">Open (Available)</option>
                <option value="close">Close (Hidden/Unavailable)</option>
              </select>
            </div>
          </div>

          <div class="mt-8 flex justify-end gap-4 border-t border-base-200 pt-6">
            <RouterLink :to="{ name: 'admin-product-list' }" class="btn btn-ghost">
              Cancel
            </RouterLink>
            <button type="submit" class="btn btn-primary px-8">
              {{ mode === 'UPDATE' ? 'Save Changes' : 'Create Product' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>
