import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Vendors } from '../../api/vendor/Vendor';

const bridge = new SimpleSchema2Bridge(Vendors.schema);

/** Renders the Page for editing a single vendor. */
class EditVendor extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { name, description, image, _id } = data;
    Vendors.collection.update(_id, { $set: { name, description, image } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Vendor updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid id="edit-vendor" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Edit Vendor</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <TextField name='name'/>
              <TextField name='description'/>
              <TextField name='image'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
              <HiddenField name='owner' />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Vendor document in the props object. Uniforms adds 'model' to the props, which we use.
EditVendor.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Vendors documents.
  const subscription = Meteor.subscribe(Vendors.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the vendor
  const doc = Vendors.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditVendor);
