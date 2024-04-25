import { FC, createElement } from 'react';
import './Title.css';

interface TitleProps {
  text: string;
  titleLvl: string;
}

const Title: FC<TitleProps> = ({ text, titleLvl = 1 }) => {
  const Tag = 'h' + titleLvl;
  return createElement(Tag, { className: `title_type_${titleLvl}` }, text);
};

export default Title;
