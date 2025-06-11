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
