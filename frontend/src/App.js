
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './Pages/Components/Javascript/Header';
import React, { useEffect, useState } from 'react';
import Routers from './Routers';
import axios from 'axios';
import './index.css';
const BASE_URL = process.env.REACT_APP_BASE_URL;


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    axios.get(`${BASE_URL}/home`, {
      withCredentials: true
    }).then((res) => {
      console.log(res);
      const data = res.data;
      if (data.username) {
        setIsLoggedIn(true);
      }
    }).catch((err) => {
      setIsLoggedIn(false);
      console.log(err);
    });
  }, [])
  return (
    <div className='App '>
      <Header />
      <Routers isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
