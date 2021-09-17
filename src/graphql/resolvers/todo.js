exports.todoResolver = {
  Query: {
    getAllTodos: async (_, {}, { Todo }) => {
      const todos = await Todo.find();
      return todos;
    },

    getTodoById: async (_, { id }, { Todo }) => {
      const todo = await Todo.findById(id);
      return todo;
    },
  },

  Mutation: {
    createNewTodo: async (_, { newTodo }, { Todo }) => {
      const result = await Todo.create(newTodo);
      return result;
    },

    updateTodoByID: async (_, { updatedTodo, id }, { Todo }) => {
      const updatedTodoResult = await Todo.findByIdAndUpdate(
        id,
        { ...updatedTodo },
        { new: true }
      );
      return updatedTodoResult;
    },

    updateTodoStatusById: async (_, { completedStatus, id }, { Todo }) => {
      const updatedTodoResult = await Todo.findByIdAndUpdate(
        id,
        { ...completedStatus },
        {
          new: true,
        }
      );
      return updatedTodoResult;
    },

    deleteTodoById: async (_, { id }, { Todo }) => {
      try {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        return {
          id: deletedTodo.id,
          message: "Your Todo is deleted",
          success: true,
        };
      } catch (err) {
        return {
          message: "An error ocurred",
          success: false,
        };
      }
    },
  },
};
