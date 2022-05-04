import { useAppDispatch } from 'app/hooks';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { authActions, LoginPayload } from 'features/auth/authSlice';

export interface ILoginPageProps {}

export function LoginPage(props: ILoginPageProps) {
  const dispatch = useAppDispatch();

  const initialValues: LoginPayload = {
    phoneNumber: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string().required('This field is required'),
    password: Yup.string().required('This field is required'),
  });

  const handleSubmit = (values: LoginPayload | undefined) => {
    if (values) dispatch(authActions.login(values));
  };

  return (
    <div className="py-32">
      <div className="flex w-3/5 mx-auto">
        <img
          className="w-[calc(50%-1rem)] overflow-hidden rounded-xl"
          src="http://wp.alithemes.com/html/nest/demo/assets/imgs/page/login-1.png"
          alt=""
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => {
            const { values, errors, touched, isSubmitting } = formikProps;
            return (
              <Form className="w-[calc(50%-1rem)] ml-8">
                <h3 className="text-4xl font-bold">Login</h3>
                <span>
                  Don't have an account?&nbsp;
                  <Link
                    className="text-green-400 hover:text-orange-400"
                    to="/register"
                  >
                    Create here
                  </Link>
                </span>
                <div className="mb-3 mt-5">
                  <Field
                    className="block p-3 outline-none border rounded-md w-full"
                    name="phoneNumber"
                    placeholder="Phone number..."
                  />
                  <ErrorMessage
                    component="span"
                    className="text-[0.7rem] text-red-400"
                    name="phoneNumber"
                  />
                </div>
                <div className="mb-10">
                  <Field
                    className="block p-3 outline-none border rounded-md w-full"
                    name="password"
                    type="password"
                    placeholder="Password..."
                  />
                  <ErrorMessage
                    component="span"
                    className="text-[0.7rem] text-red-400"
                    name="password"
                  />
                </div>
                <button
                  className="py-3 w-28 bg-slate-800 text-white font-medium rounded-md transition-all duration-500 hover:bg-green-400 hover:-translate-y-2"
                  type="submit"
                >
                  Log in
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
