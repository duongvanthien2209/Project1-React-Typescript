export interface Product {
  _id: string;
  name: string;
  status: {
    new: boolean;
    hot: boolean;
  };
  sale: number;
  des: string;
  shortDes: string;
  imgs: string[];
  price: number;
  rate: number;
  total: number;
  unit: string;
  categoryId: string;
  tagId: string;
  dateCreate: string;
}
