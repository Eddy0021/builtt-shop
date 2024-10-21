<script lang="ts" setup>
import { ref } from 'vue';
import { Product } from '../../interfaces/IProduct';
import productsData from '../../constants/data/products.json';
import ProductBox from './ProductBox.vue';

const products = ref<Product[]>(productsData);
</script>

<template>
  <div>
    <div class="title">
      <h1>Svi proizvodi</h1>
      <p>{{ products.length > 0 ? products.length : 0 }} proizvoda</p>
    </div>
    <div class="products">
      <ProductBox :product="product" v-for="product in products" :key="product.id" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.products {
  display: flex;
  flex-wrap: wrap;
  margin: 0 10rem 0 10rem;
  gap: 4rem 9rem;
}
</style>
