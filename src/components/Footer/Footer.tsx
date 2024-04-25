import { FC } from 'react';
import './Footer.css';

interface FooterProps {
  text: string;
}

const Footer: FC<FooterProps> = ({ text }) => {
  return (
    <footer className="footer">
      <p className="footer__caption">{text}</p>
    </footer>
  );
};

export default Footer;
