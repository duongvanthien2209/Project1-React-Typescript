import { InputField } from 'customFields';
import { ErrorMessage, FastField, Field, Form, Formik } from 'formik';
import * as React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faCartShopping,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { CategoryList } from 'features/auth/components';
import { Category, Response } from 'models';
import { categoryApi } from 'api/user/category';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  filterActions,
  FilterPayload,
  getCurrentCategoryId,
} from 'features/filter/filterSlice';
import { CartDialog } from 'features/cart/components';
import { getProducts } from 'features/cart/cartSlice';
import { getIsLoggedIn, authActions } from 'features/auth/authSlice';

export interface ResponseCategories {
  categories: Category[];
  total: number;
}

interface initialValuesType {
  search: string;
}

interface HeaderProps {}

export function Header(props: HeaderProps) {
  const [listCategory, setListCategory] = React.useState<Category[]>([]);
  const categoryId = useAppSelector(getCurrentCategoryId);
  const products = useAppSelector(getProducts);
  const isLoggedIn = useAppSelector(getIsLoggedIn);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    fetchCategoryList();
  }, []);

  const fetchCategoryList = async () => {
    try {
      const { status, data, error }: any = await categoryApi.getAllApi();

      if (status === 'success' && data && data.categories) {
        setListCategory(data.categories);
      }

      if (status === 'failed' && error && error.message) {
        throw Error(error.message);
      }
    } catch (error: any) {
      if (error.message) toast.error(error.message);
    }
  };

  const handleSubmit = (values: initialValuesType) => {
    if (values && values.search) {
      const filterData: FilterPayload = { q: values.search };
      if (categoryId) filterData.categoryId = categoryId;
      dispatch(filterActions.search(filterData));
    }
  };

  const handleSignOut = () => {
    dispatch(authActions.logout());
  };

  const initialValues: initialValuesType = {
    search: '',
  };

  const validationSchema = Yup.object().shape({
    search: Yup.string().required('This field is required'),
  });

  return (
    <header>
      <div className="py-5 border-b">
        <div className="flex items-center w-4/5 mx-auto">
          <Link to="/home">
            <img
              className="w-40"
              src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/logo.svg"
              alt="brand"
            />
          </Link>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => {
              const { values, errors, touched, isSubmitting } = formikProps;

              return (
                <Form className="relative flex border border-[#BCE3C9] rounded-md p-4 ml-8 mr-auto">
                  <CategoryList list={listCategory} />
                  <div className="relative border-l pl-3">
                    <Field
                      className="outline-none w-64"
                      id="search"
                      name="search"
                      placeholder="Search for items..."
                    />
                    <label htmlFor="search">
                      <FontAwesomeIcon
                        className="fa-lg text-gray-400"
                        icon={faMagnifyingGlass}
                      />
                    </label>
                    <ErrorMessage
                      component="span"
                      className="absolute top-full left-0 text-[0.7rem] text-red-400"
                      name="search"
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
          <ul className="flex">
            <li className="relative flex items-end mr-5 group">
              <span className="relative mr-1">
                <FontAwesomeIcon className="fa-lg" icon={faCartShopping} />
                <span className="absolute flex justify-center items-center text-white text-sm top-[-5px] right-[-5px] h-4 w-4 rounded-full bg-green-600">
                  {products.length}
                </span>
              </span>
              <span className="mb-[-3px]">Cart</span>
              <CartDialog />
            </li>
            <li
              className={`${
                !isLoggedIn ? 'hidden ' : ''
              }relative flex items-end group after:content-[''] after:absolute after:left-0 after:top-full after:w-40 after:h-4`}
            >
              <span className="mr-1">
                <FontAwesomeIcon className="fa-lg" icon={faUser} />
              </span>
              <span className="mb-[-3px]">Account</span>
              <ul className="absolute left-0 top-[calc(100%+1rem)] w-40 border rounded-md p-4 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                <li className="py-2 hover:text-green-400">
                  <Link to="/myAccount">
                    <FontAwesomeIcon className="fa-sm mr-3" icon={faUser} />
                    <span className="text-sm">My Account</span>
                  </Link>
                </li>
                <li
                  onClick={handleSignOut}
                  className="py-2 cursor-pointer hover:text-green-400"
                >
                  <FontAwesomeIcon
                    className="fa-sm mr-3"
                    icon={faArrowRightFromBracket}
                  />
                  <span className="text-sm">Sign out</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div></div>
    </header>
  );
}
