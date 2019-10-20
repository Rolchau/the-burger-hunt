import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { instance as axios, endpoints } from '../../../axios';
import AuthContext from '../AuthContext';

class DummySignIn extends Component {
  render() {
    return (
      <AuthContext.Consumer>
        {(context) => 
          <Formik
            initialValues={{ username: '', password: '' }}
            validate={values => {
              let errors = {};
              if (!values.username) {
                errors.username = 'Required';
              } 
              if (!values.password) {
                errors.password = 'Required';
              } 
              return errors;
            }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                // A validation like this shouldn't be handled in the frontend :)
                axios.get(endpoints.users+ '?username=' + values.username +'&password=' + values.password)
                  .then(response => {    
                      console.log(response.data);            
                      if (response.data.length) {
                        context.setUser(response.data[0]);
                        this.props.history.push('/home');
                      } else {
                        console.log('failed...');
                        //TODO TRM - Error message doesn't show...
                        actions.setFieldError('login-error', 'Wrong user or password');
                      }
                      actions.setSubmitting(false);
                      });
              }, 500);
            }}
          >
            {({ isSubmitting }) => (
              <div className="w-full max-w-lg mx-auto fade-in">
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
                  <ErrorMessage className="text-red-500 text-xs italic" name="login-error" component="div" />

                  <div className="flex items-center justify-between">
                    <button className={(isSubmitting ? 'cursor-not-allowed opacity-50 ' : '') + 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'} type="submit" disabled={isSubmitting}>
                      Sign in
                    </button>
                    <Link to="/signup" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                      New hunter? Sign up here!
                    </Link>
                  </div> 
                </Form>
              </div>
            )}
          </Formik>
        }
      </AuthContext.Consumer>
    )
  }
}

export default DummySignIn
