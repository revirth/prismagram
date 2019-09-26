require("dotenv-expand")(require("dotenv").config());

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schemas";

// test sendSecretMail
import { sendSecretMail } from "./utils";
sendSecretMail("revirth@knou.ac.kr");

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(`✔ Server running on http://localhost:${PORT}`)
);
