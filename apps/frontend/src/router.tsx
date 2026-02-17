import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardPage } from './pages/DashboardPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    )
  }
]);
