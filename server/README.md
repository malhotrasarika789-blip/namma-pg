# Namma PG Backend 🚀

Backend API for **Namma PG - PG Operations Management Platform**.

Built using **Node.js, Express.js, MongoDB, and Mongoose**.

## live
https://namma-pg.onrender.com

## Features

✅ User Authentication (JWT)  
✅ Role Based Access Control (Owner / Tenant)  
✅ Property Management  
✅ Room Management  
✅ Bed Management  
✅ Tenant Management  
✅ Rent Management  
✅ Complaint Management  
✅ Request Validation using Joi  
✅ Secure API Routes  

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Joi Validation
- dotenv

  
## Installation

Clone the repository:

git clone https://github.com/malhotrasarika789-blip/namma-pg.git

## Go to server folder:

cd server

## Install dependencies:

npm install

## Environment Variables

Create .env file inside server:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

## Run Locally

## Development:

npm run dev

## Production:

npm start
API Modules
Authentication
Register User
Login User
Property
Create Property
Get Owner Properties
Get Property By ID
Update Property
Delete Property
Room
Create Room
Get Rooms By Property
Get Room By ID
Update Room
Delete Room
Bed
Create Bed
Get Beds
Get Bed By ID
Update Bed
Delete Bed
Tenant
Create Tenant
Get Tenants
Get Tenant Profile
Update Tenant
Delete Tenant
Rent
Create Rent
Get Rent Details
Update Payment Status
Complaint
Create Complaint
Manage Complaints
Authentication

## Protected routes require JWT token:

Authorization: Bearer <token>
Deployment

# Backend deployed using:

Render

## Database:

MongoDB Atlas

