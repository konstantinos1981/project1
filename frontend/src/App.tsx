import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { LoginRoute } from "./routes/LoginRoute";
import { AuthCallbackRoute } from "./routes/AuthCallbackRoute";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/login" element={<LoginRoute />} />
            <Route path="/auth/callback" element={<AuthCallbackRoute />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
