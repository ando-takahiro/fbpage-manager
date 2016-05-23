import React from 'react';
import { Block } from 'essence-core';
import Btn from 'essence-button';
import Icon from 'essence-icon';
import Input from 'essence-input';
import Progress from 'essence-progress';
import Switch from 'essence-switch';
import classnames from 'classnames';
import getPublishIconName from '../util/getPublishIconName';

// Essence's Input has a bug that does not relay value property to state.inputValue.
// If we set value attribute to <Input> tag, that does not cause any changes.
// This class is a workaround for it.
class WorkaroundInput extends Input {
  componentWillReceiveProps(nextProps) {
    this.setState({
      classes: classnames('e-input-group', nextProps.classes, nextProps.classes),
      inputValue: nextProps.value,
    });
  }
}

export default class PostComposer extends React.Component {
  static propTypes = {
    // Required
    fb: React.PropTypes.object.isRequired,
    page: React.PropTypes.object.isRequired,
    onDidPost: React.PropTypes.func.isRequired,
  }

  //
  // initializers
  //

  constructor(props) {
    super(props);

    this.FB = props.fb;
    this.page = props.page;
    this.onDidPost = props.onDidPost;
  }

  state = {
    text: '',
    publish: false,
    posting: false,
  }

  //
  // event handlers
  //

  onTextChanged = (event) =>
    this.setState({ ...this.state, text: event.target.value })

  onPublishClicked = () =>
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
        this.setState({ ...this.state, text: '', posting: false });
        if (!response.error) {
          // clear text and unset posting flag
          this.onDidPost(post);
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
          onChange={this.onTextChanged}
        />
        <Block className="brick brick-12">
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
            onChange={this.onPublishClicked}
          />
        </Block>
      </div>
    );
  }
}
