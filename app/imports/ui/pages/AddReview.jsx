import React from 'react';
import { Grid, Segment, Header, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorsField, HiddenField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Review } from '../../api/vendorreview/Review';
import { Vendors } from '../../api/vendor/Vendor';

const formSchema = new SimpleSchema({
  name: String,
  createdAt: Date,
  rating: {
    type: Number,
    allowedValues: [1, 2, 3, 4, 5],
    defaultValue: 4,
  },
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a vendor review. */
class AddReview extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, rating, description, createdAt } = data;
    const owner = Meteor.user().username;
    Review.collection.insert({ name, createdAt, vendorId: this.props.vendor.name, rating, description, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Review added successfully', 'success');
          formRef.reset();
        }
      });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    let fRef = null;
    return (
      <Grid id="add-review" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" style={{ color: 'white' }}>Add a review!</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField id="name" name='name' placeholder='use a nickname'/>
              <SelectField name='rating'/>
              <TextField id="description" name='description'/>
              <HiddenField name='createdAt' value={new Date()}/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// vendor and review so the two can be connected
AddReview.propTypes = {
  vendor: PropTypes.object,
  review: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Review documents.
  const subscription1 = Meteor.subscribe(Review.userPublicationName);
  // Get access to Review documents.
  const subscription2 = Meteor.subscribe(Vendors.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription1.ready() && subscription2.ready();
  // Get the document
  const review = Review.collection.findOne(documentId);
  const vendor = Vendors.collection.findOne(documentId);
  return {
    review,
    vendor,
    ready,
  };
})(AddReview);
