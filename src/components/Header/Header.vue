<script lang="ts" setup>
import { computed } from 'vue';
import { useCartStore } from '../../stores/cartStore';
import { useRouter } from "vue-router";

const $router = useRouter();

const cartStore = useCartStore();
const cartCount = computed(() => cartStore.getCartCount)
</script>

<template>
  <header>
    <div class="logo">
        <img @click="$router.push('home')" src="../../assets/logo.png" />
    </div>
    <div class="cart">
        <span @click="$router.push('my-cart')">
            <i class="fa-solid fa-cart-shopping fa-lg"></i> 
            ( {{ cartCount === null ? 0 : cartCount }} )
        </span>
    </div>
  </header>
</template>

<style lang="scss" scoped>
    header {
        display: flex;
        justify-content: space-between;
        background-color: #F0F0F0;
        padding: 0.5rem;

        .logo {
            padding-left: 4rem;

            &:hover {
                cursor: pointer;
            }
            
            img {
             width: 10rem;
             height: 5rem;   
            }
        }

        .cart {
            padding-right: 4rem;
            width: 6rem;
            align-content: center;

            span {
                padding: 0.6rem;
                border-radius: 100px;
                font-size: large;

                &:hover {
                    cursor: pointer;
                    background-color: rgba(0, 0, 0, 0.103);
                }
            }
        }
    }
</style>