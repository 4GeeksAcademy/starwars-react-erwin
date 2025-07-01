import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const PlanetDetail = () => {
  const { theId } = useParams();
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/planets/${theId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta de la API");
        return res.json();
      })
      .then((data) => setPlanet(data.result.properties))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [theId]);

  if (loading) return <p className="text-center mt-5">Cargando detalles del planeta...</p>;
  if (error) return <p className="text-center mt-5 text-danger">Error: {error}</p>;
  if (!planet) return null;

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-outline-primary mb-3">← Volver al inicio</Link>
      <h2>{planet.name}</h2>
      <ul className="list-group">
        <li className="list-group-item"><strong>Clima:</strong> {planet.climate}</li>
        <li className="list-group-item"><strong>Terreno:</strong> {planet.terrain}</li>
        <li className="list-group-item"><strong>Población:</strong> {planet.population}</li>
        <li className="list-group-item"><strong>Diámetro:</strong> {planet.diameter}</li>
      </ul>
    </div>
  );
};
