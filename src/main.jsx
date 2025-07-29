import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'; // clean import
import { persistor, store } from './redux/store/index.js';
import './i18n';
import RegisterForm from './auth/RegisterForm.jsx';
import LoginForm from './auth/LoginForm.jsx';
import Github from './auth/Github.jsx';
import Google from './auth/Google.jsx';
import Facebook from './auth/Facebook.jsx';
import ForgotPassword from './auth/ForgotPassword.jsx';
import PrivateRoutes from './components/PrivateRoutes.jsx';
import Search from './components/Search.jsx';
import Lists from './components/Lists.jsx';
import CartPage from './components/Form/CartPage.jsx';
import Ticket from './components/Form/Ticket.jsx';
import Return from './components/Return.jsx';
import Settings from './components/Settings.jsx';
import Bookings from './components/Bookings.jsx';
import StripeProvider from './components/payment/StripeProvider.jsx';
import Payment from './components/Form/Payment.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'register/page', element: <RegisterForm /> },
      { path: 'login/page', element: <LoginForm /> },
      { path: 'github/callback', element: <Github /> },
      { path: 'google/callback', element: <Google /> },
      { path: 'facebook/callback', element: <Facebook /> },
      { path: 'forgot/password', element: <ForgotPassword /> },

      {
        index: true,
        element: (
          <PrivateRoutes>
            <Search />
          </PrivateRoutes>

        )
      },
      {
        path: 'flights',
        element: (
          <PrivateRoutes>
            <Lists />
          </PrivateRoutes>
        )
      },
      {
        path: 'flight/cart',
        element: (
          <PrivateRoutes>
            <CartPage />
          </PrivateRoutes>
        )
      },
      {
        path: 'buy/ticket/:id/:flightId',
        element: (
          <PrivateRoutes>
            <Ticket />
          </PrivateRoutes>
        )
      },
      {
        path: 'direct/buy/ticket/:flightId',
        element: (
          <PrivateRoutes>
            <Ticket />
          </PrivateRoutes>
        )
      },
      {
        path: 'return/flight',
        element: (
          <PrivateRoutes>
            <Return />
          </PrivateRoutes>
        )
      },
      {
        path: 'settings',
        element: (
          <PrivateRoutes>
            <Settings />
          </PrivateRoutes>
        )
      },
      {
        path: 'bookings',
        element: (
          <PrivateRoutes>
            <Bookings />
          </PrivateRoutes>
        )
      },
      {
        path: 'checkout',
        element: (
          <PrivateRoutes>
            <StripeProvider>
              <Payment />
            </StripeProvider>
          </PrivateRoutes>
        )
      }
    ]
  }

]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        {/* <BrowserRouter>
          <App />
        </BrowserRouter> */}
      </PersistGate>
    </Provider>
  </StrictMode>
);
