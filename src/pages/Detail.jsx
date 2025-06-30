import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const Detail = () => {
  const { theId } = useParams(); // Obtiene el uid de la URL
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/people/${theId}`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar el personaje");
        return res.json();
      })
      .then((data) => {
        setCharacter(data.result.properties);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [theId]);

  if (loading) return <p className="text-center mt-5">Cargando detalle...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h1>{character.name}</h1>
      <img
        src={`https://starwars-visualguide.com/assets/img/characters/${theId}.jpg`}
        alt={character.name}
        className="img-fluid mb-3"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
        }}
      />
      <ul className="list-group">
        <li className="list-group-item"><strong>Género:</strong> {character.gender}</li>
        <li className="list-group-item"><strong>Altura:</strong> {character.height} cm</li>
        <li className="list-group-item"><strong>Masa:</strong> {character.mass} kg</li>
        <li className="list-group-item"><strong>Color de pelo:</strong> {character.hair_color}</li>
        <li className="list-group-item"><strong>Color de ojos:</strong> {character.eye_color}</li>
        <li className="list-group-item"><strong>Año de nacimiento:</strong> {character.birth_year}</li>
        <li className="list-group-item"><strong>Planeta natal:</strong> {character.homeworld}</li>
      </ul>

      <Link to="/" className="btn btn-secondary mt-3">Volver al inicio</Link>
    </div>
  );
};
