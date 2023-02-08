import React from "react";

// import CommentsList from "./CommentsList";
import CommentsList from "./NewCommentList";
import Header from "./Header";

class App extends React.Component {
  render() {
    return (
      <>
        <Header userName="Jhon" />
        <CommentsList />
      </>
    );
  }
}

export default App;
