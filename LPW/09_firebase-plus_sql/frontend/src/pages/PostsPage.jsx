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
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      {isPostsLoading ? 'loading...' : (<ul className='flex-col flex gap-4'>
        {postsList.map((post, i) => (<li key={i}>
          <Post post={post} />
        </li>))}
      </ul>)}
    </div>
  </>
}

export default PostsPage
