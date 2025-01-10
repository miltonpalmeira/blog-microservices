import styles from './page.module.css';
import PostsPage from './posts/page';

export default function Home() {
  return (
    <div className='container'>
      <h1>Create Post</h1>

      <PostsPage />
    </div>
  );
}
