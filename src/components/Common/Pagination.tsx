import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  filterActions,
  FilterPayload,
  getCurrentCategoryId,
} from 'features/filter/filterSlice';
import { getSearch } from 'connected-react-router';

export interface IPaginationProps {
  total: number;
  page: number;
  limit: number;
}

export function Pagination({ total, page, limit }: IPaginationProps) {
  const dispatch = useAppDispatch();
  const categoryId = useAppSelector(getCurrentCategoryId);
  const search = useAppSelector(getSearch);

  const arr = React.useMemo<number[]>(() => {
    const n = Math.ceil(total / limit);
    const resultArr: number[] = [];
    for (let i = 1; i <= n; i++) resultArr.push(i);
    return resultArr;
  }, [total, limit]);

  const handleChangePage = (index: number) => {
    if (1 <= index && index <= arr.length) {
      const filterData: FilterPayload = { _page: index };
      if (categoryId) filterData.categoryId = categoryId;
      if (search) filterData.q = search;
      dispatch(filterActions.changePage(filterData));
    }
  };

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between sm:px-6">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{page}</span> to{' '}
            <span className="font-medium">{arr.length}</span> of{' '}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={(e) => {
                e.preventDefault();
                handleChangePage(page - 1);
              }}
            >
              <span className="sr-only">Previous</span>
              <FontAwesomeIcon icon={faChevronLeft} />
            </a>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {arr.map((index) => (
              <a
                href="#"
                aria-current="page"
                className={`${
                  index === page
                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                onClick={(e) => {
                  e.preventDefault();
                  handleChangePage(index);
                }}
              >
                {index}
              </a>
            ))}
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={(e) => {
                e.preventDefault();
                handleChangePage(page + 1);
              }}
            >
              <span className="sr-only">Next</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
