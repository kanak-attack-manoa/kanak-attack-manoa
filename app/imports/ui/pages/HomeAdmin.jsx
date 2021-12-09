import React from 'react';
import { Container, Table, Header, Grid, Icon } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import UsersAdmin from '../components/UsersAdmin';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class HomeAdmin extends React.Component {
  // Render the page once subscriptions have been received.
  render() {
    return (
      <Container style={ { padding: '10px 0px 0px 0px' } } >
        <Grid id='admin-home' verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={4}>
            <Icon inverted size='massive' name='address book'/>
          </Grid.Column>

          <Grid.Column width={8}>
            <h1 style={ { padding: '10px 0px 0px 0px', color: 'white', fontSize: '30px' }}>Welcome to Admin</h1>
            <h4 style={{ color: 'white' }}>As administrator, you can handle user profiles and define users as having the vendor role</h4>
          </Grid.Column>

        </Grid>
        <Header as="h2" textAlign="center" inverted>Manage Accounts</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>User ID</Table.HeaderCell>
              <Table.HeaderCell>Add as Vendor</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.users.map((user) => <UsersAdmin key={user._id} user={user} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// {Meteor.users.find().map((user) => <UsersAdmin key={user._id} user={user} />)}
// Require an array of User documents in the props.
HomeAdmin.propTypes = {
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Users documents.
  const subscription = Meteor.subscribe(Meteor.users.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the User documents
  const users = Meteor.users.find({}).fetch();
  return {
    users,
    ready,
  };
})(HomeAdmin);
