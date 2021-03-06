import React from 'react';
import { connect } from 'react-redux';
import { Errors } from 'react-redux-form';

import { addMessage, removeMessage } from '../reduxModules/errorMessage';


class StatefulError extends React.Component {

  componentDidMount() {
    const { dispatch, messages, model, id } = this.props;
    dispatch(addMessage(model, messages, id));
  }

  componentWillUnmount() {
    const { dispatch, model } = this.props;
    dispatch(removeMessage(model));
  }

  render() {
    const { model, id, messages, showMessagesDuringFocus } = this.props;

    return (
      <Errors
        model={model}
        show={(field) => field.touched && (showMessagesDuringFocus || !field.focus)}
        messages={messages}
        wrapper={({ children }) => {
          if (!children.length) {
            return null;
          }

          return (
            <a className="validation-message" href={`#${id}`}>
              <span className="visuallyhidden">Validation Error: </span>
              {children}
            </a>
          )
        }}
      />
    )
  }

};

StatefulError.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  id:       React.PropTypes.string.isRequired,
  messages: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  model:    React.PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  }
}

export default connect(mapStateToProps)(StatefulError);
