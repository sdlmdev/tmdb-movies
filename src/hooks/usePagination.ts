import { useMemo } from 'react';

const usePagination = (pageCount: number) => {
  const buttonCount = useMemo(() => {
    const pages = [];

    for (let i = 0; i < pageCount; i += 1) {
      pages.push(i + 1);
    }

    return pages;
  }, [pageCount]);

  return buttonCount;
};

export default usePagination;
