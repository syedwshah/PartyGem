import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import LoginPage from './pages/LoginPage';
import EventDetails from './components/EventDetails';
import ErrorPage from './error-page.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const events = [
  { id: 1, title: 'Birthday Party', date: '2024-09-15', location: 'House', description: 'Birthday Party', tags: ['fun', '20s', 'bday', 'summer'] },
  { id: 2, title: 'Wedding Ceremony', date: '2024-10-02', location: 'Garden', description: "Marie's wedding in the mountains", tags: ['fun', '20s', 'wedding', 'summer'] },
  { id: 3, title: 'PAX East', date: '2024-11-20', location: 'Convention Center', description: 'Gaming Convention held with new demos', tags: ['fun', 'demoday', 'paxeast', 'summer'] },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home',
    element: <App events={events} />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/event/:id',
    element: <EventDetails events={events} />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
