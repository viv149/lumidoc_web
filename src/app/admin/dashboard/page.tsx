import Dashboard from "../../../components/dashboard/dashboard";

export default function Page() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h2>
            <p className="text-gray-600">Manage users, documents, and settings.</p>

            <Dashboard/>
        </div>
    );
}
  
