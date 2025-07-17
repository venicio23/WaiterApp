import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4.5px);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalBody = styled.div`
  background: #fff;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 32px;
  width: 480px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 20px;
    }

    button {
      border: 0;
      background: transparent;
      line-height: 0;
    }
  }

  .status-container {
    margin-top: 32px;

    small {
      font-size: 14px;
      opacity: 0.8;
    }

    div {
      margin-top: 8px;
      display: flex;
      align-items: center;
      gap: 8px;

      span {
        font-weight: 500;
        font-size: 14px;
      }
    }
  }
`;

export const OrderDetails = styled.div`
  margin-top: 32px;

  > strong {
    font-weight: 500;
    font-size: 14px;
    opacity: 0.8;
  }

  .order-items {
    margin-top: 16px;

    .item {
      display: flex;

      & + .item {
        margin-top: 16px;
      }

      img {
        border-radius: 6px;
        object-fit: cover;
      }

      .quantity {
        font-size: 14px;
        color: #666;
        display: block;
        min-width: 20px;
        margin-left: 12px;
      }

      .product-details {
        margin-left: 4px;

        strong {
          display: block;
          margin-bottom: 4px;
        }

        span {
          font-size: 14px;
          color: #666;
        }
      }
    }
  }

  .total {
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-weight: 500;
      font-size: 14px;
      opacity: 0.8;
    }
  }
`;

export const Actions = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .primary {
    background: #d73035;
    border-radius: 8px;
    border: 0;
    color: #fff;
    padding: 12px 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .secondary {
    padding: 12px 36px;
    color: #d73035;
    font-weight: 500;
    border: 0;
    background: transparent;
    border-radius: 8px;

    &:hover {
      background-color: #d730361a;
    }
  }
`;
