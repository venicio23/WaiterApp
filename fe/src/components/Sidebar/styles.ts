import styled from "styled-components";

export const Container = styled.nav`
  background: #fff;
  min-width: 6rem;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  .nav-content {
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem;
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

    .nav-body {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      align-items: center;

      .text-active {
        background-color: rgba(51, 51, 51, 0.1);
        border-radius: 0.5rem;
      }

      a {
        font-size: 0.875rem;
        padding: 0.5rem 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
        color: #666;
        font-weight: 500;

        &:hover {
          background-color: rgba(51, 51, 51, 0.1);
          border-radius: 0.5rem;
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
        font-size: 0.875rem;
        padding: 0.5rem 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
        color: #666;
        font-weight: 500;

        &:hover {
          background-color: rgba(51, 51, 51, 0.1);
          border-radius: 0.5rem;
        }

        .w-6 {
          height: 1.5rem;
          width: 1.5rem;
        }
      }
    }
  }
`;
