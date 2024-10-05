import { NextApiRequest, NextApiResponse } from 'next';
import { clientPromise, DefaultCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query as { id: string };
	
	if (req.method === 'GET') {
		try {
			const client = await clientPromise;
			const db = client.db(DefaultCollection);
			const vehicle = await db.collection('health').findOne(
				{ _id: new ObjectId(id) },
				{ projection: { amount: 1 } }
			);
			
			if (!vehicle) {
				res.status(404).json({ error: "Error occured"});
			}
			
			res.status(200).json({ amount: vehicle?.amount });
		} catch (error) {
			res.status(404).json({ error: "error"});
		}
	}
}