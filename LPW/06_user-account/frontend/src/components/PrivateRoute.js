import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log({ TOKEN: localStorage.getItem('token') })
    const checkToken = async () => {
      try {
        const response = await axios.get('http://localhost:8080/protected', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.status === 200) {
          setAuthenticated(true);
        }
      } catch (err) {
        console.error(err);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return authenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute
