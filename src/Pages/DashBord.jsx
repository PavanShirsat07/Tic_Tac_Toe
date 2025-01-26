import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import { UserContext } from '../../Context/UserState';
import { useNavigate } from 'react-router-dom';

const DashBord = () => {
  const { username, isLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [games, setGames] = useState([]);

  useEffect(() => {
    if (!isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    fetch("http://localhost:3000/games")
      .then((res) => res.json())
      .then((data) => {
        const user = data.find((user) => user.username === username);
        if (user) {
          setGames(user.games);
          console.log("Games for user:", username, user.games);
        } else {
          setGames([]);
          console.log(`No games found for username: ${username}`);
        }
      })
      .catch((err) => {
        console.error("Error fetching games:", err.message);
      });
  }, [username]);

  return (
    <>
      <NavBar />
      <div className='name'>
        <div>Username:-{username}</div>
        <div>Email:-Pavanshirsat45@gmail.com</div>
      </div>
      <div className=" mx-auto mt-5 p-4">
        <h1 className="text-2xl font-bold mb-4">Match History</h1>
        {games.length === 0 ? (
          <p>No match history available for {username}.</p>
        ) : (
          <div className="space-y-6 container3">
            {games.map((game, index) => (
              <div
                key={game._id}
                className="border p-4 rounded-lg shadow-md bg-white"
              >
                <h2 className="text-xl font-semibold mb-2">Game {index + 1}</h2>
                <p><strong>Opponent:</strong> {game.opponent}</p>
                <p><strong>Result:</strong> {game.winner === username ? "Win" : "Loss"}</p>
                <p><strong>Timestamp:</strong> {new Date(game.timestamp).toLocaleString()}</p>
                <div className="mt-4">
                  <h3 className="font-bold mb-2">Timeline of Moves:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {game.moves.map((move, moveIndex) => (
                      <li key={move._id}>
                        <strong>Move {moveIndex + 1}:</strong> Player {move.player.toUpperCase()} moved to position {move.position} at{' '}
                        {new Date(move.timestamp).toLocaleString()}.
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DashBord;
