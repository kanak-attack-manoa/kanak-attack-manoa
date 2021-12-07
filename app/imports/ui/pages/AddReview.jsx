import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, HiddenField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Review } from '../../api/vendorreview/Review';

const formSchema = new SimpleSchema({
  name: String,
  vendorId: String,
  createdAt: Date,
  rating: {
    type: Number,
    allowedValues: [1, 2, 3, 4, 5],
    defaultValue: 4,
  },
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddReview extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, rating, vendorId, description, createdAt } = data;
    const owner = Meteor.user().username;
    Review.collection.insert({ name, vendorId, createdAt, rating, description, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid id="add-review" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add a review!</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField id="name" name='name' placeholder='use a nickname'/>
              <SelectField name='rating'/>
              <TextField id="description" name='description'/>
              <TextField id="vendorId" name='vendorId' placeholder='Panda Express'/>
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

export default AddReview;
