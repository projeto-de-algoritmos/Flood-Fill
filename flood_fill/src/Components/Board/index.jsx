import React, { useState } from 'react';
import { waitRenderSquare } from '../../utils/waitRenderSquare';
import HouseCube from '../HouseCube';
import Square from '../Square';
import { Row } from './styles';

export default function Board({ wallSize, squaresPerRow, squares, pickedColor, paintDiagonal }) {
  const [fillableSquares, setSquares] = useState(squares);

  const setVisitedFalse = (squares) => {
    for (let i = 0; i < squares.length; i++) {
      for (let j = 0; j < squares[i].length; j++) {
        squares[i][j].visited = false;
      }
    }
  };

  const floodFill = async (side, i, j) => {
    let oldColor;
    let squaresToFill;
    if (side === 'left') {
      oldColor = fillableSquares.left[i][j].color;
      squaresToFill = fillableSquares.left;
    } 
    else if(side === 'right') {
      oldColor = fillableSquares.right[i][j].color;
      squaresToFill = fillableSquares.right;
    }
    else if(side === 'back') {
      oldColor = fillableSquares.back[i][j].color;
      squaresToFill = fillableSquares.back;
    }
    else {
      oldColor = fillableSquares.front[i][j].color;
      squaresToFill = fillableSquares.front;
    }
    const newColor = pickedColor;

    const squareArray = [];

    squareArray.push([i, j]);

    while (squareArray.length) {
      const squarePosition = squareArray.pop();
      let m = squarePosition[0];
      let n = squarePosition[1];

      if (m < 0 || m >= squaresPerRow) continue;
      if (n < 0 || n >= squaresPerRow) continue;
      let nextSquare = squaresToFill[m][n];

      if (nextSquare.color !== oldColor) continue;
      if (nextSquare.visited) continue;

      squareArray.push([m - 1, n], [m + 1, n]);
      squareArray.push([m, n - 1], [m, n + 1]);

      if (paintDiagonal) {
        squareArray.push([m - 1, n - 1], [m + 1, n - 1]);
        squareArray.push([m - 1, n + 1], [m + 1, n + 1]);
      }
      await waitRenderSquare(0.2);
      nextSquare.visited = true;
      setSquares({ ...fillableSquares, [side]: [...squaresToFill] });

      nextSquare.color = newColor;
    }
    await waitRenderSquare(0.2);

    setSquares({ ...fillableSquares,  [side]: [...squaresToFill] });

    setVisitedFalse(squaresToFill);
  };

  const renderSquare = (side, i, j) => {
    const color =  fillableSquares[side][i][j].color;
  
    return <Square color={color} onClick={() => floodFill(side, i, j)} squareSize={wallSize / squaresPerRow} />;
  };

  const table = (side) => {
    const boardLines = Array.from(Array(squaresPerRow).keys());
    let table = [];
    boardLines.forEach((_, i) => {
      let row = [];
      boardLines.forEach((_, j) => {
        row.push(renderSquare(side, i, j));
      });
      table.push(<Row key={i + side}>{row}</Row>);
    });
    return table;
  };

  return (
    <div>
      <HouseCube size={wallSize}>
        {table('right')}
        {table('left')}
        {table('back')}
        {table('front')}
      </HouseCube>
    </div>
  );
}
