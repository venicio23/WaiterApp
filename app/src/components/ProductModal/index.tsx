import { Modal } from "react-native";

import { Text } from "../Text";
import { Product } from "../../types/Product";

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: Product | null;
}
export function ProductModal({ visible, onClose, product }: ProductModalProps) {
  console.log(product)
  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={visible}
      onRequestClose={onClose}
    >
      <Text size={24} weight={600}>
        Product Modal
      </Text>

      <Text size={16} onPress={onClose}>
        Close Modal
      </Text>
    </Modal>
  );
}
