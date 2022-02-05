import React, { useEffect, useState } from 'react';
import Board from '../Board';
import { SketchPicker } from 'react-color';
import * as S from './styles';
import { Checkbox, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material';

export default function Game() {
  const randomColor = (colors, numberOfColors) => {
    const randomNumber = Math.floor(Math.random() * numberOfColors);
    return colors[randomNumber];
  };

  const createSquares = (colors, squaresPerRow, numberOfColors) => {
    const rightSquares = [];
    const leftSquares = [];
    const backSquares = [];
    const frontSquares = [];
    for (let i = 0; i < squaresPerRow; i++) {
      rightSquares[i] = [];
      leftSquares[i] = [];
      backSquares[i] = [];
      frontSquares[i] = [];
      for (let j = 0; j < squaresPerRow; j++) {
        rightSquares[i][j] = {
          color: randomColor(colors, numberOfColors),
          visited: false,
        };
        leftSquares[i][j] = {
          color: randomColor(colors, numberOfColors),
          visited: false,
        };
        backSquares[i][j] = {
          color: randomColor(colors, numberOfColors),
          visited: false,
        };
        frontSquares[i][j] = {
          color: randomColor(colors, numberOfColors),
          visited: false,
        };
      }
    }
    return { right: rightSquares, left: leftSquares, back: backSquares, front: frontSquares };
  };

  const initialColors = ['#B4DC94', '#B4DC94', '#B4DC94'];
  const differentColors = ['#d14fb5', '#dd4c20', '#69cf4f'];

  const [numberOfColors, setNumberOfColors] = useState(3);
  const [uniformColor, setUniformColor] = useState(true);
  const [colors, setColors] = useState(initialColors);
  const [squareSize, setSquareSize] = useState(20);
  const [squaresPerRow, setSquaresPerRow] = useState(10);
  const [squares, setSquares] = useState(createSquares(colors, squaresPerRow, numberOfColors));
  const [pickedColor, setPickedColor] = useState('#22194D');
  const [wallSize, setWallSize] = useState(200);
  const [paintDiagonal, setPaintDiagonal] = useState(false);

  const handleColorChange = (color) => {
    setPickedColor(color.hex);
  };


  const handleDiagonal = (event) => {
    setPaintDiagonal(event.target.checked);
  };
  const handleUniformColor = (event) => {
    setUniformColor(event.target.checked);
    console.log(event.target.checked)
    if(!event.target.checked) {
      setSquares(createSquares(differentColors, squaresPerRow, numberOfColors))
    } 
    else {
      setSquares(createSquares(initialColors, squaresPerRow, numberOfColors))
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <InputLabel id="demo-simple-select-helper-label">Selecione o tamanho da casa</InputLabel>
          <S.InputsContainer>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={wallSize}
              onChange={handleChange}
            >
              <MenuItem value={100}>Pequena</MenuItem>
              <MenuItem value={200}>Media</MenuItem>
              <MenuItem value={300}>Grande</MenuItem>
            </Select>
          </S.InputsContainer>
          <FormControlLabel
            control={
              <Checkbox checked={paintDiagonal} onChange={handleDiagonal} aria-label="Checkbox-diagonal" defaultChecked />
            }
            label="Pintar também na diagonal"
          />
          <FormControlLabel
            control={
              <Checkbox checked={uniformColor} onChange={handleUniformColor} aria-label="Checkbox-uniform" defaultChecked />
            }
            label="Cores uniformes"
          />
        </form>
      </S.FlexOptions>
      <div>
        <Board
          squareSize={8}
          squaresPerRow={squaresPerRow}
          numberOfColors={numberOfColors}
          squares={squares}
          paintDiagonal={paintDiagonal}
          pickedColor={pickedColor}
          wallSize={wallSize}
        />
      </div>
    </S.Container>
  );
}
