<template>
        <div class="p-2 px-1 border-t border-neutral-900 ">
            <div @click="customize" class="flex justify-between w-full p-1 border border-transparent rounded-sm hover:border-neutral-300">
                <div class="flex gap-4">
                    <input :checked="customizers['blind-mode']"  type="checkbox" name="" id="">
                    <p>Blind mode</p>
                </div>
            </div>
            <p>How confident are you?  Type while fully trusting your muscle memory. </p>
        </div>

</template>

<script setup>
import {storeToRefs} from 'pinia';
import {customizeStore} from '../../store/customizeStore';

const store = customizeStore()
const { customizers, disableOption } = storeToRefs(store)

const customize = () => {
    customizers.value['blind-mode'] = !customizers.value['blind-mode']
    localStorage.setItem('dorayi-typing-preferred-config', JSON.stringify([customizers.value, disableOption.value]))
}
</script>
