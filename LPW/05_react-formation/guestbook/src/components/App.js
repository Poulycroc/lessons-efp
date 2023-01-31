import React from "react";

import Header from "./Header";
import CommentsList from "./CommentsList";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "Jhon",
    };
  }

  render() {
    return (
      <>
        <Header name={this.state.name} />
        <CommentsList />
      </>
    );
  }
}

export default App;
