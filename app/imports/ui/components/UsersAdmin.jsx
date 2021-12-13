import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

/** Renders a single row in the list users associated with admin home page. See pages/HomeAdmin.jsx. */
class UsersAdmin extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.user.username}</Table.Cell>
        <Table.Cell>{this.props.user._id}</Table.Cell>
        <Table.Cell>
          <Button icon onClick={ () => {
            Meteor.call('addUserRoleVendor', this.props.user._id, (error) => {
              if (error) {
                swal('Error', error.message, 'error');
              } else {
                swal('Success', 'Vendor role added successfully', 'success');
              }
            });
          }}><Icon name='add'/> </Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Roles.createRole('vendor', { unlessExists: true }); Roles.addUsersToRoles(this.props.user._id, 'vendor'); }
UsersAdmin.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default UsersAdmin;
