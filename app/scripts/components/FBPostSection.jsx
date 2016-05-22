import React from 'react';
import { Block } from 'essence-core';
import Btn from 'essence-button';
import Icon from 'essence-icon';
import Input from 'essence-input';
import Progress from 'essence-progress';
import Switch from 'essence-switch';
import classnames from 'classnames';
import getPublishIconName from '../util/getPublishIconName';

class WorkaroundInput extends Input {
  componentWillReceiveProps(nextProps) {
    this.setState({
      classes: classnames('e-input-group', nextProps.className, nextProps.classes),
      inputValue: nextProps.value,
    });
  }
}

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
    posting: false,
  }

  //
  // event handlers
  //

  textChanged = (event) =>
    this.setState({ ...this.state, text: event.target.value })

  publishToggled = () =>
    this.setState({ ...this.state, publish: !this.state.publish })

  submit = () => {
    const post = {
      message: this.state.text,
      published: this.state.publish,
    };

    this.setState({ ...this.state, posting: true });

    this.FB.api(
      `/${this.page.id}/feed`,
      'POST',
      {
        ...post,
        access_token: this.page.access_token,
      },
      (response) => {
        if (!response.error) {
          // clear text and unset posting flag
          this.setState({ ...this.state, text: '', posting: false });
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
        <Progress type="slider" color={this.state.posting ? '' : 'transparent'} />
        <WorkaroundInput
          type="textarea"
          name="label"
          rows={5}
          placeholder="Edit Post Content"
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
            disabled={this.state.text.length === 0 || this.state.posting}
          />
          <Icon
            name={getPublishIconName(this.state.publish)}
            className="e-text-indigo-500"
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

