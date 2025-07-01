import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single"; // Opcional si no usas
import { Demo } from "./pages/Demo";
import { PersonDetail } from "./pages/PersonDetail";
import { PlanetDetail } from "./pages/PlanetDetail";
import { StarshipDetail } from "./pages/StarshipDetail";

const NotFound = () => <h1>Not found!</h1>;

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFound />}>
      <Route index element={<Home />} />
      <Route path="demo" element={<Demo />} />

      {/* Rutas específicas para cada tipo */}
      <Route path="characters/:uid" element={<PersonDetail />} />
      <Route path="planets/:uid" element={<PlanetDetail />} />
      <Route path="starships/:uid" element={<StarshipDetail />} />

      {/* Ruta genérica single (opcional) */}
      <Route path="single/:theId" element={<Single />} />
    </Route>
  )
);


