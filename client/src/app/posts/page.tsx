import PostCreate from '../components/PostCreate/PostCreate';
import PostList from '../components/PostList/PostList';

const PostsPage = () => {
  return (
    <div>
      <h1>Posts</h1>
      <PostCreate />

      <div className='m-3'></div>

      <PostList />
    </div>
  );
};

export default PostsPage;
