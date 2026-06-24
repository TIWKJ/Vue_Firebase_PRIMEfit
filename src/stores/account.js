import { defineStore } from 'pinia'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

import { auth, db } from '@/firebase'

const provider = new GoogleAuthProvider()

export const useAccountStore = defineStore('account', {
  state: () => ({
    isLoginIn: false,
    isAdmin: false,
    profile: {},
    user: {},
  }),
  actions: {
    async authCheck() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
              this.user = user
              const docRef = doc(db, 'users', user.uid)
              const docSnap = await getDoc(docRef)

              if (docSnap.exists()) {
                this.profile = docSnap.data()
              } else {
                const newUser = {
                    fullname: user.displayName,
                    role: 'member',
                    status: 'active',
                    updatedAt: new Date(),
                }
                await setDoc(docRef, newUser)
                this.profile = newUser
              }
            if (this.profile.role === 'admin' || this.profile.role === 'moderator') {
              this.isAdmin = true
            }
            this.isLoginIn = true

            this.profile.email = user.email

            resolve(true)
          } else {
            resolve(false)
          }
        })
      })
    },
    async updateProfile(userData) {
      try {
        const updateUserData = {
          fullname: userData.fullname,
          imageUrl: userData.imageUrl,
        }

        const userDocRef = doc(db, `users/${this.user.uid}`)
        await updateDoc(userDocRef, updateUserData)

      } catch (error) {
        console.error('Error updating profile:', error)
      }
    },
    async signInWithGoogle() {
      try {
        const result = await signInWithPopup(auth, provider)
        this.isLoginIn = true
        this.user = result.user
      } catch (error) {
        console.error('Error during login:', error)
      }
    },
    async signInAdmin(email, password) {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password)
        this.isLoginIn = true
        this.isAdmin = true
        this.user = result.user
      } catch (error) {
        switch (error.code) {
          case 'auth/invalid-email':
            throw new Error('Invalid email')
          case 'auth/user-not-found':
            throw new Error('User not found')
          case 'auth/wrong-password':
            throw new Error('Wrong password')
          default:
            throw new Error('An error occurred')
        }
      }
    },
    async logout() {
      this.isLoginIn = false
      this.isAdmin = false
      await signOut(auth)
    },
  },
})
