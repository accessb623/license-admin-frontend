export async function getLicenseByKey(key: string) {
  // Simulate fetching from DB
  return { email: 'test@example.com', hardwareId: 'ABC123', status: 'active' }; // Example
}

export async function activateLicense(key: string) {
  // Simulate updating DB
  return true;
}

export async function revokeLicense(key: string) {
  // Simulate updating DB
  return true;
}
