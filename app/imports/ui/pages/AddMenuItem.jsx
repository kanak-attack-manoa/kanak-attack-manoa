import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { MenuItem } from '../../api/menuitem/MenuItem';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  image: String,
  vendor: String,
  price: Number,
  ingredients: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a MenuItem. */
class AddMenuItem extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, image, vendor, price, ingredients } = data;
    const owner = Meteor.user().username;
    MenuItem.collection.insert({ name, image, vendor, price, ingredients, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Menu Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid id="add-menu-item" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" style={{ color: 'white' }}>Add Menu Item</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField id="name" name='name'/>
              <TextField id="image" name='image'/>
              <TextField id="vendor" name='vendor'/>
              <NumField id="price" name='price'/>
              <TextField id="ingredients" name='ingredients' placeholder='tomato, lettuce, onion, beef, beets, brains'/>
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
