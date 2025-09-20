import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PostDetail } from '../components/PostDetail';
import { usePost, useRelatedPosts } from '../hooks/usePosts';
import { Navigation } from '../../components/Navigation';
import {
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Clock,
  Plus,
  Minus,
  ShoppingCart
} from 'lucide-react';

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
    <div className="min-h-screen bg-primary text-tertiary">
      {/* Navigation */}
      <Navigation isScrolled={false} />

      {/* Post Content */}
      <div className="pt-24">
        <PostDetail
          post={post}
          loading={loading}
          error={error}
          showRelatedPosts={true}
          relatedPosts={relatedPosts}
        />
      </div>
    </div>
  );
};

export default PostDetailPage;
