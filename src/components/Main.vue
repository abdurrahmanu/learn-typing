<template>
    <main class="page">
        <div class="main bg-inherit flex flex-col h-screen">
            <Navbar />
            <div class="bg-inherit overflow-auto flex-1 flex flex-col">
                <RouterView />
                <Modals_Popups_Toasts/>
                <Footer :class="[(focus && beginTest) && 'invisible pointer-events-none']" />
            </div>
        </div>
    </main>
</template>

<script setup>
const typingstore = typingStore()
const { focus, beginTest } = storeToRefs(typingstore)

const settingstore = settingsStore()
const {pauseTyping} = storeToRefs(settingstore)
</script>

<style scoped>
.page {
    @apply font-light bg-inherit max-w-[2000px] mx-auto select-none min-h-[100dvh] container transition-all duration-300
}
</style>
