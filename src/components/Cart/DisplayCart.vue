<script setup>
import { computed, watch, ref, onMounted } from 'vue';
import { useCartStore } from '../../stores/cartStore';
import { useUserStore } from '../../stores/userStore';
import { useRouter } from "vue-router";
import CartProductBox from './CartProductBox.vue';

const $router = useRouter();

const userStore = useUserStore();
const user = computed(() => userStore.getUser);

const cartStore = useCartStore();
const cartContent = computed(() => cartStore.getCartContent);

//#region calculating checkout

const cartTotal = ref(0);
const cartSaving = ref(0);
const cartCheckoutPrice = ref(0);

const calculateCartValues = () => {
    let total = 0;
    let savings = 0;

    cartContent.value.forEach(product => {
        const price = product.price;
        const sale = product.sale || 0;
        const qty = product.count || 0;

        // Calculate total price for this product
        total += price * qty;

        // Calculate savings if there is a sale
        if (sale > 0) {
        const discount = price * (sale / 100);
        savings += discount * qty;
        }
    });

    cartTotal.value = total;
    cartSaving.value = savings;
    cartCheckoutPrice.value = total - savings;
}

onMounted(() => {
    calculateCartValues();
})

watch(cartContent, () => {
    calculateCartValues();
}, { deep: true });

//#endregion

//#region checkout

    const checkoutOrder = () => {
        if(!user.value) return $router.push('login')
        else {
            // checkout logic
        }
    }

//#endregion
</script>

<template>
    <div>
        <div class="title">
            <h1>Tvoja korpa</h1>
        </div>
        <div class="container">
            <div class="products">
                <div v-if="cartContent.length > 0" class="products-some">
                    <CartProductBox :product="product" v-for="product in cartContent" :key="product.id" />
                </div>              
                <div v-else class="products-empty">
                    <i class="fa-regular fa-face-smile fa-2xl"></i>
                    <h2>Tvoja korpa je prazna</h2>
                </div>
            </div>
            <div class="checkout">
                <div class="checkout-box">
                    <div class="checkout-box-title">
                        <h2>Tvoja narudžbina</h2>
                    </div>
                    <div class="checkout-box-information">
                        <div class="checkout-box-information-row">
                            <p>Ukupno</p>
                            <div class="normal-price">
                                <p>{{ cartTotal }}</p>
                                <span>RSD</span>  
                            </div> 
                        </div>
                        <div class="checkout-box-information-row">
                            <p>Ušteda</p>
                            <div class="normal-price">
                                <p>{{ cartSaving }}</p>
                                <span>RSD</span>  
                            </div> 
                        </div>
                        <div class="checkout-box-information-row">
                            <p>Isporuka Daily Express*</p>
                            <p class="small">Besplatna</p>
                        </div>
                        <div class="checkout-box-information-row">
                            <hr/>
                        </div>
                        <div class="checkout-box-information-row">
                            <p>Ukupno za uplatu</p>
                            <div class="normal-price">
                                <p>{{ cartCheckoutPrice }}</p>
                                <span>RSD</span>  
                            </div>                         
                        </div>
                        <div class="checkout-box-information-row">
                            <p class="small">Cena je sa uključenim PDV-om</p>
                        </div>                      
                    </div>
                    <div class="checkout-box-button">
                        <button class="hover-cursor black-button" @click="checkoutOrder">{{ user === null ? 'Prijavi se za brže plaćanje' : 'Plaćanje' }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;

    .products {
        width: 900px;
        margin: 0 10rem 0 10rem;

        &-empty {
            height: 30rem;
            align-content: center;
        }
    }

    .checkout {
        display: flex;
        flex-flow: column;
        gap: 1rem;

        &-box {
            width: 500px;
            height: 454px;
            background-color: #F6F6F6;

            &-title {
                text-align: start;
                    padding: 1rem 1rem 1rem 2rem;
            }

            &-information {
                &-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 0rem 1rem 1rem 2rem;
                    width: 85%;
                    font-size: large;
                    font-weight: 600;
                    align-items: baseline;

                    hr {
                        width: 100%;
                        opacity: 0.5;
                    }                   
                }
            }

            &-button {
                padding: 0rem 1rem 1rem 2rem;
            }
        }
    }
}
</style>
