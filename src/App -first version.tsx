import { useCallback, useRef, useState } from 'react'
import './App.css'

type Todo = {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [content, setContent] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([])
  const id = useRef<number>(0);

  const newId = useCallback(() => {
    id.current += 1;
    return id.current;
  }, []);

  const submit = useCallback(() => { 
    if(!content.trim()) return;

    setTodos(todos => [...todos, { id: newId(), text: content, completed: false }]); 
    setContent(''); 
  }, [content]);

  const remaining = todos.filter(todo => !todo.completed).length;

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
      <h1
        style={{
          fontSize: "26px",
          fontWeight: "700",
          letterSpacing: "-0.5px"
        }}>
        Todo List 
      </h1>
      <p 
        style={{
          alignSelf: "start",
          backgroundColor: "#fce7f3",
          color: "#d6709bff",
          padding: "6px 14px",
          borderRadius: "999px",
          fontSize: "14px",
          fontWeight: "600"
        }}>
          남은 할 일: {remaining}개</p>
      <div className="card">
        <input className='' type="text" placeholder="할 일을 적어주세요" value={content} onChange={e => {
          setContent(e.target.value);
        }} 
        style={{
          flex: 1,
          padding: "10px 14px",
          borderRadius: "10px",
          border: "1px solid #e5e7eb",
          fontSize: "14px",
          outline: "none"
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            submit();
          }
        }} />
        <button onClick={() => {
          submit();
        }} style={{
          padding: "12px",
          borderRadius: "14px",
          border: "none",
          backgroundColor: "#f9a8d4",
          color: "white",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 5px 15px rgba(294,168,212,0.4)",
          transition: "0.2s",
        }}>
          add
        </button>
      </div>
      {todos.map(todo => (
        <div key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "5px 15px",
              backgroundColor: "#f9fafb",
              borderRadius: "12px",
              transition: "0.2s"
            }}>
          <button onClick={() => {
            setTodos(todos => todos.map(t => t.id === todo.id 
              ? {...t, completed: !t.completed }: t));
          }}>
            {todo.completed ? "☑️" : "🟪"}
          </button>
          <span
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? "#9ca3af" : "#111827",
              fontSize: "14px"
            }}>{todo.text}</span>
        </div>
      ))}
      </div>
    </main>
  )
}

export default App