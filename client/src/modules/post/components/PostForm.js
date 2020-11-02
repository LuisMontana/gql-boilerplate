import React, { Component } from 'react';
import { withAddPost } from '../providers';

@withAddPost
export default class PostForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(event) {
    event.preventDefault();

    this.props.addPost({
      title: event.target.title.value,
      content: event.target.content.value
    });
  }

  render() {
    return (
      <div className="post-form">
        <h2>Create new post</h2>
        <form onSubmit={(event) => this.submitForm(event)}>
          <div>
            <label for="postTitle">Post Title</label>
            <input type="text" name="title" id="postTitle" placeholder="Title" />
          </div>
          <div>
            <label for="postContent">Post Content</label>
            <input type="textarea" name="content" id="postContent" placeholder="Content" />
          </div>
          <button className="submit-button">Submit new post</button>
        </form>
      </div>
    )
  }
}