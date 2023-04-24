import Home from '../views/Home';
import DetailMovie from '../views/DetailMovie';
import Layout from '../components/Layout';
import { createBrowserRouter } from 'react-router-dom';
import Similar from '../components/Similar';
import Detail from '../components/Detail';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/detail/:id',
        element: <DetailMovie />,
        children: [
          {
            path: 'similar',
            element: <Similar />,
          },
          {
            path: 'detail',
            element: <Detail />,
          },
        ],
      },
    ],
  },
]);

export default router;
