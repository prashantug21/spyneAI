import React, { useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [otp, setOTP] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showSignUpSubmit, setshowSignUpSubmit] = useState(false);
  const emailreg = /^\S+@\S+\.\S+$/;

  async function SendOTP(e) {
    e.preventDefault();
    if (!emailreg.test(email)) {
      return document.getElementById('signUpMessage').innerText = 'Invalid email ID';
    }
    setshowSignUpSubmit(true);
    try {
      const response = await axios.post(`${BASE_URL}/sendOTP`, { email });
      document.getElementById('signUpMessage').innerText = response.data.message;
    } catch (error) {
      document.getElementById('signUpMessage').innerText = 'Error sending OTP';
    }
  }

  async function signUp(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/SignUp`,
        { username, email, otp, name },
        { withCredentials: true }
      );
      document.getElementById('signUpMessage').innerHTML = response.data.message;
      if (response.status === 201) {
        window.location.href = '/';
      }
    } catch (error) {
      document.getElementById('signUpMessage').innerHTML = 'Sign-up failed. Please try again.';
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="bg-dark text-white p-8 rounded-lg w-full max-w-md">
        <BsPersonCircle className="text-6xl mx-auto mb-6" />
        <form onSubmit={SendOTP} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="signUpEmail" className="text-xl">Email address</label>
            <input
              type="email"
              id="signUpEmail"
              placeholder="Enter email"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="signUpText" className="text-xl">Username</label>
            <input
              type="text"
              id="signUpText"
              placeholder="Enter username"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="signUpText" className="text-xl">Name</label>
            <input
              type="text"
              id="signUpText"
              placeholder="Enter username"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div id="signUpMessage" className="text-red-500 text-center my-2"></div>

          <button
            type="submit"
            id="signUpSendOTP"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Send OTP
          </button>
        </form>

        {showSignUpSubmit && (
          <form onSubmit={signUp} className="space-y-4 mt-6">
            <div className="space-y-2">
              <label htmlFor="signUpOTP" className="text-xl">OTP</label>
              <input
                type="number"
                id="signUpOTP"
                placeholder="OTP"
                className="w-full p-2 border border-gray-300 rounded-md text-black"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                required
                min="1000"
                max="9999"
              />
            </div>

            <button
              type="submit"
              id="signUpSubmit"
              className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
