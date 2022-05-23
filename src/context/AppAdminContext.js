import React, { createContext, useContext, useState, useEffect } from 'react'

const AdminAppContext = createContext();

const AdminAppProvider = ({ children }) => {
  const [codes, setCodes] = useState([]);
  const value = {
    message: 'hello app...'
  };

  return <AdminAppContext.Provider value={ value }>
    { children }
  </AdminAppContext.Provider>
}

const useAdminApp = () => {
  return useContext(AdminAppContext)
}

export { AdminAppProvider, useAdminApp };