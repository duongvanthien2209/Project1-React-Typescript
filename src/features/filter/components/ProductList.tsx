import { ProductItem } from 'components/Common';
import { Product } from 'models';
import * as React from 'react';

export interface IProductListProps {
  list: Product[];
}

export function ProductList({ list }: IProductListProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold">Products</h2>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {list.map((item) => (
          <ProductItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
