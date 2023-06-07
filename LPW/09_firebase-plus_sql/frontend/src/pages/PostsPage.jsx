import { useState, useEffect } from 'react'
import { useApi } from './../contexts/ApiContext';
import { useScrollPosition } from './../contexts/ScrollContext';

import Post from './../components/Post';

const PostsPage = () => {
  const { api } = useApi()
  const { isEndOfScroll } = useScrollPosition();

  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [postsList, setPostslist] = useState([]);
  const [currPage, setCurrPage] = useState(1)

  const getPosts = async (toPage = 1) => {
    setIsPostsLoading(true);
    if (toPage > 1) setIsLoadMore(true);
    const path = `posts/?limit=20&page=${toPage}`;
    const { data: { results, page } } = await api.get(path);
    setPostslist([...postsList, ...results]);
    setCurrPage(page);
    setIsLoadMore(false);
    setIsPostsLoading(false);
  } 

  useEffect(() => { getPosts() }, []);

  useEffect(() => {
    if (isEndOfScroll && !isLoadMore && !isPostsLoading) {
      setCurrPage((prevPage) => prevPage + 1);
      getPosts(currPage + 1);
    }
  }, [isEndOfScroll]);

  return <>
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      {isPostsLoading ? 'loading...' : (<ul className='flex-col flex gap-4'>
        {postsList.map((post, i) => (<li key={i}>
          <Post post={post} />
        </li>))}
      </ul>)}
      {isLoadMore ? 'Loading more...' : null}
    </div>
  </>
}

export default PostsPage
