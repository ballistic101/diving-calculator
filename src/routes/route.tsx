import ErrorPage from './error-page/ErrorPage';
import Root from './root/Root';
import Home from './home/Home';
import { createBrowserRouter } from 'react-router-dom';

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
                /*
            },
            {
                path: 'teams',
                element: <AllTeams />
            },
            {
                path: 'divers/order',
                element: <DiverOrder />
            },
            {
                path: 'divers/:diverId',
                element: <Diver />
                */
            }
        ]
    }
])