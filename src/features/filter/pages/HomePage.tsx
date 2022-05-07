import { useAppSelector } from 'app/hooks';
import { Pagination } from 'components/Common';
import * as React from 'react';
import { ProductList } from '../components';
import { getCurrentPage, getProducts, getTotal } from '../filterSlice';

export function HomePage() {
  const products = useAppSelector(getProducts);
  const page = useAppSelector(getCurrentPage);
  const total = useAppSelector(getTotal);
  const limit = 12;

  console.log(page, limit);

  return (
    <div className="w-4/5 mx-auto">
      <ProductList list={products} />
      <Pagination total={total} page={page} limit={limit} />
    </div>
  );
}
