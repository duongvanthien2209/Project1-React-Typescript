import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faAngleUp,
  faAngleDown,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  cartActions,
  CartItem,
  CartPayload,
  getProducts,
  getTotal,
} from '../cartSlice';

export function CartPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const total = useAppSelector(getTotal);

  const handleChangeQuantity = (id: string, quantity: number) => {
    if (id && quantity >= 1) {
      const cartPayload: CartPayload = { _id: id, quantity };
      dispatch(cartActions.changeQuantity(cartPayload));
    }
  };
  const handleRemoveProduct = (id: string) => {
    if (id) dispatch(cartActions.removeProduct(id));
  };

  return (
    <div className="w-4/5 mx-auto">
      <div className="mb-3">
        <h2 className="text-3xl font-bold">Your Cart</h2>
        <p className="font-semibold text-gray-400">
          There are <span className="text-green-400">{products.length}</span>{' '}
          products in your cart
        </p>
      </div>
      <div className="flex justify-between">
        <table className="grow mr-4 border-collapse">
          <thead>
            <tr className="border">
              <th
                className="font-medium p-3 text-left bg-slate-200 rounded-tl-2xl rounded-bl-2xl"
                colSpan={2}
              >
                Product
              </th>
              <th className="font-medium py-3 text-left bg-slate-200">
                Unit Price
              </th>
              <th className="font-medium py-3 text-left bg-slate-200">
                Quantity
              </th>
              <th className="font-medium py-3 text-left bg-slate-200">
                Subtotal
              </th>
              <th className="font-medium py-3 text-left bg-slate-200 rounded-tr-2xl rounded-br-2xl">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((item: CartItem) => (
              <tr className="border">
                <td className="w-[6.5rem]">
                  <img
                    className="block m-3 w-20 border rounded-lg overflow-hidden"
                    src={item.product.imgs[0]}
                    alt=""
                  />
                </td>
                <td>
                  <p className="font-medium">{item.product.name}</p>
                </td>
                <td>
                  <p className="text-lg font-medium text-gray-500">{`${item.product.price} Đ`}</p>
                </td>
                <td className="w-24">
                  <div className="flex border border-green-500 rounded mr-2">
                    <span className="grow flex justify-end items-center font-medium text-green-500">
                      {item.quantity}
                    </span>
                    <div className="flex flex-col ml-2">
                      <button
                        className="h-5 w-5"
                        onClick={() =>
                          handleChangeQuantity(
                            item.product._id,
                            item.quantity + 1
                          )
                        }
                      >
                        <FontAwesomeIcon className="fa-sm" icon={faAngleUp} />
                      </button>
                      <button
                        className="h-5 w-5"
                        onClick={() => {
                          if (item.quantity === 1)
                            handleRemoveProduct(item.product._id);
                          else
                            handleChangeQuantity(
                              item.product._id,
                              item.quantity - 1
                            );
                        }}
                      >
                        <FontAwesomeIcon className="fa-sm" icon={faAngleDown} />
                      </button>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="text-lg font-medium text-green-500">
                    {`${item.product.price * item.quantity} Đ`}
                  </p>
                </td>
                <td>
                  <button onClick={() => handleRemoveProduct(item.product._id)}>
                    <FontAwesomeIcon className="fa-lg" icon={faTrashCan} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col w-1/4 p-4 border rounded-md shadow">
          <ul className="border">
            <li className="flex justify-between items-center border-b px-2 py-3">
              <span className="flex flex-col text-sm font-medium text-gray-400">
                Subtotal
              </span>
              <span className="text-lg font-medium text-green-500">{`${total} Đ`}</span>
            </li>
            <li className="flex justify-between items-center border-b px-2 py-3">
              <span className="text-sm font-medium text-gray-400">
                Shipping
              </span>
              <span className="text-lg font-medium">Free</span>
            </li>
            <li className="flex justify-between items-center px-2 py-3">
              <span className="text-sm font-medium text-gray-400">Total</span>
              <span className="text-lg font-medium text-green-500">{`${total} Đ`}</span>
            </li>
          </ul>
          <button className="py-2 mt-2 bg-green-600 text-white rounded">
            <span className="mr-1">Proceed To Checkout</span>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </button>
        </div>
      </div>
    </div>
  );
}
