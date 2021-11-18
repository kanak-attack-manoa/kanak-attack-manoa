import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Grid, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import StuffItemAdmin from '../components/StuffItemAdmin';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class HomeAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container style={ { padding: '10px 0px 0px 0px' } } >
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={4}>
            <Icon inverted size='massive' name='address book'/>
          </Grid.Column>

          <Grid.Column width={8}>
            <h1 style={ { padding: '10px 0px 0px 0px', color: 'white', fontSize: '30px' }}>Welcome to Admin</h1>
            <h4 inverted style={{ color: 'white'}}>As administrator, you can handle user profiles and define users as having the vendor role</h4>
          </Grid.Column>

        </Grid>
        <Header as="h2" textAlign="center" inverted>Manage Accounts</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Add as Vendor</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.stuffs.map((stuff) => <StuffItemAdmin key={stuff._id} stuff={stuff} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
HomeAdmin.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const stuffs = Stuffs.collection.find({}).fetch();
  return {
    stuffs,
    ready,
  };
})(HomeAdmin);
