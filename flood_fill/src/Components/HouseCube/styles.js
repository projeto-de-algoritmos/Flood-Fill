import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 50%;
  float: left;
  perspective: 1000px;

  & h1 {
    text-align: center;
  }
`;

export const Cube = styled.div`
  font-size: 4em;
  width: 30px;
  margin: 1.5em auto;
  transform-style: preserve-3d;
  transform: rotateX(-40deg) rotateY(32deg);
`;

export const Side = styled.div`
  ${({ size = 400 }) => css`
    position: absolute;
    width: ${size}px;
    height: ${size}px;

    background: rgba(255, 99, 71, 0.4);
    border: 1px solid rgba(0, 0, 0, 0.5);

    color: white;
    text-align: center;
    line-height: 600px;

    &.front {
      transform: translateZ(calc(${size}px / 2));
    }
    &.top {
      transform: rotateX(90deg) translateZ(calc(${size}px / 2));
    }
    &.right {
      transform: rotateY(90deg) translateZ(calc(${size}px / 2));
    }
    &.left {
      transform: rotateY(-90deg) translateZ(calc(${size}px / 2));
    }
    &.bottom {
      transform: rotateX(-90deg) translateZ(calc(${size}px / 2));
    }
    &.back {
      transform: rotateY(-180deg) translateZ(calc(${size}px / 2));
    }
  `}
`;
