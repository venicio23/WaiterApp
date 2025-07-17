import { Container } from './styles';

interface RightAction {
  text?: string;
  href?: string;
  icon?: string;
  onClick?: () => void;
}

interface HeaderProps {
  title?: string;
  subtitle?: string;
  icon?: string;
  rightAction?: RightAction;
}

export function Header({ title, subtitle, icon, rightAction }: HeaderProps) {
  return (
    <Container>
      <div className="header-content">
        <div className="header-title">
          {icon && <img className="icon" src={icon} alt={title} />}
          <span className="header-title-text">{title}</span>
        </div>
        <span className="header-subtitle">{subtitle}</span>
      </div>
      {rightAction && (
        <div className="right-action">
          <a
            href={rightAction.href}
            onClick={rightAction.onClick}
          >
            {rightAction.icon && <img src={rightAction.icon} alt={rightAction.text} />}
            {rightAction.text}
          </a>
        </div>
      )}
    </Container>
  );
}
