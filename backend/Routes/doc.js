async function doc(req, res) {
    try {
        return res.status(200).json({
            "openapi": "3.0.0",
            "info": {
                "version": "1.0.0",
                "title": "Car Management API",
                "description": "API for managing user cars with authentication"
            },
            "paths": {
                "/sendotp": {
                    "post": {
                        "summary": "Send OTP",
                        "description": "Send an OTP to the user's email for verification",
                        "requestBody": {
                            "required": true,
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "email": {
                                                "type": "string"
                                            }
                                        },
                                        "required": [
                                            "email"
                                        ]
                                    }
                                }
                            }
                        },
                        "responses": {
                            "200": {
                                "description": "OTP sent successfully"
                            },
                            "400": {
                                "description": "Invalid email address"
                            }
                        }
                    }
                },
                "/signup": {
                    "post": {
                        "summary": "User Signup",
                        "description": "Register a new user with name, email, username, and OTP verification",
                        "requestBody": {
                            "required": true,
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "email": {
                                                "type": "string"
                                            },
                                            "otp": {
                                                "type": "string"
                                            },
                                            "name": {
                                                "type": "string"
                                            },
                                            "username": {
                                                "type": "string"
                                            }
                                        },
                                        "required": [
                                            "email",
                                            "otp",
                                            "name",
                                            "username"
                                        ]
                                    }
                                }
                            }
                        },
                        "responses": {
                            "201": {
                                "description": "User registered successfully"
                            },
                            "400": {
                                "description": "Invalid OTP or missing information"
                            }
                        }
                    }
                },
                "/login": {
                    "post": {
                        "summary": "User Login",
                        "description": "Login user and set JWT as authToken cookie",
                        "requestBody": {
                            "required": true,
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "email": {
                                                "type": "string"
                                            },
                                            "otp": {
                                                "type": "string"
                                            }
                                        },
                                        "required": [
                                            "email",
                                            "otp"
                                        ]
                                    }
                                }
                            }
                        },
                        "responses": {
                            "200": {
                                "description": "Login successful, authToken cookie set"
                            },
                            "401": {
                                "description": "Invalid credentials"
                            }
                        }
                    }
                },
                "/home": {
                    "get": {
                        "summary": "Home Page",
                        "description": "Get home page data for authenticated users",
                        "security": [
                            {
                                "authToken": []
                            }
                        ],
                        "responses": {
                            "200": {
                                "description": "Home page data retrieved successfully"
                            },
                            "401": {
                                "description": "Unauthorized"
                            }
                        }
                    }
                },
                "/product": {
                    "post": {
                        "summary": "Add Product",
                        "description": "Create a new car entry for the logged-in user",
                        "security": [
                            {
                                "authToken": []
                            }
                        ],
                        "requestBody": {
                            "required": true,
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "title": {
                                                "type": "string"
                                            },
                                            "description": {
                                                "type": "string"
                                            },
                                            "tags": {
                                                "type": "object",
                                                "properties": {
                                                    "car_type": {
                                                        "type": "string",
                                                        "description": "Type of car (e.g., sedan, SUV)"
                                                    },
                                                    "company": {
                                                        "type": "string",
                                                        "description": "Car manufacturing company"
                                                    },
                                                    "dealer": {
                                                        "type": "string",
                                                        "description": "Dealer providing the car"
                                                    },
                                                    "model": {
                                                        "type": "string",
                                                        "description": "Model of the car"
                                                    },
                                                    "price": {
                                                        "type": "string",
                                                        "description": "Price of the car"
                                                    },
                                                    "year": {
                                                        "type": "string",
                                                        "description": "Manufacture year of the car"
                                                    }
                                                },
                                                "description": "Tags for categorizing the car"
                                            },
                                            "images": {
                                                "type": "array",
                                                "items": {
                                                    "type": "string",
                                                    "format": "binary"
                                                },
                                                "maxItems": 10
                                            }
                                        },
                                        "required": [
                                            "title",
                                            "description",
                                            "tags",
                                            "images"
                                        ]
                                    }
                                }
                            }
                        },
                        "responses": {
                            "200": {
                                "description": "Product created successfully"
                            },
                            "400": {
                                "description": "Invalid product data"
                            },
                            "401": {
                                "description": "Unauthorized"
                            }
                        }
                    },
                    "get": {
                        "summary": "List All Products",
                        "description": "Retrieve all cars for the logged-in user",
                        "security": [
                            {
                                "authToken": []
                            }
                        ],
                        "responses": {
                            "200": {
                                "description": "List of user cars",
                                "content": {
                                    "application/json": {
                                        "schema": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/components/schemas/Product"
                                            }
                                        }
                                    }
                                }
                            },
                            "401": {
                                "description": "Unauthorized"
                            }
                        }
                    }
                },
                "/product/{itemid}": {
                    "get": {
                        "summary": "Get Product",
                        "description": "Retrieve a specific car by item ID",
                        "security": [
                            {
                                "authToken": []
                            }
                        ],
                        "parameters": [
                            {
                                "name": "itemid",
                                "in": "path",
                                "required": true,
                                "schema": {
                                    "type": "string"
                                },
                                "description": "The unique identifier of the car"
                            }
                        ],
                        "responses": {
                            "200": {
                                "description": "Product details",
                                "content": {
                                    "application/json": {
                                        "schema": {
                                            "$ref": "#/components/schemas/Product"
                                        }
                                    }
                                }
                            },
                            "401": {
                                "description": "Unauthorized"
                            },
                            "404": {
                                "description": "Product not found"
                            }
                        }
                    },
                    "put": {
                        "summary": "Update Product",
                        "description": "Update the car details for the specified item ID",
                        "security": [
                            {
                                "authToken": []
                            }
                        ],
                        "parameters": [
                            {
                                "name": "itemid",
                                "in": "path",
                                "required": true,
                                "schema": {
                                    "type": "string"
                                }
                            }
                        ],
                        "requestBody": {
                            "required": true,
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "title": {
                                                "type": "string"
                                            },
                                            "description": {
                                                "type": "string"
                                            },
                                            "tags": {
                                                "type": "object",
                                                "properties": {
                                                    "car_type": {
                                                        "type": "string",
                                                        "description": "Type of car (e.g., sedan, SUV)"
                                                    },
                                                    "company": {
                                                        "type": "string",
                                                        "description": "Car manufacturing company"
                                                    },
                                                    "dealer": {
                                                        "type": "string",
                                                        "description": "Dealer providing the car"
                                                    },
                                                    "model": {
                                                        "type": "string",
                                                        "description": "Model of the car"
                                                    },
                                                    "price": {
                                                        "type": "string",
                                                        "description": "Price of the car"
                                                    },
                                                    "year": {
                                                        "type": "string",
                                                        "description": "Manufacture year of the car"
                                                    }
                                                },
                                                "description": "Tags for categorizing the car"
                                            },
                                            "images": {
                                                "type": "array",
                                                "items": {
                                                    "type": "string",
                                                    "format": "binary"
                                                },
                                                "maxItems": 10
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "responses": {
                            "200": {
                                "description": "Product updated successfully"
                            },
                            "401": {
                                "description": "Unauthorized"
                            },
                            "404": {
                                "description": "Product not found"
                            }
                        }
                    },
                    "delete": {
                        "summary": "Delete Product",
                        "description": "Delete a specific car by item ID",
                        "security": [
                            {
                                "authToken": []
                            }
                        ],
                        "parameters": [
                            {
                                "name": "itemid",
                                "in": "path",
                                "required": true,
                                "schema": {
                                    "type": "string"
                                }
                            }
                        ],
                        "responses": {
                            "204": {
                                "description": "Product deleted successfully"
                            },
                            "401": {
                                "description": "Unauthorized"
                            },
                            "404": {
                                "description": "Product not found"
                            }
                        }
                    }
                },
                "/logout": {
                    "get": {
                        "summary": "Logout",
                        "description": "Logs out the user and clears the authToken cookie",
                        "responses": {
                            "200": {
                                "description": "Logout successful"
                            }
                        }
                    }
                }
            },
            "components": {
                "schemas": {
                    "Product": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "type": "string"
                            },
                            "title": {
                                "type": "string"
                            },
                            "description": {
                                "type": "string"
                            },
                            "tags": {
                                "type": "object",
                                "properties": {
                                    "car_type": {
                                        "type": "string",
                                        "description": "Type of car (e.g., sedan, SUV)"
                                    },
                                    "company": {
                                        "type": "string",
                                        "description": "Car manufacturing company"
                                    },
                                    "dealer": {
                                        "type": "string",
                                        "description": "Dealer providing the car"
                                    },
                                    "model": {
                                        "type": "string",
                                        "description": "Model of the car"
                                    },
                                    "price": {
                                        "type": "string",
                                        "description": "Price of the car"
                                    },
                                    "year": {
                                        "type": "string",
                                        "description": "Manufacture year of the car"
                                    }
                                },
                                "description": "Tags for categorizing the car"
                            },
                            "images": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "securitySchemes": {
                    "authToken": {
                        "type": "apiKey",
                        "in": "cookie",
                        "name": "authToken",
                        "description": "Token required for authentication, stored as an HTTP-only cookie"
                    }
                }
            }
        });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

module.exports = doc;