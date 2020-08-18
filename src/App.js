import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Novo Repositorio',
    });

    const repositorio = response.data;

    setRepositories([ ...repositories, repositorio ])

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(repositorio => repositorio.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repositorio => (
        <li key={repositorio.id}>
        {repositorio.title}

          <button onClick={() => handleRemoveRepository(repositorio.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
