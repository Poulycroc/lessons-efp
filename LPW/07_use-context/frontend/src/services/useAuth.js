import { useState, useContext } from "react";

const useAuth = () => {
  const [token, setToken] = useState(null);

  const login = async (username, password) => {
    // Remplacez cette URL par l'URL de votre API d'authentification
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setToken(data.token);
    } else {
      throw new Error("Échec de l'authentification");
    }
  };

  return {
    token,
    setToken,
    login,
  };
};

export default useAuth;
