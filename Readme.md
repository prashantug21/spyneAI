# Car Management Application

This project is a web application with separate client and server components, designed to provide [describe the purpose of your app, e.g., "a platform for managing products and authentication with OTP verification."] It uses Express and MongoDB on the backend and communicates with a frontend client hosted on a different domain.

- The client is currently running at:https://spyne-ai-client.vercel.app/
- The server is currently running at :https://spyne-ai-five.vercel.app/

## Features

- User authentication with JWT and OTP verification
- CRUD operations for products
- API documentation accessible via `/api/docs` endpoint
- Cross-domain cookie support for secure sessions
- Built with Express.js, Mongoose, and Node.js on the backend

## Technologies Used

- **Backend**: Node.js, Express, Mongoose, MongoDB
- **Frontend**: React (or another client technology as appropriate)
- **Deployment**: Vercel
- **Authentication**: JSON Web Token (JWT), Cookies
- **Styling**: Tailwind CSS (if applicable)

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance)
- **Vercel** account for deployment

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/prashantug21/spyneAI.git
   cd spyneai
   ```

2. **Install dependencies**:
    Run this commend in both backend and frontend directory
   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the backend directory with the following:

   ```plaintext
   PORT=3001
   DATABASE_URL=your_mongo_database_url
   CLIENT_URL=https://your-client-domain.com
   JWT_SECRET=your_jwt_secret
   ```
      Create a `.env` file in the frontend directory with the following:

   ```plaintext
   REACT_APP_BASE_URL=https://your-server-url.com
   ```

4. **Run the development server**:
    In frontend directory
   ```bash
   npm run start
   ```
   In backend directory
   ```bash
   node index.js
   ```
   The backend server should be running on `http://localhost:3001`.


## API Endpoints

### Authentication

- **POST** `/sendotp`: Sends OTP to user's email.
- **POST** `/signup`: Creates a new user.
- **POST** `/login`: Authenticates user and sets `authToken` cookie.
- **GET** `/logout`: Logs out the user by clearing the `authToken` cookie.

### Product Management

- **POST** `/product`: Add a new product (requires authentication).
- **GET** `/product`: Retrieve all products (requires authentication).
- **GET** `/product/:itemid`: Retrieve details of a specific product (requires authentication).
- **PUT** `/product/:itemid`: Update a product (requires authentication).
- **DELETE** `/product/:itemid`: Delete a product (requires authentication).

### Documentation

- **GET** `/api/docs`: API documentation.

