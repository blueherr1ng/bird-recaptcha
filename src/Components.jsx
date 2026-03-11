import './App.css'
import { TbReload } from "react-icons/tb";
import { MdHeadphones } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";
import { useState } from 'react';
import {NOTBIRDS} from './notbird'
import { IMAGES } from './images';


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


function RecaptchaGrid({squares, setSquares, imagePath}) {
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


function RecaptchaFooter({squares, handleSolve}){
    let anySelected = false;
    if(squares.includes(true)) {anySelected = true;}
    return(
        <div className = "footer">
            <button className = "info"> <TbReload /> </button>
            <button className = "info"> <MdHeadphones /> </button>
            <button className = "info"> <MdInfoOutline /> </button>
            <button className = "skip" onClick = {handleSolve}> {anySelected ? "Next" : "Skip"}  </button>
        </div>
   )
}



function Recaptcha() {
    const [squares, setSquares] = useState(Array(16).fill(false));
    const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
    const BIGARRAY = [...IMAGES, ...NOTBIRDS]
    const currentImage = BIGARRAY[currentLevelIdx];
    

    const handleSolve = () => {
        const solution = IMAGES[currentLevelIdx].solution;

        let isCorrect = true;
        for (let i = 0; i < 16; i++) {
            if ((solution.includes(i) && !squares[i]) || (!solution.includes(i) && squares[i])) {
            isCorrect = false;
            break; 
            }
        }
        if (isCorrect) {
            setSquares(Array(16).fill(false));
            if (currentLevelIdx < BIGARRAY.length - 1) {
                setCurrentLevelIdx(currentLevelIdx + 1);
            } else {
                setCurrentLevelIdx(0);
            }
        }
        else{
            console.log("HANDLE LATER")
        }
    };
    
    return (
    <div class="container">
        <RecaptchaHeader />
        <RecaptchaGrid squares = {squares} setSquares = {setSquares} imagePath = {currentImage.image}/>
        <RecaptchaFooter squares = {squares} handleSolve = {handleSolve}/>
    </div>
  );
}

function Gallery() {
  return (
    <>    
    <p> a collection of camouflaged or just poorly photographed birds - try to find them!</p>
    <div className="gallery-container">
      {IMAGES.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt="bird" style={{ width: '300px', margin: '10px' }} />
          <p>{item.image}</p>
        </div>
      ))}
    </div>
    </>

  );
}


function NotBirdBirds() {
  
  return (
    <>    
    <p> definitely birds</p>
    <div className="gallery-container">

      {NOTBIRDS.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt="bird" style={{ width: '300px', margin: '10px' }} />
          <p>{item.image}</p>
        </div>
      ))}
    </div>
    </>

  );
}

export default function Container () {
    const [activeTab, setActiveTab] = useState('game');

    return (
        <div className="container big">
            <div className="tabheader">
                <button onClick={() => setActiveTab('game')}>game</button>
                <button onClick={() => setActiveTab('gallery')}>gallery</button>
                <button onClick={() => setActiveTab('notbirds')}>notbirds</button>
            </div>
            
            <div>
                {activeTab === 'game' && <Recaptcha />}
                {activeTab === 'gallery' && <Gallery />}
                {activeTab === 'notbirds' && <NotBirdBirds />}
            </div>
        </div>
    );
}