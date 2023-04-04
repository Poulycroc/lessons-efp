import React, { useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ApiContext = React.createContext({});

export function useApi() {
  return useContext(ApiContext);
}

export function ApiProvider({ children }) {
  const { getCurrentUserToken } = useAuth();

  const axiosConfig = {
    baseURL: import.meta.env.VITE_API_URL + '/api/',
  };
  const api = axios.create(axiosConfig);
  // const api = axios.create();

  api.interceptors.request.use(async (config) => {
    if (config.url !== '/users/login') {
      const token = await getCurrentUserToken();
      if (config?.headers && token) {
        config.headers.Authorization = `${token}`;
      }
    }

    return config;
  });

  const value = { api };

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
}

