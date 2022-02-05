import React from 'react';
import * as S from './styles';
function HouseCube({children, size}) {
  return (
    <>
      <S.Wrapper>
        <S.Cube>
          <S.Side className="front" size={size}>{children[0]}</S.Side>
          <S.Side className="back" size={size} >{children[1]}</S.Side>
          <S.Side className="right" size={size}>{children[2]}</S.Side>
          <S.Side className="left" size={size}>{children[3]}</S.Side>
          <S.Side className="bottom" size={size}>{children[4]}</S.Side>
        </S.Cube>
      </S.Wrapper>
    </>
  );
}

export default HouseCube;
