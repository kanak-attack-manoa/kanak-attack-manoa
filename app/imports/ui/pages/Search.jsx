import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image, Label, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { AutoForm, SubmitField, TextField } from 'uniforms-semantic';
import { MenuItem } from '../../api/menuitem/MenuItem';

function getMenuItemData(email) {
  const data = MenuItem.collection.findOne({ email });
  const ingredients = _.pluck(MenuItem.collection.find({ menuItem: email }).fetch(), 'ingredients');
  const images = _.pluck(MenuItem.collection.find({ menuItem: email }).fetch(), 'image');
  const prices = _.pluck(MenuItem.collection.find({ menuItem: email }).fetch(), 'price');
  const vendors = _.pluck(MenuItem.collection.find({ menuItem: email }).fetch(), 'vendor');
  const names = _.pluck(MenuItem.collection.find({ menuItem: email }).fetch(), 'name');
  return _.extend({ }, data, { ingredients, images, prices, vendors, names });
}

/** Component for layout out a Profile Card. */
const MenuItems = (props) => (
  <Card>
    <Card.Content>
      <Image floated='right' size='mini' src={props.menuItem.image} />
      <Card.Header>{props.menuItem.name}</Card.Header>
      <Card.Meta>
        <span className='date'>{props.menuItem.vendor}</span>
      </Card.Meta>
      <Card.Description>
        {props.menuItem.price}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      {_.map(props.menuItem.ingredients,
        (ingredient, index) => <Label key={index} size='tiny' color='teal'>{ingredient}</Label>)}
    </Card.Content>
  </Card>
);

/** Properties */
MenuItems.propTypes = {
  menuItem: PropTypes.object.isRequired,
};

/** Renders the Profile Collection as a set of Cards. */
class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = { prices: [] };
  }

  submit(data) {
    this.setState({ prices: data.prices || [] });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const emails = _.pluck(MenuItem.collection.find({ prices: { $in: this.state.ingredients } }).fetch(), 'menuItem');
    const menuItemData = _.uniq(emails).map(email => getMenuItemData(email));
    return (
      <Container id="filter-page">
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)} >
          <Segment>
            <TextField id='prices' name='prices' showInlineError={true} placeholder={'Prices'}/>
            <SubmitField id='submit' value='Submit'/>
          </Segment>
        </AutoForm>
        <Card.Group style={{ paddingTop: '10px' }}>
          {_.map(menuItemData, (menuItem, index) => <MenuItem key={index} profile={menuItem}/>)}
        </Card.Group>
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Search.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(MenuItem.userPublicationName);
  return {
    ready: sub1.ready(),
  };
})(Search);
