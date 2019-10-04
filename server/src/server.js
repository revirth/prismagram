require("dotenv-expand")(require("dotenv").config());

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schemas";
import { authenticateJWT } from "./passport";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request })
});

server.use(logger("dev"));
server.use(authenticateJWT); // all request

server.start({ port: PORT }, () =>
  console.log(`✔ Server running on http://localhost:${PORT}`)
);
