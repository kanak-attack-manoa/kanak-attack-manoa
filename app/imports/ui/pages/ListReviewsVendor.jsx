import React from 'react';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Reviews from '../components/Reviews';
import { Vendors } from '../../api/vendor/Vendor';
import { Review } from '../../api/vendorreview/Review';

/** Renders the Profile Collection as a set of Cards. */
class ListReviewsVendor extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  // Find some way to render Menu Items based on vendor?
  // use a separate function to filter items through vendor?
  renderPage() {
    // const vendorMenu = menuByVendor(this.props.menuItem);
    const vendorName = this.props.vendor.name;
    // console.log(this.props.name.name);
    const vendorReview = Review.collection.find({ vendorId: vendorName }).fetch();
    return (
      <Container id="list-reviews">
        <h1>{this.props.vendor.name} Review Page</h1>
        <Card.Group>
          {_.map(vendorReview, (review, index) => <Reviews key={index} review={review} vendor={this.props.vendor} />)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListReviewsVendor.propTypes = {
  vendor: PropTypes.object,
  review: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  // use the url to access the document in the collection of vendors
  const documentId = match.params._id;
  // console.log(documentId);
  const subscription1 = Meteor.subscribe(Review.userPublicationName);
  const subscription2 = Meteor.subscribe(Vendors.userPublicationName);
  console.log(documentId);

  const ready = subscription2.ready() && subscription1.ready();
  // pluck the name field from the document
  // const name = Vendors.collection.findOne(documentId);
  // console.log(Vendors.collection.findOne(documentId));
  const vendor = Vendors.collection.findOne(documentId);
  console.log(vendor);
  return {
    // menuItem: Review.collection.find({}).fetch(),
    vendor,
    ready,
  };
})(ListReviewsVendor);
