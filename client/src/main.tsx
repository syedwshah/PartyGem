import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import LoginPage from './pages/LoginPage';
import ErrorPage from './error-page.tsx';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([{
  path: "/",
  element: <LoginPage />,
  errorElement: <ErrorPage />
},
{
  path: "/home",
  element: <App />,
  errorElement: <ErrorPage />
}])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
