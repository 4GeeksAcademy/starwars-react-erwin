import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Single = () => {
  const { theId } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/people/${theId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta de la API");
        return res.json();
      })
      .then((data) => {
        setPerson(data.result.properties);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [theId]);

  if (loading) return <p className="text-center mt-5">Cargando detalles...</p>;
  if (error) return <p className="text-center mt-5 text-danger">Error: {error}</p>;
  if (!person) return null;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div
        className="card p-3"
        style={{
          display: "flex",
          maxWidth: "700px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          borderRadius: "12px",
          gap: "20px",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Link
          to="/"
          className="btn btn-outline-primary"
          style={{ alignSelf: "flex-start" }}
        >
          ← Volver al inicio
        </Link>
        <img
          src={`https://starwars-visualguide.com/assets/img/characters/${theId}.jpg`}
          alt={person.name}
          style={{
            width: "300px",
            height: "300px",
            objectFit: "cover",
            borderRadius: "10px",
            flexShrink: 0,
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
          }}
        />
        <div style={{ flex: 1 }}>
          <h2 className="mb-4">{person.name}</h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Género:</strong> {person.gender}
            </li>
            <li className="list-group-item">
              <strong>Color de pelo:</strong> {person.hair_color}
            </li>
            <li className="list-group-item">
              <strong>Color de ojos:</strong> {person.eye_color}
            </li>
            <li className="list-group-item">
              <strong>Altura:</strong> {person.height} cm
            </li>
            <li className="list-group-item">
              <strong>Masa:</strong> {person.mass} kg
            </li>
            <li className="list-group-item">
              <strong>Año de nacimiento:</strong> {person.birth_year}
            </li>
            <li className="list-group-item">
              <strong>Color de piel:</strong> {person.skin_color}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};





