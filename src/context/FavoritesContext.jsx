import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (uid) => {
    setFavorites((prev) => (prev.includes(uid) ? prev : [...prev, uid]));
  };

  const removeFavorite = (uid) => {
    setFavorites((prev) => prev.filter((id) => id !== uid));
  };

  const toggleFavorite = (uid) => {
    if (favorites.includes(uid)) {
      removeFavorite(uid);
    } else {
      addFavorite(uid);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

