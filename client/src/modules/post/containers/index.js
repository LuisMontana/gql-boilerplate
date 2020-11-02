import React, { Component, Fragment } from 'react'

import { withPosts } from '../providers';
import { PostList, PostForm } from '../components';

import '../styles/styles.css';

/**
 * Wrap a component using the withPosts provider
 * to get data retrieved with GraphQL.
 */
@withPosts
export default class PostRoot extends Component {
  render() {
    const { posts, postsLoading } = this.props;

    return (
      <Fragment>
        <h2 className="posts-title">Posts Module</h2>
            <hr />
        <div>
          <div>
            <PostList postsLoading={postsLoading} posts={posts} />
          </div>
          <div>
            <PostForm />
          </div>
        </div>
      </Fragment>
    )
  }
}