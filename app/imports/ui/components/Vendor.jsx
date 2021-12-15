import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Card, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Vendors } from '../../api/vendor/Vendor';

/** Renders a card representing the profile of a vendor. Use <Vendor> to render each card. */
class Vendor extends React.Component {

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
          <Link id="vendor-menu" to={`/list/${this.props.vendor._id}`}>Menu</Link>
        </Card.Content>
        <Card.Content extra>
          <Link id="add-review" to={`/add-review/${this.props.vendor._id}`}>Tell them What You think!</Link>
        </Card.Content>
        <Card.Content extra>
          <Link id="list-reviews" to={`/list-reviews/${this.props.vendor._id}`}>What others are saying!!</Link>
        </Card.Content>
      </Card>
    );
  }
}

// Require an array of Vendor documents in the props.
Vendor.propTypes = {
  vendor: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Vendor documents.
  const subscription = Meteor.subscribe(Vendors.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Vendor documents
  const vendors = Vendors.collection.find({}).fetch();
  return {
    vendors,
    ready,
  };
})(Vendor);
