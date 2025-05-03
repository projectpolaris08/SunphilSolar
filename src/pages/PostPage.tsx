import { useParams } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts.tsx';
import Post from '../components/blog/Post';
import { NotFoundPage } from './NotFoundPage'; // You'll need to create this

export const PostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <Post
      title={post.title}
      date={post.date}
      author={post.author}
      tags={post.tags}
      featuredImage={post.featuredImage?.url}
      excerpt={post.excerpt}
      slug={post.slug}
    >
      {post.fullContent}
    </Post>
  );
};

export default PostPage;