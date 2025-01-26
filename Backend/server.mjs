import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'; 
import authRoutes from './Routes/auth.js';
import protectedRoute from './Routes/protectedRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;
const dbName = "Tic-Tac-Toe";
const dbUrl = 'mongodb://localhost:27017/Tic-Tac-Toe'; 

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
  const { username, game } = req.body; 

  try {
  
    const user = await User.findOne({ username });

    if (user) {

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
    const games = await collection.find({}).toArray(); 
    res.send(games)
  } catch (error) {
    console.error("Error retrieving games:", error); 
    return res.status(500).json({ error: "Failed to retrieve games." }); 
  }
});


app.use('/auth', authRoutes);  
app.use('/api', protectedRoute);  
