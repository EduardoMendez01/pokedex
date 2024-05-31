import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function PokemonCard({ pokemon }) {
  const [curiosity, setCuriosity] = useState(""); // Estado para almacenar la curiosidad del Pokémon

  // Función para obtener la curiosidad del Pokémon desde la PokeAPI
  const fetchCuriosity = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon information.");
      }
      const data = await response.json();
      const description = data.flavor_text_entries.find(entry => entry.language.name === 'en');
      if (description) {
        return description.flavor_text;
      } else {
        throw new Error("Pokémon description not found.");
      }
    } catch (error) {
      console.error("Error fetching Pokémon curiosity:", error.message);
      return "Failed to fetch Pokémon curiosity.";
    }
  };
  
  // Function to handle the "View" button click
  const viewCuriosity = async () => {
    try {
      const curiosity = await fetchCuriosity();
      // Show the curiosity in a toast
      toast.info(`Pokémon Curiosity: ${curiosity}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error fetching Pokémon curiosity:", error.message);
      // Show an error message in case of failure
      toast.error("Failed to fetch Pokémon curiosity.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Card style={{ width: '18rem', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Card.Img
            variant="top"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={pokemon.nombre}
            style={{ backgroundColor: '#f8f8f8', padding: '10px' }}
          />
          <Card.Body style={{ backgroundColor: '#fafafa' }}>
            <Card.Title style={{ color: '#333', fontWeight: 'bold', textAlign: 'center', fontSize: '1.25rem' }}>
              {pokemon.name}
            </Card.Title>
            <Card.Text style={{ color: '#666', textAlign: 'center' }}>
              <strong>Height:</strong> {pokemon.height} m<br />
              <strong>Weight:</strong> {pokemon.weight} kg<br />
              <strong>Types:</strong> {pokemon.types && pokemon.types.map(tipo => tipo.type.name).join(', ')}<br />
            </Card.Text>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="primary" onClick={viewCuriosity} style={{ borderRadius: '20px', padding: '10px 20px' }}>
                View
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
      <ToastContainer />
    </>
  );
}

export default PokemonCard;
