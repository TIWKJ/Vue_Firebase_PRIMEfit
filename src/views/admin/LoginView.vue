<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAccountStore } from '@/stores/account'
import { useEventStore } from '@/stores/event'

const router = useRouter()
const accountStore = useAccountStore()
const eventStore = useEventStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const signInAdmin = async () => {
  try {
    await accountStore.signInAdmin(email.value, password.value)
    router.push({ name: 'admin-dashboard' })
  } catch (error) {
    eventStore.popupMessage('error', error.message)
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-base-200 flex items-center justify-center relative overflow-hidden font-sans"
  >
    <!-- Animated background blobs -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      <div
        class="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[100px] mix-blend-multiply animate-blob"
      ></div>
      <div
        class="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-secondary/20 blur-[100px] mix-blend-multiply animate-blob animation-delay-2000"
      ></div>
      <div
        class="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-accent/20 blur-[100px] mix-blend-multiply animate-blob animation-delay-4000"
      ></div>
    </div>

    <!-- Main Card -->
    <div
      class="card lg:card-side bg-base-100/90 backdrop-blur-2xl shadow-2xl w-full max-w-5xl mx-4 z-10 border border-white/20 overflow-hidden transform transition-all"
    >
      <!-- Left side (Visuals) -->
      <div
        class="hidden lg:flex lg:w-5/12 bg-neutral text-neutral-content p-12 flex-col justify-between relative overflow-hidden"
      >
        <!-- Abstract background pattern inside left side -->
        <div
          class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"
        ></div>
        <div
          class="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80 mix-blend-multiply"
        ></div>

        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-10">
            <div
              class="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-white"
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
            <span class="text-2xl font-bold tracking-wider text-white"
              >PRIME<span class="text-white/70">Fit</span></span
            >
          </div>

          <h1 class="text-4xl font-extrabold mb-6 tracking-tight leading-tight text-white">
            Welcome<br />Back
          </h1>
          <p class="text-lg opacity-90 max-w-sm font-light">
            Sign in to access your account, track orders, manage your profile, and explore the
            latest fitness equipment.
          </p>
        </div>
      </div>

      <!-- Right side (Form) -->
      <div class="card-body lg:w-7/12 p-8 sm:p-14">
        <div class="mb-10">
          <h2 class="text-3xl font-extrabold mb-2 text-base-content">Sign In</h2>
          <p class="text-base-content/60 font-medium">Enter your credentials to continue.</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Field -->
          <div class="form-control w-full relative group">
            <label class="label">
              <span class="label-text font-bold text-base-content/80">Email</span>
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40 group-focus-within:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                  />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                class="input input-bordered w-full pl-5 h-12 transition-all shadow-sm bg-base-100 hover:border-base-300"
                v-model="email"
                required
              />
            </div>
          </div>

          <!-- Password Field -->
          <div class="form-control w-full relative group">
            <label class="label">
              <span class="label-text font-bold text-base-content/80">Password</span>
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/40 group-focus-within:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                :type="showPassword ? 'text' : 'password'"
                class="input input-bordered w-full pl-5 pr-12 h-12 transition-all shadow-sm bg-base-100 hover:border-base-300"
                v-model="password"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/40 hover:text-primary transition-colors focus:outline-none"
              >
                <svg
                  v-if="!showPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fill-rule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                    clip-rule="evenodd"
                  />
                  <path
                    d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            @click="signInAdmin"
            class="btn btn-primary w-full h-12 text-base shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
.animate-blob {
  animation: blob 10s infinite alternate;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
