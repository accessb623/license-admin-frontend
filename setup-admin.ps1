# PowerShell Script: setup-admin.ps1
# Run from within the /frontend directory

# Create folder structure
New-Item -ItemType Directory -Force -Path "src\components"
New-Item -ItemType Directory -Force -Path "src\lib"
New-Item -ItemType Directory -Force -Path "src\pages"

# Create files with boilerplate content
@"
import LicenseForm from "@/components/LicenseForm";
import LicenseTable from "@/components/LicenseTable";
import UsageChart from "@/components/UsageChart";

export default function AdminPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <LicenseForm />
      <UsageChart />
      <LicenseTable />
    </div>
  );
}
"@ | Out-File -Encoding utf8 "src/pages/admin.tsx"

@"
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default API;
"@ | Out-File -Encoding utf8 "src/lib/api.ts"

@"
export default function LicenseForm() {
  return (
    <div className='bg-white p-4 rounded shadow'>
      <h2 className='text-xl font-semibold mb-2'>Create License</h2>
      <p>Form goes here...</p>
    </div>
  );
}
"@ | Out-File -Encoding utf8 "src/components/LicenseForm.tsx"

@"
export default function LicenseTable() {
  return (
    <div className='bg-white p-4 rounded shadow'>
      <h2 className='text-xl font-semibold mb-2'>License List</h2>
      <p>Table goes here...</p>
    </div>
  );
}
"@ | Out-File -Encoding utf8 "src/components/LicenseTable.tsx"

@"
export default function UsageChart() {
  return (
    <div className='bg-white p-4 rounded shadow'>
      <h2 className='text-xl font-semibold mb-2'>Usage Chart</h2>
      <p>Chart goes here...</p>
    </div>
  );
}
"@ | Out-File -Encoding utf8 "src/components/UsageChart.tsx"
