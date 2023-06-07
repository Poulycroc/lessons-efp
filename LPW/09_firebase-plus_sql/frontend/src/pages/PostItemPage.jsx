import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './../contexts/AuthContext';
import { useApi } from './../contexts/ApiContext';

import CommmentMaker from './../components/CommmentMaker'

const PostItemPage = () => {
  const { id } = useParams();
  const { api } = useApi();
  const { currentUser } = useAuth()

  const [post, setPost] = useState({});
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isPostCommentsLoading, setIsPostCommentsLoading] = useState(true);
  const [postComments, setPostComments] = useState([])

  /**
   * @param {Number|String} postId
   */
  const getFocusPost = async (postId) => {
    setIsPostLoading(true);
    try {
      const { data } = await api.get(`posts/${postId}/`)
      setPost(data);
    } catch (e) {
      console.log({ e })
      setError(e)
    }
    setIsPostLoading(false);
  }

  /**
   * @param {Number|String} postId
   */
  const getFocusPostCommentsList = async (postId) => {
    setIsPostCommentsLoading(true)
    try {
      const { data } = await api.get(`comments/post/${postId}`);
      setPostComments(data);
    } catch (e) {
      console.log({ e })
    }
    setIsPostCommentsLoading(false)
  }

  const refreshComment = () => getFocusPostCommentsList(id)
  
  React.useEffect(() => {
    getFocusPost(id)
    getFocusPostCommentsList(id)
  }, [id])

  return <>
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      {isPostLoading ? 'Loading...' : <div>
        <div className="postContainer">
          <h1>{post.title}</h1>

          <article>{post.content}</article>  
        </div>

        {currentUser ? <CommmentMaker postId={id} refreshCommentList={refreshComment} /> : null}
      </div>}
      
      <br />
      <hr />
      <br />
      
      {isPostCommentsLoading ? 'Loading...' : <div>
        <ul>
          {postComments.map((comment, i) => <li key={i}>
            <article>{comment.content}</article>
          </li>)}
        </ul>
      </div>}
    </div>
  </>
}

export default PostItemPage
