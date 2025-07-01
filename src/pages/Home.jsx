import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const ScrollSection = ({ title, items, type, favorites, toggleFavorite }) => (
  <div className="mb-5">
    <h2 className="text-warning mb-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>{title}</h2>
    <div
      style={{
        overflowX: "auto",
        whiteSpace: "nowrap",
        paddingBottom: "10px",
      }}
    >
      {items.map((item) => (
        <div
          key={item.uid}
          className="d-inline-block me-3"
          style={{ width: "280px" }}
        >
          <div className="card h-100 bg-dark text-light border-warning shadow-lg">
            <img
              src={`https://starwars-visualguide.com/assets/img/${type}/${item.uid}.jpg`}
              className="card-img-top"
              alt={item.name}
              style={{ height: "180px", objectFit: "cover" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/280x180?text=No+Image";
              }}
            />
            <div className="card-body d-flex flex-column justify-content-between">
              <h5
                className="card-title"
                style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: "bold" }}
              >
                {item.name}
              </h5>

              <ul className="list-unstyled small">
                {type === "characters" && (
                  <>
                    <li>Género: {item.gender}</li>
                    <li>Color de pelo: {item.hair_color}</li>
                    <li>Color de ojos: {item.eye_color}</li>
                  </>
                )}
                {type === "planets" && (
                  <>
                    <li>Clima: {item.climate}</li>
                    <li>Terreno: {item.terrain}</li>
                    <li>Población: {item.population}</li>
                  </>
                )}
                {type === "starships" && (
                  <>
                    <li>Modelo: {item.model}</li>
                    <li>Fabricante: {item.manufacturer}</li>
                    <li>Pasajeros: {item.passengers}</li>
                  </>
                )}
              </ul>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <Link to={`/${type}/${item.uid}`} className="btn btn-warning btn-sm fw-bold">
                  Ver detalle
                </Link>
                <FontAwesomeIcon
                  icon={solidHeart}
                  style={{
                    cursor: "pointer",
                    color: favorites.some(fav => fav.uid === item.uid && fav.type === type) ? "#f44336" : "grey",
                  }}
                  onClick={() => toggleFavorite({ uid: item.uid, type })}
                  title={favorites.some(fav => fav.uid === item.uid && fav.type === type) ? "Eliminar de favoritos" : "Agregar a favoritos"}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      fetch("https://www.swapi.tech/api/people?page=1&limit=10").then((res) =>
        res.ok ? res.json() : Promise.reject("Error cargando personajes")
      ),
      fetch("https://www.swapi.tech/api/planets?page=1&limit=10").then((res) =>
        res.ok ? res.json() : Promise.reject("Error cargando planetas")
      ),
      fetch("https://www.swapi.tech/api/starships?page=1&limit=10").then((res) =>
        res.ok ? res.json() : Promise.reject("Error cargando naves")
      ),
    ])
      .then(([charsData, planetsData, starshipsData]) => {
        const chars = charsData.results.map(i => ({ ...i, type: "characters" }));
        const planets = planetsData.results.map(i => ({ ...i, type: "planets" }));
        const starships = starshipsData.results.map(i => ({ ...i, type: "starships" }));

        setCharacters(chars);
        setPlanets(planets);
        setStarships(starships);

        // Guardamos en entities con key tipo-type-uid
        const newEntities = {};
        chars.forEach(item => newEntities[`${item.type}-${item.uid}`] = item);
        planets.forEach(item => newEntities[`${item.type}-${item.uid}`] = item);
        starships.forEach(item => newEntities[`${item.type}-${item.uid}`] = item);

        dispatch({ type: "SET_ENTITIES", payload: newEntities });
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const toggleFavorite = (item) => {
    if (store.favorites.some(fav => fav.uid === item.uid && fav.type === item.type)) {
      dispatch({ type: "REMOVE_FAVORITE", payload: item });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: item });
    }
  };

  if (loading)
    return (
      <p className="text-center mt-5 text-warning" style={{ fontFamily: "'Orbitron', sans-serif" }}>
        Cargando datos...
      </p>
    );
  if (error)
    return (
      <p className="text-center mt-5 text-danger" style={{ fontFamily: "'Orbitron', sans-serif" }}>
        Error: {error}
      </p>
    );

  return (
    <div className="container mt-5">
      <h1
        className="text-center mb-4 text-warning"
        style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.15em" }}
      >
        STAR WARS API - Personajes, Planetas y Naves
      </h1>

      <ScrollSection
        title="Personajes"
        items={characters}
        type="characters"
        favorites={store.favorites}
        toggleFavorite={toggleFavorite}
      />
      <ScrollSection
        title="Planetas"
        items={planets}
        type="planets"
        favorites={store.favorites}
        toggleFavorite={toggleFavorite}
      />
      <ScrollSection
        title="Naves Espaciales"
        items={starships}
        type="starships"
        favorites={store.favorites}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};









