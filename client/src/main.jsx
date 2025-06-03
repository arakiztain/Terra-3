import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Title from './components/Title/Title';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Admin from './pages/Admin/Admin';
import Feedback from './pages/Feedback/Feedback';
import PasswordReset from './pages/PasswordReset/PasswordReset';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import './global.css';

const router = createBrowserRouter([
{
  path: "/",
  element: (
    <>
      <Title />
      <Outlet />
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
      path:"passwordReset/:token",
      element: <PasswordReset/>
    },
    {
      path:"forgotPassword",
      element: <ForgotPassword/>
    }
  ],
},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
