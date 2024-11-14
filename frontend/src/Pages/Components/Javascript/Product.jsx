import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function Product() {
    const [cars, setCars] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get(`${BASE_URL}/product`, { withCredentials: true })
            .then(response => {
                console.log(response.data);
                setCars(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // Function to check if the search query is in the given string (title, description, or tags)
    const searchMatches = (str) => {
        if (!str) return false;
        const searchTerm = searchQuery.trim().toLowerCase();
        return str.toLowerCase().includes(searchTerm);
    };

    // Filter cars based on search query in title, description, or tags
    const filteredCars = cars.filter(car => {
        const searchTerm = searchQuery.toLowerCase();
        return (
            searchMatches(car.title) ||
            searchMatches(car.description) ||
            Object.values(car.tags).some(tag => searchMatches(tag))
        );
    });

    return (
        <div className="min-h-[80vh] max-w-7xl mx-auto p-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Available Cars</h1>

            {/* Search Input */}
            <div className="mb-8 flex justify-center">
                <input
                    type="text"
                    placeholder="Search by title, description, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition duration-300"
                />
            </div>

            {/* Display filtered cars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCars.map(car => (
                    <div key={car._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
                        <img
                            src={`${car.images[0]}`}
                            alt={car.title}
                            className="w-full h-64 object-cover transition duration-300 transform hover:scale-105"
                        />
                        <div className="p-6">
                            <NavLink to={`/product/${car._id}`} className="text-2xl font-semibold text-blue-600 hover:text-blue-800 transition duration-300">
                                {car.title}
                            </NavLink>
                            <p className="text-gray-600 mt-2 mb-4">{car.description}</p>
                            <div className="flex flex-wrap gap-4">
                                {/* Map through the tags and display them */}
                                {Object.entries(car.tags).map(([key, value]) => (
                                    <p key={key} className="bg-gray-100 p-2 px-4 rounded-md text-sm text-gray-700">
                                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Product;
