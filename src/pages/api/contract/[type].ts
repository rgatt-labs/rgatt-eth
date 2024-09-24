import { NextApiRequest, NextApiResponse } from 'next';
import { defaultDb, clientPromise } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { type } = req.query as { type: string };
	
	if (req.method === 'GET') {
		try {
			const client = await clientPromise;
			const db = client.db('rgatt');
			const vehicles = await db.collection(type).find({}).toArray();
			return res.status(200).json(vehicles);
		} catch (error) {
			return res.status(500).json({ error: 'Failed to fetch vehicle data' });
		}
	}
	return res.status(401).json({ message: "Goodbye World! "});
}