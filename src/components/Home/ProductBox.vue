<script lang="ts" setup>
import { ref } from 'vue';
import { Product } from '../../interfaces/IProduct';
import { useCartStore } from '../../stores/cartStore';

const props = defineProps<{
  product: Product;
}>();

const url = new URL(window.location.href);

const getImage = (imageName: string) => {
  return new URL(`../../assets/${imageName}`, import.meta.url).href;
};

//#region Add product to the cart

const cartStore = useCartStore();

const addToCart = () => {
  props.product.count = productCount.value;
  cartStore.addToCart(props.product);
};

//#endregion

//#region Product count/price

const productCount = ref(props.product.count);

const updateProductCount = (type: string) => {
  switch (type) {
    case '-':
      if (productCount.value > 0) {
        productCount.value -= 1; 
      }
      break;
    case '+':
      productCount.value += 1;
      break;
    default:
      break;
  }
}

const calculatePrice = (price: number) => {
  if(props.product.sale > 0) return price - (price * ( props.product.sale / 100 ));
  else return price
}

//#endregion
</script>

<template>
  <div class="box">
    <div class="box-image">
      <img :src="getImage(product.image)" />
      <div class="box-image-buttons">
        <div class="box-image-buttons-counter">
          <span class="hover-cursor" @click="updateProductCount('-')">
            <i class="fa-solid fa-minus"></i>
          </span>
          <span>
            {{ productCount }}
          </span>
          <span class="hover-cursor" @click="updateProductCount('+')">
            <i class="fa-solid fa-plus"></i>
          </span>
        </div>
        <button class="hover-cursor" @click="addToCart">
          <i class="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
    </div>
    <div class="box-information"> 
      <h2>{{ product.name }}</h2>
      <div class="box-information-unit">
        <p>{{ product.weight + product.unit }}</p>
      </div>
      <div class="box-information-price">
        <div v-if="product.sale > 0" class="discount-price">
          <p>{{ calculatePrice(product.price) }}</p>
          <span>RSD</span>
        </div>  
        <div class="normal-price" :class="{'on-sale': product.sale > 0}">
          <p>{{ product.price }}</p>
          <span>RSD</span>       
          <span v-if="product.sale > 0"> - {{ product.sale }}%</span>
        </div>             
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 284px;
  gap: 1rem;
  display: flex;
  flex-flow: column;

  &-image {
    display: flex;
    flex-flow: column;
    height: 284px;
    justify-content: end;

    img {
      width: 284px;
      height: 284px;
    }

    &-buttons {
      position: absolute;
      display: flex;
      gap: 1rem;
      padding: 0.5rem;
      opacity: 0;
      transition: opacity 0.3s;

      &-counter {
        display: flex;
        background-color: white;
        width: 98px;
        height: 35px;
        gap: 15px;
        border-radius: 100px;
        align-items: center;
        justify-content: center;
      }

      button {
        background: black;
        color: white;
        border-radius: 35px;
        width: 3rem;
      }
    }

    &:hover &-buttons {
      opacity: 1;
    }
  }

  &-information {
    text-align: start;

    &-unit {
      display: flex;
      justify-content: end;

      p {
        position: absolute;
      }
    }
  }
}
</style>
