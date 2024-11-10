<script setup lang="ts">
import TheHeader from './components/Header-component.vue'
import TheFooter from './components/Footer-component.vue'
import Boutique from './features/boutique/BoutiqueF.vue'
import Admin from './features/admin/AdminF.vue'
import { reactive, type Component as C } from 'vue'
import type { Page } from './interfaces/type'

const state = reactive<{
  page: Page
}>({
  page: 'Boutique',
})
const pages: { [s: string]: C } = {
  Boutique,
  Admin,
}
console.log(state.page, pages[state.page]);

// const Boutique = pages['Boutique'];

function navigate(page: Page): void {
  state.page = page
}
</script>

<template>
  <div class="app-container">
    <TheHeader @navigate="navigate" :page="state.page" class="header" />
    <div class="app-content">
      <Suspense>
        <Component :is="pages[state.page]" />
      </Suspense>
    </div>
    <TheFooter class="footer" />
  </div>
</template>

<style scoped lang="scss">
.app-container {
  height: 100vh;
  display: grid;
  grid-template-areas: 'header' 'app-content' 'footer';
  grid-template-rows: 48px auto 48px;
}

.header {
  grid-area: header;
}
.app-content {
  grid-area: app-content;
}
.footer {
  grid-area: footer;
}
</style>
