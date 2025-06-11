import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [licenseKey, setLicenseKey] = useState('');
  const [hardwareId, setHardwareId] = useState('');
  const [message, setMessage] = useState('');

const validateFields = (...fields) => {
    return fields.every(field => field && field.trim() !== '');
  };

  const handleGenerate = async () => {
    if (!validateFields(email)) {
      setMessage('❌ Email is required to generate a license.');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-license`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ License generated: ${data.licenseKey}`);
        setLicenseKey(data.licenseKey); // Populate the license field
      } else {
        setMessage(`❌ ${data.message || 'Failed to generate license.'}`);
      }
    } catch (error) {
      console.error('Error generating license:', error);
      setMessage('❌ Server error.');
    }
  };

  const handleValidate = async () => {
    if (!validateFields(email, licenseKey, hardwareId)) {
      setMessage('❌ Email, License Key, and Hardware ID are required to validate.');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/validate-license`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, licenseKey, hardwareId }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ ${data.message}`);
      } else {
        setMessage(`❌ ${data.message || 'Validation failed.'}`);
      }
    } catch (error) {
      console.error('Error validating license:', error);
      setMessage('❌ Server error.');
    }
  };

  const handleRevoke = async () => {
    if (!validateFields(email, licenseKey)) {
      setMessage('❌ Email and License Key are required to revoke.');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/revoke-license`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, licenseKey }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ ${data.message}`);
      } else {
        setMessage(`❌ ${data.message || 'Revoke failed.'}`);
      }
    } catch (error) {
      console.error('Error revoking license:', error);
      setMessage('❌ Server error.');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">License Admin Panel</h1>

        <input
          className="w-full p-2 border mb-4 rounded"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 border mb-4 rounded"
          placeholder="License Key"
          value={licenseKey}
          onChange={e => setLicenseKey(e.target.value)}
        />
        <input
          className="w-full p-2 border mb-4 rounded"
          placeholder="Hardware ID"
          value={hardwareId}
          onChange={e => setHardwareId(e.target.value)}
        />

        <div className="space-y-2">
          <button
            onClick={handleGenerate}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Generate License
          </button>
          <button
            onClick={handleValidate}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Validate License
          </button>
          <button
            onClick={handleRevoke}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Revoke License
          </button>
        </div>

        {message && <p className="mt-4 text-center text-gray-800">{message}</p>}
      </div>
    </main>
  );
}
