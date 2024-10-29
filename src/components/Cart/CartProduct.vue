<script setup lang="ts">
import type { ProductCartInterface } from '@/interfaces'
defineProps<{
  product: ProductCartInterface
}>()

const emit = defineEmits<{
  (e: 'removeProductFromCart', productId: number): void;
}>();
</script>

<template>
  <div class="mb-10 d-flex align-items-center g-10 product">
    <strong class="">{{product.title}}</strong>
    <span class="flex-fill">x{{ product.quantity }}</span>
    <span>{{product.price}}</span>
    <button class="btn btn-danger"
    @click="emit('removeProductFromCart', product.id)"
    >supprimer</button>
  </div>
</template>

<style scoped lang="scss">
.product {
  border: var(--border);
  border-radius: var(--radius);
  padding: 10px;
  flex: 1 0 auto;
}
@media screen and (max-width: 1200px) {
  .product {
    display: flex;
    flex-direction: column;
  }
}
@media screen and (max-width: 600px) {
  .product {
    display: flex;
    flex-direction: row;
  }
}
</style>
