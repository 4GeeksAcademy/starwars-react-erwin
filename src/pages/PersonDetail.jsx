// src/pages/PersonDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const PersonDetail = () => {
  const { uid } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/people/${uid}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error cargando personaje");
        return res.json();
      })
      .then((data) => setPerson(data.result.properties))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [uid]);

  if (loading) return <p className="text-center mt-5">Cargando...</p>;
  if (error) return <p className="text-center text-danger mt-5">Error: {error}</p>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">{person.name}</h1>
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`}
            className="img-fluid"
            alt={person.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
            }}
          />
        </div>
        <div className="col-md-6">
          <ul className="list-group">
            <li className="list-group-item">Height: {person.height}</li>
            <li className="list-group-item">Mass: {person.mass}</li>
            <li className="list-group-item">Hair Color: {person.hair_color}</li>
            <li className="list-group-item">Skin Color: {person.skin_color}</li>
            <li className="list-group-item">Eye Color: {person.eye_color}</li>
            <li className="list-group-item">Birth Year: {person.birth_year}</li>
            <li className="list-group-item">Gender: {person.gender}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
