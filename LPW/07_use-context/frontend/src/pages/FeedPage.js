import React from 'react';
import { Link, useParams } from 'react-router-dom';
import RedditFeed from './../components/RedditFeed';

function FeedPage() {
  const { category } = useParams();

  return (
    <div className="container">
      <div className="d-flex justify-content-center mt-4">
        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-secondary">
            <Link to='/feed/starcraft'>StarCraft</Link>
          </button>
          <button type="button" className="btn btn-secondary">
            <Link to='/feed/facepalm'>Facepalm</Link>
          </button>
        </div>
      </div>
      <div className="title-section d-flex justify-content-start align-items-center">
        <h1>Feed</h1>
        {category ? (<span className="ps-8 badge text-bg-secondary">{category}</span>) : null}
      </div>
      <RedditFeed category={category} />
    </div>
  );
}

export default FeedPage;
