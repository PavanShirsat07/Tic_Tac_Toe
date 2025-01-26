import React, { useRef, useState,useContext } from "react";
import Circle from "/Circle.png";
import Cross from "/Cross.png";
import NavBar from "../Components/NavBar";
import { UserContext } from "../../Context/UserState";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Game = () => {
  const { username, Opponent,isLogin} = useContext(UserContext);
  const [moveLog, setMoveLog] = useState([]);
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const title=useRef(null);
  const navigate=useNavigate();

  useEffect(() => {
  if(isLogin==false){
    navigate('/')
  }
  },[])


  const toggle = (e, num) => {
    if (lock || data[num]) {
      return;
    }
  
    const updatedData = [...data];
    const player = count % 2 === 0 ? "x" : "o";
  
    // Update cell with the current player's move
    e.target.innerHTML = `<img src='${player === "x" ? Cross : Circle}' alt='${player}' />`;
    updatedData[num] = player;
  
    setData(updatedData);
    setCount(count + 1);
  
    // Log the move
    setMoveLog((prevLog) => [
      ...prevLog,
      { player, position: num, timestamp: new Date().toISOString() },
    ]);
  
    checkWinner(updatedData);
  };
  

  const checkWinner = (updatedData) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        updatedData[a] &&
        updatedData[a] === updatedData[b] &&
        updatedData[a] === updatedData[c]
      ) {
        const winner = updatedData[a] === "X" ? Opponent:username;
  
        // Prepare the game data
        const gameData = {
          opponent: Opponent,
          moves: moveLog,
          winner,
          timestamp: new Date().toISOString(),
        };
  
        // Save to the backend
        axios
          .post("http://localhost:3000/api/games", {
            username,
            game: gameData,
          })
          .then(() => alert("Game saved successfully!"))
          .catch(() => alert("Failed to save game."));
  
        title.current.innerHTML = `Congratulations ${
          winner === username ? `<img src='${Circle}' />` : `<img src='${Cross}' />`
        } ${winner} Wins`;
        setLock(true);
        return;
      }
    }
  
    if (!updatedData.includes("")) {
      const gameData = {
        opponent: Opponent,
        moves: moveLog,
        winner: "Draw",
        timestamp: new Date().toISOString(),
      };
  
      axios
        .post("http://localhost:3000/api/games", {
          username,
          game: gameData,
        })
        .then(() => alert("Game saved successfully!"))
        .catch(() => alert("Failed to save game."));
  
      title.current.innerHTML = "It's a draw";
      setLock(true);
    }
  };

  const reset = () => {
    setData(["", "", "", "", "", "", "", "", ""]); 
    setCount(0);
    setLock(false);
    title.current.innerHTML=`Tic Tac Toe`
    const cells = document.querySelectorAll(".box");
    cells.forEach((cell) => {
      cell.innerHTML = ""; 
    });
  };

  return (
    <>
    <NavBar/>
    {isLogin ?(
      <div className="container2">
        <div>
          <div className="heading" ref={title}>Tic Tac Toe</div>
          <div className="play">
            <div className="bord">
              <div className="box" onClick={(e) => toggle(e, 0)}></div>
              <div className="box" onClick={(e) => toggle(e, 1)}></div>
              <div className="box" onClick={(e) => toggle(e, 2)}></div>
            </div>
            <div className="bord">
              <div className="box" onClick={(e) => toggle(e, 3)}></div>
              <div className="box" onClick={(e) => toggle(e, 4)}></div>
              <div className="box" onClick={(e) => toggle(e, 5)}></div>
            </div>
            <div className="bord">
              <div className="box" onClick={(e) => toggle(e, 6)}></div>
              <div className="box" onClick={(e) => toggle(e, 7)}></div>
              <div className="box" onClick={(e) => toggle(e, 8)}></div>
            </div>
          </div>
          <div className="reset" onClick={reset}>
            Reset
          </div>
        </div>
      </div>
    ):<></>}
    </>
  );
};

export default Game;
