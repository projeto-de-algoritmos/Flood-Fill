import React, { useState } from 'react';
import Board from '../Board';
import { SketchPicker } from 'react-color';
import * as S from './styles';
import { InputLabel, MenuItem, Select } from '@mui/material';

export default function Game() {
  const randomColor = (colors, numberOfColors) => {
    const randomNumber = Math.floor(Math.random() * numberOfColors);
    return colors[randomNumber];
  };

  const createSquares = (colors, squaresPerRow, numberOfColors) => {
    const squares = [];
    const bottomSquares = [];
    for (let i = 0; i < squaresPerRow; i++) {
      squares[i] = [];
      bottomSquares[i] = [];
      for (let j = 0; j < squaresPerRow; j++) {
        squares[i][j] = {
          color: randomColor(colors, numberOfColors),
          visited: false,
        };
        bottomSquares[i][j] = {
          color: randomColor(colors, numberOfColors),
          visited: false,
        };
      }
    }
    return { top: squares, bottom: bottomSquares };
  };

  const initialColors = ['red', 'red', 'red'];

  const [numberOfColors, setNumberOfColors] = useState(3);
  const [colors, setColors] = useState(initialColors);
  const [squareSize, setSquareSize] = useState(20);
  const [squaresPerRow, setSquaresPerRow] = useState(10);
  const [squares, setSquares] = useState(createSquares(colors, squaresPerRow, numberOfColors));
  const [pickedColor, setPickedColor] = useState('#22194D');
  const [wallSize, setWallSize] = useState(200);

  const handleColorChange = (color) => {
    setPickedColor(color.hex);
  };

  console.log(squareSize, squaresPerRow, numberOfColors, squares, colors);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const handleChange = (e) => setWallSize(e.target.value);

  return (
    <S.Container>
      <h1>Pinte as paredes da casa com o algoritmo flood fill</h1>
      <S.FlexOptions>
        <div>
          <SketchPicker color={pickedColor} onChangeComplete={handleColorChange} />
        </div>
        <form onSubmit={handleSubmit}>
        <InputLabel id="demo-simple-select-helper-label">Select Wall Size</InputLabel>
          <S.InputsContainer>
            {/* name="size"  label="House size" type="number" value={wallSize} onChange={handleChange} */}
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={wallSize}
              onChange={handleChange}
            >
              <MenuItem value={100}>Small</MenuItem>
              <MenuItem value={200}>Medium</MenuItem>
              <MenuItem value={300}>Large</MenuItem>
            </Select>
          </S.InputsContainer>
        </form>
      </S.FlexOptions>
      <div>
        <Board
          squareSize={8}
          squaresPerRow={squaresPerRow}
          numberOfColors={numberOfColors}
          squares={squares}
          colors={colors}
          pickedColor={pickedColor}
          wallSize={wallSize}
        />
      </div>
    </S.Container>
  );
}
