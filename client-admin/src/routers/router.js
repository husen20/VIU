import { createBrowserRouter, redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../views/Home';
import Login from '../views/Login';
import Genre from '../views/Genre';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/login',
        element: <Login />,
        loader: () => {
          if (localStorage.access_token) {
            return redirect('/');
          }

          return null;
        },
      },
    ],
  },
  {
    element: <Layout />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect('/login');
      }

      return null;
    },
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/genre',
        element: <Genre />,
      },
    ],
  },
]);

export default router;
