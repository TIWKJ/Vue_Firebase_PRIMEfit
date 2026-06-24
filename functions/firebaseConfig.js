const { initializeApp } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { getDatabase } = require('firebase-admin/database')
const { getAuth } = require('firebase-admin/auth')

initializeApp({
  projectId: 'prime-fit-commerce',
  databaseURL: 'http://127.0.0.1:9000/?ns=prime-fit-commerce-default-rtdb'
})

const db = getFirestore()
const auth = getAuth()
const realtimeDB = getDatabase()

module.exports = { db, auth, realtimeDB }