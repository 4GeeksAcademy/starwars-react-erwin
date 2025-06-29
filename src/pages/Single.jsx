import { useParams } from "react-router-dom";

export const Single = () => {
  const { theId } = useParams();

  return (
    <div className="container mt-5">
      <h2>Detalle del personaje {theId}</h2>
      {/* Aquí puedes cargar detalles usando laId */}
    </div>
  );
};
