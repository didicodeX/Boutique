<script setup lang="ts">
import type { ProductInterface } from '@/interfaces'
defineProps<{
  product: ProductInterface
}>()

const emit = defineEmits<{
  (e: 'addProductToCart', productId: number): void
}>()
//console.log(product.id);

</script>

<template>
  <div class="product d-flex flex-column">
    <div
      class="product-image"
      :style="{ background: `url(${product.image}) center/cover` }"
    ></div>
    <div class="p-10 d-flex flex-column">
      <h4>{{ product.title }}</h4>
      <p>
        {{ product.description }}
      </p>
      <div class="d-flex align-items-center g-10">
        <span>{{ product.price }} $</span>
        <button
          @click="emit('addProductToCart', product.id)"
          class="btn btn-primary"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product {
  border: var(--border);
  border-radius: var(--radius);
  box-shadow: var(--box-shadow);
  width: 300px;
  height: 400px;
  &-image {
    // background: url(../../assets/macbook.png) center/cover;
    height: 200px;
  }
}
</style>
