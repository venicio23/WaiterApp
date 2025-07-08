import {
  Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer,
} from "./styles";

import { Header } from "../components/Header";
import { Categories } from "../components/Categories";
import { Menu } from "../components/Menu";
import { Button } from "../components/Button";
import { TableModal } from "../components/TableModal";
import { useState } from "react";
import { Cart } from "../components/Cart";
import { CartItem } from "../types/CartItem";

import { Product } from "../types/Product";

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable("");
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const existingItem = prevState.find(
        (item) => item.product._id === product._id
      );

      if (existingItem) {
        return prevState.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevState, { product, quantity: 1 }];
    });
  }

  function handleDecrementCartItem(product: Product) {
    setCartItems((prevState) => {
      const existingItem = prevState.find(
        (item) => item.product._id === product._id
      );

      if (existingItem && existingItem.quantity > 1) {
        return prevState.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }

      return prevState.filter((item) => item.product._id !== product._id);
    });
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />
        <CategoriesContainer>
          <Categories></Categories>
        </CategoriesContainer>
        <MenuContainer>
          <Menu onAddToCart={handleAddToCart}></Menu>
        </MenuContainer>
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={() => setIsTableModalVisible(true)}>
              Novo Pedido
            </Button>
          )}
          {selectedTable && (
            <Cart
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              cartItems={cartItems}
              onConfirmOrder={handleResetOrder}
            />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        onClose={() => setIsTableModalVisible(false)}
        visible={isTableModalVisible}
        onSave={handleSaveTable}
      ></TableModal>
    </>
  );
}
