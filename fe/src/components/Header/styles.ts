import styled from 'styled-components';

export const Container = styled.header`
  background: #D73035;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1216px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-details {
    color: #FFF;

    h1 {
      font-size: 32px;
      margin-bottom: 6px;
    }

    h2 {
      font-size: 16px;
      font-weight: 400;
      opacity: 0.9;
    }
  }
`;
