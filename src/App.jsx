import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Project from "./pages/Project";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useAuthContext } from "./context/useAuthContext";
import OnlineUsers from "./components/OnlineUsers";
import MobileNav from "./components/MobileNav";
import Users from "./pages/Users";

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="flex flex-grow">
      {authIsReady && (
        <BrowserRouter>
          <Sidebar />
          <div className="container">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/create"
                element={user ? <Create /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={user ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/signup"
                element={user ? <Navigate to="/" /> : <Signup />}
              />
              <Route
                path="/projects/:id"
                element={user ? <Project /> : <Navigate to="/login" />}
              />
              <Route
                path="/users"
                element={user ? <Users /> : <Navigate to="/login" />}
              />
              <Route
                path="*"
                element={
                  <div className="text-2xl font-semibold text-red-600 flex justify-center -mt-20 items-center h-screen">
                    There's no such a page!
                  </div>
                }
              />
            </Routes>
          </div>
          {user && <OnlineUsers />}
          {user && <MobileNav />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
