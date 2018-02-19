import React from 'react';

class Pages extends React.Component {

  handleSelectStep(step) {
    this.props.actions.selectStep(step);
  }

  render() {
    return (
        <h1>Pages</h1>
    );
  }
}

Pages.displayName = 'Pages';

export default Pages;
