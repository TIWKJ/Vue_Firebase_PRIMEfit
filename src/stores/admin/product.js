import { defineStore } from 'pinia'
import {db} from '@/firebase'
import {
  collection, doc, deleteDoc, addDoc,
  getDocs, getDoc, setDoc, query, 
  where, orderBy , limit, limitToLast,
  startAfter, endBefore, getCountFromServer
} from 'firebase/firestore'

export const useAdminProductStore = defineStore('admin-product', {
  state: () => ({
    list: [],
    limitRow: 5,
    docList: [],
    total: 1,
    filters: {
      search: '',
      status: '',
      sort: {
        updateAt: 'desc',
      }
    }
  }),
  getters: {
    list: (state) => {
      return state.docList.map(doc => {
        const convertedProduct = doc.data()
        convertedProduct.productId = doc.id
        convertedProduct.updateAt = convertedProduct.updateAt.toDate()
        return convertedProduct
      })
    },
    totalPage: (state) => {
      return Math.ceil(state.total / state.limitRow)
    }
  },
  actions: {
    async loadProduct() {
      let productCol = query (
        collection(db, 'products'),
        orderBy('updateAt', this.filters.sort.updateAt)
      )

      if (this.filters.search){
        productCol = query(productCol, where('name', '==', this.filters.search))
      }

      if (this.filters.status){
        productCol = query(productCol, where('status', '==', this.filters.status))
      }

      const rawProductCol = productCol

      productCol = query(productCol, limit(this.limitRow))

      const productSnapshot = await getDocs(productCol)
      this.docList = productSnapshot.docs

      const allSnapshot = await getCountFromServer(rawProductCol)
      this.total = allSnapshot.data().count

    },  
    async loadNextProduct(mode) {
      let productCol = query (
        collection(db, 'products'),
        orderBy('updateAt', this.filters.sort.updateAt)
      )
      if (mode === 'next') {
        const lastDocument = this.docList[this.docList.length - 1]
        //next page
        productCol = query(productCol, startAfter(lastDocument),limit(this.limitRow))

      } else {
        //previous page
        const firstDocument = this.docList[0]
        productCol = query(productCol, endBefore(firstDocument),limitToLast(this.limitRow))
        
      }

      const productSnapshot = await getDocs(productCol)
      this.docList = productSnapshot.docs
    },
    async getProduct(productId) {
      try {
        const productRef = doc(db, 'products', productId)
        const productSnapshot = await getDoc(productRef)
        return productSnapshot.data()
      } catch (error) {
        console.error(error)
      }
    },
    async addProduct(productData) {
      try {
        productData.remainQuantity = productData.quantity
        productData.updateAt = new Date()
        const productCol = collection(db, 'products')
        await addDoc(productCol, productData)
      } catch (error) {
        console.error(error)
      }
    },
    async updateProduct(productId, productData) {
      try {
        const updateProduct = {}
        updateProduct.name = productData.name
        updateProduct.imageUrl = productData.imageUrl
        updateProduct.about = productData.about
        updateProduct.price = productData.price
        updateProduct.quantity = productData.quantity
        updateProduct.remainQuantity = productData.quantity
        updateProduct.status = productData.status
        updateProduct.updateAt = new Date()
        const productRef = doc(db, 'products', productId)
        await setDoc(productRef, updateProduct)
      } catch (error) {
        console.error(error)
      }
      
    },
    async removeProduct(productId) {
      try {
        const productRef = doc(db, 'products', productId)
        await deleteDoc(productRef)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
