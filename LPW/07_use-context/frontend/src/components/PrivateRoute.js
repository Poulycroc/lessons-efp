import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./../contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [isLoading, setLoading] = useState(true);
  const { token, setToken } = useContext(AuthContext);

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          const response = await fetch("http://localhost:8080/protected", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.status !== 200) {
            setToken(null);
          }
        } catch (err) {
          console.error(err);
          setToken(null);
        }
      }

      setLoading(false);
    };

    checkToken();
  }, [token, setToken]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  // Si authentifié, retournez un Outlet qui affichera les éléments enfants
  // Sinon, retournez un élément qui naviguera vers la page de connexion
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
