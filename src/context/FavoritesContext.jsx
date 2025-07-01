import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (item) => {
    setFavorites((prev) => (prev.find(fav => fav.uid === item.uid) ? prev : [...prev, item]));
  };

  const removeFavorite = (uid) => {
    setFavorites((prev) => prev.filter((fav) => fav.uid !== uid));
  };

  const toggleFavorite = (item) => {
    if (favorites.find(fav => fav.uid === item.uid)) {
      removeFavorite(item.uid);
    } else {
      addFavorite(item);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};


