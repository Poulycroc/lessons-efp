import React from 'react'
import { Link, useParams } from 'react-router-dom'
import RedditFeed from './../components/RedditFeed'

function FeedPage() {
  const { category } = useParams()

  return (
    <div className="container">
      <Link to='/feed'>Default</Link><br />
      <Link to='/feed/starcraft'>Starcraft</Link><br/>
      <Link to='/feed/facepalm'>Facepalm</Link>
      <h1>Feed</h1>
      <RedditFeed category={category} />
    </div>
  );
};

export default FeedPage;

