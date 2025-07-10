import { Modal } from "react-native";

import { Text } from "../Text";
import { CheckCircle } from "../Icons/CheckCircle";

import { Container, OkButton } from "./styles";

interface OrderConfirmedModalProps {
  visible: boolean;
  onClose: () => void;
}

export const OrderConfirmedModal = ({
  visible,
  onClose,
}: OrderConfirmedModalProps) => {
  return (
    <Modal
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <Container>
        <CheckCircle />

        <Text style={{marginTop: 12}} size={20} weight="600" color="#fff">Pedido confirmado</Text>
        <Text style={{marginTop: 4}} opacity={0.9} color="#fff">O pedido já entrou na fila de produção!</Text>

        <OkButton onPress={onClose}>
          <Text color="#D73035" weight="600">OK</Text>
        </OkButton>
      </Container>
    </Modal>
  );
};
