<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'

// Chart 1: Revenue (Bar Chart)
const revenueOptions = {
  chart: {
    id: 'revenue-chart',
    toolbar: { show: false },
    fontFamily: 'inherit',
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  },
  colors: ['#4f46e5'], // High contrast indigo
  dataLabels: { enabled: false },
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: '40%',
    },
  },
  grid: {
    borderColor: '#e5e7eb',
    strokeDashArray: 4,
  },
}

const revenueSeries = [
  {
    name: 'Revenue (THB)',
    data: [30000, 40000, 35000, 50000, 49000, 60000, 70000],
  },
]

// Chart 2: Category Distribution (Donut Chart)
const categoryOptions = {
  chart: {
    id: 'category-chart',
    fontFamily: 'inherit',
  },
  labels: ['Cardio', 'Strength', 'Accessories', 'Apparel'],
  colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'], // High contrast categorical colors
  dataLabels: { enabled: false },
  stroke: { show: false },
  legend: {
    position: 'bottom',
  },
}

const categorySeries = [44, 55, 13, 33]
</script>

<template>
  <AdminLayout>
    <!-- Page Header -->
    <div class="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-base-content">Dashboard Overview</h1>
        <p class="text-base-content/60 mt-1">Welcome back, Admin! Here is what's happening.</p>
      </div>
    </div>

    <!-- DaisyUI Stats -->
    <div class="stats shadow-sm w-full mb-8 bg-base-100 border border-base-200 overflow-hidden">
      <div class="stat p-6">
        <div class="stat-figure text-green-500">
          <div class="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="stat-title text-base-content/60 font-semibold mb-1">Total Revenue</div>
        <div class="stat-value text-green-500 text-3xl">฿339K</div>
      </div>

      <div class="stat p-6">
        <div class="stat-figure text-blue-500">
          <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="stat-title text-base-content/60 font-semibold mb-1">Total Users</div>
        <div class="stat-value text-blue-500 text-3xl">4,200</div>
      </div>

      <div class="stat p-6">
        <div class="stat-figure text-base-content">
          <div class="w-12 h-12 bg-base-200 rounded-xl flex items-center justify-center">
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="stat-title text-base-content/60 font-semibold mb-1">New Orders</div>
        <div class="stat-value text-base-content text-3xl">1,200</div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Bar Chart -->
      <div class="card bg-base-100 shadow-sm border border-base-200">
        <div class="card-body">
          <h2 class="card-title text-lg border-b border-base-200 pb-3 mb-4">Revenue Summary</h2>
          <div class="w-full h-[300px]">
            <apexchart
              width="100%"
              height="100%"
              type="bar"
              :options="revenueOptions"
              :series="revenueSeries"
            ></apexchart>
          </div>
        </div>
      </div>

      <!-- Donut Chart -->
      <div class="card bg-base-100 shadow-sm border border-base-200">
        <div class="card-body">
          <h2 class="card-title text-lg border-b border-base-200 pb-3 mb-4">Sales by Category</h2>
          <div class="w-full h-[300px] flex justify-center items-center">
            <apexchart
              width="380"
              type="donut"
              :options="categoryOptions"
              :series="categorySeries"
            ></apexchart>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped></style>
