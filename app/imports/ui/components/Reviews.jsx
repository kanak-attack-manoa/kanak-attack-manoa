import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Reviews extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.review.name}</Card.Header>
          <Card.Meta>
            <div>
              <Icon name='star' />{this.props.review.rating} Stars
            </div>
          </Card.Meta>
          <Card.Description>
            {this.props.review.description}
          </Card.Description>
          <Card.Content extra>
            <div>
              <div>{this.props.review.createdAt.toString()}</div>
            </div>
          </Card.Content>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Reviews.propTypes = {
  review: PropTypes.object.isRequired,
  vendor: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Reviews);
