import { useEffect, useState } from 'react';
import { getAllToDos } from './api/todos';
import { ToDoSummary } from './models/ToDo';

function App() {
  const [toDos, setToDos] = useState<ToDoSummary[]>([]);

  useEffect(() => {
    async function fetchToDos() {
      const response = await getAllToDos();
      if (response.isError) return;
      setToDos(response.content);
    }
    fetchToDos();
  });

  return (
    <>
      <h1>Welcome to Asp.Net React ToDo</h1>
      <h3>The packages and project layouts that I like to use for this stack.</h3>

      <pre>{JSON.stringify(toDos, null, 2)}</pre>
    </>
  );
}

export default App;
