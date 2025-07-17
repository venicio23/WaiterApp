import { Link } from "react-router-dom";

import { Container } from "./styles";

import logo from "../../assets/icons/logo.svg";
import HomeIcon from "../../assets/icons/home_side.svg";
import OrderIcon from "../../assets/icons/order.svg";
import MenuIcon from "../../assets/icons/menu.svg";
import UsersIcon from "../../assets/icons/users.svg";
import ProfileIcon from "../../assets/icons/profile.svg";
import LogoffIcon from "../../assets/icons/log-off.svg";

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
              className={`${
                location.pathname === to
                  ? "text-active"
                  : "hover:text-active"
              }`}
            >
              <img src={Icon} aria-label={alt} alt={alt} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
        <div className="nav-footer">
          {secondaryLinks.map(({ to, Icon, alt, label }) => (
            <Link
              key={to}
              to={to}
              className={`${
                location.pathname === to
                  ? "text-active"
                  : "hover:text-active"
              }`}
            >
              <img src={Icon} aria-label={alt} alt={alt} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
