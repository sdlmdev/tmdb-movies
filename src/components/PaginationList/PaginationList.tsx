import { useState, useEffect, FC } from 'react';
import './PaginationList.css';
import usePagination from '../../hooks/usePagination';
import { NUMBER_OF_PAGES_DISPLAYED } from '../../constants/constants';

interface PaginationListProps {
  pageCount: number;
  onPageClick: (page: number) => void;
  currentPage: number;
}

const PaginationList: FC<PaginationListProps> = ({
  pageCount,
  onPageClick,
  currentPage,
}) => {
  const pagesNumArray = usePagination(pageCount);

  const getPagesArrMatrix = (arr: number[], arrSize: number) => {
    const res = [];

    for (let i = 0; i < Math.ceil(arr.length / arrSize); i += 1) {
      res[i] = arr.slice(i * arrSize, i * arrSize + arrSize);
    }

    return res;
  };

  const pagesArrMatrix =
    getPagesArrMatrix(pagesNumArray, NUMBER_OF_PAGES_DISPLAYED) || [];

  const [currentArrIndex, setCerrentArrIndex] = useState(0);

  const switchNextPage = () => {
    setCerrentArrIndex(currentArrIndex + 1);
  };

  const switchPrevPage = () => {
    setCerrentArrIndex(currentArrIndex - 1);
  };

  const getDisabledPrevSwitch = (curArrIndex: number) =>
    curArrIndex === 0 ? 'disabled-switch' : '';

  const getDisabledNextSwitch = (curArrIndex: number) =>
    curArrIndex === pagesArrMatrix.length - 1 ? 'disabled-switch' : '';

  useEffect(() => {
    if (currentPage === 1) {
      setCerrentArrIndex(0);
    }
  }, [pageCount]);

  return (
    <div className="pagination-list">
      <button
        className={`pagination-list__previous${` ${getDisabledPrevSwitch(currentArrIndex)}`}`}
        onClick={() => switchPrevPage()}
        disabled={getDisabledPrevSwitch(currentArrIndex).length > 0}
      />
      <ul className="pagination-list__container">
        {pagesArrMatrix[currentArrIndex] &&
          pagesArrMatrix[currentArrIndex].map((i) => (
            <li key={i}>
              <button
                className={`pagination-list__page-number${
                  currentPage === i
                    ? ' pagination-list__page-number_active'
                    : ''
                }`}
                onClick={() => onPageClick(i)}
              >
                {i}
              </button>
            </li>
          ))}
      </ul>
      <button
        className={`pagination-list__next${` ${getDisabledNextSwitch(currentArrIndex)}`}`}
        onClick={() => switchNextPage()}
        disabled={getDisabledNextSwitch(currentArrIndex).length > 0}
      />
    </div>
  );
};

export default PaginationList;
