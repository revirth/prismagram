import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
  uri: "//localhost:4000",
  clientState: { defaults, resolvers }
});