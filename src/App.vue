<script setup lang="ts">
import TheHeader from './components/Header-component.vue'
import Shop from './components/Shop/Shop-component.vue'
import Cart from './components/Cart/Cart-component.vue'
import TheFooter from './components/Footer-component.vue'
import data from './data/product'
import { computed, reactive } from 'vue'
import type {
  ProductInterface,
  ProductCartInterface,
  FiltersInterface,
  FilterUpdate,
} from './interfaces'
import { DEFAULT_FILTERS } from './data/filters'

// const products = reactive<ProductInterface[]>(data)
// const cart = reactive<ProductInterface[]>([])

const state = reactive<{
  products: ProductInterface[]
  cart: ProductCartInterface[]
  filters: FiltersInterface[]
}>({
  products: data,
  cart: [],
  filters: DEFAULT_FILTERS,
})

function addProductToCart(productId: number): void {
  const product = state.products.find(product => product.id === productId)
  if (product) {
    const productInCart = state.cart.find(product => product.id === productId)
    if (productInCart) {
      productInCart.quantity++
    } else {
      state.cart.push({ ...product, quantity: 1 })
    }
  }
  // state.cart.push({ ...product,quantity: 1 });

  console.log(state.cart)
}
function removeProductFromCart(productId: number): void {
  const productFromCart = state.cart.find(product => product.id === productId)
  if (productFromCart) {
    if (productFromCart.quantity === 1)
      state.cart = state.cart.filter(product => product.id !== productId)
    else productFromCart.quantity--
  }
}

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
  return state.products.filter(product => {
    if (
      product.title
        .toLowerCase()
        .startsWith(state.filters.search.toLowerCase()) &&
      product.price >= state.filters.priceRange[0] &&
      product.price <= state.filters.priceRange[1] &&
      (product.category === state.filters.category ||
        state.filters.category === 'all')
    ) {
      return true
    } else {
      return false
    }
  })
})

console.log(filteredProducts)
</script>

<template>
  <div
    class="app-container"
    :class="{
      gridEmpty: cartEmpty,
    }"
  >
    <TheHeader class="header" />
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
      @remove-product-from-cart="removeProductFromCart"
    />
    <TheFooter class="footer" />
  </div>
</template>

<style scoped lang="scss">
.app-container {
  min-height: 100vh;
  display: grid;
  grid-template-areas: 'header header' 'shop cart' 'footer footer';
  grid-template-columns: 70%;
  grid-template-rows: 48px auto 48px;
}
.gridEmpty {
  grid-template-areas: 'header' 'shop' 'footer';
  grid-template-columns: 100%;
}
.header {
  grid-area: header;
}
.shop {
  grid-area: shop;
}
.cart {
  grid-area: cart;
  border-left: var(--border);
  box-shadow: var(--box-shadow);
}
.footer {
  grid-area: footer;
}

@media screen and (max-width: 600px) {
  .app-container {
    grid-template-areas: 'header' 'cart' 'shop' 'footer';
    grid-template-columns: 1fr;
    grid-template-rows: 48px auto auto 48px;
  }
  .cart {
    border-bottom: var(--border);
  }
}
</style>
