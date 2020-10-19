import styled from 'styled-components';

export const Container = styled.dialog`
  z-index: 2;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  border: 0;
  background: none;
`;

export const Filter = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
`;
