import type { NextApiRequest, NextApiResponse } from 'next'
import { clientPromise, DefaultCollection } from '@/lib/mongodb';

type Vehicle = {
	cover: string;
	type: string;
	usage: number;
	country: string;
	city: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
	const { cover, type, usage, country, city } = req.body as Vehicle;

	if (!cover || !type || !usage || !country || !city) {
	  return res.status(400).json({ error: 'All fields are required' });
	}

	const retrieveVehicles = async () => {
		const client = await clientPromise;
		const db = client.db(DefaultCollection);
		const vehicle = await db.collection("vehicle").findOne(
			{ coverType: cover, typeVehicle: type, useOfVehicle: usage, country: country, city: city },
		);
		return vehicle;
	}

	try {
		const vehicle = await retrieveVehicles();
		return res.status(200).json(vehicle);
	} catch (error) {
		console.log(error);
	}

  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  return res.status(500).end("Error occured try again");
}