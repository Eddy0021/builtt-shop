<script lang="ts" setup>
import { ref } from 'vue';
import { Product } from '../../interfaces/IProduct';
import { useCartStore } from '../../stores/cartStore';

const props = defineProps<{
  product: Product;
}>();

const getImage = (imageName: string) => {
  return new URL(`../../assets/${imageName}`, import.meta.url).href;
};

//#region Remove product from the cart

const cartStore = useCartStore();

const removeFromCart = () => {
  cartStore.removeFromCart(props.product.id);
};

//#endregion

//#region Product count/price

const productCount = ref(props.product.count);

const updateProductCount = (type: string) => {
  switch (type) {
    case '-':
      if (productCount.value > 0) {
        productCount.value -= 1;
        props.product.count = productCount.value;
        cartStore.addToCart(props.product);
      }
      break;
    case '+':
        productCount.value += 1;
        props.product.count = productCount.value;
        cartStore.addToCart(props.product);
      break;
    default:
      break;
  }
}

const calculatePrice = (price: number) => {
  if(props.product.sale > 0) return price - (price * ( props.product.sale / 100 ));
  else return price
}

const calculateTotalPrice = (price: number, type: boolean) => { 
    if(type) return (price - (price * ( props.product.sale / 100 ))) * productCount.value;
    else return price * productCount.value;
}

//#endregion
</script>

<template>
    <div class="box">
        <div class="box-left">
            <div class="box-left-image">
                <img :src="getImage(product.image)" />
            </div>
            <div class="box-left-information">
                <div class="box-left-information-top">
                    <h2>{{ product.name }}</h2>
                    <span>
                        <p>{{ product.weight }}</p>
                        <p>{{ product.unit }}</p>
                    </span>
                    <span v-if="productCount > 1">
                        {{ calculatePrice(product.price) }}
                        <p> RSD po kom.</p>
                    </span>
                </div>
                <div class="box-left-information-bottom">
                    <div class="box-left-information-bottom-counter">
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
                    <p class="box-left-information-bottom-removeProduct" @click="removeFromCart" >Ukloni</p>
                </div>
            </div>
        </div>
        <div class="box-right">
            <div class="box-right-price">
                <div v-if="product.sale > 0" class="discount-price">
                    <p>{{ calculateTotalPrice(product.price, true) }}</p>
                    <span>RSD</span>
                </div>  
                <div class="normal-price" :class="{'on-sale': product.sale > 0}">
                    <p>{{ calculateTotalPrice(product.price, false) }}</p>
                    <span>RSD</span>       
                </div>  
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.box {
    width: 900px;
    gap: 1rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #B9B9B9;
    padding: 2rem 0 2rem 0;

    &-left {
        display: flex;
        gap: 1rem;

        &-image {
            img {
                width: 143px;
                height: 143px;
            }
        }

        &-information {
            display: flex;
            flex-flow: column;
            justify-content: space-around;

            &-top {
                text-align: start;
                height: 100%;

                span {
                    display: flex;
                    gap: 0.5rem;
                }
            }

            &-bottom {
                display: flex;
                align-items: center;
                gap: 1rem;
                height: 50%;

                &-counter {
                    display: flex;
                    background-color: white;
                    border: 1px solid black;
                    width: 98px;
                    height: 35px;
                    gap: 15px;
                    border-radius: 100px;
                    align-items: center;
                    justify-content: center;
                }

                &-removeProduct {
                    border-bottom: 1px solid black;

                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }
  
    &-right {
        &-price {
            align-items: end;
            display: flex;
            flex-flow: column;

            .on-sale {
                margin-right: 0.5rem;
            }
        }
    }
  
}
</style>
