import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  text: string;
}

const Header: FC<HeaderProps> = ({ text }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/', { replace: true });
  };

  return (
    <header className="header">
      <Link
        to="/"
        title="На главную"
        className="header__link"
        onClick={handleClick}
      >
        {text}
      </Link>
    </header>
  );
};

export default Header;
