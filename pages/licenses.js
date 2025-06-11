import { useEffect, useState } from 'react';

export default function LicensesPage() {
  const [licenses, setLicenses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/licenses')
      .then((res) => res.json())
      .then((data) => setLicenses(data))
      .catch((err) => console.error('Error fetching licenses:', err));
  }, []);

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">All Licenses</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">License Key</th>
              <th className="py-2 px-4">Hardware ID</th>
              <th className="py-2 px-4">Active</th>
              <th className="py-2 px-4">Usage</th>
              <th className="py-2 px-4">Created</th>
            </tr>
          </thead>
          <tbody>
            {licenses.map((lic) => (
              <tr key={lic._id} className="border-b">
                <td className="py-2 px-4">{lic.email}</td>
                <td className="py-2 px-4">{lic.licenseKey}</td>
                <td className="py-2 px-4">{lic.hardwareId}</td>
                <td className="py-2 px-4">{lic.isActive ? '✅' : '❌'}</td>
                <td className="py-2 px-4">{lic.usageCount}</td>
                <td className="py-2 px-4">
                  {new Date(lic.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
