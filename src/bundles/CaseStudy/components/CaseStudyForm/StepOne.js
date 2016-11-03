import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-redux-form';

import { required, validLinks } from '../../../../validators';

import Layout from '../../../../shared/Layout';

import ErrorBox      from '../../../../shared/form/ErrorBox';
import MultiInput    from '../../../../shared/form/MultiInput';
import Textarea      from '../../../../shared/form/Textarea';
import Textfield     from '../../../../shared/form/Textfield';

import { navigateStep } from '../../../../shared/reduxModules/form_options';

import StepSidebar from './StepSidebar';

class StepOne extends React.Component {

  componentDidMount() {
    this.props.dispatch(navigateStep(1));
  }

  render() {
    const { 
      action,
      csrf_token,
      model,
      returnLink,
      mode,
      onClick,
      attachNode,
      sidebarOptions
    } = this.props;

    return (
      <Layout>
        <header>
          <h1>{mode === 'edit' ? 'Edit' : 'Add'} case study</h1>
          <p>Show the range of skills and experience you can provide by completing the form below.</p>
        </header>
        <StepSidebar items={sidebarOptions} />
        <article role="main" className="content-main">

          <ErrorBox focusOnMount={true} model={model} />

          <Form model={model}
            action={action}
            method="post"
            id="casestudy__create"
            ref={attachNode}
          >
            {csrf_token && (
              <input type="hidden" name="csrf_token" id="csrf_token" value={csrf_token} />
            )}
            <Textfield
              model={`${model}.title`}
              name="title"
              id="title"
              htmlFor="title"
              label="Give your case study a title"
              validators={{ required }}
              messages={{
                required: 'Title is required',
              }}
            />

            <Textfield
              model={`${model}.client`}
              name="client"
              id="client"
              htmlFor="client"
              label="Who was the client?"
              validators={{ required }}
              messages={{
                required: 'Client is required',
              }} />

            <Textfield
              model={`${model}.timeframe`}
              name="timeframe"
              id="timeframe"
              htmlFor="timeframe"
              label="What was the time frame?"
              description="For example,  January 2016 — June 2016"
              validators={{ required }}
              messages={{
                required: 'Timeframe is required',
              }}
            />

            <Textarea
              model={`${model}.opportunity`}
              name="opportunity"
              id="opportunity"
              controlProps={{ limit: 200 }}
              label="Outline the problem or opportunity"
              description="Describe the project goal and any relevant background information."
              messages={{
                required: 'You must outline the opportunity'
              }}
              validators={{ required }}
            />

            <Textarea
              model={`${model}.approach`}
              name="approach"
              id="approach"
              controlProps={{ limit: 200 }}
              label="Describe your approach"
              description="How did your capabilities and methods contribute to achieving the project goals?"
              messages={{
                required: 'You must outline your approach'
              }}
              validators={{ required }}
            />

            <MultiInput
              id="outcome"
              model={`${model}.outcome`}
              name="outcome"
              htmlFor="outcome"
              label="What was the outcome?"
              controlProps={{ defaultRows: 2 }}
              description="List the key achievements of this project."
              messages={{ required: 'You must provide at least one outcome.' }}
              validators={{ required }}
            />

            <MultiInput
              id="projectLinks"
              model={`${model}.projectLinks`}
              name="projectLinks"
              htmlFor="projectLinks"
              label="Project links"
              controlProps={{ defaultRows: 2 }}
              description="Link to any supporting material for your case study. This can include a case study on your  website, case study video or the live project."
              messages={{ validLinks: 'All links provided must begin with \'http\'' }}
              validators={{ validLinks }}
            />

            <input type="submit" value='Save &amp; Continue' role="button" onClick={onClick} />
          </Form>
          {returnLink && <a href={returnLink}>Return without saving</a>}
        </article>
      </Layout>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  }
}

export default connect(mapStateToProps)(StepOne);