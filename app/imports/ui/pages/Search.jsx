import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Container, Loader, Card, Image, Label, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { AutoForm, SubmitField, TextField } from 'uniforms-semantic';
import { MenuItem } from '../../api/menuitem/MenuItem';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allIngredients) => new SimpleSchema({
  ingredients: { type: Array, label: 'Ingredients', optional: true },
  'ingredients.$': { type: String, allowedValues: allIngredients },
});

function getMenuItemData(email) {
  const data = MenuItem.collection.findOne({ email });
  const ingredients = _.pluck(MenuItem.collection.find({ menuItem: email }).fetch(), 'ingredients');
  const images = _.pluck(MenuItem.collection.find({ menuItem: email }).fetch(), 'image');
  const prices = _.pluck(MenuItem.collection.find({ menuItem: email }).fetch(), 'price');
  const vendors = _.pluck(MenuItem.collection.find({ menuItem: email }).fetch(), 'vendor');
  return _.extend({ }, data, { ingredients, images, prices, vendors });
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
class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.state = { ingredients: [] };
  }

  submit(data) {
    this.setState({ ingredients: data.ingredients || [] });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const allIngredients = _.pluck(MenuItem.collection.find().fetch(), 'name');
    const formSchema = makeSchema(allIngredients);
    const bridge = new SimpleSchema2Bridge(formSchema);
    const emails = _.pluck(MenuItem.collection.find({ ingredients: { $in: this.state.ingredients } }).fetch(), 'menuItem');
    const menuItemData = _.uniq(emails).map(email => getMenuItemData(email));
    return (
      <Container id="filter-page">
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)} >
          <Segment>
            <TextField id='ingredients' name='ingredients' showInlineError={true} placeholder={'Ingredients'}/>
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
Filter.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(MenuItem.userPublicationName);
  return {
    ready: sub1.ready(),
  };
})(Filter);
