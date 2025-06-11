import { NextApiRequest, NextApiResponse } from 'next';
import { getLicenseByKey } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, hardwareId, licenseKey } = req.body;

  const license = await getLicenseByKey(licenseKey);

  if (!license) return res.status(404).json({ error: 'License not found' });

  if (license.email !== email || license.hardwareId !== hardwareId)
    return res.status(403).json({ error: 'Invalid email or hardware ID' });

  if (license.status !== 'active') return res.status(403).json({ error: 'License not active' });

  return res.status(200).json({ message: 'License generated', licenseKey: key });

}
