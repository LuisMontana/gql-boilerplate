import React, { useState } from "react"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { PostsList } from "/imports/ui/posts/PostsList";
import { CreatePost } from "/imports/ui/posts/CreatePost";
import { Login } from "/imports/ui/auth/Login";
import { Signup } from "/imports/ui/auth/Signup";
import { AppContext } from "/imports/context";

const client = new ApolloClient({
	uri: "http://localhost:3000/graphql",
	cache: new InMemoryCache()
});

export const App = () => {
	const [userData, setUserData] = useState({});
	console.log(userData)
	return (
		<AppContext.Provider value={{ userData, setUserData }}>
			<ApolloProvider client={client}>
				<Login />
				<Signup />
				<PostsList />
				<CreatePost />
			</ApolloProvider>
		</AppContext.Provider>
	);
};