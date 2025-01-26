# Database Schema

This project provides an API for fetching a user's match history in a Tic-Tac-Toe game. It includes opponent details, the final game result (win/loss/draw), and a timeline of moves made during the match.


The project includes three main collections: **Users**, **Games**, and **Moves**. Below is the detailed schema for each collection.

### 1. Users Collection
This collection stores user details and their associated games.

| Field     | Type      | Description                                         |
|-----------|-----------|-----------------------------------------------------|
| `_id`     | ObjectId  | Unique identifier for the user.                     |
| `username`| String    | Unique username of the user.                        |
| `email`   | String    | Email of the user.                                  |
| `games`   | Array     | Array of game IDs referencing the **Games** collection. |

#### Example:
```json
{
  "_id": "64b2f3ef134c8e001c3b5c92",
  "username": "john_doe",
  "email": "john@example.com",
  "games": ["64b2f4ff134c8e001c3b5c93", "64b2f4ff134c8e001c3b5c94"]
}
```

# Tic-Tac-Toe Game Match History API

This project provides an API for fetching a user's match history in a Tic-Tac-Toe game. It includes opponent details, the final game result (win/loss/draw), and a timeline of moves made during the match.

## Features

- Fetch user's match history, including opponent details.
- Display the final game result: win, loss, or draw.
- Show a timeline of moves made during each game.

## API Endpoints
### 2. Games Collection
This collection stores information about individual games, including players, the result, and the timeline of moves.

| Field     | Type      | Description                                           |
|-----------|-----------|-------------------------------------------------------|
| `_id`     | ObjectId  | Unique identifier for the game.                       |
| `players` | Array     | Array of player details (username and role).          |
| `winner`  | String    | Username of the winner, or `null` for a draw.         |
| `timestamp` | Date    | Date and time when the game was played.               |
| `moves`   | Array     | Array of move IDs referencing the **Moves** collection. |

#### Example:
```json
{
  "_id": "64b2f4ff134c8e001c3b5c93",
  "players": [
    { "username": "john_doe", "role": "X" },
    { "username": "jane_doe", "role": "O" }
  ],
  "winner": "john_doe",
  "timestamp": "2024-12-01T14:30:00Z",
  "moves": ["64b2f5ff134c8e001c3b5c95", "64b2f5ff134c8e001c3b5c96"]
}


