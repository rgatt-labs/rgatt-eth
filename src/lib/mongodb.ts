// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const DB_URL = process.env.DATABASE_URL || "";
const DEFAULT_COLLECTION = process.env.MONGO_COLLECTION;

if (!DB_URL) {
  throw new Error('Please define the DATABASE_URL environment variable inside .env');
}

if (!DEFAULT_COLLECTION) {
  throw new Error('Please define the MONGO_COLLECTION environment variable inside .env');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

client = new MongoClient(DB_URL);

clientPromise = client.connect();

export { clientPromise, DEFAULT_COLLECTION as DefaultCollection };