<script setup lang="ts">
// import { defineProps, defineEmits } from 'vue';
import type { Page } from '../interfaces/type'
defineProps<{
  page: Page
}>()

const emit = defineEmits<{
  (e: 'navigate', page: Page): void
}>()

function navigate(page: Page): void {
  emit('navigate', page)
}
</script>

<template>
  <header class="d-flex align-items-center g-10">
    <a href="#" class="d-flex align-items-center g-10">
      <img src="../assets/logo.svg" alt="" />
      <span class="logo">Dyma</span>
    </a>
    <ul class="d-flex flex-fill g-10">
      <li>
        <a
          :class="{ active: page === 'Boutique' }"
          @click="navigate('Boutique')"
          href="#"
          >Boutique</a
        >
      </li>
      <li>
        <a
          :class="{ active: page === 'Admin' }"
          @click="navigate('Admin')"
          href="#"
          >Admin</a
        >
      </li>
    </ul>
    <ul class="d-flex g-10">
      <li><a href="#">Inscription</a></li>
      <li><a href="#">Connexion</a></li>
    </ul>
  </header>
</template>

<style scoped lang="scss">
header {
  padding: 0 20px;
  background-color: var(--primary-1);
  a {
    color: var(--text-primary-color);

    &:hover {
      text-decoration: underline;
      text-decoration-thickness: 3px;
      text-underline-offset: 5px;
    }
    img {
      width: 20px;
    }
    .logo {
      font-weight: 700;
    }
  }
}

.active {
  text-decoration: underline;
  text-decoration-thickness: 3px;
  text-underline-offset: 5px;
  font-weight: 700;
}
</style>
