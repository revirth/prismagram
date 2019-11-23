require("dotenv-expand")(require("dotenv").config());

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schemas";
import { authenticateJWT } from "./passport";
import { uploadController, uploadMiddleware } from "./upload";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request })
});

server.express.use(logger("dev"));
server.express.use(authenticateJWT); // all request
server.express.post("/api/upload", uploadMiddleware, uploadController);

server.start({ port: PORT }, () =>
  console.log(`✔ Server running on http://localhost:${PORT}`)
);
