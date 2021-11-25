import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class UsersAdmin extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.user.username}</Table.Cell>
        <Table.Cell>{this.props.user._id}</Table.Cell>
        <Table.Cell>
          <Button icon onClick={ () => { Roles.createRole('vendor', { unlessExists: true }); Roles.addUsersToRoles(this.props.user._id, 'vendor'); } }><Icon name='add'/></Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

UsersAdmin.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    _id: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default UsersAdmin;
