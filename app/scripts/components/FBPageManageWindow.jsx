import React from 'react';
import { Block } from 'essence-core';
import FBPageListBar from './FBPageListBar';
import FBPostSection from './FBPostSection';
import FBPost from './FBPost';

const REQUIRE_POST_FIELDS = [
  'message',
  'picture',
  'created_time',
  'insights',
  'is_published',
].join(',');

export default class FBPageManageWindow extends React.Component {
  static propTypes = {
    // Required
    fb: React.PropTypes.object.isRequired,
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
          this.pageSelected(0);
        }
      });
  }

  state = {
    pages: [],
    current: 0,
    posts: [],
  }

  //
  // event handlers
  //

  pageSelected = (index) => {
    const page = this.state.pages[index];
    if (!page) {
      throw new Error('index out of range');
    }

    this.FB.api(
      `/${page.id}/promotable_posts`,
      'GET',
      {
        include_hidden: true,
        fields: REQUIRE_POST_FIELDS,
      },
      (response) => {
        this.setState({
          ...this.state,
          current: index,
          posts: response.data,
        });
      }
    );
  }

  posted = (post) => {
    // insert new post on front of existing posts
    const posts = [
      {
        message: post.message,
        reate_time: String(new Date()),
        is_published: post.publish,
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
    if (this.state.pages.length > 0) {
      const curPage = this.state.pages[this.state.current];

      let posts;
      if (this.state.posts.length > 0) {
        posts = (
          <Block classes="e-row">
            <Block classes="brick brick-12">
              {
                this.state.posts.map(
                  (post, index) => <FBPost key={index} post={post} />
                )
              }
            </Block>
          </Block>
        );
      }

      pageBody = (
        <div>
          <FBPostSection page={curPage} fb={this.FB} posted={this.posted} />
          {posts}
        </div>
      );
    }

    return (
      <div>
        <FBPageListBar pages={this.state.pages} current={this.state.current} />
        {pageBody}
      </div>
    );
  }
}

