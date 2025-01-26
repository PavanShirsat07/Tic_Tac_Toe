import mongoose from 'mongoose';

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

// Check if the model already exists to avoid redefining it
const User = mongoose.models.User || mongoose.model('User', userSchema);

export { User };
