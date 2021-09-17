const { gql } = require("apollo-server-express");

exports.baseDefs = gql`
  type Query {
    _: String!
  }
  type Mutation {
    _: String!
  }

  type Subscription {
    _: String!
  }
`;
