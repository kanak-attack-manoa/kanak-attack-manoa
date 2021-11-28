import React from 'react';
import { Grid, Icon, Header, Comment, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const commentStyle = { color: 'white' };
    const imageStyle = { height: '200px', padding: '10px 0px 0px 0px' };
    const reviewStyle = { padding: '40px 0px 0px 0px' };
    return (
      <div className="kanak-attack-landing-background">
        <div>
          <Grid container centered>
            <Grid.Row>
              <Image src='https://www6.pbrc.hawaii.edu/logos/manoaseal_transparent.png' size='small' />
            </Grid.Row>
            <Grid.Row textAlign="center">
              <Header as='h1' inverted style={ { fontSize: '40px' } }>Welcome to Kanak Attack Manoa</Header>
              <Header as='h3' inverted>The slang term, Kanak Attack, with the shortened ”Kanak” from ”Kanaka”
                may have been coined from the resulting effect one feels after eating all the
                “onolicious” (delicious) food offered at a traditional Hawaiian Luau.</Header>
            </Grid.Row>
          </Grid>
        </div>

        <Grid container centered stackable columns={3} style={reviewStyle}>

          <Grid.Column textAlign="center">
            <Icon size='huge' name="utensils" inverted/>
            <Header as='h1' inverted>Vendors</Header>
            <Header as='h4' inverted>Vendors at the UH Manoa Campus can update their specials, menu items,
              menu item ingredients and much much more!!</Header>
          </Grid.Column>

          <Grid.Column textAlign="center">
            <Icon size='huge' name="users" inverted/>
            <Header as='h1' inverted>Users</Header>
            <Header as='h4' inverted>Users have the ability to search for different
              types of cuisine, ingredients or dietary choices. We hope to align our users
              with the best local choice for their kanak attack needs.</Header>
          </Grid.Column>

          <Grid.Column textAlign="center">
            <Icon size='huge' name="bullhorn" inverted/>
            <Header as='h1' inverted>Never Miss a Kanak Attack</Header>
            <Header as='h4' inverted>Stay alerted with new menu items and new specials from your
              favorite vendors. Review and rate your favorite vendors.</Header>
          </Grid.Column>

          <Grid container centered style={reviewStyle}>
            <Grid.Row>
              <Comment.Group size='large' >
                <Comment>
                  <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/steve.jpg' />
                  <Comment.Content>
                    <Comment.Author style={commentStyle}>Phillip Johnson (MD)</Comment.Author>
                    <Comment.Metadata>
                      <div style={commentStyle}>2 days ago</div>
                      <div>
                        <Icon style={commentStyle} name='star' inverted/>
                        <Icon style={commentStyle} name='star' inverted />
                        <Icon style={commentStyle} name='star' inverted />
                        <Icon style={commentStyle} name='star' inverted />
                        <Icon style={commentStyle} name='star' inverted />
                      </div>
                    </Comment.Metadata>
                    <Comment.Text style={commentStyle}>
                      Hoooo brah! I cannot wait for more kanaks!!!
                    </Comment.Text>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            </Grid.Row>
          </Grid>
        </Grid>
        <div>
          <Image fluid src='images/food.png' style={imageStyle}/>
        </div>
      </div>
    );
  }
}

export default Landing;
