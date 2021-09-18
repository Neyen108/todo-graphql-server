const { gql } = require("apollo-server-express");

exports.todo = gql`
  extend type Query {
    getAllTodos: [Todo!]!
    getTodoById(id: ID!): Todo!
  }

  extend type Mutation {
    createNewTodo(newTodo: TodoInput!): Todo!
    updateTodoByID(updatedTodo: TodoInput!, id: ID!): Todo!
    updateTodoStatusById(completedStatus: completedStatus!, id: ID!): Todo!
    deleteTodoById(id: ID!): DeleteNotification!
  }

  extend type Subscription {
    todoCreated: Todo!
    todoUpdated: Todo!
    todoDeleted: String!
  }

  input TodoInput {
    title: String!
    content: String!
    completed: Boolean
  }

  input completedStatus {
    completed: Boolean!
  }

  type DeleteNotification {
    id: ID
    message: String!
    success: Boolean!
  }

  type Todo {
    id: ID!
    title: String!
    content: String!
    completed: Boolean!
    createdAt: String
    updatedAt: String
  }
`;
