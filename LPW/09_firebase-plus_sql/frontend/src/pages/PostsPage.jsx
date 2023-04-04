import { useState, useEffect } from 'react'
import { useApi } from './../contexts/ApiContext';
import Post from './../components/Post';

const PostsPage = () => {
  const { api } = useApi()
  const [isPostsLoading, setIsPostsLoading] = useState(false)
  const [postsList, setPostslist] = useState([])

  const getPosts = async () => {
    setIsPostsLoading(true)
    const { data } = await api.get('posts/')
    setPostslist(data)
    setIsPostsLoading(false)
  } 

  useEffect(() => {
    getPosts()
  }, [])

  return <>
    {isPostsLoading ? 'loading...' : (<ul>
      {postsList.map(({ content, date }, i) => (<li key={i}>
        <Post content={content} date={date} />
      </li>))}
    </ul>)}
  </>
}

export default PostsPage
