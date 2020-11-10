import React from 'react'
import { useQuery, gql } from '@apollo/client';

const GET_POSTS = gql`
  {
    posts {
      _id
      title
      content
    }
  }
`;

export const PostsList = () => {

	const { loading, error, data } = useQuery(GET_POSTS, { pollInterval: 500, });

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;

	return (
		<div>
			<h1>Posts</h1>
			{data.posts.map( (post, index) =>
				<div key={`post-${index}`}>
					<p> {post.title} </p>
					<p> {post.content} </p>
				</div>
			)}
		</div>
	)
}
