import { Sidebar } from "../../../components/Sidebar";
import { Header } from "../../../components/Header";
import { Orders } from "../../../components/Orders";

import { Container } from "./styles";

import HomeIcon from "../../../assets/icons/home.svg";
import RefreshIcon from "../../../assets/icons/refresh.svg";

export function Dashboard() {
  return (
    <Container>
      <Sidebar />
      <main className="body">
        <Header
          title="Home"
          subtitle="Acompanhe os pedidos dos clientes"
          icon={HomeIcon}
          rightAction={{
            text: "Reiniciar o dia",
            href: "#",
            icon: RefreshIcon,
          }}
        />
        <Orders />
      </main>
    </Container>
  );
}
