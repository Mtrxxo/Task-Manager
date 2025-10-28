import { useEffect, useState } from 'react';
import '../App.css';
import Header from './header';
import Main from './main'

function App() {
  const API_BASE = process.env.REACT_APP_API_URL
  const [input, setInput] = useState('');
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks(){
    const res = await fetch(`${API_BASE}/api/tasks`);

    const data = await res.json();

    setCollection(data);
  }

  function handleChange(e){
    const {value} = e.target;

    setInput(value);
  };

  async function handleSubmit(e){
    e.preventDefault();

    const data = await fetch(`${API_BASE}/api/tasks`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({ input })
    });

    const newTask = await data.json()

    setCollection((prev) => {
      return [...prev, newTask];
    });

    setInput('');

    fetchTasks();
  };

  async function deleteTask(id){
    await fetch(`${API_BASE}/api/tasks/${id}`, {method: 'DELETE'})
    setCollection(collection.filter(task => task._id !== id));
  };

  async function updateTask(id, currentStatus){
    const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({ complete: !currentStatus })
    });

    const updateTasks = await res.json();

    setCollection(prev => {
      return prev.map(task => task._id === id ? updateTasks : task)
    });
  };

  return (
    <div className="App">
      <Header />
      <Main input={input} collection={collection} handleChange={handleChange} handleSubmit={handleSubmit} deleteTask={deleteTask} updateTask={updateTask} />
    </div>
  );
};

export default App;