import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './pages/Home/App';
import Navbar from './components/Navbar/Navbar';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/contact',
    element: <Contact />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
