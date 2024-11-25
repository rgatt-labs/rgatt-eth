import type { NextApiRequest, NextApiResponse } from 'next'
import { clientPromise, DefaultCollection } from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { collection } = req.body;

		try {
			const client = await clientPromise;
			const db = client.db(DefaultCollection);
			const collectionData = await db.collection(collection).find({}).toArray();
	

			return res.status(200).json(collectionData);
		} catch (error) {
			console.error('Error fetching collection data:', error);
		}

	} else {
		return res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}