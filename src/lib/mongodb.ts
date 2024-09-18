// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const db_url = process.env.DATABASE_URL;

if (!db_url) {
  throw new Error('Please define the DATABASE_URL environment variable inside .env');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

client = new MongoClient(db_url);

clientPromise = client.connect();

const defaultDb = clientPromise.then(client => client.db('rgatt'));

export { clientPromise, defaultDb };