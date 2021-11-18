import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { MenuItems } from '../../api/menuitem/MenuItems';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  ingredients: String,
  cuisineType: {
    type: String,
    allowedValues: ['American', 'Chinese', 'Hawaiian', 'Thai', 'Italian', 'Seafood', 'Vegetarian', 'Desert', 'Snack', 'Other'],
    defaultValue: 'Other',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddMenuItem extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, ingredients, cuisineType } = data;
    const owner = Meteor.user().username;
    MenuItems.collection.insert({ name, ingredients, cuisineType, owner },
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
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Menu Item</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='name'/>
              <TextField name='ingredients' placeholder='tomato, lettuce, onion, beef, beets, brains'></TextField>
              <SelectField name='cuisineType'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddMenuItem;
