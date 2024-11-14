import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CSS/createForm.css';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function CreateForm() {
    const [car, setCar] = useState({
        title: '',
        description: '',
        tags: {
            car_type: '',
            company: '',
            dealer: '',
            model: '',
            price: '',
            year: '',
        },
    });
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 10) {
            alert("You can upload a maximum of 10 images.");
            return;
        }

        // Convert each file to Base64 using FileReader
        files.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file); // Convert the file to Base64
            reader.onloadend = () => {
                // Once conversion is done, add the Base64 string to the images array
                setImages((prevImages) => [...prevImages, reader.result]);
            };
        });
    };

    const handleImageRemove = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    function uploadCar(e) {
        e.preventDefault();

        const carData = {
            title: car.title,
            description: car.description,
            images: images, // Base64 encoded images
            tags: car.tags,
        };

        axios.post(`${BASE_URL}/product`, carData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
            .then((res) => {
                alert(res.data.message);
                window.location.href = '/';
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div style={{ minHeight: '80vh', maxWidth: '1200px', margin: '0 auto' }} className='px-4'>
            <div id="CreatePageHeading">
                Enter Car Details
            </div>
            <div className="CreateForm">
                <Form onSubmit={uploadCar}>
                    <Form.Group className="my-2" controlId="formBasicTitle">
                        <Form.Label className="mb-0">Car Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Car Title"
                            value={car.title}
                            onChange={(e) => setCar({ ...car, title: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="my-2" controlId="formBasicDescription">
                        <Form.Label className="mb-0">Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter Description"
                            value={car.description}
                            onChange={(e) => setCar({ ...car, description: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="my-2" controlId="formBasicImages">
                        <Form.Label className="mb-0">Car Images</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handleImageChange}
                        />
                        <div className="mt-2 flex flex-wrap justify-center gap-3 ">
                            {images.length > 0 && images.map((image, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <img src={image} alt={`Preview ${index + 1}`} className="w-32 h-32 object-cover mt-2" />
                                    <button
                                        type="button"
                                        onClick={() => handleImageRemove(index)}  // Use index to remove the image
                                        className="text-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Form.Group>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                        <Form.Group className="my-2" controlId="formBasicCarType">
                            <Form.Label className="mb-0">Car Type</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Car Type"
                                value={car.tags.car_type}
                                onChange={(e) => setCar({ ...car, tags: { ...car.tags, car_type: e.target.value } })}
                            />
                        </Form.Group>
                        <Form.Group className="my-2" controlId="formBasicCompany">
                            <Form.Label className="mb-0">Company</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Company"
                                value={car.tags.company}
                                onChange={(e) => setCar({ ...car, tags: { ...car.tags, company: e.target.value } })}
                            />
                        </Form.Group>
                        <Form.Group className="my-2" controlId="formBasicDealer">
                            <Form.Label className="mb-0">Dealer</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Dealer"
                                value={car.tags.dealer}
                                onChange={(e) => setCar({ ...car, tags: { ...car.tags, dealer: e.target.value } })}
                            />
                        </Form.Group>
                        <Form.Group className="my-2" controlId="formBasicModel">
                            <Form.Label className="mb-0">Model</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Model"
                                value={car.tags.model}
                                onChange={(e) => setCar({ ...car, tags: { ...car.tags, model: e.target.value } })}
                            />
                        </Form.Group>
                        <Form.Group className="my-2" controlId="formBasicPrice">
                            <Form.Label className="mb-0">Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Price"
                                value={car.tags.price}
                                onChange={(e) => setCar({ ...car, tags: { ...car.tags, price: e.target.value } })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="my-2" controlId="formBasicYear">
                            <Form.Label className="mb-0">Year</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Year"
                                value={car.tags.year}
                                onChange={(e) => setCar({ ...car, tags: { ...car.tags, year: e.target.value } })}
                            />
                        </Form.Group>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button variant="dark" type="submit" className="w-75 fs-1 py-1">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default CreateForm;
