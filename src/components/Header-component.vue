<script setup lang="ts">

</script>

<template>
<header class="d-flex align-items-center g-10">
  <a href="#" class="d-flex align-items-center g-10">
    <img src="../assets/logo.svg" alt="">
    <span class="logo">Dyma</span>
  </a>
  <ul class="d-flex flex-fill g-10">
    <li><a href="#">Boutique</a></li>
    <li><a href="#">Admin</a></li>
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
    img{
      width: 20px;
    }
    .logo{
      font-weight: 700;
    }
  }
}
</style>

