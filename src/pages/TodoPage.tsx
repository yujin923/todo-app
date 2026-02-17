import { useCallback, useRef, useState, useEffect } from 'react'
import TodoHeader from '../components/TodoHeader'
import TodoInput from '../components/TodoInput'
import TodoList from '../components/TodoList'
import type { Todo } from '../types/todo'

type Props = {
    onLogout: () => void;
};

export default function TodoPage({onLogout}: Props) {
      const [content, setContent] = useState<string>('');
      const [todos, setTodos] = useState<Todo[]>([])
    
      const submit = useCallback(async () => { 
        if(!content.trim()) return;

        const token = localStorage.getItem("token");
    
        const res = await fetch("http://localhost:5000/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            text: content,
          }),
        });

        const data = await res.json();
    
        setTodos(prev => [
            {
                id: data.id,
                text: content,
                completed: false
            },
            ...prev
        ]);

        setContent(''); 
      }, [content]);
    
      const toggle = async (id: number) => {
        const target = todos.find(t => t.id === id);
        if (!target) return;
    
        const newCompleted = !target.completed;
        const token = localStorage.getItem("token");
    
        await fetch(`http://localhost:5000/todos/${id}`,{
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
        const token = localStorage.getItem("token");

        fetch("http://localhost:5000/todos", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
          .then(res => res.json())
          .then(data => {
            setTodos(data);
          })
          .catch(err => console.error(err));
      }, []);
    
      return (
        <>
        <button
                onClick={()=> {
                    localStorage.removeItem("token");
                    onLogout();
                }}
                style={{
                    position: "fixed",
                    top: "20px",
                    right: "24px",
                    border: "none",
                    background: "#e3a7f3ff",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(0.1,0.1,0.15,0.15)"
                }}
            >
                로그아웃
        </button>

        <main style={{ width: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: "linear-gradient(135deg, #fce7f3, #e0f2fe)" }}>
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
        </>
      )
}