import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './Layouts/AuthLayout';
import {
  ConfirmAccount,
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
} from './pages/auth';
import AuthProvider from './context/AuthProvider';
import ProtectedRoute from './Layouts/ProtectedRoute';
import Projects from './pages/projects/Projects';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="reset-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="confirm-account/:token" element={<ConfirmAccount />} />
          </Route>
          <Route path="projects" element={<ProtectedRoute />}>
            <Route index element={<Projects />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
