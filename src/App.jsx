import { Navigate, Route, Routes } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadinSpinner";
import FeedbackForm from "./pages/Feedback";
import Dashboard from "./pages/Dashboard";
import { useUserStore } from "./stores/useUserStore";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  useEffect(() => {
    checkAuth();
  }, []); 
  if (checkingAuth) return <LoadingSpinner />;
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full dark:bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)] light:bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.2)_0%,rgba(10,80,60,0.1)_45%,rgba(0,0,0,0.05)_100%)]" />
        </div>
      </div>
      <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<FeedbackForm/>} />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/dashboard" />}
          />
          <Route path="/dashboard" element={user ? <Dashboard/> : <Navigate to="/" />} />
        </Routes>
      </div>
      <Toaster 
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-white light:bg-white light:text-gray-900',
        }}
      />
    </div>
  );
}

export default App;