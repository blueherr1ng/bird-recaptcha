import './App.css'
import { TbReload } from "react-icons/tb";
import { MdHeadphones } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";
import { useState } from 'react';

const IMAGES = [
  {
    id: 1,
    image: '/birds/willowptarmigon.png',
    solution: [10, 11, 14, 15]
  },
  {
    id: 2,
    image: '/birds/roseringedparakeet.png',
    solution: [4, 5, 8, 9]
  },
  {
    id: 3,
    image: '/birds/sandgrouse.png',
    solution: [8, 9, 10]
  },
  {
    id: 4,
    image: '/birds/sonimcrine.jpg',
    solution: []
  },
  {
    id: 5,
    image: '/birds/hummingbird.jpg',
    solution: [5,9]
  },
  {
    id: 6,
    image: '/birds/unsure.JPG',
    solution: [1,2,5,6]
  },
  {
    id: 7,
    image: '/birds/hawkmaybe.jpg',
    solution: [5,9]
  },
  {
    id: 8,
    image: '/birds/dontknow.jpg',
    solution: [5,6,9,10]
  },
  {
    id: 9,
    image: '/birds/bushtit.jpg',
    solution: [8,9]
  },
  {
    id: 10,
    image: '/birds/chickadee.jpg',
    solution: [5,8,9]
  },
  {
    id: 11,
    image: '/birds/bittern.png',
    solution: [10,14]
  },
  {
    id: 12,
    image: '/birds/kestrel.png',
    solution: [6,10]
  },
  {
    id: 13,
    image: '/birds/eurasianwoodcock.png',
    solution: [4,5,8,9]
  },
  {
    id: 14,
    image: '/birds/greathornedowl.png',
    solution: [6,10,14]
  },
  {
    id: 15,
    image: '/birds/nightjar.png',
    solution: [6,7,9,10,11]
  },
  {
    id: 16,
    image: '/birds/notinskillset.png',
    solution: [5,9,13]
  },
];

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
    const currentImage = IMAGES[currentLevelIdx];

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
            if (currentLevelIdx < IMAGES.length - 1) {
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
    <div className="gallery-container">
      {IMAGES.map((item) => (
        <div key={item.id} className="gallery-item">
          <img src={item.image} alt="bird" style={{ width: '200px', margin: '10px' }} />
          <p>{item.image}</p>
        </div>
      ))}
    </div>
  );
}

export default function Container () {
    const [activeTab, setActiveTab] = useState('game');

    return (
        <div className="container big">
            <div className="tabheader">
                <button onClick={() => setActiveTab('game')}>game</button>
                <button onClick={() => setActiveTab('gallery')}>gallery</button>
            </div>
            
            <div>
                {activeTab === 'game' && <Recaptcha />}
                {activeTab === 'gallery' && <Gallery />}
            </div>
        </div>
    );
}