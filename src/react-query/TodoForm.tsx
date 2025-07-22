import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

interface AddTodoContext {
  previousTodos: Todo[];
}

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),

    onMutate: (newTodo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        newTodo,
        ...(todos || []),
      ]);
      if (ref.current) ref.current.value = "";

      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(["todo"], (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo)) //if a todo is equal to the optimistically updated todo sent by us to the server (POST), then change/swap that todo with the one that we got in response from the API because it has the og id.
      );
    },

    onError: (error, newTodo, context) => {
      if (!context) return;
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
  });
  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger"> {addTodo.error.message} </div>
      )}
      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault();

          if (ref.current && ref.current.value)
            addTodo.mutate({
              id: 0,
              title: ref.current?.value,
              completed: false,
              userId: 1,
            });
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary" disabled={addTodo.isLoading}>
            {addTodo.isLoading ? "Adding" : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
