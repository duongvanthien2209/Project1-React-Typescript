import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { cartActions, CartItem, getProducts, getTotal } from '../cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export interface ICartDialogProps {}

export function CartDialog(props: ICartDialogProps) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(getProducts);
  const total = useAppSelector(getTotal);

  const handleRemoveButton = (id: string) => {
    if (id) dispatch(cartActions.removeProduct(id));
  };

  return (
    <div className="absolute min-w-[15rem] p-4 bg-white top-full right-0 border rounded-md shadow opacity-0 invisible group-hover:opacity-100 group-hover:visible">
      <ul>
        {cartItems.map((item: CartItem) => (
          <li className="flex items-start mb-3">
            <img className="w-14" src={item.product.imgs[0]} alt="" />
            <div className="grow ml-2">
              <p className="text-green-400">{item.product.name}</p>
              <span>{`${item.quantity} * ${item.product.price} Đ`}</span>
            </div>
            <button onClick={() => handleRemoveButton(item.product._id)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between py-4 border-t">
        <span className="font-medium text-gray-400">Total</span>
        <span className="font-medium text-green-400">{total} Đ</span>
      </div>
      <div className="flex justify-between">
        <Link
          to="/cart"
          className="px-3 py-2 border rounded border-green-600 text-sm text-green-600 hover:bg-yellow-400 hover:text-white transition-all duration-200"
        >
          View cart
        </Link>
        <a
          href="#"
          className="px-3 py-2 border rounded bg-green-600 text-sm text-white border-green-600 hover:bg-yellow-400 transition-all duration-200"
        >
          Checkout
        </a>
      </div>
    </div>
  );
}
