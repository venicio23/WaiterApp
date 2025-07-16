import HomeIcon from "../../../assets/icons/home.svg";

import { Sidebar } from "../../../components/Sidebar";
import { Header } from "../../../components/Header";
import { Orders } from "../../../components/Orders";
import { Container } from "./styles";

export function Dashboard() {
  return (
    <Container>
      <Sidebar />
      <main className="body">
        <Header
          title="Home"
          subtitle="Acompanhe os pedidos dos clientes"
          icon={HomeIcon}
        />
        <Orders />
      </main>
    </Container>
  );
}
