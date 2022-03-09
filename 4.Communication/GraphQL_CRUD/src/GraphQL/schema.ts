import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, buildSchema } from 'graphql';

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'byleco',
        fields: () => ({
            message: {
                type: GraphQLString,
                resolve: () => 'Hello'
            }
        })
    })
})

export default schema;