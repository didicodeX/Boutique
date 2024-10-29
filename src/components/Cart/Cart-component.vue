<script setup lang="ts">
import { computed } from 'vue';
import CartProductList from './CartProductList.vue'
import type { ProductCartInterface } from '@/interfaces'
const props = defineProps<{
  cart: ProductCartInterface[]
}>()

const emit = defineEmits<{
  (e: 'removeProductFromCart', productId: number): void;
}>();

const totalPrice = computed(() => props.cart.reduce((acc,product) => {
  return acc + product.price * product.quantity;
},0))
</script>

<template>
  <div class="p-20">
    <h1 class="mb-10">Panier</h1>
    <CartProductList :cart="cart"
     @remove-product-from-cart="emit('removeProductFromCart', $event)"
    />
    <button class="btn btn-success">Commander ({{ totalPrice }})</button>
  </div>
</template>

<style scoped lang="scss"></style>
