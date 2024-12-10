import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import { AuthProvider } from './context/auth-context';
import ProtectedRoute from './hooks/protected-route';
import Clients from './pages/clients';
import LayoutPrincipal from './components/Layout/layout-principal';
import NotFound from './pages/not-found';
import ClientDetail from './pages/client-detail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            element={
              <LayoutPrincipal>
                <ProtectedRoute />
              </LayoutPrincipal>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/client/:id" element={<ClientDetail />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
