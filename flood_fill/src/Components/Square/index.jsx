import React from 'react';
import { SquareButton } from './styles';

export default function Square({color, squareSize, onClick}) {

    
    return (
      <SquareButton
      color={color}
      squareSize={squareSize}
        onClick={() => onClick()}>
      </SquareButton>
    );
  
}