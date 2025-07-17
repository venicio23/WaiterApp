import styled from 'styled-components';

export const Container = styled.header`
  font-weight: 500;
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-content {
    display: flex;
    flex-direction: column;


    .header-title {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      align-items: center;

      .icon {
        width: 1.8rem;
        height: 1.8rem;
      }

      .header-title-text {
        font-size: 1.25rem;
        font-weight: 600;
      }

      .header-subtitle {
        font-size: 0.875rem;
        color: #666;
      }

    }
  }

  .right-action {
    margin: auto 0;

    a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: #D73035;
      font-weight: 500;
      padding: 0.5rem;
      border-radius: 8px;

      &:hover {
        background-color: #d730361a;
      }

      img {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }
`;
