import styled, {css} from 'styled-components'


export const SquareButton = styled.button`

  ${({ color, squareSize }) => css`
    background-color: ${color};
    height: ${squareSize}px;
    width: ${squareSize}px;
    line-height: ${squareSize}px;
    cursor: pointer;

    border: 0;
    float: left;
    font-size: 34px;
    font-weight: bold;
    padding: 0;

    &:focus {
      outline: none;
    }
  `}
`
