import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

type LicenseRecord = {
  email: string;
  hardwareId: string;
  licenseKey: string;
  active: boolean;
};

// In-memory store for demo (reset on every server restart)
const licenses: Record<string, LicenseRecord> = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, hardwareId } = req.body;

  if (!email || !hardwareId) {
    return res.status(400).json({ error: 'Missing email or hardware ID' });
  }

  const licenseKey = crypto.randomBytes(16).toString('hex');

  licenses[licenseKey] = {
    email,
    hardwareId,
    licenseKey,
    active: false,
  };

  return res.status(200).json({
    message: '✅ License generated successfully',
    licenseKey,
  });
}
