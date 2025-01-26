import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'; // Import mongoose for database operations
import authRoutes from './Routes/auth.js';
import protectedRoute from './Routes/protectedRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;
const dbName = "Tic-Tac-Toe";
const dbUrl = 'mongodb://localhost:27017/Tic-Tac-Toe'; // Use this for MongoDB connection URL

// Mongoose connection
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database:", dbName);
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });

// Define User schema for Mongoose
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  games: [
    {
      opponent: String,
      moves: [
        {
          player: String,
          position: Number,
          timestamp: String,
        },
      ],
      winner: String,
      timestamp: String,
    },
  ],
});

const User = mongoose.model("games", userSchema);

// Route to save or update game
app.post("/api/games", async (req, res) => {
  const { username, game } = req.body; // game includes opponent, moves, winner, timestamp

  try {
    // Check if user document exists
    const user = await User.findOne({ username });

    if (user) {
      // Append new game to the existing user's games array
      user.games.push(game);
      await user.save();
      res.status(200).json({ message: "Game added to user's record!" });
    } else {
      // Create a new document for the user
      const newUser = new User({
        username,
        games: [game],
      });
      await newUser.save();
      res.status(201).json({ message: "User created and game saved!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to save game." });
  }
});

import { MongoClient } from 'mongodb';

const router = express.Router();
// const dbName = 'Tic-Tac-Toe';
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);
let db;

// Connect to MongoDB
(async () => {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
})();
app.get("/games", async (req, res) => {
  try {
    const collection = db.collection("games");
    const games = await collection.find({}).toArray(); // Fetch all games
    res.send(games)
  } catch (error) {
    console.error("Error retrieving games:", error); // Log the error for debugging
    return res.status(500).json({ error: "Failed to retrieve games." }); // Send a 500 error for any failure
  }
});

// Routes
app.use('/auth', authRoutes);  // Auth routes (Signup, Login)
app.use('/api', protectedRoute);  // Protected route (JWT required)
