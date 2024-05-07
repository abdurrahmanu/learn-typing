<template>
    <div class="space-y-10 p-5 text-slate-500 text-sm">
        <div class="w-[500px] max-w-[90%] h-[250px] border border-neutral-700 m-auto"></div>
        <div class="max-h-[300px]">
            <p class="text-center">RESULTS</p>
            <div class="py-2 space-y-2" v-for="(result, index) in allResults" :key="index">
                <div>TOTAL TIME: {{result.totalTime }}</div>
                <div>NUMBER OF CHARACTERS {{result.characters}}</div>
                <div>CORRECT INPUTS {{result.correctCount}}</div>
                <div>WRONG INPUTS {{result.wrongCount}}</div>
                <div class="space-y-2">
                    <div>TEXT</div>
                    <div class="bg-slate-200 w-fit py-2 px-1 font-mono rounded-md">{{result.containerText}} </div>
                    <div class="text-xs bg-blue-500 rounded-full px-5 py-[2px] w-fit text-white">REPLAY</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const allResults = JSON.parse(localStorage.getItem('dorayi-typing-result'))
</script>

<style lang="scss" scoped>
</style>