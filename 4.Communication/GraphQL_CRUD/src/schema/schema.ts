import { gql } from "apollo-server";

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        password: String!
        email: String!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User!
    }

    input CreateUserInput {
        name: String!
        password: String!
        email: String!
    }

    input UpdateUserInput {
        name: String
        password: String
        email: String
    }

    type Mutation {
        createUser(user: CreateUserInput!): User!
        updateUser(id: ID!, user: UpdateUserInput!): User!
        deleteUser(id: ID!): User!
    }
`

export default typeDefs;