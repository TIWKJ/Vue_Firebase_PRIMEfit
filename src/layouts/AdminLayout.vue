<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAccountStore } from '@/stores/account'

const menus = [
  {
    name: 'Dashboard',
    routeName: 'admin-dashboard',
    icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  },
  {
    name: 'Products',
    routeName: 'admin-product-list',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  },
  {
    name: 'Users',
    routeName: 'admin-user-list',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  },
  {
    name: 'Orders',
    routeName: 'admin-order-list',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  },
]

const accountStore = useAccountStore()

const route = useRoute()
const router = useRouter()

const logout = async () => {
  try {
    await accountStore.logout()
    router.push({ name: 'login' })
  } catch (error) {
    console.error('Error signing out:', error)
  }
}
</script>

<template>
  <div class="drawer lg:drawer-open font-sans">
    <input id="admin-drawer" type="checkbox" class="drawer-toggle" />

    <!-- Main Content Area -->
    <div class="drawer-content flex flex-col bg-base-200 min-h-screen">
      <!-- Navbar (Mobile top bar) -->
      <div class="navbar bg-base-100 shadow-sm lg:hidden">
        <div class="flex-none">
          <label for="admin-drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div class="flex-1">
          <span class="text-xl font-bold tracking-wider ml-2"
            >PRIME<span class="opacity-70">Fit</span>
            <span class="text-sm font-normal ml-1">Admin</span></span
          >
        </div>
      </div>

      <!-- Page Content Slot -->
      <main class="flex-1 p-6 lg:p-10">
        <slot></slot>
      </main>
    </div>

    <!-- Sidebar / Drawer Side -->
    <div class="drawer-side z-20">
      <label for="admin-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <div
        class="menu p-4 w-72 min-h-full bg-base-100 text-base-content border-r border-base-200 shadow-lg flex flex-col"
      >
        <!-- Logo / Branding -->
        <div class="mb-8 mt-2 px-2 flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center backdrop-blur-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <div class="text-2xl font-bold tracking-wider leading-tight text-base-content">
              PRIME<span class="text-base-content/70">Fit</span>
            </div>
            <div class="text-xs font-semibold text-primary uppercase tracking-widest mt-0.5">
              Control Panel
            </div>
          </div>
        </div>

        <!-- Navigation Links -->
        <ul class="space-y-2 flex-1">
          <li v-for="menu in menus" :key="menu.routeName">
            <RouterLink
              :to="{ name: menu.routeName }"
              :class="{
                'active bg-neutral text-neutral-content shadow-md shadow-neutral/20':
                  route.name === menu.routeName,
              }"
              class="font-medium flex items-center gap-3 py-3 rounded-xl transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="menu.icon"
                />
              </svg>
              {{ menu.name }}
            </RouterLink>
          </li>
        </ul>

        <!-- Bottom Actions (Logout) -->
        <div class="mt-auto border-t border-base-200 pt-4">
          <ul>
            <li>
              <a
                @click="logout"
                class="text-error hover:bg-error/10 hover:text-error font-medium flex items-center gap-3 py-3 rounded-xl transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
