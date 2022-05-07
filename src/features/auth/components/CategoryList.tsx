import { Category } from 'models';
import * as React from 'react';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from 'app/hooks';
import { filterActions } from 'features/filter/filterSlice';

export interface ICategoryListProps {
  list: Category[];
}

export function CategoryList({ list }: ICategoryListProps) {
  const dispatch = useAppDispatch();
  const [currentId, setcurrentId] = React.useState<string | null>(null);

  const handleItemSelected = (id: string) => {
    if (id) {
      dispatch(filterActions.changeCategory(id));
      setcurrentId(id);
    }
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
        {list.map((item) => (
          <li
            key={item._id}
            className={`cursor-pointer py-2 pl-1 hover:bg-gray-200${
              currentId === item._id ? ' bg-green-600' : ''
            }`}
            onClick={() => handleItemSelected(item._id)}
          >
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
