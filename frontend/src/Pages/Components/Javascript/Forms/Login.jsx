import React, { useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function Login({ loginShow, toggleLogin }) {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const emailreg = /^\S+@\S+\.\S+$/;

  const navigate = useNavigate();

  async function SendOTP(e) {
    e.preventDefault();

    if (!emailreg.test(email)) {
      document.getElementById('loginMessage').innerText = 'Invalid email ID';
      return;
    }

    setShowLogin(true);
    try {
      const response = await axios.post(`${BASE_URL}/sendOTP`, { email });
      document.getElementById('loginMessage').innerText = response.data.message;
    } catch (error) {
      console.error(error);
      document.getElementById('loginMessage').innerText = 'Error sending OTP';
    }
  }

  async function Login(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { email, otp },
        { withCredentials: true }
      );
      document.getElementById('loginMessage').innerHTML = res.data.message;

      if (res.status === 200) {
        window.location.href = '/';
      }
    } catch (error) {
      console.error(error);
      document.getElementById('loginMessage').innerText = 'Login failed';
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="bg-dark p-6 my-5 text-white rounded-md shadow-lg w-full max-w-md">
        <BsPersonCircle className="d-block mx-auto mt-5 text-6xl" />
        <form onSubmit={SendOTP} className="space-y-4">
          <div className="flex flex-col mb-3">
            <label htmlFor="loginEmail" className="text-xl">Email address</label>
            <input
              type="email"
              placeholder="Enter email"
              className="p-3 rounded-md bg-gray-700 text-white mt-2"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div id="loginMessage" className="text-lg text-red-500"></div>

          <button type="submit" className="w-full p-3 bg-blue-500 rounded-md text-white text-xl">
            Send OTP
          </button>
        </form>

        {showLogin && (
          <form onSubmit={Login} className="space-y-4 mt-6">
            <div className="flex flex-col mb-3">
              <label htmlFor="loginOtp" className="text-xl">OTP</label>
              <input
                type="number"
                placeholder="Enter OTP"
                autoComplete="off"
                className="p-3 rounded-md bg-gray-700 text-white mt-2"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                required
                min="1000"
                max="9999"
              />
            </div>

            <button type="submit" className="w-full p-3 bg-blue-500 rounded-md text-white text-xl">
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
