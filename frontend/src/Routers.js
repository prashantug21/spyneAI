import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import CreatePage from './Pages/CreatePage';
import ProductPage from './Pages/ProductPage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import './App.css';
import CarProductPage from './Pages/CarProductPage';

function Routers({ isLoggedIn }) {
    // State to track if the authentication check is complete
    const [loading, setLoading] = useState(true);

    // Simulate a delay for checking if the user is logged in
    useEffect(() => {
        // Simulate an API call or session check delay
        const checkAuth = async () => {
            // Simulate a delay, you can replace this with actual logic
            await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate async call
            setLoading(false); // After the check, set loading to false
        };

        checkAuth();
    }, []);

    if (loading) {
        // Optionally, show a loading indicator while checking the auth status
        return <div className='text-7xl flex min-h-[90vh] min-w-[100vw] justify-center items-center '>Loading....</div>;
    }

    return (
        <Routes>
            {/* Route for /login */}
            <Route
                path='/login'
                element={isLoggedIn ? <Navigate to='/product' /> : <LoginPage />}
            />
            {/* Route for /signup */}
            <Route
                path='/signup'
                element={isLoggedIn ? <Navigate to='/product' /> : <SignUpPage />}
            />
            {/* Route for /create */}
            <Route
                path='/create'
                element={isLoggedIn ? <CreatePage /> : <Navigate to='/login' />}
            />
            {/* Dynamic route for individual car product */}
            <Route
                path='/product/:item_id'
                element={isLoggedIn ? <CarProductPage /> : <Navigate to='/login' />}
            />
            {/* Static route for /product */}
            <Route
                path='/product'
                element={isLoggedIn ? <ProductPage /> : <Navigate to='/login' />}
            />
            {/* Catch-all route for undefined paths */}
            <Route
                path='*'
                element={isLoggedIn ? <ProductPage /> : <Navigate to='/login' />}
            />
        </Routes>
    );
}

export default Routers;
