import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, ModalContextProvider } from './context';
import { ProjectsContextProvider } from './context';
import { AuthLayout, ProtectedRoute } from './Layouts';
import {
  ConfirmAccount,
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
} from './pages/auth';
import {
  CreateProject,
  EditProject,
  ProjectDetails,
  Projects,
} from './pages/projects';
import { Toaster } from 'react-hot-toast';
import { NewPartner } from './pages/projects/NewPartner';

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
            <Route path="create-project" element={<CreateProject />} />
            <Route path="edit-project/:id" element={<EditProject />} />
            <Route path="new-partner/:id" element={<NewPartner />} />
            <Route path=":id" element={<ProjectDetails />} />
          </Route>
        </Routes>
      </AuthProvider>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;

// TODO: ADD SPINNER / LOADER TO THE ASYNC PROCESS
