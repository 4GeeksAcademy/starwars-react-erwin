import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Navbar as RBNavbar,
  Container,
  Nav,
  Dropdown,
  Badge,
  Button
} from "react-bootstrap";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorites = (isOpen) => setShowFavorites(isOpen);

  const getDetailPath = (item) => {
    if (!item) return "#";
    switch (item.type) {
      case "characters":
        return `/characters/${item.uid}`;
      case "planets":
        return `/planets/${item.uid}`;
      case "starships":
        return `/starships/${item.uid}`;
      default:
        return "#";
    }
  };

  // Carga detalles de favoritos que faltan en entities
  useEffect(() => {
    const fetchMissingEntities = async () => {
      for (const fav of store.favorites) {
        const key = `${fav.type}-${fav.uid}`;
        if (!store.entities[key]) {
          try {
            const res = await fetch(`https://www.swapi.tech/api/${fav.type}/${fav.uid}`);
            if (!res.ok) throw new Error("Fetch error");
            const data = await res.json();

            dispatch({
              type: "SET_ENTITIES",
              payload: {
                [key]: {
                  ...data.result.properties,
                  uid: fav.uid,
                  type: fav.type,
                },
              },
            });
          } catch (err) {
            console.error(`Error cargando entidad ${key}`, err);
          }
        }
      }
    };

    fetchMissingEntities();
  }, [store.favorites, store.entities, dispatch]);

  return (
    <RBNavbar bg="light" expand="lg" className="mb-3 shadow-sm">
      <Container>
        <RBNavbar.Brand as={Link} to="/">
          <img
            src="https://starwars-visualguide.com/assets/img/starwars_logo.svg"
            alt="Star Wars Logo"
            style={{ height: "40px" }}
          />
        </RBNavbar.Brand>

        <Nav className="ms-auto align-items-center">
          <Link to="/demo">
            <Button variant="primary" className="me-3">
              Check the Context in action
            </Button>
          </Link>

          <Dropdown show={showFavorites} onToggle={toggleFavorites} align="end">
            <Dropdown.Toggle variant="warning" id="dropdown-favorites">
              Favoritos{" "}
              <Badge bg="secondary">{store.favorites?.length || 0}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: "240px" }}>
              {(!store.favorites || store.favorites.length === 0) && (
                <Dropdown.Item disabled>No hay favoritos</Dropdown.Item>
              )}

              {store.favorites &&
                store.favorites.map((fav) => {
                  const key = `${fav.type}-${fav.uid}`;
                  const item = store.entities[key];

                  return (
                    <Dropdown.Item
                      key={key}
                      as={Link}
                      to={getDetailPath({ ...item, type: fav.type, uid: fav.uid })}
                      onClick={() => setShowFavorites(false)}
                    >
                      {item ? item.name : "Cargando..."}
                    </Dropdown.Item>
                  );
                })}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </RBNavbar>
  );
};







