import React from 'react'

const AuthContext = React.createContext({authenticated: false, loggedInUser: null, setSignedInUser: () => {}})

export default AuthContext;
