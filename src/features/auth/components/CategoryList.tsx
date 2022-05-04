import { Category } from 'models';
import * as React from 'react';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ICategoryListProps {
  list: Category[];
}

export function CategoryList({ list }: ICategoryListProps) {
  const [currentIndex, setcurrentIndex] = React.useState(-1);

  const handleItemSelected = (index: number) => {
    if (index >= 0) setcurrentIndex(index);
  };

  return (
    <div className="group after:content-[''] after:absolute after:left-0 after:top-[100%-1rem] after:w-40 after:h-4">
      <div className="cursor-pointer">
        <span>All Categories</span>
        <span className="mx-3">
          <FontAwesomeIcon className="fa-sm text-gray-400" icon={faAngleDown} />
        </span>
      </div>
      <ul className="absolute top-full left-0 bg-white w-44 p-4 border rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible">
        {list.map((item, index) => (
          <li
            className={`cursor-pointer py-2 pl-1 hover:bg-gray-200${
              currentIndex === index ? ' bg-green-600' : ''
            }`}
            onClick={() => handleItemSelected(index)}
          >
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
