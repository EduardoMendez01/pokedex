import React, { useState } from "react";
import Finder from './Components/Finder';
import PokemonCard from './Components/PokemonCard';
import './App.css';  // Importa el archivo de estilos

function App() {
  const [pokemon, setPokemon] = useState(null);

  return (
    <div className="App">
      <Finder texto={"Encontrar Pokemon"} foundPokemon={setPokemon} />
      {pokemon && <PokemonCard pokemon={pokemon} />}
    </div>
  );
}

export default App;

