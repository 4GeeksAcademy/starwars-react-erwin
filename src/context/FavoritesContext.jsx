import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (person) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.uid === person.uid)
        ? prev.filter((fav) => fav.uid !== person.uid)
        : [...prev, person]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
