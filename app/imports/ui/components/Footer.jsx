import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
      <footer>
        <div style={divStyle} className="ui center aligned container">
          <hr />
              Department of Broke da Mouth Grinds <br />
              University of Hawaii<br />
              Honolulu, HI 96822 <br />
          <a href="https://kanak-attack-manoa.github.io/">Kanak Attack Website Page</a>
        </div>
      </footer>
    );
  }
}

export default Footer;
