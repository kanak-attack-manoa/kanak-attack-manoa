import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MenuItems extends React.Component {
  render() {
    return (
      <Card>
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
      </Card>
    );
  }
}

// Require a document to be passed to this component.
MenuItems.propTypes = {
  menuItem: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(MenuItems);
