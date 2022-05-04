import { useAppDispatch } from 'app/hooks';
import * as React from 'react';
import { authActions, RegisterPayload } from '../authSlice';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';

export interface IRegisterPageProps {}

export function RegisterPage(props: IRegisterPageProps) {
  const dispatch = useAppDispatch();

  const initialValues: RegisterPayload = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('This field is required'),
    lastName: Yup.string().required('This field is required'),
    phoneNumber: Yup.string().required('This field is required'),
    password: Yup.string().required('This field is required'),
  });

  const handleSubmit = (values: RegisterPayload | undefined) => {
    if (values) {
      dispatch(authActions.register(values));
    }
  };

  return (
    <div className="py-32">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => {
          const { values, errors, touched, isSubmitting } = formikProps;
          return (
            <Form className="w-1/3 mx-auto">
              <h3 className="text-4xl font-bold">Create an Account</h3>
              <span>
                Already have an account?&nbsp;
                <Link
                  className="text-green-400 hover:text-orange-400"
                  to="/login"
                >
                  Login
                </Link>
              </span>
              <div className="mb-3 mt-5">
                <Field
                  className="block p-3 outline-none border rounded-md w-full"
                  name="firstName"
                  placeholder="FirstName"
                />
                <ErrorMessage
                  component="span"
                  className="text-[0.7rem] text-red-400"
                  name="firstName"
                />
              </div>
              <div className="mb-3">
                <Field
                  className="block p-3 outline-none border rounded-md w-full"
                  name="lastName"
                  placeholder="LastName"
                />
                <ErrorMessage
                  component="span"
                  className="text-[0.7rem] text-red-400"
                  name="lastName"
                />
              </div>
              <div className="mb-3">
                <Field
                  className="block p-3 outline-none border rounded-md w-full"
                  name="phoneNumber"
                  placeholder="Phone number"
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
                  placeholder="Password"
                />
                <ErrorMessage
                  component="span"
                  className="text-[0.7rem] text-red-400"
                  name="password"
                />
              </div>
              <button
                className="py-3 w-40 text-white font-medium rounded-md transition-all duration-500 bg-green-400 hover:bg-green-500 hover:-translate-y-2"
                type="submit"
              >
                Submit & Register
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
