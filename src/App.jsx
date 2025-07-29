import React, { useEffect, useState } from 'react';
import './App.css'

import { Outlet } from 'react-router-dom';
import "toastify-js/src/toastify.css"
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencyList } from './redux/action/fetch';

function App() {
  const dispatch = useDispatch();
  const [currencyModal, setCurrencyModal] = useState(false);
  const currencyRedux = useSelector(state => state.flights.currency);
  const [currency, setCurrency] = useState({
    cur: currencyRedux?.cur || 'USD',
    rate: currencyRedux?.rate || 1
  });

  useEffect(() => {
    const currencyApi = async () => {
      const res = await fetch('https://v6.exchangerate-api.com/v6/8ec9b0d8525f482092ffe45e/latest/USD');
      const data = await res.json();
      dispatch(fetchCurrencyList((data.conversion_rates)));
    }
    currencyApi();
  }, [dispatch, currencyModal])

  return (
    <div>
      <Navbar currency={currency} setCurrency={setCurrency} setCurrencyModal={setCurrencyModal} currencyModal={currencyModal} />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;