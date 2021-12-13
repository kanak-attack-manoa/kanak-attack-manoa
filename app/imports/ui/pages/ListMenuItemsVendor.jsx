import React from 'react';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import MenuItems from '../components/MenuItems';
import { MenuItem } from '../../api/menuitem/MenuItem';
import { Vendors } from '../../api/vendor/Vendor';

/** Renders the Vendor specific MenuItems associated to linked vendor collection as a set of Cards. */
class ListMenuItemsVendor extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const vendorName = this.props.name.name;
    const vendorMenu = MenuItem.collection.find({ vendor: vendorName }).fetch();
    return (
      <Container id="vendor-menu">
        <h1 style={{ color: 'white' }}>{this.props.name.name}</h1>
        <Card.Group centered>
          {_.map(vendorMenu, (menuItem, index) => <MenuItems key={index} menuItem={menuItem} />)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Menu documents in the props.
ListMenuItemsVendor.propTypes = {
  name: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get access to MenuItems and Vendors documents.
  // use the url to access the document in the collection of vendors
  const documentId = match.params._id;
  const subscription1 = Meteor.subscribe(MenuItem.userPublicationName);
  const subscription2 = Meteor.subscribe(Vendors.userPublicationName);
  const ready = subscription2.ready() && subscription1.ready();
  // pluck the name field from the document
  const name = Vendors.collection.findOne(documentId);
  return {
    name,
    ready,
  };
})(ListMenuItemsVendor);
