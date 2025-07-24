import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "./useTodos";
import { CACHE_KEY_TODOS } from "../constants";
import APIClient from "../services/apiClient";

interface AddTodoContext {
  previousTodos: Todo[];
}

const apiClient = new APIClient<Todo>('/todos');
  
const useAddTodos = (onAdd: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo, AddTodoContext>({
    // mutationFn: (data) => apiClient.post(data), below line can also be written like this, the line below is more concise version.
    mutationFn: apiClient.post,

    onMutate: (newTodo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [
        newTodo,
        ...(todos || []),
      ]);

      onAdd(); // Not referencing here, directly executing the onAdd function.

      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(
        CACHE_KEY_TODOS,
        (todos) => todos?.map((todo) => (todo === newTodo ? savedTodo : todo)) //if a todo is equal to the optimistically updated todo sent by us to the server (POST), then change/swap that todo with the one that we got in response from the API because it has the og id.
      );
    },

    onError: (error, newTodo, context) => {
      if (!context) return;
      queryClient.setQueryData(CACHE_KEY_TODOS, context.previousTodos);
    },
  });
};

export default useAddTodos;
