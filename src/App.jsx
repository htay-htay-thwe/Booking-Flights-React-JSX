import React from 'react';
import './App.css'

import { Routes, Route } from 'react-router-dom';

import Lists from './components/Lists';
import CartPage from './components/Form/CartPage';
import Ticket from './components/Form/Ticket';
import "toastify-js/src/toastify.css"
import StripeProvider from './components/payment/StripeProvider';
import Payment from './components/Form/Payment';
import RegisterForm from './auth/RegisterForm';
import PrivateRoutes from './components/PrivateRoutes';
import Search from './components/Search';
import Return from './components/Return';
import Settings from './components/Settings';
import Bookings from './components/Bookings';
import LoginForm from './auth/LoginForm';
import Github from './auth/Github';
import Google from './auth/Google';
import Facebook from './auth/Facebook';
import ForgotPassword from './auth/ForgotPassword';

function App() {
  return (
    <Routes>
      <Route path="/register/page" element={<RegisterForm />} />
      <Route path="/login/page" element={<LoginForm />} />
      <Route path="/github/callback" element={<Github />} />
      <Route path="/google/callback" element={<Google />} />
      <Route path="/facebook/callback" element={<Facebook />} />
      <Route path="/forgot/password" element={<ForgotPassword />} />

      <Route path="/"
        element={
          <PrivateRoutes><Search /></PrivateRoutes>
        } />
      <Route path="/flights"
        element={
          <PrivateRoutes><Lists /></PrivateRoutes>}
      />
      <Route path="/flight/cart"
        element={
          <PrivateRoutes><CartPage /></PrivateRoutes>
        } />
      <Route path="/buy/ticket/:id/:flightId"
        element={<PrivateRoutes><Ticket /></PrivateRoutes>
        } />
      <Route path="/direct/buy/ticket/:flightId"
        element={
          <PrivateRoutes><Ticket /></PrivateRoutes>
        } />
      <Route path="/return/flight"
        element={
          <PrivateRoutes><Return /></PrivateRoutes>
        } />
      <Route path="/settings"
        element={
          <PrivateRoutes><Settings /></PrivateRoutes>
        } />
      <Route path="/bookings"
        element={
          <PrivateRoutes><Bookings /></PrivateRoutes>
        } />
      <Route path="/checkout" element={
        <PrivateRoutes>
          <StripeProvider>
            <Payment />
          </StripeProvider>
        </PrivateRoutes>
      } />
    </Routes>
  );
}

export default App;