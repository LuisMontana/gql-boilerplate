import React from "react"
import { PostsList } from "/imports/ui/posts/PostsList";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { CreatePost } from "/imports/ui/posts/CreatePost";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache()
});

export const App = () => (
	<ApolloProvider client={client}>
		<PostsList />
		<CreatePost />
	</ApolloProvider>
);