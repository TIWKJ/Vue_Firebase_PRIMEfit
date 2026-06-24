<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useAdminUserStore } from '@/stores/admin/user'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useEventStore } from '@/stores/event'

const eventStore = useEventStore()
const userStore = useAdminUserStore()
const route = useRoute()
const router = useRouter()

const userIndex = ref(-1)

const formData = reactive({
  fullname: '',
  role: '',
  status: '',
})

onMounted(async () => {
  if (route.params.id) {
    userIndex.value = route.params.id
    const user = await userStore.getUser(userIndex.value)
    formData.fullname = user.fullname
    formData.role = user.role
    formData.status = user.status
  }
})

const updateUser = async () => {
  await userStore.updateUser(userIndex.value, formData)
  eventStore.popupMessage('success', 'User updated successfully')
  router.push({ name: 'admin-user-list' })
}
</script>

<template>
  <AdminLayout>
    <div class="mb-8">
      <div class="flex items-center gap-4">
        <RouterLink :to="{ name: 'admin-user-list' }" class="btn btn-circle btn-ghost">
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
          <h1 class="text-3xl font-extrabold text-base-content">Update User</h1>
          <p class="text-base-content/60 mt-1">Modify existing user details.</p>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-sm border border-base-200">
      <div class="card-body">
        <form @submit.prevent="updateUser">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-semibold">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter full name"
                class="input input-bordered w-full"
                v-model="formData.fullname"
                required
              />
            </div>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-semibold">Role</span>
              </label>
              <select class="select select-bordered w-full" v-model="formData.role">
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="member">Member</option>
              </select>
            </div>

            <div class="form-control w-full md:col-span-2">
              <label class="label">
                <span class="label-text font-semibold">Status</span>
              </label>
              <select class="select select-bordered w-full" v-model="formData.status">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div class="mt-8 flex justify-end gap-4 border-t border-base-200 pt-6">
            <RouterLink :to="{ name: 'admin-user-list' }" class="btn btn-ghost">
              Cancel
            </RouterLink>
            <button type="submit" class="btn btn-primary px-8">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>
