require("dotenv").config();

// import http from "http"
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { graphqlUploadExpress } from "graphql-upload";
import logger from "morgan";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "@graphql-tools/schema";

const PORT = process.env.PORT;

const app = express();
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      if (req) {
        return {
          loggedInUser: await getUser(req.headers.token),
        };
      }
    },
    // context: async (ctx) => {
    //   // console.log(ctx)
    //   if (ctx.req) {
    //     return {
    //       loggedInUser: await getUser(ctx.req.headers.token),
    //     };
    //   } else {
    //     const {
    //       connection: { context },
    //     } = ctx;
    //     console.log(context)
    //     return { loggedInUser: context.loggedInUser };

    //   }
    // },
    // subscriptions: {
    //   onConnect: async({token}) => {
    //     if(!token) {
    //       throw new Error("Please log in first.")
    //     }
    //     const loggedInUser = await getUser(token);
    //     return {
    //       loggedInUser
    //     }
    //   }
    // },
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });
  const httpServer = createServer(app);
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: async ({ token }, webSocket, context) => {
        if (!token) {
          throw new Error("Please log in first.");
        }
        const loggedInUser = await getUser(token);
        console.log("Connected!");
        return loggedInUser;
      },
      onDisconnect(webSocket, context) {
        console.log("Disconnected!");
      },
    },
    { server: httpServer, path: server.graphqlPath }
  );

  await server.start();

  app.use(graphqlUploadExpress());
  app.use(logger("tiny"));
  server.applyMiddleware({ app });
  // app.use("/static", express.static("uploads"));

  await new Promise((r) => httpServer.listen({ port: PORT }, r)).then(() =>
    console.log(
      `🚀 Server is running on http://localhost:${PORT}${server.graphqlPath} ✅`
    )
  );
};

startServer();
