import './App.css'
import { TbReload } from "react-icons/tb";
import { MdHeadphones } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";
import { useState } from 'react';

function RecaptchaHeader() {
    return (
        <div className = "header">
            <div className = "text"> Select all squares with</div>
            <div className = "textspecial">birds</div>
            <div className = "text"> If there are none, click skip</div>
        </div>
    );
}
  

function Square({ onSquareClick, imageStyle, isSelected }) {
  return (
    <div 
      className={`square ${isSelected ? 'selected' : ''}`} 
      onClick={onSquareClick}
      style={imageStyle}
    >
    </div>
  );
}

function RecaptchaGrid({squares, setSquares}) {
  const imagePath = '/birds/willowptarmigon.png';
  function handleClick(index) {
    const newBoard = squares.slice();
    newBoard[index] = !newBoard[index];
    setSquares(newBoard);
  }

  return (
    <div className="grid-4x4">
      {squares.map((squareValue, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const sliceStyle = {
          backgroundImage: `url(${imagePath})`,
          backgroundPosition: `${col * 33.33}% ${row * 33.33}%`,
          backgroundSize: '400% 400%', 
        };
        return (
          <Square 
            key={i} 
            isSelected={squareValue} 
            onSquareClick={() => handleClick(i)}
            imageStyle={sliceStyle} 
          />
        );
      })}
    </div>
  );
}


function CalculateWinner({squares, solution}) {
  for (let i = 0; i < solution.length; i++) {
    let index = solution[i];
    if (squares[index] && squares[index] === squares[index] && squares[index] === squares[index]) {
      return squares[index];
    }
  }
  return null;
}


function RecaptchaFooter({squares}){
    let anySelected = false;
    if(squares.includes(true)) {anySelected = true;}
    return(
        <div className = "footer">
            <button className = "info"> <TbReload /> </button>
            <button className = "info"> <MdHeadphones /> </button>
            <button className = "info"> <MdInfoOutline /> </button>
            <button className = "skip"> {anySelected ? "Next" : "Skip"}  </button>
        </div>
   )
}



function Recaptcha() {
    const [squares, setSquares] = useState(Array(16).fill(false));
    return (
    <div class="container">
        <RecaptchaHeader />
        <RecaptchaGrid squares = {squares} setSquares = {setSquares} />
        <RecaptchaFooter squares = {squares}/>
    </div>
  );
}


export default function Container () {
    return (
        <div class="container big">
        <div class="tabheader">
            <button>game</button>
            <button>gallery</button>
        </div>
        <div>
            <Recaptcha />
        </div>
        </div>
    );
}