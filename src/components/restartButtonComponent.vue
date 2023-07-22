<template>
    <div class="flex justify-center py-5 md:py-10 gap-5 transition duration-75">
        <div>
            <button @click="$emit('restart')" class="px-8 p-2 md:px-10 hover:bg-zinc-800 hover:text-white rounded-full bg-slate-300 text-black">RESTART</button>
        </div>
        <div>
            <button @click="$emit('restart', 'skip')" class="px-12 p-2 md:px-18 rounded-full hover:bg-zinc-800 hover:text-white bg-slate-300 text-black">SKIP</button>
        </div>
    </div>
    </template>

<script>
    
</script>

<style lang="less" scoped>

</style>