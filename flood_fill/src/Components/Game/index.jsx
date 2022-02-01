import React, { useState } from 'react';
import Board from '../Board';
export default function Game() {

  const randomColor = (colors, numberOfColors) =>  {
    const randomNumber = Math.floor((Math.random() * numberOfColors));
    return colors[randomNumber];
  }

  const createSquares = (colors, squaresPerRow, numberOfColors)  => {
    const squares = []
    for(let i = 0; i < squaresPerRow; i++) {
      squares[i] = [];
      for(let j = 0; j < squaresPerRow; j++) {
        squares[i][j] = {
          color: randomColor(colors, numberOfColors),
          visited: false
        }
      }
    }
    return squares;
  }
  
 const initialColors = ['red', 'blue', 'green']

  const [numberOfColors, setNumberOfColors] = useState(3)
  const [colors, setColors] = useState(initialColors)
  const [squareSize, setSquareSize] = useState(20)
  const [squaresPerRow, setSquaresPerRow] = useState(50)
  const [squares, setSquares] = useState(createSquares(colors, squaresPerRow, numberOfColors))




  

  console.log(squareSize, squaresPerRow, numberOfColors, squares, colors)
    return (
      <div>
          <Board 
            squareSize={squareSize}
            squaresPerRow={squaresPerRow}
            numberOfColors={numberOfColors}
            squares={squares}
            colors={colors}
          />
      </div>
    )
  
}
