<script setup>
import { ref, computed } from 'vue'
import Home from './pages/Home.vue'
import NotFound from './pages/NotFound.vue'
import mySpreadJs from './pages/demo/mySpreadJs.vue'


const routes = {
  '/': Home,
  '/mySpreadJs': mySpreadJs
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})

</script>

<template>
  <div  >
    <component :is="currentView" />
  </div>
</template>