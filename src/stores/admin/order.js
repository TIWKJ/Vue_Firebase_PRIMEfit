import { defineStore } from 'pinia'

export const useAdminOrderStore = defineStore('admin-order', {
  state: () => ({
    list: [
      {
      no: 'A112234',
      customerName: 'John Doe',
      totalPrice: '300',
      status: 'completed',
      address: '111/892 Nonthaburi Thailand 99999',
      paymentMethod: 'Credit card',
      updatedAt: '9/15/2023, 11:50:24 PM',
      products: [{
        name: 'Dumbbell:A',
        description: 'The Dumbbell is a versatile weightlifting tool.',
        imageUrl: 'https://plus.unsplash.com/premium_photo-1671028546491-f70b21a32cc2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        quantity: 2,
        price: '100'
      },
      {
        name: 'Treadmill:A',
        description: 'Treadmill Machine for Cardio Exercise.',
        imageUrl: 'https://images.unsplash.com/photo-1637712901929-a30440e1bb28?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        quantity: 1,
        price: '100'
      }]
    }
    ]
  }),
  actions: {
    loadOrder() {
      const orders = localStorage.getItem('admin-order')
      if (orders) {
        this.list = JSON.parse(orders)
        this.loaded = true
      }
    },
    getOrder(index) {
      if (!this.loaded) {
        this.loadOrder()
      }
      return this.list[index]
    },
    updateOrder(index, orderData) {
      this.list[index].customerName = orderData.customerName
      this.list[index].totalPrice = orderData.totalPrice
      this.list[index].status = orderData.status
      localStorage.setItem('admin-order', JSON.stringify(this.list))
    }
  }
})
