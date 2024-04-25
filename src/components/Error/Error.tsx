import { FC } from 'react';
import './Error.css';
import Title from '../Title/Title';

interface ErrorProps {
  text?: string;
  titleLvl?: string;
}

const Error: FC<ErrorProps> = ({
  text = 'Ошибка загрузки данных',
  titleLvl = '1',
}) => {
  return (
    <div className="error">
      <Title text={text} titleLvl={titleLvl} />
    </div>
  );
};

export default Error;
