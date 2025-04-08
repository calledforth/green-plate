// lib/mongodb.ts
import { MongoClient } from 'mongodb'

const uri = "mongodb+srv://jaiadhi:OTcSU8b1anjr8f51@greenplate0.axtgf1p.mongodb.net/?retryWrites=true&w=majority&appName=greenplate0"
const options = {}

let client
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient>
}


if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
