import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { MenuItem } from '../../api/menuitem/MenuItem';
import MenuItemsAdmin from '../components/MenuItemsAdmin';

/** Renders the MenuItems Collection by vendor with option to edit as a set of Cards. Use <MenuItemsAdmin> to render */
class ListMenuItemsVendors extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
      <Container id="list-menu-items-vendor">
        <Card.Group centered>
          {this.props.menuItem.map((menuItem, index) => <MenuItemsAdmin
            key={index}
            menuItem={menuItem}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of MenuItem documents in the props.
ListMenuItemsVendors.propTypes = {
  menuItem: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to MenuItem documents.
  const subscription = Meteor.subscribe(MenuItem.vendorPublicationName);
  return {
    menuItem: MenuItem.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListMenuItemsVendors);
