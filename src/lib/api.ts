export async function validateLicense(email: string, licenseKey: string, hardwareId: string) {
  const res = await fetch('http://localhost:5000/api/validate-license', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, licenseKey, hardwareId }),
  });

  return res.json();
}
