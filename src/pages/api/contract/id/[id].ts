import { NextApiRequest, NextApiResponse } from 'next';
import { defaultDb, clientPromise } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query as { id: string };
	
	console.log("API: ID route");

	if (req.method === 'GET') {
		try {
			const client = await clientPromise;
			const db = client.db('rgatt');
			const vehicle = await db.collection('vehicles').findOne(
				{ _id: new ObjectId(id) },
				{ projection: { amount: 1 } }
			);
			
			if (!vehicle) {
				res.status(404).json({ error: "Error occured"});
				return 
			}
			
			res.status(200).json({ amount: vehicle?.amount });
		} catch (error) {
			res.status(404).json({ error: "error"});
		}
	}
}