import { handleLogout } from "../utils/auth.utils";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard</p>
      <button
        className="w-full bg-primary text-white p-3 rounded-lg hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => handleLogout()}>
        Log out
      </button>
    </div>
  );
}

export default Dashboard;
