import { FlatList } from "react-native";

import { Text } from "../Text";
import { products } from "../../mocks/products";

import {
  Product,
  ProductImage,
  ProductDetails,
  Separator,
  AddToCardButton,
} from "./styles";

import { PlusCircle } from "../Icons/PlusCircle";

export function Menu() {
  const price = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <FlatList
      data={products}
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      keyExtractor={(product) => product._id}
      ItemSeparatorComponent={Separator}
      renderItem={({ item: product }) => (
        <Product>
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

          <AddToCardButton>
            <PlusCircle />
          </AddToCardButton>
        </Product>
      )}
    />
  );
}
