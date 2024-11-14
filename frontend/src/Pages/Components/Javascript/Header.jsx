import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { BsPersonCircle } from 'react-icons/bs';
import Cookies from 'js-cookie';
const BASE_URL = process.env.REACT_APP_BASE_URL;

function Header() {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function Logout() {
    try {
      await axios.get(`${BASE_URL}/logout`, { withCredentials: true });
      Cookies.remove('token');
      setIsLoggedIn(false);
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/home`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    })
      .then((res) => {
        const data = res.data;
        if (data.username) {
          setIsLoggedIn(true);
          setUser(data.username);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUser(null);
      });
  }, []);

  return (
    <div>
      <nav className="bg-dark  top-0 w-full p-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-8">
            <NavLink to="/product" className="text-white hover:text-gray-300 no-underline">Product</NavLink>
            <NavLink to="/create" className="text-white hover:text-gray-300 no-underline">Add</NavLink>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <div className="flex items-center space-x-2">
                <button className="flex items-center p-2 border border-gray-400 rounded-lg">
                  <BsPersonCircle className="text-white h-6 w-6" />
                  <NavLink className="text-white ml-2 no-underline">{user}</NavLink>
                </button>
                <button
                  onClick={Logout}
                  className="bg-transparent text-white border border-blue-500 py-2 px-4 rounded-md hover:bg-blue-500 hover:text-white transition"
                >
                  Logout
                </button>
              </div>
            )}
            {!isLoggedIn && (
              <div className="flex space-x-4">
                <NavLink to="/login">
                  <button className="bg-transparent text-white border border-blue-500 py-2 px-4 rounded-md hover:bg-blue-500 hover:text-white transition">
                    Login
                  </button>
                </NavLink>
                <NavLink to="/signup">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                    Sign Up
                  </button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
