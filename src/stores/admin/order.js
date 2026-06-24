import { defineStore } from 'pinia'

import { collection, doc, getDocs, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export const useAdminOrderStore = defineStore('admin-order', {
  state: () => ({
    list: []
  }),
  actions: {
    async loadOrder() {
      const ordersRef = collection(db, 'orders')
      const ordersSnapshot = await getDocs(ordersRef)
      this.list = ordersSnapshot.docs.map(doc => {
        let convertOrder = doc.data()
        convertOrder.orderId = doc.id
        convertOrder.createdAt = convertOrder.createdAt.toDate()
        return convertOrder
      })
    },
    async getOrder(orderId) {
     const orderRef = doc(db, 'orders', orderId)
     const orderSnapshot = await getDoc(orderRef)
     let orderData = orderSnapshot.data()
     orderData.orderId = orderSnapshot.id
     orderData.createdAt = orderData.createdAt.toDate()
     return orderData
    },
  }
})
