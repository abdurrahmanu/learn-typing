<template>
    <img :src="qrcode" alt="QR Code" />
</template>

<script setup>
import { useQRCode } from '@vueuse/integrations/useQRCode'

const text = ref('A')
const qrcode = useQRCode(text)
</script>