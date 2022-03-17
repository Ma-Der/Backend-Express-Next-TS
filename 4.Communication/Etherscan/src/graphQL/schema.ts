import { gql } from "apollo-server";

const typeDefs = gql`
    type Transaction {
        id: Int!
        from: String!
        to: String!
        gasPriceInTransaction: String!
        tax: String!
        etherscanId: Int!
    }

    type EtherscanData {
        id: Int!
        etherPrice: String!
        marketCap: String!
        difficulty: String
        transaction: [Transaction]
    }

    type Query {
        etherscanFullData(numberOfResults: Int): [EtherscanData!]!
        etherscanData(id: Int!): EtherscanData!
        transactions(numberOfResults: Int): [Transaction!]!
        transaction(id: Int!): Transaction!
    }
`

export default typeDefs;