import React, {useCallback, useState} from 'react';
import { waitRenderSquare } from '../../utils/waitRenderSquare';
import Square from '../Square';
import { Row } from './styles';

export default function Board({squareSize, squaresPerRow, numberOfColors, squares, pickedColor}) {
 
const [fillableSquares, setSquares] = useState(squares)
// const getUniqueRandomColor = (color) =>  {
//   const numberBetweenZeroAndFour = Math.floor((Math.random() * numberOfColors));
//   if (color === colors[numberBetweenZeroAndFour]) {
//     return getUniqueRandomColor(color);
//   } else {
//     return  colors[numberBetweenZeroAndFour];
//   }
// }

const setVisitedFalse = (squares) => {
  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares[i].length; j++) {
      squares[i][j].visited = false;
    }
  }
}

console.log('COLOR',pickedColor)

const floodFill = useCallback (async (i, j) =>  {
  const oldColor = squares[i][j].color;
  const newColor = pickedColor
  console.log('new',pickedColor)

  const squaresToFill = squares;

  const squareArray = [];

  squareArray.push([i, j])

  while (squareArray.length) {
    const squarePosition = squareArray.pop();
    let m = squarePosition[0];
    let n = squarePosition[1];

    if (m < 0 || m >= squaresPerRow) continue;
    if (n < 0 || n >= squaresPerRow) continue;
    let nextSquare = squaresToFill[m][n];

    if (nextSquare.color !== oldColor) continue;
    if (nextSquare.visited) continue;



    squareArray.push([m - 1, n], [m + 1, n])  
    squareArray.push([m, n - 1], [m, n + 1])
    await waitRenderSquare(0.5)
    nextSquare.visited = true;
    await setSquares([...squaresToFill])  

    nextSquare.color = newColor;
    
  }
  await waitRenderSquare(0.5)
  await setSquares([...squaresToFill])  

 

 setVisitedFalse(squares);
}, [pickedColor, squares, squaresPerRow])




  const renderSquare = useCallback((i, j) => {
    return <Square
      color={fillableSquares[i][j].color}
      onClick={() => floodFill(i, j)}
      squareSize={squareSize}
    />;
  }, [fillableSquares, floodFill, squareSize])

  const table = useCallback(() => {

    const boardLines =  Array.from(Array(squaresPerRow).keys())
    let table = []
    boardLines.forEach((_, i) =>  {

  
      let row = []
      // Inner loop to create children
      boardLines.forEach((_, j) =>  { 
        row.push(renderSquare(i, j))
      })
      // Create the parent and add the children
      table.push(<Row key={i}>{row}</Row>)
    })
    return table
  }, [renderSquare, squaresPerRow])

  
 
  
    return (
      <div>
     {table()}
        
      </div>
    );
  
}