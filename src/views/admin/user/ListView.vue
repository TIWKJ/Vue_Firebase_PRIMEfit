<script setup>
import { RouterLink } from 'vue-router'
import { useAdminUserStore } from '@/stores/admin/user'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Table from '@/components/Table.vue'
import { onMounted } from 'vue'

const userStore = useAdminUserStore()

onMounted(async () => {
  await userStore.loadUser()
})

const changeStatus = async (index) => {
  let selectedUser = userStore.list[index]
  selectedUser.status = selectedUser.status === 'active' ? 'inactive' : 'active'
  await userStore.updateUser(selectedUser.uid, selectedUser)
}
</script>

<template>
  <AdminLayout>
    <!-- Page Header -->
    <div class="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-base-content">Users</h1>
        <p class="text-base-content/60 mt-1">Manage user accounts and roles.</p>
      </div>
    </div>

    <!-- Data Table Card -->
    <div class="card bg-base-100 shadow-sm border border-base-200 overflow-hidden">
      <Table :headers="['Name', 'Role', 'Status', 'Updated At', '']">
        <tr v-for="(user, index) in userStore.list" :key="index" class="hover">
          <td>
            <div class="font-bold text-base-content">{{ user.fullname }}</div>
          </td>
          <td>
            <div class="text-sm">{{ user.role }}</div>
          </td>
          <td>
            <div
              class="badge"
              :class="
                user.status === 'active'
                  ? 'badge-success badge-outline'
                  : 'badge-error badge-outline'
              "
            >
              {{ user.status }}
            </div>
          </td>
          <td>
            <div class="text-sm text-base-content/70">
              {{ user.updatedAt.toLocaleString() }}
            </div>
          </td>
          <td class="text-right">
            <div class="join">
              <RouterLink
                :to="{ name: 'admin-user-update', params: { id: user.uid } }"
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
                @click="changeStatus(index)"
                class="btn btn-sm btn-square btn-ghost join-item"
                :class="user.status === 'active' ? 'text-warning' : 'text-success'"
                title="Change Status"
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
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
            </div>
          </td>
        </tr>

        <!-- Empty State -->
        <tr v-if="userStore.list.length === 0">
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
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
            <p>No users found.</p>
          </td>
        </tr>
      </Table>
    </div>
  </AdminLayout>
</template>

<style scoped></style>
