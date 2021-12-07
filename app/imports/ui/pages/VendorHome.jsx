import React from 'react';
import { Grid, Segment, Header, Container, Icon, Card } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Vendors } from '../../api/vendor/Vendor';
import OwnVendor from '../components/OwnVendor';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  description: String,
  image: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class VendorHome extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, description, image } = data;
    const owner = Meteor.user().username;
    Vendors.collection.insert({ name, description, image, owner },
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
      <Container>
        <Grid id='vendor-home' verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={4}>
            <Icon inverted size='massive' name='address book'/>
          </Grid.Column>

          <Grid.Column width={8}>
            <h1 style={ { padding: '10px 0px 0px 0px', color: 'white', fontSize: '30px' }}>Welcome vendor</h1>
            <h4 style={{ color: 'white' }}>As administrator, you can handle user profiles and define users as having the vendor role</h4>
          </Grid.Column>

        </Grid>
        <Header as="h2" textAlign="center" inverted>Your Profile</Header>
        <Card.Group>
          {this.props.vendors.map((vendor, index) => <OwnVendor
            key={index}
            vendor={vendor}/>)}
        </Card.Group>
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Create your Profile</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='name'/>
                <LongTextField name='description'/>
                <TextField name='image'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
VendorHome.propTypes = {
  vendors: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Vendors.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const vendors = Vendors.collection.find({}).fetch();
  return {
    vendors,
    ready,
  };
})(VendorHome);
