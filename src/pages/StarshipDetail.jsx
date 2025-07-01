import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const StarshipDetail = () => {
  const { theId } = useParams();
  const [starship, setStarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/starships/${theId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta de la API");
        return res.json();
      })
      .then((data) => setStarship(data.result.properties))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [theId]);

  if (loading) return <p className="text-center mt-5">Cargando detalles de la nave...</p>;
  if (error) return <p className="text-center mt-5 text-danger">Error: {error}</p>;
  if (!starship) return null;

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-outline-primary mb-3">← Volver al inicio</Link>
      <h2>{starship.name}</h2>
      <ul className="list-group">
        <li className="list-group-item"><strong>Modelo:</strong> {starship.model}</li>
        <li className="list-group-item"><strong>Fabricante:</strong> {starship.manufacturer}</li>
        <li className="list-group-item"><strong>Pasajeros:</strong> {starship.passengers}</li>
        <li className="list-group-item"><strong>Velocidad máxima:</strong> {starship.max_atmosphering_speed}</li>
      </ul>
    </div>
  );
};
