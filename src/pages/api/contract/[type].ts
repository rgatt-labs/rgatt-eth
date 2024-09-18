import { NextApiRequest, NextApiResponse } from 'next';
import { defaultDb, clientPromise } from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { type } = req.query as { type: string };
	
	try {
		const client = await clientPromise;
		const db = client.db('rgatt');
		const vehicles = await db.collection(type).find({}).toArray();
		res.status(200).json(vehicles);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch vehicle data' });
	}
}