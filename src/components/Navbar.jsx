import { Link } from "react-router-dom";
import { Navbar as RBNavbar, Container, Nav, Dropdown, Badge, Button } from "react-bootstrap";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store } = useGlobalReducer();
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorites = (isOpen) => setShowFavorites(isOpen);

  return (
    <RBNavbar bg="light" expand="lg" className="mb-3">
      <Container>
        <RBNavbar.Brand as={Link} to="/">
          React Boilerplate
        </RBNavbar.Brand>

        <Nav className="ms-auto align-items-center">
          <Link to="/demo">
            <Button variant="primary" className="me-3">
              Check the Context in action
            </Button>
          </Link>

          <Dropdown show={showFavorites} onToggle={toggleFavorites} align="end">
            <Dropdown.Toggle variant="warning" id="dropdown-favorites">
              Favoritos <Badge bg="secondary">{store.favorites?.length || 0}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: "200px" }}>
              {(!store.favorites || store.favorites.length === 0) && (
                <Dropdown.Item disabled>No hay favoritos</Dropdown.Item>
              )}
              {store.favorites &&
                store.favorites.map((uid) => {
                  const item = store.entities?.[uid];
                  return (
                    <Dropdown.Item
                      key={uid}
                      as={Link}
                      to={`/single/${uid}`}
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


