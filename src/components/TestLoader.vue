<template>
    <div class="text-center">
        <span class="spinner inline-block"></span>
    </div>
</template>

<style scoped>

.spinner {
    width: 40px;
    height: 40px;
    border: 2px solid #eee;
    border-top: 4px solid rgb(26, 167, 192);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 12px;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
</style>

