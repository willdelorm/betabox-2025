import { Link } from "react-router";
import BtnFooter from "../components/BtnFooter";
import Nav from "../components/Nav";

function Dashboard() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard</p>
      </main>
      <Link to="/">
        <BtnFooter>Start a Session</BtnFooter>
      </Link>
    </>
  );
}

export default Dashboard;
