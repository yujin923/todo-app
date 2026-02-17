import { useCallback, useRef, useState, useEffect } from 'react'
import './App.css'
import TodoHeader from './components/TodoHeader'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import type { Todo } from './types/todo'

function App() {
  const [content, setContent] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([])
  const id = useRef<number>(0);

  const newId = useCallback(() => {
    id.current += 1;
    return id.current;
  }, []);

  const submit = useCallback(async () => { 
    if(!content.trim()) return;

    await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: content,
      }),
    });

    setTodos(todos => [...todos, { id: newId(), text: content, completed: false }]); 
    setContent(''); 
  }, [content]);

  const toggle = async (id: number) => {
    const target = todos.find(t => t.id === id);
    if (!target) return;

    const newCompleted = !target.completed;

    await fetch(`http://localhost:5000/todos/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: newCompleted ? 1 : 0,
      }),
    });

    setTodos(prev =>
    prev.map((t) =>
    t.id === id ? {...t, completed: !t.completed } : t));
  };

  const remaining = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then(res => res.json())
      .then(data => {
        setTodos(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <main style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: "linear-gradient(135deg, #fce7f3, #e0f2fe)" }}>
      <div style={{
        width: "420px",
        padding: "28px",
        backgroundColor: "white",
        borderRadius: "20px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }}>
       <TodoHeader remaining={remaining} />


       <TodoInput
         content={content}
         setContent={setContent}
         submit={submit}
         />

        <TodoList todos={todos} toggle={toggle} />
      </div>
    </main>
  );
}

export default App