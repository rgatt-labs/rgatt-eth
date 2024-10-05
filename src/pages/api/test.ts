import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ test: "Hello World" })
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}