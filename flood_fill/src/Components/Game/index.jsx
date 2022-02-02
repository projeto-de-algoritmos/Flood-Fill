import React, { useState } from 'react';
import Board from '../Board';
import { SketchPicker } from 'react-color';
import * as S from './styles';

export default function Game() {

  const randomColor = (colors, numberOfColors) =>  {
    const randomNumber = Math.floor((Math.random() * numberOfColors));
    return colors[randomNumber];
  }

  const createSquares = (colors, squaresPerRow, numberOfColors)  => {
    const squares = []
    const bottomSquares = []
    for(let i = 0; i < squaresPerRow; i++) {
      squares[i] = [];
      bottomSquares[i] = [];
      for(let j = 0; j < squaresPerRow; j++) {
        squares[i][j] = {
          color: randomColor(colors, numberOfColors),
          visited: false
        }
        bottomSquares[i][j] = {
          color: randomColor(colors, numberOfColors),
          visited: false
        }
      }
    }
    return {top: squares, bottom: bottomSquares};
  }
  
 const initialColors = ['#4D4D4D', '#4D4D4D', '#4D4D4D']

  const [numberOfColors, setNumberOfColors] = useState(3)
  const [colors, setColors] = useState(initialColors)
  const [squareSize, setSquareSize] = useState(20)
  const [squaresPerRow, setSquaresPerRow] = useState(10)
  const [squares, setSquares] = useState(createSquares(colors, squaresPerRow, numberOfColors))
  const[pickedColor, setPickedColor] = useState('#22194D')



  
  const handleColorChange = (color) => {
    setPickedColor(color.hex)
  };

  console.log(squareSize, squaresPerRow, numberOfColors, squares, colors)

    return (
      <S.Container>
      <div> <SketchPicker color={pickedColor} onChangeComplete={handleColorChange} /></div>
      <div>
          <Board 
            squareSize={8}
            squaresPerRow={squaresPerRow}
            numberOfColors={numberOfColors}
            squares={squares}
            colors={colors}
            pickedColor={pickedColor}
            wallSize={300}
          />
      </div>
      </S.Container>
    )
  
}
