import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const PersonDetail = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://www.swapi.tech/api/people/${uid}`)
      .then((res) => (res.ok ? res.json() : Promise.reject("Error cargando personaje")))
      .then((data) => {
        setPerson(data.result.properties);
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  }, [uid]);

  if (loading) return <p className="text-center mt-5">Cargando personaje...</p>;
  if (error) return <p className="text-center mt-5 text-danger">Error: {error}</p>;
  if (!person) return null;

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
        Volver
      </button>

      <div
        className="card p-3"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          maxWidth: "800px",
          margin: "0 auto",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        <img
          src={`https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`}
          alt={person.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
          }}
          style={{ width: "300px", height: "400px", objectFit: "cover", borderRadius: "8px" }}
        />

        <div style={{ flex: 1 }}>
          <h2>{person.name}</h2>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "1.1rem" }}>
            <li><strong>Género:</strong> {person.gender}</li>
            <li><strong>Altura:</strong> {person.height} cm</li>
            <li><strong>Masa:</strong> {person.mass} kg</li>
            <li><strong>Color de pelo:</strong> {person.hair_color}</li>
            <li><strong>Color de ojos:</strong> {person.eye_color}</li>
            <li><strong>Año de nacimiento:</strong> {person.birth_year}</li>
            <li><strong>Planeta natal:</strong> {person.homeworld}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};


