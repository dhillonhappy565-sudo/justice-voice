import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewCase from './pages/NewCase';
import CaseList from './pages/CaseList';
import CaseDetail from './pages/CaseDetail';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* User Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/new-case" element={
              <ProtectedRoute>
                <NewCase />
              </ProtectedRoute>
            } />
            <Route path="/cases" element={
              <ProtectedRoute>
                <CaseList />
              </ProtectedRoute>
            } />
            <Route path="/cases/:id" element={
              <ProtectedRoute>
                <CaseDetail />
              </ProtectedRoute>
            } />

            {/* Admin Protected Routes */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
