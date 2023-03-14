import { useState, useEffect } from 'react';
import axios from 'axios';

function RedditFeed(props) {
  const [feedData, setFeedData] = useState([]);
  const [isLoading, setLoadingStatus] = useState(false);
  const category = props.category || 'popular'

  useEffect(() => {
    setLoadingStatus(true);

    axios
      .get(`https://www.reddit.com/r/${category}.json`)
      .then((response) => {
        setFeedData(response.data.data.children)
        setLoadingStatus(false);
      })
      .catch((error) => console.error(error))
  }, [category])

  return (
    <>
      {isLoading
        ? (<div className="spinner-border" role="status"></div>)
        : (<ul>
            {feedData.map(((item) => {
              if (!item) return '...'
              return (<li key={item.data.id}>
                <a href={`https://reddit.com${item.data.permalink}`} target="_blank" rel="noreferrer">
                  {item.data.title}
                </a>
              </li>)
            }))}
          </ul>)
      }
    </>
  )
}

export default RedditFeed;
