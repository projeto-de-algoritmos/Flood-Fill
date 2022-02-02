import React, { useCallback, useState } from 'react';
import { waitRenderSquare } from '../../utils/waitRenderSquare';
import HouseCube from '../HouseCube';
import Square from '../Square';
import { Row } from './styles';

export default function Board({ wallSize, squaresPerRow, squares, pickedColor }) {

  console.log('IIIX',squares)
  const [fillableSquares, setSquares] = useState(squares);


  const setVisitedFalse = (squares) => {
    for (let i = 0; i < squares.length; i++) {
      for (let j = 0; j < squares[i].length; j++) {
        squares[i][j].visited = false;
      }
    }
  };

  console.log('COLOR', fillableSquares);

  const floodFill = 
    async (side, i, j) => {
      let oldColor;
      let squaresToFill;
      if(side === 'bottom') {
         oldColor = fillableSquares.bottom[i][j].color;
         squaresToFill = fillableSquares.bottom;
      }
      else {
        oldColor = fillableSquares.top[i][j].color;
        squaresToFill = fillableSquares.top;
      }
      console.log('TTTEEE',squaresToFill)
      const newColor = pickedColor;
      console.log('new', pickedColor);

      

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
        // await waitRenderSquare(0.2);
        nextSquare.visited = true;
        // setSquares([...squaresToFill]);

        nextSquare.color = newColor;
      }
      // await waitRenderSquare(0.2);
  
      setSquares({bottom: fillableSquares.bottom, top: fillableSquares.top, [side]: [...squaresToFill] });

      setVisitedFalse(squaresToFill);
    }

  const renderSquare = 
    (side, i, j) => {
      let color
      if(side === 'bottom') {
        color = fillableSquares.bottom[i][j].color
      }
      else {
        color = fillableSquares.top[i][j].color
      }
      return (

        <Square
          color={color}
          onClick={() => floodFill(side,i, j)}
          squareSize={wallSize / squaresPerRow}
        />
      );
    }
    

  const table = (side) => {
    const boardLines = Array.from(Array(squaresPerRow).keys());
    let table = [];
    boardLines.forEach((_, i) => {
      let row = [];
      boardLines.forEach((_, j) => {
        row.push(renderSquare(side,i, j));
      });
      table.push(<Row key={i + side}>{row}</Row>);
    });
    return table;
  };


  return (
    <div>
      <HouseCube size={wallSize}>
        {table('bottom')}
        {table('top')}
        {/* {table(3)} */}
      </HouseCube>
    </div>
  );
}
