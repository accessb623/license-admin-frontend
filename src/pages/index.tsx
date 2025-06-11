import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [email, setEmail] = useState('');
  const [hardwareId, setHardwareId] = useState('');
  const [license, setLicense] = useState('');
  const [message, setMessage] = useState('');

  const handleValidate = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/validate-license`, {
        email,
        hardwareId,
        licenseKey: license,
      });
      setMessage(res.data.message || 'License valid!');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.error || 'Validation failed.');
      } else {
        setMessage('Validation failed.');
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">License Validation</h1>

        <input
          className="w-full p-2 border mb-4 rounded"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 border mb-4 rounded"
          placeholder="Hardware ID"
          value={hardwareId}
          onChange={e => setHardwareId(e.target.value)}
        />
        <input
          className="w-full p-2 border mb-4 rounded"
          placeholder="License Key"
          value={license}
          onChange={e => setLicense(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleValidate}
        >
          Validate
        </button>

        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </main> // ✅ This closing tag was missing
  );
}
