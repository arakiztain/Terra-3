
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import Title from './components/Title/Title';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Admin from './pages/Admin/Admin';
import Feedback from './pages/Feedback/Feedback';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Guide from './pages/Guide/Guide'
import Faq from './pages/Faq/Faq';
import IssueLogged from './pages/IssueLogged/IssueLogged';
import './global.css';

const router = createBrowserRouter([
{
  path: "/",
  element: (
    <>
      <AuthProvider>
        <Title />
        <Outlet />
      </AuthProvider>
    </>
  ),
  children: [
    {
      index: true,
      element: <Login />,
    },
    {
      path:"admin",
      element:<Admin/>
    },
    {
      path:"dashboard",
      element:<Dashboard/>
    },
    {
      path:"projects/:id",
      element: <Feedback/>
    },
    {
      path:"user/setpass/:token",
      element: <PasswordReset/>
    },
    {
      path:"forgotPassword",
      element: <ForgotPassword/>
    },
    {
      path: "guide",
      element:<Guide/>
    },
    {
      path: "faq",
      element:<Faq/>
    },
    {
      path: "issue-logged",
      element:<IssueLogged/>
    }
  ],
},
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
