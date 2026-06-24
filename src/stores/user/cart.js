import { defineStore } from 'pinia'

import { updateDoc, increment, doc, writeBatch } from 'firebase/firestore'
import { db, realtimeDB } from '@/firebase'
import { ref, onValue, set } from 'firebase/database'
import { useAccountStore } from '@/stores/account'

export const useUserCartStore = defineStore('user-cart', {
  state: () => ({
    items: [],
    checkout : {}
  }),
  getters: {
    summaryPrice (state) {
      return state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    },
    quantity (state) {
      return state.items.reduce((acc, item) => acc + item.quantity, 0)
    },
    user (state) {
      const accountStore = useAccountStore()
      return accountStore.user
    },
    cartRef(state) {
      return ref(realtimeDB, `carts/${this.user.uid}`)
    }
  },
  actions: {
    async loadCart () {
      if (this.user.uid) {
        onValue(this.cartRef, (snapshot) => {
          const data = snapshot.val()
          if(data) {
            this.items = data
          }
        }, (err) => {
          console.error(err)
        })
      } else {
        const previousCart = localStorage.getItem('cart-item')
        if(previousCart) {
          this.items = JSON.parse(previousCart)
        }
      }
    },
    async addToCart (productData) {
      const itemIndex = this.items.findIndex(
        item => item.name === productData.name
      )
      if (itemIndex >= 0) {
        this.updateQuantity(itemIndex, this.items[itemIndex].quantity + 1)
      } else {
        productData.quantity = 1
        this.items.push(productData)
      }

      await set(this.cartRef,this.items)
    },
    async updateQuantity (index, quantity) {
      this.items[index].quantity = parseInt(quantity)
      await set(this.cartRef,this.items)
    },
    async removeItemInCart (index) {
      this.items.splice(index, 1)
      await set(this.cartRef,this.items)
    },
    async placeOrder(userData) {
      try {
        const orderData = {
          ...userData,
          totalPrice : this.summaryPrice,
          paymentMethod : 'Credit Card',
          createdDate : new Date().toLocaleString(),
          orderNumber : `AA${Math.floor((Math.random() * 90000) + 10000)}`,
          products: this.items
        }

        const batch = writeBatch(db)

        for (const product of orderData.products){
          const productRef = doc(db, 'products', product.productId)
          batch.update(productRef, {
            remainQuantity: increment(-1)
          })
        }

        await batch.commit()

        localStorage.setItem("order-data",JSON.stringify(orderData))
        
        // clear cart
        this.items = []
        localStorage.removeItem("cart-item")
        
      } catch (error){
        console.log('error', error)
      }

    },
    loadCheckout(){
      const orderData = localStorage.getItem("order-data")
      if(orderData) {
        this.checkout = JSON.parse(orderData)
      }
    }
  }
})