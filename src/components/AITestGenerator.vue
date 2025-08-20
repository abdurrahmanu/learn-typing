<template>
  <div class="p-6 space-y-4">
    <textarea v-model="userInput" class="border w-full p-2" placeholder="Ask AI to generate a test..." />
    <button @click="askAI" class="bg-blue-500 text-white px-4 py-2 rounded" :disabled="loading">
      {{ loading ? "Generating..." : "Generate Test" }}
    </button>

    <div v-if="aiResponse" class="border p-4 rounded mt-4">
      <h2 class="font-bold">{{ aiResponse.title }}</h2>
      <ul>
        <li v-for="q in aiResponse.questions" :key="q.id" class="mb-2">
          <p class="font-medium">{{ q.question }}</p>
          <ul>
            <li v-for="opt in q.options" :key="opt">- {{ opt }}</li>
          </ul>
        </li>
      </ul>
      <button @click="useTest" class="bg-green-500 text-white px-4 py-2 mt-3 rounded">Use Test</button>
    </div>
  </div>
</template>

<script setup>
const nextstore = nextStore()
const {generateNewTest} = nextstore

const userInput = ref("")
const aiResponse = ref(null)
const loading = ref(false)

const askAI = async () => {
    loading.value = true
    const res = await fetch("/.netlify/functions/ai", {
    method: "POST",
    body: JSON.stringify({ prompt: userInput.value })
    })
    const data = await res.json()
    loading.value = false

    try {
    aiResponse.value = JSON.parse(data.choices[0].message.content)
    } catch (e) {
    aiResponse.value = { error: "Invalid response format" }
    }
}

const useTest = () => {
    if (aiResponse.value) {
    generateNewTest(aiResponse.value)
    alert("Test saved! You can now use it.")
    }
}
</script>