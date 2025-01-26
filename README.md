# Tic-Tac-Toe Backend

This is the backend for a Tic-Tac-Toe game, which provides routes for user authentication, saving games, and managing game data using MongoDB. 

## Prerequisites

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or above)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or using a MongoDB Atlas cluster)

## Installation

### 1. Clone the repository

Clone this repository to your local machine.

```bash
git clone https://github.com/your-username/tic-tac-toe-backend.git
cd tic-tac-toe-backend
```
### 2. Install dependencies
Install all required dependencies using npm:
```bash
npm install
```

### 3. Set up MongoDB
Make sure you have MongoDB installed and running locally. You can use the following command to start the MongoDB server (if you're using the local MongoDB setup):
```bash
mongod
```

### 4. Update Environment Variables
Make sure you have the following environment variables configured:

JWT_SECRET: A secret key to sign JWT tokens (you can use any string).

MONGODB_URI: The URI for your MongoDB instance (you can use mongodb://localhost:27017/Tic-Tac-Toe for local MongoDB).

Create a .env file at the root of your project and add
```env
JWT_SECRET=your_secret_key_here
MONGODB_URI=mongodb://localhost:27017/Tic-Tac-Toe
```

### 5. Start the server
To start the server, run the following command:

```bash
npm start
```
