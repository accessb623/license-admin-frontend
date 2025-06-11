import { NextApiRequest, NextApiResponse } from 'next';
import { revokeLicense } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { licenseKey } = req.body;

  const success = await revokeLicense(licenseKey);
  if (!success) return res.status(404).json({ error: 'License not found or failed to revoke' });

  return res.status(200).json({ message: 'License revoked successfully' });
}
