import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    fetch("https://www.swapi.tech/api/people?page=1&limit=10")
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta de la API");
        return res.json();
      })
      .then((data) => {
        setPeople(data.results);

        // Guardar personajes en entities para usar en favoritos
        const entitiesPayload = data.results.reduce((acc, person) => {
          acc[person.uid] = person;
          return acc;
        }, {});
        dispatch({ type: "SET_ENTITIES", payload: entitiesPayload });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const toggleFavorite = (uid) => {
    if (store.favorites.includes(uid)) {
      dispatch({ type: "REMOVE_FAVORITE", payload: uid });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: uid });
    }
  };

  if (loading) return <p className="text-center mt-5">Cargando personajes...</p>;
  if (error) return <p className="text-center mt-5 text-danger">Error: {error}</p>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Personajes de Star Wars</h1>
      <div className="row">
        {people.map((person) => (
          <div key={person.uid} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={`https://starwars-visualguide.com/assets/img/characters/${person.uid}.jpg`}
                className="card-img-top"
                alt={person.name}
                style={{ height: "200px", objectFit: "cover" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
                }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{person.name}</h5>
                <ul className="list-unstyled">
                  <li>Género: {person.gender}</li>
                  <li>Color de pelo: {person.hair_color}</li>
                  <li>Color de ojos: {person.eye_color}</li>
                </ul>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <Link to={`/single/${person.uid}`} className="btn btn-primary btn-sm">
                    Ver detalle
                  </Link>
                  <FontAwesomeIcon
                    icon={solidHeart}
                    style={{
                      cursor: "pointer",
                      color: store.favorites.includes(person.uid) ? "red" : "grey",
                    }}
                    onClick={() => toggleFavorite(person.uid)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



