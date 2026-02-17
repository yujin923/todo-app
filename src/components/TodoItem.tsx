import type { Todo } from "../types/todo";

type Props = {
    todo: Todo;
    toggle: (id: number) => void;
};

export default function TodoItem({ todo, toggle }: Props) {
    return (
        <div key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "5px 15px",
              backgroundColor: "#f9fafb",
              borderRadius: "12px",
              transition: "0.2s"
            }}>
          <button onClick={() => toggle(todo.id)}>
            {todo.completed ? "☑️" : "🟪"}
          </button>
          <span
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? "#9ca3af" : "#111827",
              fontSize: "14px"
            }}>{todo.text}</span>
        </div>
    )
}