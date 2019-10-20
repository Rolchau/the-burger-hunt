import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { instance as axios, endpoints } from '../../../axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class DummySignUp extends Component {

  /* A dummy signup */

  state = {
    isCreated: false
  }

  render() {
      return (
      <div className="fade-in w-full max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {!this.state.isCreated && 
          <Formik
            initialValues={{ username: '', email: '', password: '' }}
            validate={values => {
              let errors = {};
              if (!values.username) {
                errors.username = 'Required';
              }
              if (!values.password) {
                errors.password = 'Required';
              }
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
                axios.post(endpoints.users, values).then(() =>{
                    setSubmitting(false);
                    this.setState({isCreated: true});
                  }
                )
              }, 500);
            }}
          >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Username
                </label>
                <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="username" />
                <ErrorMessage className="text-red-500 text-xs italic" name="username" component="div" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" />
                <ErrorMessage className="text-red-500 text-xs italic" name="email" component="div" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <Field className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" />
                <ErrorMessage className="text-red-500 text-xs italic" name="password" component="div" />
              </div>
              <button className={(isSubmitting ? 'cursor-not-allowed opacity-50 ' : '') + 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'} type="submit" disabled={isSubmitting}>
                Sign up
              </button>
            </Form>
          )}
        </Formik>
      }
      { this.state.isCreated &&
        <div className="fade-in">
          <h1 className="text-2xl text-gray-700 mb-5">Thanks! Now sign in to hunt some burgers!</h1>
          <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" to='/signin'>Sign in here</Link>
        </div>
      }
    </div>
    )
  }
}

export default DummySignUp