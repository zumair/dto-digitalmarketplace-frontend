import React from 'react';
import ReactDOM from 'react-dom';
import { actions } from 'react-redux-form';

class BaseForm extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    model: React.PropTypes.string.isRequired,
    serverRender: React.PropTypes.bool.isRequired,
    form: React.PropTypes.object.isRequired,

    formErrors: React.PropTypes.object,
  }

  state = {
    mounted: false
  }

  /**
   * We are calling this on `Will` instead of `Did` for server rendering purposes.
   * If there are formErrors available, set the appropriate errors and show them.
   * @return {void}
   */
  componentWillMount() {
    const { dispatch, formErrors, model, serverRender } = this.props;

    if (!formErrors || !serverRender) {
      return;
    }
    
    let errors = {};
    Object.keys(formErrors).forEach((key) => {
      errors[key] = {
        valid: false,
        errors: formErrors[key]
      }
    });

    dispatch(actions.setFieldsErrors(model, errors));
    dispatch(actions.setSubmitFailed(model));
  }

  componentDidMount() {
    const { dispatch, formErrors, model } = this.props;

    // Helpful with SPAs, changing of focus on route.
    this.setState({
      mounted: true
    })

    if (!formErrors) {
      return;
    }

    dispatch(actions.setSubmitFailed(model));
    dispatch(actions.setFieldsValidity(model, {}, { errors: true }));
  }

  attachNode(node) {
    this._form = ReactDOM.findDOMNode(node);  // eslint-disable-line react/no-find-dom-node
  }

}

export default BaseForm;