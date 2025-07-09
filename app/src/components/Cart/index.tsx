import { FlatList, TouchableOpacity } from "react-native"
import { CartItem } from "../../types/CartItem";

import { Text } from "../Text";

import {
  Actions,
  Item,
  ProductContainer,
  Image,
  QuantityContainer,
  ProductDetails,
  Summary,
  TotalContainer
} from "./styles";

import { price } from "../../utils/Price";
import { PlusCircle } from "../Icons/PlusCircle";
import { MinusCircle } from "../Icons/MinusCircle";
import { Button } from "../Button";
import { Product } from "../../types/Product";
import { useState } from "react";
import { OrderConfirmedModal } from "../OrderConfirmedModal";
import { api } from "../../utils/api";

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement?: (product: Product) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export const Cart = ({ cartItems, onAdd, onDecrement, onConfirmOrder, selectedTable }: CartProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleConfirmOrder() {
    setIsLoading(true);

    const payload = {
      table: selectedTable,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity,
      })),
    };

    api.post("/orders", payload)
      .then(() => {
        setIsModalVisible(true);
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });

    setIsLoading(false);
  }

  function handleOrderConfirmed() {
    setIsModalVisible(false);
    onConfirmOrder();
  }

  return (
    <>
      <OrderConfirmedModal
        visible={isModalVisible}
        onClose={handleOrderConfirmed}
      />

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.product._id}
        showsVerticalScrollIndicator={false}
        style={{ maxHeight: 150 }}
        renderItem={({ item: cartItem }) => (
          <Item>
            <ProductContainer>
              <Image
                source={{
                  uri: `http://192.168.100.213:3000/uploads/${cartItem.product.imagePath}`,
                }}
              />
              <QuantityContainer>
                <Text size={14} color="#666">
                  {cartItem.quantity}x
                </Text>
              </QuantityContainer>

              <ProductDetails>
                <Text size={14} weight="600">
                  {cartItem.product.name.length > 18
                    ? cartItem.product.name.slice(0, 18) + "..."
                    : cartItem.product.name}
                </Text>
                <Text size={14} color="#666">
                  {price.format(cartItem.product.price)}
                </Text>
              </ProductDetails>
            </ProductContainer>
            <Actions>
              <TouchableOpacity onPress={() => onAdd(cartItem.product)}>
                <PlusCircle />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDecrement?.(cartItem.product)}>
                <MinusCircle />
              </TouchableOpacity>
            </Actions>
          </Item>
        )}
      />

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text weight="600" size={20}>
                {price.format(
                  cartItems.reduce(
                    (acc, item) => acc + item.product.price * item.quantity,
                    0
                  )
                )}
              </Text>
            </>
          ) : (
            <Text color="#666">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          loading={isLoading}
          disabled={cartItems.length === 0}
          onPress={handleConfirmOrder}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
