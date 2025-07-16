import { Link } from "react-router-dom";

import logo from "../../assets/icons/logo.svg";

import HomeIcon from "../../assets/icons/home.svg";
import OrderIcon from "../../assets/icons/home.svg";
import MenuIcon from "../../assets/icons/home.svg";
import UsersIcon from "../../assets/icons/home.svg";
import ProfileIcon from "../../assets/icons/home.svg";
import LogoffIcon from "../../assets/icons/home.svg";
import { Container } from "./styles";

export function Sidebar() {

  const primaryLinks = [
    { to: "/", Icon: HomeIcon, alt: "Home", label: "Home" },
    { to: "/orders", Icon: OrderIcon, alt: "Histórico", label: "Histórico"},
    { to: "/menu", Icon: MenuIcon, alt: "Cardápio", label: "Cardápio" },
    { to: "/users", Icon: UsersIcon, alt: "Usuários", label: "Usuários" },
  ];

  const secondaryLinks = [
    { to: "/profile", Icon: ProfileIcon, alt: "Meu Perfil", label: "Meu Perfil" },
    { to: "/login", Icon: LogoffIcon, alt: "Sair", label: "Sair" },
  ];

  return (
    <Container>
      <div className="nav-content">
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="nav-body">
          {primaryLinks.map(({ to, Icon, alt, label }) => (
            <Link
              key={to}
              to={to}
            >
              <img src={Icon} className="w-6" aria-label={alt} alt={alt} />
              <span className="font-medium text-xs">{label}</span>
            </Link>
          ))}
        </div>
        <div className="nav-footer">
          {secondaryLinks.map(({ to, Icon, alt, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex flex-col w-14 justify-center items-center gap-2 ${
                location.pathname === to
                  ? "text-purple-normal"
                  : "text-gray-1 hover:text-purple-normal"
              }`}
            >
              <img src={Icon} className="w-6" aria-label={alt} alt={alt} />
              <span className="font-medium text-xs">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
