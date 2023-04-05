import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import { useAuth } from './../contexts/AuthContext'
import { useApi } from './../contexts/ApiContext';

import Post from './../components/Post';

function DashboardPage() {
  const { currentUser } = useAuth();
  const { api } = useApi();
  const [postsList, setPostsList] = useState([]);
  const [phpMessage, setPhpMessage] = useState();

  const getSecrectMessage = async () => {
    const { data } = await api.get(`posts/author/${currentUser.uid}`);
    setPostsList(data)
  } 
  // const getSecrectPHPMessage = async () => {
  //   const { data } = await api.get('http://localhost:9898/secret');
  //   setPhpMessage(data.message)
  // }

  useEffect(() => {
    getSecrectMessage();
    // getSecrectPHPMessage();
  }, [])

  return <>
    <header aria-label="Page Header">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Welcome Back, {currentUser.email}!
            </h1>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <Link
              className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
            >
              Create Post
            </Link>
          </div>
        </div>
      </div> 
    </header>

    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <div className='flex-col flex gap-4'>
        {postsList.map((post, i) => (<Post key={i} post={post} />))}
      </div>
    </div>
  </>
}

export default DashboardPage;
