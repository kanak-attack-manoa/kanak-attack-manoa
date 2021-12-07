import React from 'react';
import { Comment, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { HiddenField } from 'uniforms-semantic';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Reviews extends React.Component {
  render() {
    return (
      <Comment>
        <Comment.Content>
          <Comment.Author>{this.props.review.name}</Comment.Author>
          <Comment.Metadata>
            <div>
              <div>{this.props.review.createdAt}</div>
            </div>
            <div>
              <Icon name='star' />{this.props.review.rating} Faves
            </div>
          </Comment.Metadata>
          <Comment.Text>
            {this.props.review.description}
          </Comment.Text>
          <HiddenField name="vendorId">
            {this.props.vendor._id}
          </HiddenField>
        </Comment.Content>
      </Comment>
    );
  }
}

// Require a document to be passed to this component.
Reviews.propTypes = {
  review: PropTypes.object.isRequired,
  vendor: PropTypes.string.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Reviews);
