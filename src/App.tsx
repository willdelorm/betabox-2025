import { Routes, Route } from "react-router";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import useAuth from "./utils/useAuth.ts";
import Dashboard from "./pages/Dashboard.tsx";

function App() {
  const user = useAuth();

  return (
    <Routes>
      <Route index element={user ? <Dashboard /> : <Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
