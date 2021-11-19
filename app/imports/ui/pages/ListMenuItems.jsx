import React from 'react';
import { Container, Card, Image } from 'semantic-ui-react';

/** Renders the Profile Collection as a set of Cards. */
export default class ListMenuItems extends React.Component {

  /** Render the page once subscriptions have been received. */
  render() {
    return (
      <Container id="profiles-page">
        <Card.Group>
          <Card>
            <Card.Content>
              <Image floated='right' size='large' src="https://s3.amazonaws.com/PandaExpressWebsite/Responsive/img/food/thumbnails/grid_BroccoliBeef.jpg"/>
              <Card.Header>Broccoli Beef</Card.Header>
              <Card.Meta>
                <span className='date'>Panda Express</span>
              </Card.Meta>
              <Card.Description>
                A classic favorite. Tender beef and fresh broccoli in a ginger soy sauce.
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>
    );
  }
}
