import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PostDetail } from '../components/PostDetail';
import { usePost, useRelatedPosts } from '../hooks/usePosts';

const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error, fetchPostBySlug } = usePost();
  const { relatedPosts, loading: relatedLoading, fetchRelatedPosts } = useRelatedPosts();

  useEffect(() => {
    if (slug) {
      fetchPostBySlug(slug);
    }
  }, [slug, fetchPostBySlug]);

  useEffect(() => {
    if (post) {
      fetchRelatedPosts(post.id, 3);
    }
  }, [post, fetchRelatedPosts]);

  return (
    <PostDetail
      post={post}
      loading={loading}
      error={error}
      showRelatedPosts={true}
      relatedPosts={relatedPosts}
    />
  );
};

export default PostDetailPage;
