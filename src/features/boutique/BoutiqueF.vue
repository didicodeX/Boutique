<script setup lang="ts">
import Shop from './components/Shop/Shop-component.vue'
import Cart from './components/Cart/Cart-component.vue'
import data from '../../data/product'
import { computed, reactive } from 'vue'
import type {
  ProductInterface,
  ProductCartInterface,
  FiltersInterface,
  FilterUpdate,
} from '../../interfaces'
import { DEFAULT_FILTERS } from '../../data/filters'

// const products = reactive<ProductInterface[]>(data)
// const cart = reactive<ProductInterface[]>([])

const state = reactive<{
  products: ProductInterface[]
  cart: ProductCartInterface[]
  filters: FiltersInterface
}>({
  products: data, // products,
  cart: [],
  filters: DEFAULT_FILTERS,
})
const products = await (
  await fetch('https://restapi.fr/api/products')
).json()
if (Array.isArray(products)) {
  state.products = products
} else {
  state.products = [products]
}
function addProductToCart(productId: string): void {
  const product = state.products.find((product) => product._id === productId);
  if (product) {
    const productInCart = state.cart.find(
      (product) => product._id === productId
    );
    if (productInCart) {
      productInCart.quantity++;
    } else {
      state.cart.push({ ...product, quantity: 1 });
    }
  }
}
// function removeProductFromCart(productId: string): void {
//   const productFromCart = state.cart.find(product => product._id === productId)
//   if (productFromCart?.quantity === 1) {
//     state.cart = state.cart.filter(product => product._id !== productId)
//   } else if (productFromCart) {
//     productFromCart.quantity--
//   }
// }

function updateFilter(filterUpdate: FilterUpdate) {
  if (filterUpdate.search !== undefined) {
    state.filters.search = filterUpdate.search;
  } else if (filterUpdate.priceRange) {
    state.filters.priceRange = filterUpdate.priceRange;
  } else if (filterUpdate.category) {
    state.filters.category = filterUpdate.category;
  } else {
    state.filters = { ...DEFAULT_FILTERS };
  }
}


const cartEmpty = computed(() => state.cart.length === 0)

const filteredProducts = computed(() => {
  return state.products.filter((product) => {
    if (
      product.title
        .toLocaleLowerCase()
        .startsWith(state.filters.search.toLocaleLowerCase()) &&
      product.price >= state.filters.priceRange[0] &&
      product.price <= state.filters.priceRange[1] &&
      (product.category === state.filters.category ||
        state.filters.category === 'all')
    ) {
      return true;
    } else {
      return false;
    }
  });
});

console.log(filteredProducts)
</script>

<template>
  <div class="boutique" :class="{ gridEmpty: cartEmpty }">
    <Shop
      @update-filter="updateFilter"
      :products="filteredProducts"
      :filters="state.filters"
      @add-product-to-cart="addProductToCart"
      class="shop"
    />
    <Cart
      v-if="!cartEmpty"
      :cart="state.cart"

      class="cart"
    />
  </div>
</template>

<style scoped lang="scss">
.boutique {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 75% 25%;
}
.gridEmpty {
  grid-template-columns: 100%;
}
.cart {
  border-left: var(--border);
  box-shadow: var(--box-shadow);
}
</style>
