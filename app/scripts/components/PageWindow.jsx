import React from 'react';
import { Block } from 'essence-core';
import Progress from 'essence-progress';
import uuid from 'uuid';
import TitleBar from './TitleBar';
import PostComposer from './PostComposer';
import Post from './Post';

const REQUIRED_POST_FIELDS = [
  'message',
  'picture',
  'created_time',
  'insights',
  'is_published',
].join(',');

export default class PageWindow extends React.Component {
  static propTypes = {
    // Required
    fb: React.PropTypes.object.isRequired,
    onLogoutRequest: React.PropTypes.func.isRequired,
  }

  //
  // initializers
  //

  constructor(props) {
    super(props);

    this.FB = props.fb;
    this.FB.api(
      '/me/accounts',
      'GET',
      {},
      (response) => {
        this.setState({ ...this.state, pages: response.data || [] });
        if (this.state.pages.length > 0) {
          this.onPageSelected(0);
        }
      }
    );
  }

  state = {
    pages: [],
    current: null, // null or index
    posts: [],
  }

  //
  // event handlers
  //

  onPageSelected = (index) => {
    if (index === this.state.current) {
      // just ignore if index equals to this.sate.current
      return;
    }

    const page = this.state.pages[index];
    if (!page) {
      throw new Error('index out of range');
    }

    const emptyPostState = {
      ...this.state,
      current: index,
      posts: [],
    };

    this.setState(emptyPostState, () => {
      this.FB.api(
        `/${page.id}/promotable_posts`,
        'GET',
        {
          include_hidden: true,
          fields: REQUIRED_POST_FIELDS,
        },
        (response) => {
          this.setState({
            ...this.state,
            posts: response.data,
          });
        }
      );
    });
  }

  onDidPost = (post) => {
    // insert new post on front of existing posts
    const posts = [
      {
        message: post.message,
        reate_time: String(new Date()),
        is_published: post.published,
        id: uuid.v4(),
        insights: {
          data: [
            {
              name: 'post_impressions',
              values: [
                { value: 0 },
              ],
            },
          ],
        },
      },
      ...this.state.posts,
    ];

    this.setState({
      ...this.state,
      posts,
    });
  }

  //
  // render
  //

  render() {
    let pageBody;
    if (this.state.pages.length > 0 && this.state.current !== null) {
      const curPage = this.state.pages[this.state.current];

      let posts;
      if (this.state.posts.length > 0) {
        posts = (
          <Block className="e-row">
            <Block className="brick brick-12">
              {this.state.posts.map((post) => <Post key={post.id} post={post} />)}
            </Block>
          </Block>
        );
      } else {
        posts = (
          <Block className="brick brick-12 e-h-center e-margin-top-50">
            <Progress id="loading-spinner" type="circle" />
          </Block>
        );
      }

      pageBody = (
        <div>
          <TitleBar
            pages={this.state.pages}
            current={this.state.current}
            onPageChanged={this.onPageSelected}
            onLogoutRequest={this.props.onLogoutRequest}
          />
          <PostComposer page={curPage} fb={this.FB} onDidPost={this.onDidPost} />
          {posts}
        </div>
      );
    }

    return (
      <div id="page-window">
        {pageBody}
      </div>
    );
  }
}

