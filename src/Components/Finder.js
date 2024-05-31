import React, { useState } from "react";
import { Row, InputGroup, Form, Button, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import "./Finder.css"; 

function Finder({ texto, foundPokemon }) {
  const [nombre, setNombre] = useState("");

  async function getPokemonData() {
    if (nombre.trim() === "") {
      Swal.fire({
        title: "Error",
        text: "Por favor ingresa el nombre del Pokémon.",
        icon: "warning",
        confirmButtonText: "Entendido"
      });
      return;
    }

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
      if (!response.ok) {
        throw new Error("Pokémon no encontrado.");
      }

      const data = await response.json();
      foundPokemon(data);
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        confirmButtonText: "Entendido"
      });
    }
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <InputGroup className="mb-3">
          <Form.Control
            className="custom-input"
            placeholder="Nombre del Pokémon"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <Button className="custom-button" onClick={getPokemonData}>
            {texto}
          </Button>
        </InputGroup>
      </Col>
    </Row>
  );
}

export default Finder;

