import type { Todo } from "../types/todo"
import TodoItem from "./TodoItem";

type Props = {
    todos: Todo[];
    toggle: (id: number) => void;
};

export default function TodoList({ todos, toggle}: Props){
    return (
        <>{todos.map((todo) => (
            <TodoItem
            key={todo.id}
            todo={todo}
            toggle={toggle}
           />
        ))}
      </>
    );
}