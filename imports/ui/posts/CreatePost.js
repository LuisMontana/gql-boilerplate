import React from "react";
import { gql, useMutation } from '@apollo/client';


const ADD_POST = gql`
	mutation($title: String!, $content: String!) {
		addPost(title: $title, content: $content) {
		title
		content
		}
	}
`;


export const CreatePost = () => {
	const [addPost, { mutationStatus }] = useMutation(ADD_POST);

	const handleSubmit = (event) => {
		event.preventDefault();
		const postData = {
			title: event.target.title.value,
			content: event.target.content.value
		};

		addPost({ variables: postData });

		console.log(mutationStatus);
	}

	return (
		<div>
			<h1>Add Post</h1>
			<form onSubmit={handleSubmit}>
				<label>Title
					<input type="text" name="title" placeholder="Type a post title"/>
				</label>

				<label>Content
					<input type="text" name="content" placeholder="Type the post's content"/>
				</label>

				<button type="submit">Save</button>
			</form>
		</div>
	)
}