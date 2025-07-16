import styled from 'styled-components';

export const Container = styled.nav`
  min-width: 6rem;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  .nav-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;

    .nav-logo {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;

      img {
        height: 2.25rem;
        width: 2.25rem;
      }
    }

    .nav-body{
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      align-items: center;

      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
        color: #666;
        font-weight: 500;

        &:hover {
          color: red;
        }

        &.active {
          color: red;
        }

        .w-6 {
          height: 1.5rem;
          width: 1.5rem;
        }
      }
    }

    .nav-footer {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      align-items: center;

      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
        color: #666;
        font-weight: 500;

        &:hover {
          color: red;
        }

        &.active {
          color: red;
        }

        .w-6 {
          height: 1.5rem;
          width: 1.5rem;
        }
      }
    }
  }

`;

