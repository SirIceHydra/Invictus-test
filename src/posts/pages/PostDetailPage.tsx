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

      {/* Footer */}
      <footer className="bg-primarySupport border-t border-tertiary/20 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <img
              src="/assets/Invictus.svg"
              alt="Invictus Nutrition Full Logo"
              className="h-16 mx-auto"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <h4 className="text-xl font-bold mb-4 text-tertiary">CONTACT US</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 justify-center">
                  <Phone size={20} className="text-tertiary" />
                  <span className="text-secondary">+27 73 951 6670</span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <Mail size={20} className="text-tertiary" />
                  <span className="text-secondary">invictusbrands1@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <MapPin size={20} className="text-tertiary" />
                  <span className="text-secondary">Kenilworth, Johannesburg</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-tertiary">QUICK LINKS</h4>
                             <ul className="space-y-2">
                 <li>
                   <Link to="/#about" className="text-secondary hover:text-tertiary transition-colors">
                     ABOUT US
                   </Link>
                 </li>
                 <li>
                   <Link to="/shipping-policy" className="text-secondary hover:text-tertiary transition-colors">
                     SHIPPING POLICY
                   </Link>
                 </li>
                 <li>
                   <Link to="/return-policy" className="text-secondary hover:text-tertiary transition-colors">
                     RETURN POLICY
                   </Link>
                 </li>
                 <li>
                   <Link to="/privacy-policy" className="text-secondary hover:text-tertiary transition-colors">
                     PRIVACY POLICY
                   </Link>
                 </li>
               </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-tertiary/20 text-center text-secondary/80">
            © 2025 INVICTUS NUTRITION. ALL RIGHTS RESERVED. Website designed &amp; hosted by{' '}
            <a
              href="https://www.kaizentech.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tertiary hover:text-secondary transition-colors"
            >
              Kaizen Technology
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PostDetailPage;
