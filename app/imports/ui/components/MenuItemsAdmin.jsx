import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a MenuItem with a link so correct roles may edit. See pages/ListMenuItemsVendors.jsx. */
class MenuItemsAdmin extends React.Component {
  render() {
    return (
      <Card id="menu-item-admin">
        <Card.Content>
          <Image
            floated='right'
            size='large'
            src={this.props.menuItem.image}
          />
          <Card.Header>{this.props.menuItem.name}</Card.Header>
          <Card.Header>${this.props.menuItem.price}</Card.Header>
          <Card.Meta>{this.props.menuItem.vendor}</Card.Meta>
          <Card.Description>
            {this.props.menuItem.ingredients}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Link id="edit-menu-item-vendor" to={`/edit/${this.props.menuItem._id}`}>Edit</Link>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
MenuItemsAdmin.propTypes = {
  menuItem: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(MenuItemsAdmin);
