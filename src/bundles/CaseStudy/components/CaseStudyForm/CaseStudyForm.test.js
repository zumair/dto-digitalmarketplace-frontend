import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { actions } from 'react-redux-form';

import CaseStudyForm, { mapStateToProps, Form } from './CaseStudyForm';

import createStore from '../../redux/create'


const generateFormValidilityState = (valid) => {
  return {
    form: {
      forms: {
        caseStudyForm: {
          $form: { valid }
        }
      }
    }
  }
}

test('mapStateToProps', () => {
  let state = generateFormValidilityState(true);
  let props = mapStateToProps(state);
  expect(props).toEqual({ formValid: true });

  state = generateFormValidilityState(false);
  props = mapStateToProps(state);
  expect(props).toEqual({ formValid: false });
});

test('handleClick with formValid=false', () => {
  let store = createStore(Object.assign({}, { _serverContext: {} }))
  const wrapper = mount(
    <Provider store={store}>
      <Form />
    </Provider>
  )

  wrapper.find('input[type="submit"]').simulate('click')
  expect(store.getState().form.forms.caseStudyForm.$form.valid).toBeFalsy()
});