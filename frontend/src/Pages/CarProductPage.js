import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel'; // Install this package for carousel functionality
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Carousel styles

const BASE_URL = process.env.REACT_APP_BASE_URL;

const CarProductPage = () => {
    const { item_id } = useParams(); // Access the dynamic `item_id` from the URL
    const [car, setCar] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [updatedCar, setUpdatedCar] = useState({
        title: '',
        description: '',
        tags: {},
        images: []
    });
    const navigate = useNavigate(); // To navigate after update

    useEffect(() => {
        // Fetch car data using the item_id
        axios.get(`${BASE_URL}/product/${item_id}`, { withCredentials: true })
            .then(response => {
                setCar(response.data.product);
                setUpdatedCar({
                    title: response.data.product.title,
                    description: response.data.product.description,
                    tags: response.data.product.tags,
                    images: response.data.product.images
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, [item_id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedCar(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleTagsChange = (e, key) => {
        const { value } = e.target;
        setUpdatedCar(prevState => ({
            ...prevState,
            tags: {
                ...prevState.tags,
                [key]: value
            }
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Check if the number of images exceeds 10
        if (files.length + updatedCar.images.length > 10) {
            alert("You can upload a maximum of 10 images.");
            return;
        }
    
        // Convert each file to Base64 using FileReader
        files.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file); // Convert the file to Base64
            reader.onloadend = () => {
                // Once conversion is done, add the Base64 string to the images array
                setUpdatedCar((prevState) => ({
                    ...prevState,
                    images: [...prevState.images, reader.result],
                }));
            };
        });
    };

    const handleImageRemove = (imageToRemove) => {
        setUpdatedCar(prevState => ({
            ...prevState,
            images: prevState.images.filter(image => image !== imageToRemove)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send the updated car details to the backend
        axios.put(`${BASE_URL}/product/${item_id}`, updatedCar, { withCredentials: true })
            .then(response => {
                setCar(response.data.product);
                setEditMode(false); // Exit edit mode after update
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleDelete = () => {
        // Confirm the deletion before proceeding
        const confirmDelete = window.confirm("Are you sure you want to delete this car?");
        if (confirmDelete) {
            // Send the DELETE request to the backend
            axios.delete(`${BASE_URL}/product/${item_id}`, { withCredentials: true })
                .then(response => {
                    alert('Car deleted successfully');
                    navigate('/'); // Redirect to the home page after deletion
                })
                .catch(error => {
                    console.log(error);
                    alert('Failed to delete the car');
                });
        }
    };

    if (!car) {
        return <div>Loading...</div>;
    }

    return (
        <div className='max-w-5xl px-4 py-4 mx-auto'>
            <h1 className="text-3xl font-bold mb-4">{car.title}</h1>

            {/* Carousel for images */}
            <div className="mb-6">
                <Carousel>
                    {car.images.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={`Car ${index + 1}`} />
                        </div>
                    ))}
                </Carousel>
            </div>

            <div className="car-details">
                {/* Edit and Delete Buttons */}
                <div className="flex space-x-4 mb-4">
                    {!editMode && (
                        <button onClick={() => setEditMode(true)} className="p-2 bg-blue-500 text-white rounded">
                            Edit Car
                        </button>
                    )}

                    {/* Delete Button */}
                    <button onClick={handleDelete} className="p-2 bg-red-500 text-white rounded">
                        Delete Car
                    </button>
                </div>

                {/* Editable Form */}
                {editMode && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={updatedCar.title}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block">Description</label>
                            <textarea
                                name="description"
                                value={updatedCar.description}
                                onChange={handleInputChange}
                                className="border p-2 w-full"
                            />
                        </div>

                        <div>
                            <label htmlFor="tags" className="block">Tags</label>
                            {Object.entries(updatedCar.tags).map(([key, value]) => (
                                <div key={key} className="flex items-center  space-x-2">
                                    <span className='min-w-[150px]'>{key}:</span>
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={(e) => handleTagsChange(e, key)}
                                        className="border p-2"
                                        placeholder={`Enter ${key} tag`}
                                    />
                                </div>
                            ))}
                        </div>

                        <div>
                            <label htmlFor="images" className="block">Images</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="border p-2"
                            />
                            <div className="mt-2 flex flex-wrap justify-center gap-3 ">
                                {updatedCar.images.length > 0 && updatedCar.images.map((image, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <img src={image} alt={`Preview ${index + 1}`} className="w-32 h-32 object-cover mt-2" />
                                        <button
                                            type="button"
                                            onClick={() => handleImageRemove(image)}
                                            className="text-red-500"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="p-2 bg-green-500 text-white rounded">
                            Update Car
                        </button>
                    </form>
                )}

                {/* Display Non-editable Information */}
                {!editMode && (
                    <>
                        <p className="text-xl font-semibold">Description:</p>
                        <p>{car.description}</p>

                        <p className="text-xl font-semibold mt-4">Tags:</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {car.tags && Object.entries(car.tags).map(([key, value]) => (
                                <p key={key} className='bg-gray-200 p-2 px-4 rounded-md'>
                                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                                </p>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CarProductPage;
