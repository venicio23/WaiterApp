import { useState } from "react";
import { FlatList } from "react-native";

import { Text } from "../Text";
import { products } from "../../mocks/products";

import {
  ProductContainer,
  ProductImage,
  ProductDetails,
  Separator,
  AddToCardButton,
} from "./styles";

import { PlusCircle } from "../Icons/PlusCircle";
import { ProductModal } from "../ProductModal";
import { Product } from "../../types/Product";
import { price } from "../../utils/Price";

interface MenuProps {
  onAddToCart: (product: Product) => void;
}

export function Menu({ onAddToCart }: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleOpenModal(product: Product) {
    setSelectedProduct(product);
    setIsModalVisible(true);
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={(product) => product._id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleOpenModal(product)}>
            <ProductImage
              source={{
                uri: `http://192.168.100.213:3000/uploads/${product.imagePath}`,
              }}
            />

            <ProductDetails>
              <Text weight={600}>{product.name}</Text>
              <Text size={14} color="#666" style={{ marginVertical: 8 }}>
                {product.description.length > 60
                  ? product.description.slice(0, 60) + "..."
                  : product.description}
              </Text>
              <Text size={14} weight={600}>
                {price.format(product.price)}
              </Text>
            </ProductDetails>

            <AddToCardButton onPress={() => onAddToCart(product) }>
              <PlusCircle />
            </AddToCardButton>
          </ProductContainer>
        )}
      />
    </>
  );
}
