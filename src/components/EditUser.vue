<template>
  <div class="w-full max-w-2xl mx-auto p-2 bg-white dark:bg-neutral-900 rounded-2xl relative">
    <h2 class="text-xl font-semibold text-neutral-800 dark:text-white">Edit Profile</h2>
    <arrowBack class="w-8 absolute top-6 right-0" @click="emits('exitPage')" />
    <form @submit.prevent="submitForm" class="space-y-4">
      <div class="flex items-center space-x-4">
        <img
          :src="form.profilePhoto || defaultAvatar"
          class="w-16 h-16 rounded-full object-cover border"
          alt="Profile"
        />
        <input
          type="file"
          accept="image/*"
          @change="handlePhotoUpload"
          class="text-sm text-neutral-600 dark:text-neutral-300"
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="text-sm text-neutral-700 dark:text-neutral-300">Username</label>
          <input
            v-model="form.username"
            type="text"
            class="w-full p-2 mt-1 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
          />
        </div>

        <!-- <div class="sm:col-span-2">
          <label class="text-sm text-neutral-700 dark:text-neutral-300">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full p-2 mt-1 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
            disabled
          />
        </div> -->
      </div>

      <div class="pt-4 flex justify-between flex-col md:flex-row space-y-2 md:space-y-0">
        <button
          type="submit"
          class="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
          Save Changes
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-neutral-600 text-white rounded-xl hover:bg-neutral-700">
          Restore Default
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600">
          Delete Account
        </button>   
      </div>
    </form>
  </div>
</template>

<script setup>
import arrowBack from '../components/svg/arrowBack.vue'
import { ref } from 'vue'

const props = defineProps({
  userData: Object
})
const emits = defineEmits(['submit', 'exitPage'])

const defaultAvatar = 'https://api.dicebear.com/7.x/initials/svg?seed=User'

const form = ref({
  name: props.userData?.name || '',
  username: props.userData?.username || '',
  email: props.userData?.email || '',
  profilePhoto: props.userData?.profilePhoto || ''
})

const handlePhotoUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      form.value.profilePhoto = reader.result
    }
    reader.readAsDataURL(file)
  }
}

const submitForm = () => {
  emits('submit', { ...form.value })
}
</script>
