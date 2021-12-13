import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Card, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Vendors } from '../../api/vendor/Vendor';

/** Renders a card with each vendor document and provides a link to edit that vendor. Use <VendorAdmin> to render each card. */
class VendorAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Card centered>
        <Card.Content>
          <Image
            floated='right'
            size='small'
            src={this.props.vendor.image}
          />
          <Card.Header>{this.props.vendor.name}</Card.Header>
          <Card.Description>
            {this.props.vendor.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Link id="edit-vendor" to={`/edit-vendor/${this.props.vendor._id}`}>Edit</Link>
        </Card.Content>
      </Card>
    );
  }
}

// Require an array of Vendor documents in the props.
VendorAdmin.propTypes = {
  vendor: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Vendors documents.
  const subscription = Meteor.subscribe(Vendors.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Vendors documents
  const vendors = Vendors.collection.find({}).fetch();
  return {
    vendors,
    ready,
  };
})(VendorAdmin);
