import { defineStore } from 'pinia';
import { Product } from '../interfaces/IProduct';
import Products from '../constants/data/products.json';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [] as Product[],
  }),
  getters: {
    getCartCount(): number {
      return this.cartItems.length;
    },
    getCartContent(): Product[] {
      return this.cartItems;
    }
  },
  actions: {
    addToCart(product: Product) {
      const existingItem = this.cartItems.find(item => item.id === product.id);

      // check if count is 0 and if exists in the cartItems: []
      if(product.count === 0 && !existingItem) return
      else if (product.count === 0 && existingItem) {
        setProductsCount(product.id, 0);
        this.cartItems = this.cartItems.filter(cartProduct => cartProduct.id !== product.id);
      }

      // if exsist update the product count | if not add to cartItems: []
      if (existingItem) {     
        setProductsCount(product.id, product.count);
        existingItem.count = product.count;
      } else {
        this.cartItems.push({ ...product });
      }   
    },
    removeFromCart(productId: number) {
      setProductsCount(productId, 0);
      this.cartItems = this.cartItems.filter(item => item.id !== productId);
    },
    updateQuantity(productId: number, quantity: number) {
      const item = this.cartItems.find(item => item.id === productId);
      if (item) {
        item.count = quantity;
      }
    },
  },
});

const setProductsCount = (id: number, value: number) => {
  const productInProducts = Products.find(p => p.id === id);
  if (productInProducts) {
    productInProducts.count = value;
  }
}
