import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';

const router = express.Router();
const dbName = 'Tic-Tac-Toe';
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

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const collection = db.collection('Users');
    const user = await collection.insertOne({ username, email, password: hashedPassword });
    res.status(201).json({ success: true, insertedId: user.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const collection = db.collection('Users');
  
  const user = await collection.findOne({ username });
  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ success: false, message: 'Invalid password' });
  }

  const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
  res.json({ success: true, token });
});

// Get all games (this is now /api/games)
// app.get("/games", async (req, res) => {

//   try {
//     const collection = db.collection('games');
//     const games = await collection.find({}).toArray();  // Convert the cursor to an array

//     // Check if games data exists
//     if (games.length > 0) {
//       console.log(games);  // Log to check the retrieved games data
//       const allGames = games.flatMap(game => game.moves);  // Assuming "moves" is an array inside each game document
//       res.status(200).json({ games: allGames });
//     } else {
//       res.status(404).json({ error: "No games found." });
//     }
//   } catch (error) {
//     console.error('Error retrieving games:', error);  // Log the error for debugging
//     res.status(500).json({ error: "Failed to retrieve games." });
//   }
// });

export default router;
