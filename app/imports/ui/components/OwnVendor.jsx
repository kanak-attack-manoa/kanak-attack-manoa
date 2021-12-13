import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Card, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Vendors } from '../../api/vendor/Vendor';

/** Renders a profile card associated with the vendor. Use <OwnVendor> to render a vendor profile card. */
class OwnVendor extends React.Component {

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
            size='medium'
            src={this.props.vendor.image}
          />
          <Card.Header>{this.props.vendor.name}</Card.Header>
          <Card.Description>
            {this.props.vendor.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Link id="edit-vendor" to={`/edit-your-vendor/${this.props.vendor._id}`}>Edit</Link>
        </Card.Content>
      </Card>
    );
  }
}

// Require an array of Stuff documents in the props.
OwnVendor.propTypes = {
  vendor: PropTypes.object.isRequired,
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
})(OwnVendor);
