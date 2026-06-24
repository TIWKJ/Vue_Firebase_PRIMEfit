<script setup>
import { onMounted, ref } from 'vue'
import UserLayout from '@/layouts/UserLayout.vue'
import { useAccountStore } from '@/stores/account'
import { storage } from '@/firebase'
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'

const accountStore = useAccountStore()

const imageUrl = ref('')
const fullname = ref('')
const email = ref('')

const isSaved = ref(false)

const handleFileUpload = async (event) => {
  const file = event.target.files[0]

  if (file) {
    const uploadRef = storageRef(storage, `users/${accountStore.user.uid}/${file.name}`)
    const snapshot = await uploadBytes(uploadRef, file)
    const downlaodUrl = await getDownloadURL(snapshot.ref)

    imageUrl.value = downlaodUrl
  }
}

onMounted(() => {
  const profileData = accountStore.profile
  email.value = profileData.email
  fullname.value = profileData.fullname
  imageUrl.value =
    profileData.imageUrl || 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp'
})

const saveProfile = async () => {
  try {
    const profileData = {
      email: email.value,
      fullname: fullname.value,
      imageUrl: imageUrl.value,
    }
    await accountStore.updateProfile(profileData)

    isSaved.value = true
    setTimeout(() => {
      isSaved.value = false
    }, 3000)
  } catch (error) {
    console.error('Error updating profile:', error)
  }
}
</script>

<template>
  <UserLayout>
    <div class="container mx-auto max-w-5xl my-10 px-4">
      <h1 class="text-3xl font-extrabold mb-8 text-base-content">My Profile</h1>

      <div class="flex flex-col md:flex-row gap-8">
        <!-- Sidebar / Avatar -->
        <section class="w-full md:w-1/3 lg:w-1/4 shrink-0">
          <div class="card bg-base-100 shadow-sm border border-base-200 text-center">
            <div class="card-body items-center py-10">
              <div class="avatar mb-6">
                <div
                  class="w-32 rounded-full ring ring-neutral/20 ring-offset-base-100 ring-offset-2 overflow-hidden bg-base-200"
                >
                  <img :src="imageUrl" class="object-cover" />
                </div>
              </div>

              <input
                type="file"
                id="profile-upload"
                class="hidden"
                accept="image/*"
                @change="handleFileUpload"
              />

              <button
                onclick="document.getElementById('profile-upload').click()"
                class="btn btn-outline btn-neutral btn-sm w-full max-w-xs"
              >
                Change Picture
              </button>
            </div>
          </div>
        </section>

        <!-- Profile Form -->
        <section class="flex-1">
          <div class="card bg-base-100 shadow-sm border border-base-200">
            <div class="card-body">
              <h2 class="card-title text-xl mb-4 border-b pb-4">Personal Information</h2>

              <form @submit.prevent="saveProfile">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
                  <div class="form-control w-full">
                    <label class="label">
                      <span class="label-text font-bold text-base-content/80">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      class="input input-bordered w-full transition-all shadow-sm"
                      v-model="fullname"
                      required
                    />
                  </div>

                  <div class="form-control w-full">
                    <label class="label">
                      <span class="label-text font-bold text-base-content/80">Email Address</span>
                    </label>
                    <input
                      type="email"
                      class="input input-bordered w-full transition-all shadow-sm"
                      :value="email"
                      disabled
                    />
                  </div>
                </div>

                <!-- Toast / Alert -->
                <div
                  v-if="isSaved"
                  class="alert alert-success shadow-lg mb-6 bg-success/10 text-success border-success/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Profile updated successfully.</span>
                </div>

                <div class="card-actions justify-end mt-4 pt-4 border-t border-base-200">
                  <button type="submit" class="btn btn-neutral px-10">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  </UserLayout>
</template>

<style scoped></style>
