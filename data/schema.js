const graphql = require('graphql');
const data = require('./database');
const {addResolveFunctionsToSchema} = require('graphql-tools');

var messageType = new graphql.GraphQLObjectType({
    name: 'Message',
    fields: {
        id: {
            type: graphql.GraphQLInt
        },
        text: {
            type: graphql.GraphQLString
        }
    }
});

const userType = new graphql.GraphQLObjectType({
    name: 'User',
    fields: {
        name: {
            type: graphql.GraphQLString
        },
        id: {
            type: graphql.GraphQLString
        },
        messages: {
            type: new graphql.GraphQLList(messageType),
            resolve: function (root, args) {
                return data.getMessages(root.id);
            }
        }
    }
});

const newUserType = new graphql.GraphQLObjectType({
    name: 'Users',
    fields: {
        name: {
            type: graphql.GraphQLString
        },
        id: {
            type: graphql.GraphQLString
        },
    }
});

const queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: userType,
            args: {
                id: {
                    type: graphql.GraphQLString
                }
            }
        },
        users: {
            type: new graphql.GraphQLList(newUserType),
            args: {
                id: {
                    type: graphql.GraphQLString
                }
            }
        }
    }
});

const resolvers = {
    Query: {
        users(root, args) {
            return data.users;
        },
        user (root, args) {
            return data.users.find(i => i.id === args.id);
        }
    }
};

const schema = new graphql.GraphQLSchema({
    query: queryType
});

addResolveFunctionsToSchema({ schema, resolvers });

module.exports = schema;