import { defineStore } from 'pinia'
import axios from 'axios'
import { doc, getDoc } from 'firebase/firestore'
import { db, realtimeDB } from '@/firebase'
import { ref, onValue, set } from 'firebase/database'
import { useAccountStore } from '@/stores/account'

Omise.setPublicKey(import.meta.env.VITE_OMISE_PUBLIC_KEY)

const createSource = (amount) => {
  return new Promise((resolve, reject) => {
    Omise.createSource('rabbit_linepay', {
      amount: (amount * 100),
      currency: 'THB'
    }, (statusCode, response) => {
      if (statusCode !== 200) {
        return reject(response)
      }
      resolve(response)
    })
  })
}

export const useUserCartStore = defineStore('user-cart', {
  state: () => ({
    items: [],
    checkout: {},
  }),
  getters: {
    summaryPrice(state) {
      return state.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    },
    quantity(state) {
      return state.items.reduce((acc, item) => acc + item.quantity, 0)
    },
    user(state) {
      const accountStore = useAccountStore()
      return accountStore.user
    },
    cartRef(state) {
      return ref(realtimeDB, `carts/${this.user.uid}`)
    },
  },
  actions: {
    async loadCart() {
      if (this.user.uid) {
        onValue(
          this.cartRef,
          (snapshot) => {
            const data = snapshot.val()
            if (data) {
              this.items = data
            }
          },
          (err) => {
            console.error(err)
          },
        )
      } else {
        const previousCart = localStorage.getItem('cart-item')
        if (previousCart) {
          this.items = JSON.parse(previousCart)
        }
      }
    },
    async addToCart(productData) {
      const itemIndex = this.items.findIndex((item) => item.name === productData.name)
      if (itemIndex >= 0) {
        this.updateQuantity(itemIndex, this.items[itemIndex].quantity + 1)
      } else {
        productData.quantity = 1
        this.items.push(productData)
      }

      await set(this.cartRef, this.items)
    },
    async updateQuantity(index, quantity) {
      this.items[index].quantity = parseInt(quantity)
      await set(this.cartRef, this.items)
    },
    async removeItemInCart(index) {
      this.items.splice(index, 1)
      await set(this.cartRef, this.items)
    },
    async placeOrder(userData) {
      try {
        const checkoutData = {
          ...userData,
          products: this.items.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
          })),
        }

        const omiseResponse = await createSource(this.summaryPrice)

        const response = await axios.post('/api/placeorder', {
          source: omiseResponse.id,
          checkout: checkoutData,
        })

        return response.data
      } catch (error) {
        console.log('error', error)
      }
    },
    async loadCheckout(orderId) {
      try {
        const orderRef = doc(db, 'orders', orderId)
        const orderSnapshot = await getDoc(orderRef)
        let orderData = orderSnapshot.data()
        orderData.createdAt = orderData.createdAt.toDate().toLocaleString()
        orderData.orderNumber = orderSnapshot.id
        return orderData
      } catch (error) {
        throw new Error(error.message)
      }
    },
  },
})
