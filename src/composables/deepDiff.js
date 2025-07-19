import { watch } from 'vue';

function deepDiff(obj1, obj2, path = '') {
  const changes = [];

  for (const key in obj1) {
    const fullPath = path ? `${path}.${key}` : key;
    if (!(key in obj2)) {
      changes.push(`Removed: ${fullPath}`);
    } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      changes.push(...deepDiff(obj1[key], obj2[key], fullPath));
    } else if (obj1[key] !== obj2[key]) {
      changes.push(`Changed: ${fullPath} from ${obj1[key]} to ${obj2[key]}`);
    }
  }

  for (const key in obj2) {
    if (!(key in obj1)) {
      const fullPath = path ? `${path}.${key}` : key;
      changes.push(`Added: ${fullPath}`);
    }
  }

  return changes;
}

watch(
  () => structuredClone(largeObject), // Avoid mutation causing false positives
  (newVal, oldVal) => {
    const diffs = deepDiff(oldVal, newVal);
    if (diffs.length) {
      console.log('Changed paths:', diffs);
    }
  },
  { deep: true }
);