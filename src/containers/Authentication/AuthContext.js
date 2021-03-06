import React from 'react'

const AuthContext = React.createContext({authenticated: false, loggedInUser: null, setUser: () => {}})

export default AuthContext;
