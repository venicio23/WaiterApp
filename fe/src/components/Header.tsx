import Logo from '../assets/images/logo.svg';

export function Header() {
  return (
    <header>
      <div className="page-details">
        <h1>Pedidos</h1>
        <h2>Acompanhe o pedido dos clientes</h2>
      </div>
      <div>
        <img src={Logo} alt="Logo" />
      </div>
    </header>
  );
}
