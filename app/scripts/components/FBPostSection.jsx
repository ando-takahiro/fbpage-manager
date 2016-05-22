import React from 'react';
import { Block } from 'essence-core';
import Btn from 'essence-button';
import Input from 'essence-input';
import Switch from 'essence-switch';

export default class FBPostSection extends React.Component {
  static propTypes = {
    // Required
    fb: React.PropTypes.object.isRequired,
    page: React.PropTypes.object.isRequired,
    posted: React.PropTypes.func.isRequired,
  }

  //
  // initializers
  //

  constructor(props) {
    super(props);

    this.FB = props.fb;
    this.page = props.page;
    this.posted = props.posted;
  }

  state = {
    text: '',
    publish: false,
  }

  //
  // event handlers
  //

  textChanged = (event) => {
    this.state.text = event.target.value;
  }

  publishToggled = () => {
    this.state.publish = !this.state.publish;
  }

  submit = () => {
    const post = {
      message: this.state.text,
      published: this.state.publish,
    };

    this.FB.api(
      `/${this.page.id}/feed`,
      'POST',
      {
        ...post,
        access_token: this.page.access_token,
      },
      (response) => {
        if (!response.error) {
          this.posted(post);
        } else {
          console.error(response.error);
        }
      }
    );
  }

  //
  // render
  //

  render() {
    return (
      <div>
        <Input
          type="textarea"
          name="label"
          rows={5}
          label="Edit Post Content"
          value={this.state.text}
          onChange={this.textChanged}
        />
        <Block classes="brick brick-12">
          <Btn
            label="Submit"
            ripple="true"
            type="primary"
            className="raised"
            onClick={this.submit}
          />
          <Switch
            type="checkbox"
            text="Publish"
            name="switch-uncheckbox"
            onChange={this.publishToggled}
          />
        </Block>
      </div>
    );
  }
}

