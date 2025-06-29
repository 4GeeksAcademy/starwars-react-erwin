import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Home = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/people?page=1&limit=10")
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta de la API");
        return res.json();
      })
      .then((data) => setPeople(data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const toggleFavorite = (uid) => {
    setFavorites((prev) =>
      prev.includes(uid) ? prev.filter((id) => id !== uid) : [...prev, uid]
    );
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
                <div>
                  <h5 className="card-title d-flex justify-content-between align-items-center">
                    {person.name}
                    <FontAwesomeIcon
                      icon={solidHeart}
                      onClick={() => toggleFavorite(person.uid)}
                      style={{
                        cursor: "pointer",
                        color: favorites.includes(person.uid) ? "red" : "lightgray",
                      }}
                    />
                  </h5>
                  <ul className="list-unstyled mt-3 mb-3">
                    <li>Gender: {person.gender || "unknown"}</li>
                    <li>Hair Color: {person.hair_color || "unknown"}</li>
                    <li>Eye Color: {person.eye_color || "unknown"}</li>
                  </ul>
                </div>
                <Link to={`/person/${person.uid}`} className="btn btn-primary w-100 mt-auto">
  Ver más
</Link>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
