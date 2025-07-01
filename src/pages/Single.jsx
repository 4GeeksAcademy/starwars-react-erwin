import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Single = () => {
  const { theId } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/people/${theId}`)
      .then(res => {
        if (!res.ok) throw new Error("Error cargando personaje");
        return res.json();
      })
      .then(data => setPerson(data.result.properties))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [theId]);

  if (loading) return <p>Cargando personaje...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!person) return null;

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-outline-primary mb-3">← Volver</Link>
      <h2>{person.name}</h2>
      <ul>
        <li>Género: {person.gender}</li>
        <li>Color de pelo: {person.hair_color}</li>
        <li>Color de ojos: {person.eye_color}</li>
        <li>Altura: {person.height} cm</li>
        <li>Masa: {person.mass} kg</li>
        <li>Año nacimiento: {person.birth_year}</li>
        <li>Color de piel: {person.skin_color}</li>
      </ul>
    </div>
  );
};







