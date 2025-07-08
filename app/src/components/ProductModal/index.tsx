import { FlatList, Modal } from "react-native";

import { Text } from "../Text";

import { Button } from "../Button";
import { Product } from "../../types/Product";

import {
  Image,
  CloseButton,
  Header,
  ModalBody,
  IngredientsContainer,
  Ingredient,
  Footer,
  FooterContainer,
  PriceContainer,
} from "./styles";

import { Close } from "../Icons/Close";
import { price } from "../../utils/Price";

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product) => void;
}
export function ProductModal({ visible, onClose, product, onAddToCart }: ProductModalProps) {
  if (!product) {
    return null;
  }

  function handleAddToCart() {
    onAddToCart(product!);
    onClose();
  }

  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={visible}
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `http://192.168.100.213:3000/uploads/${product.imagePath}`,
        }}
      >
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>

      <ModalBody>
        <FlatList
          data={product.ingredients}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Header>
              <Text size={24} weight="600">
                {product.name}
              </Text>
              <Text color="#666">{product.description}</Text>

              {product.ingredients.length > 0 && (
                <IngredientsContainer>
                  <Text weight="600" color="#666">
                    Ingredientes
                  </Text>
                </IngredientsContainer>
              )}
            </Header>
          }
          renderItem={({ item: ingredient }) => (
            <Ingredient>
              <Text>{ingredient.icon}</Text>
              <Text size={14} color="#666">
                {ingredient.name}
              </Text>
            </Ingredient>
          )}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </ModalBody>

      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color="#666">Preço</Text>
            <Text size={20} weight="600">
              {price.format(product.price)}
            </Text>
          </PriceContainer>

          <Button onPress={handleAddToCart}>
            Adicionar ao pedido
          </Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}
