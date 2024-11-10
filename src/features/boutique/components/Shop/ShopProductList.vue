<script setup lang="ts">
import type { ProductInterface } from '@/interfaces';
import ShopProduct from './ShopProduct.vue';

defineProps<{
  products: ProductInterface[];
}>();

const emit = defineEmits<{
  (e: 'addProductToCart', productId: string): void;
}>();
</script>

<template>
  <div class="flex p-20">
    <ShopProduct
      @add-product-to-cart="emit('addProductToCart', $event.toString())"
      v-for="product of products" :key="product._id"
      :product="product"
    />
  </div>
</template>


<style scoped lang="scss">
.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
</style>
