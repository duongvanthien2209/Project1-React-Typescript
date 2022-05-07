import { Product } from 'models';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from 'app/hooks';
import { cartActions, CartItem } from 'features/cart/cartSlice';

export interface IProductItemProps {
  item: Product;
}

export function ProductItem({ item }: IProductItemProps) {
  const dispatch = useAppDispatch();

  const handleClickItem = (product: Product) => {
    if (product) {
      const cartItem: CartItem = { product, quantity: 1 };
      dispatch(cartActions.addProduct(cartItem));
    }
  };

  return (
    <div className="flex flex-col p-4 border rounded-md">
      <img src={item.imgs[0]} alt="" />
      <h3 className="my-2 font-medium">{item.name}</h3>
      <p className="line-clamp-3">{item.shortDes}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="font-medium text-base text-green-700">
          {item.price} Đ
        </span>
        <button
          onClick={() => handleClickItem(item)}
          className="px-4 py-2 bg-green-200 rounded-md text-green-700 transition-all duration-300 hover:text-white hover:translate-y-[-0.25rem] hover:bg-green-700"
        >
          <span>
            <FontAwesomeIcon className="fa-sm mr-1" icon={faCartShopping} />
          </span>
          Add
        </button>
      </div>
    </div>
  );
}
