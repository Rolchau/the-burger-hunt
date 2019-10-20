import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class DummySignIn extends Component {
  render() {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          let errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <div className="w-full max-w-lg mx-auto">
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="username" name="username" />
                <ErrorMessage className="text-red-500 text-xs italic" name="username" component="div" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" />
                <ErrorMessage className="text-red-500 text-xs italic" name="password" component="div" />
              </div>
              <button className={(isSubmitting ? 'cursor-not-allowed opacity-50 ' : '') + 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'} type="submit" disabled={isSubmitting}>
                Sign in
              </button>
            </Form>
          </div>
        )}
      </Formik>
    )
  }
}

export default DummySignIn
