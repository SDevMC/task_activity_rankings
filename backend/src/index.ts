import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema/index';
import { resolvers } from './resolvers';
import cors from 'cors';



async function startServer() {
    const app = express();
    const port = process.env.PORT || 4000;

    app.use(cors());
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}${server.graphqlPath}`);
    })
}

// Start the server
startServer().catch((err) => {
    console.error('Error starting server:', err);
});