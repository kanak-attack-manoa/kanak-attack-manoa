import React from 'react';
import { Grid, Icon, Header, Comment } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className="kanak-attack-landing-background">
        <Grid container centered stackable columns={3}>

          <Grid.Column textAlign="center">
            <Icon size='huge' name="utensils" inverted/>
            <Header as='h1' inverted>Vendors</Header>
            <Header as='h3' inverted>Vendors can update their specials, menu items,
              menu item ingredients and much much more!!</Header>
          </Grid.Column>

          <Grid.Column textAlign="center">
            <Icon size='huge' name="users" inverted/>
            <Header as='h1' inverted>Users</Header>
            <Header as='h3' inverted>Users will have the ability to search for different
              types of cuisine, ingredients or dietary choices. We hope to align our users
              with the best local choice for their kanak attack needs.</Header>
          </Grid.Column>

          <Grid.Column textAlign="center">
            <Icon size='huge' name="bullhorn" inverted/>
            <Header as='h1' inverted>Never miss a Kanak Attack</Header>
            <Header as='h3' inverted>Stay alerted with new menu items and new specials from your
              favorite vendors. Review and rate your favorite vendors.</Header>
          </Grid.Column>
        </Grid>
        <div>
          <Grid container centered>
            <Grid.Row>
              <Comment.Group className="landing-comments" size='massive' >
                <Comment>
                  <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                  <Comment.Content>
                    <Comment.Author>Phillip Johnson (MD)</Comment.Author>
                    <Comment.Text>
                    Hoooo brah! I cannot wait for more kanaks!!!
                    </Comment.Text>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            </Grid.Row>
            <Grid.Row>
              <img src="images/kanak-definition.png"/>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Landing;
