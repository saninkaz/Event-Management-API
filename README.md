# Event Management API

## Overview
An Event Management API built using Node.js, Express.js, and MongoDB. It allows users to register, log in, and manage events. Admin users can create, update, and delete events, while regular users can register for events and view event details.

## Features
- **User Management**
   - User registration and login.
   - Password validation and encryption.
-  **Event Management**
   - Create, update, and delete events (Admin only).
   - Register users for events.
   - Fetch details of a specific event or all events.
- **Authentication and Authorization**
   - (JWT)-based authentication.
   - Role-based authorization for specific routes.


## Installation
 Clone the repository:
   ```bash
   git clone https://github.com/saninkaz/Event-Management-API.git
   ```
 Navigate to the project directory:
   ```bash
   cd event-management-api
   ```
 Install dependencies:
   ```bash
   npm install
   ```
 Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=<port_number>
     MONGO_URL=<mongoose_databse_url>
     JWT_SECRET=<your_jwt_secret>
     EXPIRESIN=<jwt-expiration_time>
     ```
5. Start the server:
   ```bash
   npm run server
   ```


## API Endpoints

### User Routes (`/api/users`)
- **Register a user**  Method: `POST` Endpoint: `/register` 
 
  Request Body:
     ```json
     {
       "name": "user1",
       "email": "user1@gmail.com",
       "password": "user1234"
       "role":"user" // Default role (for admin => "role":"admin")
     }
     ```
- **Login a user**
   Method: `POST`
   Endpoint: `/login`
   
   Request Body:
     ```json
     {
       "email": "user1@gmail.com",
       "password": "user1234"
     }
     ```

### Event Routes (`/api/events`)
- **Create an event** (Admin only)  

   Method: `POST`  Endpoint: `/create`  
   Headers: `Authorization:   Bearer <token>`

   Request Body:

     ```json
      {
        "title": "AI Workshop 2024",
        "description": "Advanced Atificial Intelligence Workshop",
        "date": "2024-08-23",
        "time": "16:00",
        "venue": "Bhaskara Hall",
        "capacity": 150,
        "organizer": "CSEA",
        "tags": ["technology", "workshop", "AI-ML"]
      }
     ```

- **Register for an event**(for students)

   
   Method: `POST`  Endpoint: `/register/:eventId'   

   Headers: `Authorization: Bearer <token>`

- **Update an event** (Admin only)

   Method: `PUT` Endpoint: `/update/:eventId`     
   Headers: `Authorization: Bearer <token>`
   
   Request Body: 
            
      Input Fields to be updated.
- **Delete an event** (Admin only)

   Method: `DELETE` Endpoint: `/:eventId`  
   Headers: `Authorization: Bearer <token>`
- **Get all events**

   Method: `GET` Endpoint: `/all`  
   Headers: `Authorization: Bearer <token>`
- **Get event details**

   Method: `GET` Endpoint: `/:eventId`  
   Headers: `Authorization: Bearer <token>`

## Middleware

- **Authentication Middleware (`authMiddleware`)**
   - Verifies the JWT token and attaches the user information to the request object.
- **Authorization Middleware (`authorize`)**
   - Ensures only admin users can access certain routes.

## Technologies Used
- Node.js
- Express.js
- Mongoose
- bcrypt for password hashing
- jsonwebtoken for authentication

## Error handling

- Proper error responses are returned with appropriate messages
- errors are logged to the console for debugging.



