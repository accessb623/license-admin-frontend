import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [licenseKey, setLicenseKey] = useState('');
  const [hardwareId, setHardwareId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/validate-license', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          licenseKey,
          hardwareId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ ${data.message}`);
      } else {
        setMessage(`❌ ${data.message || 'Validation failed.'}`);
      }
    } catch (error) {
      console.error('❌ Error:', error);
      setMessage('❌ Server error during validation.');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">License Validation</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="License key"
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
            required
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Hardware ID"
            value={hardwareId}
            onChange={(e) => setHardwareId(e.target.value)}
            required
            className="border p-2 w-full rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Validate License
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </main>
  );
}
