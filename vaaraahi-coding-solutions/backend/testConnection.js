import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...')
    console.log('URL:', process.env.MONGODB_URI?.replace(/:[^:@]+@/, ':****@'))
    
    await mongoose.connect(process.env.MONGODB_URI)
    
    console.log('✅ Successfully connected to MongoDB!')
    console.log('Database:', mongoose.connection.db.databaseName)
    console.log('Host:', mongoose.connection.host)
    
    await mongoose.connection.close()
    console.log('Connection closed.')
    process.exit(0)
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    console.error('Error code:', error.code)
    process.exit(1)
  }
}

testConnection()
