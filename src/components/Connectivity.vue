<template>
    <div v-if="showConnectionStrength && toggle" class="text-sm text-center text-white bg-orange-700 py-2 relative">
        <p>{{ connectionStrength }}</p>
        <div @click="toggle = false" class="cancel">X</div>
    </div>
</template>

<script setup>
const connect = connectStore()
const {connectionAvailable, connectionStrength, showConnectionStrength} = storeToRefs(connect)

const toggle = ref(false)

onMounted(() => {
    toggle.value = showConnectionStrength.value

    if (!navigator.onLine) {
        showConnectionStrength.value = true
        toggle.value = showConnectionStrength.value
        connectionStrength.value  = 'No internet connection'
    }
})

watch(connectionAvailable, newVal => !newVal ? connectionStrength.value = 'No internet connection' : '')
watch(showConnectionStrength, newVal => toggle.value = newVal )
</script>


<style scoped>
.cancel {
    @apply absolute right-0 top-[50%] translate-y-[-50%] pr-3 hover:text-black font-bold font-mono
}
</style>
